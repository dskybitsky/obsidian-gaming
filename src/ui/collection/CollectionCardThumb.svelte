<script lang="ts">
    import type { GameDto } from "../../types/gaming";
    import CollectionCardThumbTime from "./CollectionCardThumbTime.svelte";
    import CollectionCardThumbStatus from "./CollectionCardThumbStatus.svelte";
    import CollectionCardThumbRating from "./CollectionCardThumbRating.svelte";

    export let game: GameDto;
</script>

<div class="container">
    <img src={ game.thumb } alt="Thumbnail"/>
    { #if game.timeSpent || game.timeToBeat }
        <CollectionCardThumbTime timeSpent={ game.timeSpent } timeToBeat={ game.timeToBeat } />
    { /if }
    { #if game.status }
        <CollectionCardThumbStatus status={ game.status } />
    { /if }
    { #if game.rating }
        <CollectionCardThumbRating rating={ game.rating } />
    { /if }
</div>

<style>
    div.container {
        position: relative;
        text-align: center;
    }

    div.container img {
        cursor: pointer !important;
        border-radius: 10px;
    }
</style>
