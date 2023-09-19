import React from "react";
import { GameDto } from "../../../../../services";

import "./Summary.css";

export interface SummaryProps {
    games: GameDto[],
    hideTotalTimeSpent?: boolean,
    hideTotalTimeToBeat?: boolean,
}

export const Summary = ({
    games,
    hideTotalTimeSpent = false,
    hideTotalTimeToBeat = false,
}: SummaryProps) => {
    const totalItems = games.length

    let totalTimeSpent = 0
    let totalTimeToBeat = 0

    for (let game of games) {
        totalTimeSpent += game.timeSpent;
        totalTimeToBeat += game.timeToBeat;
    }

    return <div className="collection-summary">
        <span>Items: { totalItems }</span>
        { !hideTotalTimeSpent && (totalTimeSpent > 0) && <span>
            Time spent: { totalTimeSpent }h
        </span> }
        { !hideTotalTimeToBeat && (totalTimeToBeat > 0) && <span>
            Time to beat: { totalTimeToBeat }h
        </span> }
    </div>
}
