import React from 'react';
import { Block } from '../Block';
import './List.css';

export interface ListBlockProps {
    label: string;
    children?: React.ReactNode[];
}

export const List = ({ label, children }: ListBlockProps) => (
    <Block label={label} lineBreak>
        <ul>
            {children.map((child, index) => {
                const key = typeof child === 'object' && 'key' in child
                    ? child.key
                    : index;

                return <li key={key}>{child}</li>;
            })}
        </ul>
    </Block>
);
