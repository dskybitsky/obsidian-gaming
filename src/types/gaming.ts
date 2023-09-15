export type CollectionDto = {
    name: string,
    title: string,
}

export type GamesGroupDto = {
    id: any,
    games: GameDto[],
}

export type GameDto = {
    name: string,
    title: string,
    thumb?: string,
    platforms: PlatformDto[],
    timeSpent: number,
    timeToBeat: number,
    expansions: GameDto[],
    rating?: number,
    status?: StatusDto,
    path?: string,
}

export type StatusDto = {
    name: string,
    order: number,
    icon?: string,
    color?: string,
}

export type PlatformDto = {
    name: string,
    title: string,
    order: number,
}
