<script lang="ts">
    import type { StatusDto } from "../types/gaming";
    import LucideIcon from "./common/LucideIcon.svelte";

    export let status: StatusDto;
</script>

{ #if status.icon }
    <LucideIcon name={ status.icon } color={ status.color } />
{ /if }
