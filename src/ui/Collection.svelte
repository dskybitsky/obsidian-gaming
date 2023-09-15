<script lang="ts">
    import type { CollectionOptions } from "../types/ui";
    import type { GameDto, GamesGroupDto, PlatformDto } from "../types/gaming";
    import Gaming from "../service/Gaming";
    import { setActiveTabTitle } from "../service/ObsidianUtils";
    import CollectionPage from "./collection/CollectionPage.svelte";

    export let initialized: boolean = false;
    export let sourcePath: string;
    export let gaming: Gaming;
    export let options: CollectionOptions = {};

    let search = '';

    $: searchRegExp = new RegExp(search, 'i')

    $: filter = search ? (game: GameDto) => !!game.title.match(searchRegExp): undefined

    const localStorageGroupedParam = `${sourcePath}:grouped`;

    let grouped = !!JSON.parse(localStorage.getItem(localStorageGroupedParam) ?? 'false');

    $: localStorage.setItem(localStorageGroupedParam, JSON.stringify(grouped));

    const sort = (game: GameDto) => ([game.status?.order, game.title])

    $: collection = initialized
        ? gaming.getCollection(sourcePath)
        : undefined

    $: games = initialized && !grouped
        ? gaming.getGames(sourcePath, filter, sort) as GameDto[]
        : undefined;

    $: gamesGroups = initialized && grouped
        ? gaming.getGames(
            sourcePath,
            filter,
            sort,
            (game: GameDto) => game.platforms[0],
            (group: { id: PlatformDto }) => group.id.order,
        ) as GamesGroupDto[]
        : undefined;

    $: if (collection) {
        setActiveTabTitle(document, collection.title);
    }

</script>

{ #if initialized && collection }
    <CollectionPage
        collection={ collection }
        games={ games }
        gamesGroups={ gamesGroups }
        bind:search={ search }
        bind:grouped={ grouped }
        options={ options }
    />
{ :else }
    <span>Loading...</span>
{ /if }
