<script lang="ts">
    import type { GameDto } from "../../types/gaming";
    import GamePlateDetailsListBlock from "./GamePlateDetailsListBlock.svelte";
    import GamePlateExpansion from "./GamePlateExpansion.svelte";

    export let game: GameDto;
</script>
<div class="container">
    <GamePlateDetailsListBlock label="Expansions">
        { #each game.expansions as expansion }
            <li><GamePlateExpansion game={ expansion } /></li>
        {/each}
    </GamePlateDetailsListBlock>
</div>
<style>
    li {
        margin: 0.5rem 0;
        list-style-type: none;
    }
</style>
