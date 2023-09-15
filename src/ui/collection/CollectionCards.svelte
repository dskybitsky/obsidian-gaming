<script lang="ts">
    import type { GameDto } from "../../types/gaming";
    import CollectionSummary from "./CollectionSummary.svelte";
    import CollectionCard from "./CollectionCard.svelte";

    export let games: GameDto[];
    export let hideTotalTimeSpent: boolean = false;
    export let hideTotalTimeToBeat: boolean = false;

</script>

<div class="container">
    <CollectionSummary
        games={ games }
        hideTotalTimeSpent={ hideTotalTimeSpent }
        hideTotalTimeToBeat={ hideTotalTimeToBeat }
    />
    <div class="inner-container">
        { #each games as game }
            <CollectionCard game={ game } />
        {/each }
    </div>
</div>

<style>
    div.container {
        line-height: 1;
        font-size: calc(var(--table-text-size) * .9);
        color: var(--text-muted);
    }

    div.inner-container {
        clear: both;
        padding: 0.5rem 0;
        display: grid;
        justify-content: space-around;
        grid-template-columns: repeat(auto-fit, 140px);
        grid-column-gap: 0.75rem;
        grid-row-gap: 1.75rem;
    }
</style>
