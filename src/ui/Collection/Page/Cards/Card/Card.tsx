import React from "react";
import { InternalLink } from "skybitsky-common";
import { GameDto } from "../../../../../services";
import { Thumb } from "./Thumb";
import "./Card.css";

export interface CardProps {
    game: GameDto,
}

export const Card = ({ game }: CardProps) => {
    const children = <>
        <Thumb game={ game } />
        <div className="title">{ game.title }</div>
    </>

    return <div className="collection-card">
        { game.path
            ? <InternalLink path={ game.path }>{ children }</InternalLink>
            : children
        }
    </div>
}
