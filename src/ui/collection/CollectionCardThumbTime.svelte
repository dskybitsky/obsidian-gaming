<script lang="ts">
    export let timeToBeat: number;
    export let timeSpent: number;
</script>

<div class="container">
    { #if timeSpent }
        { timeSpent }h
    { :else if timeToBeat}
        { timeToBeat }h
    { /if }
</div>

<style>

    div.container {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        background-color: var(--game-icon-canvas-color);
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        color: white;
        font-weight: bold;
    }

</style>
