import React from "react";
import { Star } from 'lucide-react';
import "./Rating.css";

export interface RatingProps {
    rating: number,
    size?: number,
}

export const Rating = ({ rating, size = 16 }: RatingProps) => {
    return <span className="rating">
        { [1, 2, 3, 4, 5].map((index) => {
            if (rating >= index) {
                return <Star key={ index } fill="gold" color="gold" size={ size } />
            }

            if (rating > (index - 1)) {
                return <Star key={ index } color="gold" size={ size } />
            }

            return <Star key={ index } size={ size } />
        }) }
    </span>
};
