<script lang="ts">
    export let checked: boolean;
    export let label: string;
</script>

<label>
    <input type="checkbox" bind:checked={ checked }/>
    { label }
</label>

<style>
    label {
        display: flex;
        align-items: center;
        padding: var(--size-2-2) var(--size-2-3);
        color: var(--text-muted);
    }
</style>
