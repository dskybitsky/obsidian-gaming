import { App, Plugin } from 'obsidian';
import type { MarkdownPostProcessorContext, PluginManifest } from 'obsidian';
import { DataviewApi, getAPI as getDataviewApi } from 'obsidian-dataview';
import { createRoot, Root } from 'react-dom/client';
import { createElement, ReactNode } from 'react';
import { Reader } from 'skybitsky-common';
import {
    Block,
    Game,
    Collection,
    CollectionOptions,
} from './ui';
import { Gaming, GamingInterface } from './services';

const SBS_GAMING_GAME = CSS.escape('sbs:gaming:game');
const SBS_GAMING_COLLECTION = CSS.escape('sbs:gaming:collection');

declare module 'obsidian' {
    interface MetadataCache {
        on(
            name: 'dataview:index-ready',
            callback: () => void,
            ctx?: any,
        ): EventRef;
        on(
            name: 'dataview:metadata-change',
            callback: (type: string, page: any) => void,
            ctx?: any,
        ): EventRef;
    }
}

export default class GamingPlugin extends Plugin {
    settings: GamingPluginSettings = DEFAULT_SETTINGS;

    dataviewApi: DataviewApi;

    reader: Reader;

    gaming: GamingInterface;

    readonly rootsIndex: Map<string, Root> = new Map();

    readonly elementsFactoriesIndex: Map<Root, () => ReactNode> = new Map();

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);

        const dataviewApi = getDataviewApi();

        if (!dataviewApi) {
            throw new Error('Dataview Plugin required');
        }

        this.dataviewApi = dataviewApi;
        this.reader = new Reader(this.dataviewApi);
        this.gaming = new Gaming(this.reader, this.settings.rootPath);
    }

    async onload() {
        await this.loadSettings();

        this.registerMarkdownCodeBlockProcessors();
        this.registerEvents();
    }

    onunload() {
        for (const [, root] of this.rootsIndex) {
            root.unmount();
        }
    }

    async loadSettings() {
        this.settings = {
            ...DEFAULT_SETTINGS,
            ...await this.loadData(),
        };
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    protected registerMarkdownCodeBlockProcessors(): void {
        this.registerMarkdownCodeBlockProcessor(
            SBS_GAMING_GAME,
            (_, container, context) => this.handleGameBlock(container, context),
        );

        this.registerMarkdownCodeBlockProcessor(
            SBS_GAMING_COLLECTION,
            (source, container, context) => this.handleCollectionBlock(
                source,
                container,
                context,
            ),
        );
    }

    protected registerEvents(): void {
        this.registerEvent(
            this.app.metadataCache.on(
                'dataview:index-ready',
                this.onDataviewIndexReady,
                this,
            ),
        );

        this.registerEvent(
            this.app.metadataCache.on(
                'dataview:metadata-change',
                this.onDataviewMetadataChange,
                this,
            ),
        );
    }

    protected handleGameBlock(
        container: HTMLElement,
        context: MarkdownPostProcessorContext,
    ): void {
        const root = createRoot(container);

        this.rootsIndex.set(context.sourcePath, root);

        const elementFactory = () => createElement(Block, {
            initialized: this.dataviewApi.index.initialized,
        }, createElement(Game, {
            gaming: this.gaming,
            path: context.sourcePath,
        }));

        this.elementsFactoriesIndex.set(root, elementFactory);

        root.render(elementFactory());
    }

    protected handleCollectionBlock(
        source: string,
        container: HTMLElement,
        context: MarkdownPostProcessorContext,
    ): void {
        const root = createRoot(container);

        const elementFactory = () => createElement(Block, {
            initialized: this.dataviewApi.index.initialized,
        }, createElement(Collection, {
            gaming: this.gaming,
            path: context.sourcePath,
            options: GamingPlugin.parseCollectionOptions(source),
        }));

        this.elementsFactoriesIndex.set(root, elementFactory);

        root.render(elementFactory());
    }

    protected static parseCollectionOptions(
        source: string,
    ): CollectionOptions | undefined {
        if (!source) {
            return {};
        }

        try {
            const obj = JSON.parse(source);

            return {
                hideTotalTimeSpent: !!obj.hideTotalTimeSpent,
                hideTotalTimeToBeat: !!obj.hideTotalTimeToBeat,
            };
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(`Failed to parse block options: "${source}": ${e}`);
        }

        return undefined;
    }

    protected onDataviewIndexReady() {
        for (const [root, elementFactory] of this.elementsFactoriesIndex) {
            root.render(elementFactory());
        }
    }

    protected onDataviewMetadataChange(_type: string, page: any) {
        if (!page.path) {
            return;
        }

        const root = this.rootsIndex.get(page.path);

        if (!root) {
            return;
        }

        const elementFactory = this.elementsFactoriesIndex.get(root);

        if (!elementFactory) {
            return;
        }

        root.render(elementFactory());
    }

    protected renderElements(): void {
        for (const [root, elementFactory] of this.elementsFactoriesIndex) {
            root.render(elementFactory());
        }
    }
}

interface GamingPluginSettings {
    rootPath: string;
}

const DEFAULT_SETTINGS: GamingPluginSettings = {
    rootPath: 'Gaming',
};
