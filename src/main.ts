import { App, Plugin } from 'obsidian';
import type { MarkdownPostProcessorContext, PluginManifest } from 'obsidian';
import { DataviewApi, getAPI as getDataviewApi } from 'obsidian-dataview';
import Game from "./ui/Game.svelte";
import Collection from "./ui/Collection.svelte";
import Gaming from "./service/Gaming";
import DataviewReader from "./service/DataviewReader";
import type { CollectionOptions } from "./types/ui";
import './styles.css';

export const SBS_GAMING_GAME = CSS.escape("sbs:gaming:game");
export const SBS_GAMING_COLLECTION = CSS.escape("sbs:gaming:collection");

declare module "obsidian" {
    interface MetadataCache {
        on(name: "dataview:index-ready", callback: () => void, ctx?: any): EventRef;
        on(name: "dataview:metadata-change", callback: (type: string, page: any) => void, ctx?: any): EventRef;
    }
}

export default class GamingPlugin extends Plugin {
    settings: GamingPluginSettings = DEFAULT_SETTINGS;

    dataviewApi: DataviewApi;
    dataviewReader: DataviewReader;

    gaming: Gaming;

    readonly blocksIndex: Map<string, Game | Collection> = new Map();

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);

        const dataviewApi = getDataviewApi();

        if (!dataviewApi) {
            throw new Error('Dataview Plugin required');
        }

        this.dataviewApi = dataviewApi;
        this.dataviewReader = new DataviewReader(this.dataviewApi);
        this.gaming = new Gaming(this.dataviewReader, this.settings.rootPath);
    }

    async onload() {
        await this.loadSettings();

        this.registerMarkdownCodeBlockProcessor(
            SBS_GAMING_GAME,
            (_, container, context) => this.handleGameBlock(container, context)
        );

        this.registerMarkdownCodeBlockProcessor(
            SBS_GAMING_COLLECTION,
            (source, container, context) => this.handleCollectionBlock(source, container, context)
        );

        this.registerEvent(
            this.app.metadataCache.on(
                "dataview:index-ready",
                this.onDataviewIndexReady,
                this
            )
        );

        this.registerEvent(
            this.app.metadataCache.on(
                "dataview:metadata-change",
                this.onDataviewMetadataChange,
                this
            )
        );
    }

    onunload() {

    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    protected handleGameBlock(container: HTMLElement, context: MarkdownPostProcessorContext): void {
        this.blocksIndex.set(context.sourcePath, new Game({
            props: {
                initialized: this.dataviewApi.index.initialized,
                gaming: this.gaming,
                sourcePath: context.sourcePath,
            },
            target: container
        }))
    }

    protected handleCollectionBlock(
        source: string,
        container: HTMLElement,
        context: MarkdownPostProcessorContext
    ): void {
        this.blocksIndex.set(context.sourcePath, new Collection({
            props: {
                initialized: this.dataviewApi.index.initialized,
                gaming: this.gaming,
                sourcePath: context.sourcePath,
                options: this.parseCollectionOptions(source),
            },
            target: container
        }))
    }

    protected parseCollectionOptions(source: string): CollectionOptions {
        if (!source) {
            return { }
        }

        try {
            const obj = JSON.parse(source);

            return {
                hideTotalTimeSpent: !!obj.hideTotalTimeSpent,
                hideTotalTimeToBeat: !!obj.hideTotalTimeToBeat,
            }
        } catch (e) {
            console.warn(`Failed to parse block options: "${source}": ${e}`);
            return { }
        }
    }

    protected onDataviewIndexReady() {
        for (const [,block] of this.blocksIndex) {
            block.$set({ initialized: true });
        }
    }

    protected onDataviewMetadataChange(_type: string, page: any) {
        if (!page.path) {
            return;
        }

        const block = this.blocksIndex.get(page.path);

        if (!block) {
            return;
        }

        block.$set({ initialized: false });
        block.$set({ initialized: this.dataviewApi.index.initialized });
    }
}

interface GamingPluginSettings {
    rootPath: string,
}

const DEFAULT_SETTINGS: GamingPluginSettings = {
    rootPath: 'Gaming'
}
