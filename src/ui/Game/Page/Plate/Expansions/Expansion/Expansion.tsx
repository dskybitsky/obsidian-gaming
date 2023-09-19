import React from "react";
import { InternalLink } from "skybitsky-common";
import { GameDto } from "../../../../../../services";
import { Status } from "../../../../../Status";
import "./Expansion.css";

export interface ExpansionProps {
    expansion: GameDto,
}

export const Expansion = ({ expansion }: ExpansionProps) => {
    return <div className="game-plate-expansion">
        { expansion.thumb && <img src={ expansion.thumb } alt={ expansion.title } /> }
        { expansion.path
            ? <InternalLink path={ expansion.path }>{ expansion.title }</InternalLink>
            : <>{ expansion.title }</>
        }
        { expansion.status && <Status status={ expansion.status } withTitle={ false } /> }
    </div>
};
