<script lang="ts">
    import GamePlateDetailsBlock from "./GamePlateDetailsBlock.svelte";
    export let label: string;
</script>

<GamePlateDetailsBlock label={ label } breakAfterLabel={ true }>
    <ul>
        <slot/>
    </ul>
</GamePlateDetailsBlock>

<style>
    ul {
        margin-block-start: 0 !important;
        margin-block-end: 0 !important;
    }
</style>

