import React from "react";
import { GamingInterface } from "../../services";
import { Page } from "./Page";
import { setActiveTabTitle } from "../../utils";

export interface GameProps {
    gaming: GamingInterface,
    path: string,
}

export const Game = ({ gaming, path }: GameProps) => {
    const game = gaming.getGame(path);

    setActiveTabTitle(document, game.title)

    return <Page game={ game }/>
};

