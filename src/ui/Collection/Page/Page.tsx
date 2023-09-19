import React from "react";
import {
    ToolBar,
    ToolBarCheck,
    ToolBarEdit,
} from "skybitsky-common";
import {
    CollectionDto,
    GameDto,
    GamesGroupDto,
} from "../../../services";
import { Cards } from "./Cards";
import { CollectionOptions } from "../Collection";

export interface PageProps {
    collection: CollectionDto,
    games?: GameDto[],
    gamesGroups?: GamesGroupDto[],
    search?: string;
    onSearchChange: (value: string) => void,
    grouped?: boolean;
    onGroupedChange: (value: boolean) => void,
    options?: CollectionOptions
}

export const Page = ({
    collection,
    games,
    gamesGroups,
    search,
    onSearchChange,
    grouped,
    onGroupedChange,
    options = {}
}: PageProps) => <div>
    <ToolBar>
        <ToolBarEdit label="Search" onChange={ onSearchChange } value={ search } />
        <ToolBarCheck label="Group" onChange={ onGroupedChange } checked={ grouped } />
    </ToolBar>
    <h1>{ collection.title }</h1>
    { gamesGroups && gamesGroups.map((group) => <>
        <h4>{ group.id.name }</h4>
        <Cards
            games={ group.games }
            hideTotalTimeSpent={ options.hideTotalTimeSpent }
            hideTotalTimeToBeat={ options.hideTotalTimeToBeat }
        />
    </>) }
    { games && <
        Cards
            games={ games }
            hideTotalTimeSpent={ options.hideTotalTimeSpent }
            hideTotalTimeToBeat={ options.hideTotalTimeToBeat }
    /> }
</div>
