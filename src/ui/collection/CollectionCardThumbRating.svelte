<script lang="ts">
    import Rating from "../Rating.svelte";

    export let rating: number;
</script>

<div class="container">
    <Rating rating={ rating } />
</div>

<style>
    div.container {
        position: absolute;
        bottom: 0.5rem;
        left: 0.5rem;
        background-color: var(--game-icon-canvas-color);
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
    }
</style>
