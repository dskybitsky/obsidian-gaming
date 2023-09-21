import React from "react";
import { GameDto } from "../../../../../../services";
import { Time } from "./Time";
import { Status } from "./Status";
import { Rating } from "./Rating";
import "./Thumb.css";

export interface ThumbProps {
    game: GameDto,
}

export const Thumb = ({ game }: ThumbProps) => <div className="collection-card-thumb">
    <img src={ game.thumb } alt={ game.title } />
    { (game.timeSpent + game.timeToBeat) > 0 && <Time
        timeSpent={ game.timeSpent }
        timeToBeat={ game.timeToBeat }
    /> }
    { game.status && <Status status={ game.status } /> }
    { game.rating && <Rating rating={ game.rating } /> }
</div>
