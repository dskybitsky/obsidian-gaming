<script lang="ts">
    export let thumb: string | undefined;    
</script>

<div class="container">
    <img src={ thumb } alt="Thumbnail" />
</div>

<style>
    div.container {
        max-width: 120px;
    }

    div.container img {
        border-radius: 6px;
    }
</style>
