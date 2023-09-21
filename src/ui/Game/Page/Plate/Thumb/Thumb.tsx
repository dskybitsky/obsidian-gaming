import React from 'react';
import './Thumb.css';

export interface ThumbProps {
    thumb: string;
    alt?: string;
}

export const Thumb = ({ thumb, alt }: ThumbProps) => (
    <div className="game-page-plate-thumb">
        <img src={thumb} alt={alt ?? 'Game'} />
    </div>
);
