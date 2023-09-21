import React from 'react';
import { Rating as RatingElement } from '../../../../../../Rating';
import './Rating.css';

export interface RatingProps {
    rating: number;
}

export const Rating = ({ rating }: RatingProps) => (
    <div className="collection-card-thumb-rating">
        <RatingElement rating={rating} />
    </div>
);
