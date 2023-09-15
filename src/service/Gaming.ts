import type {
    CollectionDto,
    GameDto,
    GamesGroupDto,
    StatusDto,
    PlatformDto,
} from "../types/gaming";
import DataviewReader from './DataviewReader';

export default class Gaming {
    private statusesIndex: Map<string, StatusDto> | null = null;
    private platformsIndex: Map<string, PlatformDto> | null = null

    constructor(
        protected reader: DataviewReader,
        protected rootPath: string,
    ) { }

    getCollection(path: string): CollectionDto | undefined {
        const page = this.reader.getPage(path);

        if (!page) {
            return undefined;
        }

        const name = this.getName(page);

        return {
            name,
            title: page.title ?? name,
        }
    }

    getGames(
        path: string,
        filter?: (game: GameDto) => boolean,
        sort?: (page: GameDto) => unknown,
        groupBy?: (game: GameDto) => unknown,
        groupSort?: (group: GamesGroupDto) => unknown,
    ): GameDto[] | GamesGroupDto[] {
        let games = this.reader.getPagesByPathAtDepthRel(path)
            .map((page) => this.createGame(page))

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

        return games.array()
    }

    getGame(path: string): GameDto | undefined {
        const page = this.reader.getPage(path);

        if (!page) {
            return undefined;
        }

        return this.createGame(page);
    }

    getStatuses(): StatusDto[] {
        const page = this.reader.getPage(this.rootPath);

        if (!page) {
            return [];
        }

        return (page.statuses ?? []).map((obj: any) => ({
            name: obj.name,
            order: parseInt(obj.order ?? 0, 10),
            icon: obj.icon,
            color: obj.color,
        }));
    }

    getPlatforms(): PlatformDto[] {
        const page = this.reader.getPage(this.rootPath);

        if (!page) {
            return [];
        }

        return (page.platforms ?? []).map((obj: any) => ({
            name: obj.name,
            title: obj.title ?? obj.name,
            order: parseInt(obj.order ?? 0, 10),
        }));
    }

    protected createGame(page: Record<string, any>): GameDto {
        const name = this.getName(page);

        const expansions = (page.expansions ?? [])
            .map((expansion: string|string[]|object) => {
                if (Array.isArray(expansion)) {
                    return this.getGame(expansion[0][0])
                }

                if (typeof expansion === 'object') {
                    return this.createGame(expansion)
                }

                return this.createGame({ name: expansion })
            });

        const timeSpent = parseInt(page.timeSpent ?? 0, 10)
            + expansions.reduce((sum: number, expansion: GameDto) => sum + expansion.timeSpent, 0);

        const timeToBeat = parseInt(page.timeToBeat ?? 0, 10)
            + expansions.reduce((sum: number, expansion: GameDto) => sum + expansion.timeToBeat, 0)

        const path = page.file?.path;

        return {
            name,
            title: page.title ?? name,
            thumb: page.thumb,
            platforms: (page.platforms ?? [])
                .map((name: string) => this.findPlatform(name))
                .filter((p: any) => p),
            timeSpent,
            timeToBeat,
            expansions,
            rating: page.rating ? parseFloat(page.rating) : undefined,
            status: this.findStatus(page.status),
            path,
        };
    }

    protected findStatus(name: string): StatusDto | undefined {
        if (this.statusesIndex === null) {
            const statuses = this.getStatuses();

            this.statusesIndex = new Map();

            for (const status of statuses) {
                this.statusesIndex.set(status.name, status)
            }
        }

        return this.statusesIndex.get(name);
    }

    protected findPlatform(name: string): PlatformDto | undefined {
        if (this.platformsIndex === null) {
            const platforms = this.getPlatforms();

            this.platformsIndex = new Map();

            for (const platform of platforms) {
                this.platformsIndex.set(platform.name, platform)
            }
        }

        return this.platformsIndex.get(name);
    }

    protected getName(page: Record<string, any>): string {
        if (page.name) {
            return page.name;
        }

        if (page.file) {
            if (page.file.name && page.file.name !== 'index') {
                return page.file.name;
            }

            if (page.file.folder) {
                return page.file.folder.split('/').slice(-1)[0] ?? ''
            }
        }

        return '';
    }
}
