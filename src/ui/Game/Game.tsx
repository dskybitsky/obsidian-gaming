import React from 'react';
import { setActiveTabTitle } from 'skybitsky-common';
import { GamingInterface } from '../../services';
import { Page } from './Page';

export interface GameProps {
    gaming: GamingInterface;
    path: string;
}

export const Game = ({ gaming, path }: GameProps) => {
    const game = gaming.getGame(path);

    setActiveTabTitle(game.title);

    return <Page game={game} />;
};
