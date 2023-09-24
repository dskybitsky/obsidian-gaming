import React, { useEffect, useState } from 'react';
import { setActiveTabTitle } from 'skybitsky-common';
import { GameDto, GamesGroupDto, GamingInterface } from '../../services';
import { Page } from './Page';
import { CollectionOptions } from './Collection.types';

export interface CollectionProps {
    gaming: GamingInterface;
    path: string;
    options?: CollectionOptions;
}

export const Collection = ({ gaming, path, options }: CollectionProps) => {
    const [search, setSearch] = useState('');

    const searchRegExp = new RegExp(search, 'i');

    const filter = search
        ? (game: GameDto) => !!game.title.match(searchRegExp)
        : undefined;

    const localStorageGroupedParam = `${path}:grouped`;

    const [grouped, setGrouped] = useState(false);

    useEffect(() => {
        const localStorageGrouped = JSON.parse(
            localStorage.getItem(localStorageGroupedParam),
        );

        if (localStorageGrouped !== undefined) {
            setGrouped(localStorageGrouped);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(localStorageGroupedParam, JSON.stringify(grouped));
    }, [grouped]);

    const sort = (game: GameDto) => [game.status, game.title];

    const collection = gaming.getCollection(path);

    const games = grouped
        ? undefined
        : (gaming.getGames(path, filter, sort) as GameDto[]);

    const gamesGroups = grouped
        ? (gaming.getGames(
            path,
            filter,
            sort,
            (game: GameDto) => game.platforms[0],
            (group: GamesGroupDto) => -1 * group.games.length,
        ) as GamesGroupDto[])
        : undefined;

    setActiveTabTitle(collection.title);

    return (
        <Page
            collection={collection}
            games={games}
            gamesGroups={gamesGroups}
            search={search}
            onSearchChange={(value) => setSearch(value)}
            grouped={grouped}
            onGroupedChange={(value) => setGrouped(value)}
            options={options}
        />
    );
};
