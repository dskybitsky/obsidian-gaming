<script lang="ts">
    import type { GameDto } from "../../types/gaming";
    import OptionalInternalLink from "../common/OptionalInternalLink.svelte";
    import CollectionCardThumb from "./CollectionCardThumb.svelte";

    export let game: GameDto;
</script>

<div class="container">
    <OptionalInternalLink path={ game.path }>
        <CollectionCardThumb game={ game } />
        <div class="title">{ game.title }</div>
    </OptionalInternalLink>
</div>

<style>
    div.container {
        display: flex;
        flex-direction: column;
        max-width: 200px;
        overflow: hidden;
        align-items: center;
    }

    div.title {
        line-height: 1.5;
        padding: 2px 4px;
        text-align: center;
    }
</style>
