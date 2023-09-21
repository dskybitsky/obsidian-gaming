import React from "react";
import {
    Award,
    Calendar,
    Check,
    Leaf,
    PartyPopper,
    Pause,
    Play,
    Plus,
    Square,
} from 'lucide-react';

import "./Status.css";

export interface StatusProps {
    status: string,
    withTitle?: boolean,
    withIcon?: boolean
}

export const Status = ({ status, withTitle = true, withIcon = true }: StatusProps) => {
    return <span className="status">
        { withTitle && <>{ toTitleCase(status) }</>  }
        { withIcon && <Icon status={status} />}
    </span>
};

const Icon = ({ status }: Pick<StatusProps, 'status'>) => {
    if (status === 'new') {
        return <Plus />
    }

    if (status === 'stopped') {
        return <Square />
    }

    if (status === 'playing') {
        return <Play />
    }

    if (status === 'suspended') {
        return <Pause />
    }

    if (status === 'evergreen') {
        return <Leaf color="lawngreen" />
    }

    if (status === 'finished') {
        return <Check />
    }

    if (status === 'completed') {
        return <Award color="gold" />
    }

    if (status === 'released') {
        return <PartyPopper />
    }

    if (status === 'upcoming') {
        return <Calendar />
    }
}

function toTitleCase(s: string): string {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
}
