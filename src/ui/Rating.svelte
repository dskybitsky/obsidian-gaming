<script lang="ts">
    import LucideIcon from "./common/LucideIcon.svelte";

    export let rating: number;
</script>

<span class="container">
    { #each [1, 2, 3, 4, 5] as index }
        { #if rating >= index }
            <LucideIcon name="Star" fill="gold" color="gold" size=16 />
        { :else if rating > (index - 1) }
            <LucideIcon name="Star" color="gold" size=16 />
        { :else }
            <LucideIcon name="Star" size=16 />
        { /if }
    { /each }
</span>

<style>
    span.container {
        display: flex;
        align-items: center;
    }
</style>
