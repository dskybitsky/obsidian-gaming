<script lang="ts">
    import type { GameDto } from "../../types/gaming";
    import GamePlate from "./GamePlate.svelte";

    export let game: GameDto;
</script>

<div>
    <h1>{ game.title }</h1>
    <GamePlate game={ game } />
</div>

<style>
</style>
