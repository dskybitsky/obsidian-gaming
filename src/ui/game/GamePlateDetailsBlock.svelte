<script lang="ts">
    export let label: string;
    export let breakAfterLabel = false

    const spanClass = breakAfterLabel ? 'break' : ''
</script>

<div class="container">
    <span class={ spanClass }>{ label }:</span>
    <slot />
</div>

<style>
    div.container {
        margin-block-end: 1rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.3rem;
    }

    div.container > span:first-child {
        font-weight: bold;
        margin-inline-end: 0.5rem;
    }

    .break {
        width: 100%;
    }
</style>

