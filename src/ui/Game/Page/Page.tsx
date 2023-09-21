import React from 'react';
import { GameDto } from '../../../services';
import { Plate } from './Plate';

export interface PageProps {
    game: GameDto;
}

export const Page = ({ game }: PageProps) => (
    <div>
        <h1>{game.title}</h1>
        <Plate game={game} />
    </div>
);
