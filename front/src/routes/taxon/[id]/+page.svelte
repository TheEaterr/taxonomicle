<script lang="ts">    
    export let data;
    
    const { taxon, description, children } = data;
  </script>
  
    <p>The record is {taxon.scientific}, {taxon.vernacular}</p>
    <p>{description}</p>
    <p>Rank: {taxon.rank}</p>
    <p>Parent: <a target="_self" href={"/taxon/" + taxon.parent}>{taxon.parent}</a></p>
    <img height={200} src={taxon.image_link} alt={taxon.scientific} />
    <ul>
      {#each children.items as child}
        <li>
          {child.scientific}, {child.vernacular}, {child.rank}, <a target="_self"
            href={"/taxon/" + child.id}>{child.id}</a
          >
        </li>
      {/each}
    </ul>
  
  <style>
  </style>
  