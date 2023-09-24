import { Reader } from 'skybitsky-common';
import type { CollectionDto, GameDto, GamesGroupDto } from './Gaming.types';

export interface GamingInterface {
    getCollection(path: string): CollectionDto | undefined;
    getGames(
        path: string,
        filter?: (game: GameDto) => boolean,
        sort?: (page: GameDto) => unknown,
        groupBy?: (game: GameDto) => unknown,
        groupSort?: (group: GamesGroupDto) => unknown,
    ): GameDto[] | GamesGroupDto[];
    getGame(path: string): GameDto | undefined;
}

export class Gaming implements GamingInterface {
    constructor(
        protected reader: Reader,
    ) {}

    getCollection(path: string): CollectionDto | undefined {
        const page = this.reader.getPage(path);

        if (!page) {
            return undefined;
        }

        const name = Gaming.getName(page);

        return {
            name,
            title: page.title ?? name,
        };
    }

    getGames(
        path: string,
        filter?: (game: GameDto) => boolean,
        sort?: (page: GameDto) => unknown,
        groupBy?: (game: GameDto) => unknown,
        groupSort?: (group: GamesGroupDto) => unknown,
    ): GameDto[] | GamesGroupDto[] {
        let games = this.reader
            .getPagesByPathAtDepthRel(path)
            .map((page) => this.createGame(page));

        if (filter) {
            games = games.filter(filter);
        }

        if (sort) {
            games = games.sort(sort);
        }

        if (groupBy) {
            let gamesGroups = games
                .groupBy(groupBy)
                .map((group) => ({ id: group.key, games: group.rows.array() }));

            if (groupSort) {
                gamesGroups = gamesGroups.sort(groupSort);
            }

            return gamesGroups.array();
        }

        return games.array();
    }

    getGame(path: string): GameDto | undefined {
        const page = this.reader.getPage(path);

        if (!page) {
            return undefined;
        }

        return this.createGame(page);
    }

    protected createGame(page: Record<string, any>): GameDto {
        const name = Gaming.getName(page);

        const expansions = (page.expansions ?? []).map(
            (expansion: string | string[] | object) => {
                if (Array.isArray(expansion)) {
                    return this.getGame(expansion[0][0]);
                }

                if (typeof expansion === 'object') {
                    return this.createGame(expansion);
                }

                return this.createGame({ name: expansion });
            },
        );

        const timeSpent = parseInt(page.timeSpent ?? 0, 10)
            + expansions.reduce(
                (sum: number, expansion: GameDto) => sum + expansion.timeSpent,
                0,
            );

        const timeToBeat = parseInt(page.timeToBeat ?? 0, 10)
            + expansions.reduce(
                (sum: number, expansion: GameDto) => sum + expansion.timeToBeat,
                0,
            );

        const path = page.file?.path;

        return {
            name,
            title: page.title ?? name,
            thumb: page.thumb,
            platforms: page.platforms ?? [],
            timeSpent,
            timeToBeat,
            expansions,
            rating: page.rating ? parseFloat(page.rating) : undefined,
            status: page.status
                ? page.status.toString().toLowerCase()
                : undefined,
            path,
        };
    }

    protected static getName(page: Record<string, any>): string {
        if (page.name) {
            return page.name;
        }

        if (page.file) {
            if (page.file.name && page.file.name !== 'index') {
                return page.file.name;
            }

            if (page.file.folder) {
                return page.file.folder.split('/').slice(-1)[0] ?? '';
            }
        }

        return '';
    }
}
