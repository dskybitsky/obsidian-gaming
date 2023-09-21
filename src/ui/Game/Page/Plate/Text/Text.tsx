import React from "react";
import { Block } from "../Block";

export interface TextProps {
    label: string,
    text: string,
}

export const Text = ({ label, text }: TextProps) => {
    return <Block label={ label } >
        <span>{ text }</span>
    </Block>
}
