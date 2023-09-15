<script lang="ts">
    import type { GameDto } from "../../types/gaming";
    import OptionalInternalLink from "../common/OptionalInternalLink.svelte";
    import Status from "../Status.svelte";

    export let game: GameDto;
</script>
<div class="container">
    { #if game.thumb }
        <img src={ game.thumb } alt="Thumbnail" />
    { /if }
    <OptionalInternalLink path={ game.path }>
        { game.title }
    </OptionalInternalLink>
    { #if game.status }
        <Status status={ game.status } />
    { /if }
</div>
<style>
    div.container {
        display: flex;
        align-items: center;
        gap: .25rem;
    }

    div.container img {
        border-radius: 3px;
        width: 30px !important;
    }
</style>
