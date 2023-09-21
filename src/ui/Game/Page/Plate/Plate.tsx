import React from 'react';
import { GameDto } from '../../../../services';
import { Thumb } from './Thumb';
import { Details } from './Details';
import './Plate.css';
import { Expansions } from './Expansions';

export interface PlateProps {
    game: GameDto;
}

export const Plate = ({ game }: PlateProps) => (
    <div className="game-plate">
        {game.thumb && <Thumb thumb={game.thumb} alt={game.title} />}
        <Details game={game} />
        {game.expansions.length > 0 && (
            <Expansions expansions={game.expansions} />
        )}
    </div>
);
