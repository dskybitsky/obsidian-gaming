import React from 'react';
import { GameDto } from '../../../../../services';
import { List } from '../List';
import { Expansion } from './Expansion';

import './Expansions.css';

export interface ExpansionsProps {
    expansions: GameDto[];
}

export const Expansions = ({ expansions }: ExpansionsProps) => (
    <div className="game-plate-expansions">
        <List label="Expansions">
            {expansions.map((e) => (
                <Expansion key={e.title} expansion={e} />
            ))}
        </List>
    </div>
);
