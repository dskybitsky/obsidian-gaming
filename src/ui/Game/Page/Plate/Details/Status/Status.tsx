import React from 'react';
import { Block } from '../../Block';
import { Status as StatusElement } from '../../../../../Status';

export interface StatusProps {
    status: string;
}

export const Status = ({ status }: StatusProps) => (
    <Block label="Status">
        <StatusElement status={status} withTitle withIcon />
    </Block>
);
