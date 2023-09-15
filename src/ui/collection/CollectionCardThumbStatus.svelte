<script lang="ts">
    import type { StatusDto } from "../../types/gaming";
    import Status from "../Status.svelte";

    export let status: StatusDto;
</script>

<div class="container">
    <Status status={ status } />
</div>

<style>
    div.container {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background-color: var(--game-icon-canvas-color);
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        color: white;
    }
</style>
