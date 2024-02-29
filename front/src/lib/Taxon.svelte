<script lang="ts">
  import { Link } from "svelte-routing";
  import pb, { type Taxon } from "../utils/pocketBase";
  import type { ListResult } from "pocketbase";
  
  export let id: string;
  
  let taxonId: string;
  let taxonPromise: Promise<Taxon>;
  let childrenPromise: Promise<ListResult<Taxon>>;
  let description: string;

  const wikiAPIEndpoint = "https://en.wikipedia.org/w/api.php";
  const params = "format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=";
  
  const getDescription = (title: string) => {
    fetch(wikiAPIEndpoint + "?" + params + title + "&origin=*")
        .then(async (response) => {
          const responseJson = await response.json();
          console.log(responseJson);
          description = responseJson.query.pages[Object.keys(
              responseJson.query.pages)[0]].extract;
        })
  }

  $: {
    taxonId = id;
    description = "";
    taxonPromise = pb.collection<Taxon>("taxon").getOne(taxonId).then((taxon) => {
      getDescription(taxon.site_link);
      return taxon;
    })
    childrenPromise = pb.collection<Taxon>("taxon").getList(1, 50, {
      filter: `parent = "${taxonId}"`,
    });
  }
</script>

{#await taxonPromise}
  <p>...waiting</p>
{:then taxon}
  <p>The record is {taxon.scientific}, {taxon.vernacular}</p>
  <p>{description}</p>
  <p>Rank: {taxon.rank}</p>
  <p>Parent: <Link target="_self" to={"taxon/" + taxon.parent}>{taxon.parent}</Link></p>
  <img height={200} src={taxon.image_link} alt={taxon.image} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
{#await childrenPromise}
  <p>...waiting</p>
{:then children}
  <ul>
    {#each children.items as child}
      <li>
        {child.scientific}, {child.vernacular}, {child.rank}, <Link
          target="_self"
          to={"taxon/" + child.id}>{child.id}</Link
        >
      </li>
    {/each}
  </ul>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}

<style>
</style>
