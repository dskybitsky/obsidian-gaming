import React from 'react';
import { Status as StatusElement } from '../../../../../../Status';
import './Status.css';

export interface StatusProps {
    status: string;
}

export const Status = ({ status }: StatusProps) => (
    <div className="collection-card-thumb-status">
        <StatusElement status={status} withTitle={false} />
    </div>
);
