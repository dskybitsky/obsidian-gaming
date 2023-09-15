<script lang="ts">
    import GamePlateDetailsBlock from "./GamePlateDetailsBlock.svelte";
    
    export let label: string;
    export let text: string;
</script>

<GamePlateDetailsBlock label={ label }>
    <span>{ text }</span>
</GamePlateDetailsBlock>
