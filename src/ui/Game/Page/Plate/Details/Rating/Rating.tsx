import React from 'react';
import { Block } from '../../Block';
import { Rating as RatingElement } from '../../../../../Rating';

export interface RatingProps {
    rating: number;
}

export const Rating = ({ rating }: RatingProps) => (
    <Block label="Rating">
        <RatingElement rating={rating} />
    </Block>
);
