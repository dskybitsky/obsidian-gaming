import { App } from 'obsidian';
import type { MarkdownPostProcessorContext, PluginManifest } from 'obsidian';
import { createRoot } from 'react-dom/client';
import { createElement, ReactElement } from 'react';
import {
    Container,
    ReactPlugin,
    Reader,
} from 'skybitsky-common';
import {
    Game,
    Collection,
    CollectionOptions,
} from '../../ui';
import { SBS_GAMING_GAME, SBS_GAMING_COLLECTION } from '../constants';
import { Gaming, GamingInterface } from '../../services';
import { Settings } from '../types';

export class Plugin extends ReactPlugin {
    settings: Settings = DefaultSettings;

    reader: Reader;

    gaming: GamingInterface;

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);

        this.reader = new Reader(this.dataviewApi);
        this.gaming = new Gaming(this.reader);
    }

    async onload() {
        await this.loadSettings();

        super.onload();

        this.registerMarkdownCodeBlockProcessors();
    }

    async loadSettings() {
        this.settings = {
            ...DefaultSettings,
            ...await this.loadData(),
        };
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    protected registerMarkdownCodeBlockProcessors(): void {
        this.registerMarkdownCodeBlockProcessor(
            SBS_GAMING_GAME,
            (_, container, context) => this.processBlock(
                container,
                context,
                () => createElement(Game, {
                    gaming: this.gaming,
                    path: context.sourcePath,
                }),
            ),
        );

        this.registerMarkdownCodeBlockProcessor(
            SBS_GAMING_COLLECTION,
            (source, container, context) => this.processBlock(
                container,
                context,
                () => createElement(Collection, {
                    gaming: this.gaming,
                    path: context.sourcePath,
                    options: Plugin.parseCollectionOptions(source),
                }),
            ),
        );
    }

    protected processBlock(
        container: HTMLElement,
        context: MarkdownPostProcessorContext,
        elementFactory: () => ReactElement,
    ): void {
        const root = createRoot(container);

        const containerFactory = () => createElement(Container, {
            loading: !this.dataviewApi.index.initialized,
            className: 'sbs-gaming',
        }, elementFactory());

        this.registerElement(root, context.sourcePath, containerFactory);

        root.render(containerFactory());
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
}

const DefaultSettings: Settings = {
};
