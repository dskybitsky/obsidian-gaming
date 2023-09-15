<script lang="ts">

</script>

<div class="container"><slot /></div>

<style>
    .container {
        position: relative;
        display: flex;
        font-size: var(--font-adaptive-smaller);
        justify-content: flex-end;
        gap: 0.5rem;
    }
</style>