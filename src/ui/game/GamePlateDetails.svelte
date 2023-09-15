<script lang="ts">
    import type { GameDto } from "../../types/gaming";
    import GamePlateDetailsListBlock from "./GamePlateDetailsListBlock.svelte";
    import GamePlateDetailsTextBlock from "./GamePlateDetailsTextBlock.svelte";
    import GamePlateDetailsRatingBlock from "./GamePlateDetailsRatingBlock.svelte";

    export let game: GameDto;
</script>
<div class="container">
    { #if game.platforms.length > 0 }
        <GamePlateDetailsListBlock label="Platforms">
            { #each game.platforms as platform }
                <li>{ platform.title }</li>
            {/each}
        </GamePlateDetailsListBlock>
    { /if }
    { #if game.timeSpent }
        <GamePlateDetailsTextBlock label="Time spent" text={ `${game.timeSpent} hours` } />
    { /if }
    { #if game.timeToBeat }
        <GamePlateDetailsTextBlock label="Time to beat" text={ `${game.timeToBeat} hours` } />
    { /if }
    { #if game.status }
        <GamePlateDetailsTextBlock label="Status" text={ game.status.name } />
    { /if }
    { #if game.rating }
        <GamePlateDetailsRatingBlock label="Rating" rating={ game.rating } />
    { /if }
</div>
