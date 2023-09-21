import React from "react";

export interface BlockProps {
    initialized: boolean,
    children?: React.ReactNode
}

export const Block = ({ initialized, children }: BlockProps) => {
    return initialized && children
        ? <>{ children }</>
        : <span>Loading...</span>
};
