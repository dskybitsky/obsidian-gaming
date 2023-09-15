<script lang="ts">
    import type { CollectionOptions } from "../../types/ui";
    import type { CollectionDto, GameDto, GamesGroupDto } from "../../types/gaming";
    import CollectionCards from "./CollectionCards.svelte";
    import Toolbar from "../common/toolbar/Toolbar.svelte";
    import ToolbarCheck from "../common/toolbar/ToolbarCheck.svelte";
    import ToolbarEdit from "../common/toolbar/ToolbarEdit.svelte";

    export let collection: CollectionDto;
    export let games: GameDto[] | undefined;
    export let gamesGroups: GamesGroupDto[] | undefined;
    export let grouped: boolean;
    export let search: string;
    export let options: CollectionOptions = {};
</script>

<div>
    <Toolbar>
        <ToolbarEdit label="Search" bind:value={ search } />
        <ToolbarCheck label="Group" bind:checked={ grouped }/>
    </Toolbar>
    <h1>{ collection.title }</h1>
    { #if gamesGroups }
        { #each gamesGroups as group }
            <h4>{ group.id.title }</h4>
            <CollectionCards
                games={ group.games }
                hideTotalTimeSpent={ !!options.hideTotalTimeSpent }
                hideTotalTimeToBeat={ !!options.hideTotalTimeToBeat }
            />
        {/each}
    { :else if games }
        <CollectionCards
            games={ games }
            hideTotalTimeSpent={ !!options.hideTotalTimeSpent }
            hideTotalTimeToBeat={ !!options.hideTotalTimeToBeat }
        />
    { /if }
</div>

<style>
</style>
