<script lang="ts">
    export let path: string;
</script>
<a
    data-href={ path }
    href={ path }
    class="internal-link"
>
    <slot />
</a>
