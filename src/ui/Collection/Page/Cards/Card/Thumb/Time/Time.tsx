import React from 'react';
import './Time.css';

export interface TimeProps {
    timeSpent: number;
    timeToBeat: number;
}

export const Time = ({ timeSpent, timeToBeat }: TimeProps) => {
    let message = '';

    if (timeSpent > 0) {
        message = `${timeSpent}h`;
    } else if (timeToBeat > 0) {
        message = `${timeToBeat}h`;
    }

    return (
        <div className="collection-card-thumb-time">
            { message }
        </div>
    );
};
