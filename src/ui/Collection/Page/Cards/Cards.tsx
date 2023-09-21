import React from 'react';
import { GameDto } from '../../../../services';
import { Summary } from './Summary';
import { Card } from './Card';
import './Cards.css';

export interface CardsProps {
    games: GameDto[];
    hideTotalTimeSpent?: boolean;
    hideTotalTimeToBeat?: boolean;
}

export const Cards = ({
    games,
    hideTotalTimeSpent = false,
    hideTotalTimeToBeat = false,
}: CardsProps) => (
    <div className="collection-cards">
        <Summary
            games={games}
            hideTotalTimeSpent={hideTotalTimeSpent}
            hideTotalTimeToBeat={hideTotalTimeToBeat}
        />
        <div className="content">
            {games.map((game) => (
                <Card key={game.title} game={game} />
            ))}
        </div>
    </div>
);
