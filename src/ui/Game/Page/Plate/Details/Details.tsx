import React from 'react';
import { GameDto } from '../../../../../services';
import { List } from '../List';
import { Text } from '../Text';
import { Rating } from './Rating';
import { Status } from './Status';
import './Details.css';

export interface DetailsProps {
    game: GameDto;
}

export const Details = ({ game }: DetailsProps) => (
    <div className="game-plate-details">
        {game.platforms.length && (
            <List label="Platforms">{game.platforms}</List>
        )}
        {game.timeSpent > 0 && (
            <Text label="Time spent" text={`${game.timeSpent} hours`} />
        )}
        {game.timeToBeat > 0 && (
            <Text label="Time to beat" text={`${game.timeToBeat} hours`} />
        )}
        {game.status && <Status status={game.status} />}
        {game.rating && <Rating rating={game.rating} />}
    </div>
);
