<script lang="ts">
  import Taxon from './lib/Taxon.svelte'
  import {Route, Router, Link} from "svelte-routing";
</script>

<main>
  <Router>
    <main>
      <Route path="/taxon/:id" let:params>
        <Taxon id={params.id} />
      </Route>
      <Route path="/">
        <h1>Home</h1>
        <Link to="/taxon/Q729___________">Go to animalia</Link>
      </Route>
    </main>
  </Router>
</main>

<style>
</style>
