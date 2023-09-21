import React from "react";
import { Block } from "../Block";

export interface ListBlockProps {
    label: string,
    children?: React.ReactNode[],
}

import "./List.css"

export const List = ({ label, children }: ListBlockProps) => {
    return <Block label={ label } lineBreak={ true }>
        <ul>
            { children.map((child, index) => {
                const key = typeof child === 'object' && 'key' in child
                    ? child.key
                    : index

                return <li key={ key }>{ child }</li>
            }) }
        </ul>
    </Block>
}
