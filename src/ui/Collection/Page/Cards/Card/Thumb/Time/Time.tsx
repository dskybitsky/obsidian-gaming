import React from "react";
import "./Time.css";

export interface TimeProps {
    timeSpent: number,
    timeToBeat: number,
}

export const Time = ({ timeSpent, timeToBeat }: TimeProps) => <div className="collection-card-thumb-time">
    { timeSpent > 0
        ? <>{ timeSpent }h</>
        : (
            timeToBeat > 0 ? <>{ timeToBeat }h</> : false
        )
    }
</div>
