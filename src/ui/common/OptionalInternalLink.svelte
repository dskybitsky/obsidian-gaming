<script lang="ts">
    import InternalLink from "./InternalLink.svelte";

    export let path: string | undefined;
</script>

{ #if path !== undefined }
    <InternalLink path={ path }>
        <slot />
    </InternalLink>
{ :else }
    <slot />
{ /if }
