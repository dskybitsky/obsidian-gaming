import React from "react";

export interface BlockProps {
    label: string,
    lineBreak?: boolean,
    children?: React.ReactNode,
}

import "./Block.css"

export const Block = ({ label, lineBreak = false, children }: BlockProps) => {
    return <div className="game-page-plate-details-block">
        <span className={ lineBreak ? "break" : "" }>{ label }:</span>
        { children }
    </div>
}
