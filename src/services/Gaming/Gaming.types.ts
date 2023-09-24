export type CollectionDto = {
    name: string;
    title: string;
};

export type GamesGroupDto = {
    id: any;
    games: GameDto[];
};

export type GameDto = {
    name: string;
    title: string;
    thumb?: string;
    platforms: string[];
    timeSpent: number;
    timeToBeat: number;
    expansions: GameDto[];
    rating?: number;
    edition?: string;
    status?: string;
    path?: string;
};
