import React from 'react';
import { GameDto } from '../../../../../services';

import './Summary.css';

export interface SummaryProps {
    games: GameDto[];
    hideTotalTimeSpent?: boolean;
    hideTotalTimeToBeat?: boolean;
}

export const Summary = ({
    games,
    hideTotalTimeSpent = false,
    hideTotalTimeToBeat = false,
}: SummaryProps) => {
    const totalItems = games.length;

    let totalTimeSpent = 0;
    let totalTimeToBeat = 0;

    for (const game of games) {
        totalTimeSpent += game.timeSpent;
        totalTimeToBeat += game.timeToBeat;
    }

    const totalItemsMessage = `Items: ${totalItems}`;
    const totalTimeSpentMessage = `Total spent: ${totalTimeSpent}h`;
    const totalTimeToBeatMessage = `Total to beat: ${totalTimeToBeat}h`;

    return (
        <div className="collection-summary">
            <span>{ totalItemsMessage }</span>
            {!hideTotalTimeSpent && totalTimeSpent > 0 && (
                <span>{ totalTimeSpentMessage }</span>
            )}
            {!hideTotalTimeToBeat && totalTimeToBeat > 0 && (
                <span>{ totalTimeToBeatMessage }</span>
            )}
        </div>
    );
};
