<script lang="ts">
    import GamePlateDetailsBlock from "./GamePlateDetailsBlock.svelte";
    import Rating from "../Rating.svelte";

    export let label: string;
    export let rating: number;
</script>

<GamePlateDetailsBlock label={ label }>
    <Rating rating={ rating } />
</GamePlateDetailsBlock>
