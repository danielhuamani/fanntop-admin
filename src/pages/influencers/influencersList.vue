<template>
    <div class="row">
      <div class="col-12">
        <h3 class="title_page">Influenciadores</h3>
        <search-global></search-global>
      </div>
    </div>
</template>
<script>
  import searchGlobal from '@/componentsGlobals/search'
  export default {
    name: 'influencers',
    components: {
      searchGlobal
    }
  }
</script>