<script lang="ts">
    export let value: string;
    export let label: string;
</script>

<input type="text" placeholder={ label } bind:value={ value }/>
