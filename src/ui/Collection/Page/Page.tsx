import React, { Fragment } from 'react';
import { ToolBar, ToolBarCheck, ToolBarEdit } from 'skybitsky-common';
import { CollectionDto, GameDto, GamesGroupDto } from '../../../services';
import { Cards } from './Cards';
import { CollectionOptions } from '../Collection.types';

export interface PageProps {
    collection: CollectionDto;
    games?: GameDto[];
    gamesGroups?: GamesGroupDto[];
    search?: string;
    onSearchChange: (value: string) => void;
    grouped?: boolean;
    onGroupedChange: (value: boolean) => void;
    options?: CollectionOptions;
}

export const Page = ({
    collection,
    games,
    gamesGroups,
    search,
    onSearchChange,
    grouped,
    onGroupedChange,
    options = {},
}: PageProps) => (
    <div>
        <ToolBar>
            <ToolBarEdit
                label="Search"
                onChange={onSearchChange}
                value={search}
            />
            <ToolBarCheck
                label="Group"
                onChange={onGroupedChange}
                checked={grouped}
            />
        </ToolBar>
        <h1>{collection.title}</h1>
        {gamesGroups && gamesGroups.map((group) => (
            <Fragment key={group.id}>
                <h4 key={`h4-${group.id}`}>{group.id}</h4>
                <Cards
                    key={`cards-${group.id}`}
                    games={group.games}
                    hideTotalTimeSpent={options.hideTotalTimeSpent}
                    hideTotalTimeToBeat={options.hideTotalTimeToBeat}
                />
            </Fragment>
        ))}
        { games && (
            <Cards
                games={games}
                hideTotalTimeSpent={options.hideTotalTimeSpent}
                hideTotalTimeToBeat={options.hideTotalTimeToBeat}
            />
        ) }
    </div>
);
