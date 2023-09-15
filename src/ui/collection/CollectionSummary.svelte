<script lang="ts">
    import type { GameDto } from "../../types/gaming";

    export let games: GameDto[];
    export let hideTotalTimeSpent: boolean = false;
    export let hideTotalTimeToBeat: boolean = false;

    const totalItems = games.length

    let totalTimeSpent = 0
    let totalTimeToBeat = 0

    for (let game of games) {
        totalTimeSpent += game.timeSpent ?? 0
        totalTimeToBeat += game.timeToBeat ?? 0
    }
</script>

<div class="container">
    <span>Items: { totalItems }</span>
    { #if !hideTotalTimeSpent && (totalTimeSpent > 0) }
        <span>Time spent: { totalTimeSpent }h</span>
    { /if }
    { #if !hideTotalTimeToBeat && (totalTimeToBeat > 0) }
        <span>Time to beat: { totalTimeToBeat }h</span>
    { /if }
</div>

<style>
    div.container {
        display: flex;
        justify-content: flex-end;
        font-size: var(--font-adaptive-smaller);
        margin-block-end: 0.5rem;
        gap: 1rem;
    }
</style>
