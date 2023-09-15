<script lang="ts">
    import type { GameDto } from "../../types/gaming";
    import GamePlateThumb from "./GamePlateThumb.svelte";
    import GamePlateDetails from "./GamePlateDetails.svelte";
    import GamePlateExpansions from "./GamePlateExpansions.svelte";

    export let game: GameDto;
</script>
<div class="container">
    { #if game.thumb }
        <GamePlateThumb thumb={ game.thumb } />
    { /if }
    <GamePlateDetails game={ game } />
    { #if game.expansions.length > 0 }
        <GamePlateExpansions game={ game } />
    { /if }
</div>

<style>
    div.container {
        display: flex;
        gap: 2rem;
        font-size: var(--nav-item-size);
        font-weight: var(--nav-item-weight);
        color: var(--nav-item-color);
    }
</style>
