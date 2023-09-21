import React from 'react';
import './Block.css';

export interface BlockProps {
    label: string;
    lineBreak?: boolean;
    children?: React.ReactNode;
}

export const Block = ({ label, lineBreak = false, children }: BlockProps) => (
    <div className="game-page-plate-details-block">
        <span className={lineBreak ? 'break' : ''}>{`${label}:`}</span>
        {children}
    </div>
);
