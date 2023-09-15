<script lang="ts">
    import { setActiveTabTitle } from "../service/ObsidianUtils";
    import Gaming from "../service/Gaming";
    import GamePage from "./game/GamePage.svelte";

    export let initialized: boolean = false;
    export let sourcePath: string;
    export let gaming: Gaming;

    $: game = initialized
        ? gaming.getGame(sourcePath)
        : undefined;

    $: if (game) {
        setActiveTabTitle(document, game.title);
    }

</script>

{ #if initialized && game }
    <GamePage game={ game } />
{ :else }
    <span>Loading...</span>
{ /if }
