<template>
    <div class="search_component material d-flex  justify-content-between">
        <div class="input-group search_component__group">
          <span class="input-group-addon" id="basic-addon1">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <input type="search" placeholder="Buscar" class="form-control">

        </div>
        <router-link v-if='nameUrl' :to="{ name: nameUrl}" class="btn btn-create search_component__create">
        <i class="fa fa-plus-circle"></i>
       Crear</router-link>

    </div>
</template>
<style lang="scss">
  @import "~styles/abstract/variables";
  .search_component{
    padding: 15px;
    background: $color-white;
    &__group{
      width: calc(100% - 180px);
    }
    &__create{
      width: 150px;
    }
  }
</style>

<script>
  export default {
    name: 'searchGlobal',
    props: ['nameUrl']
  }
</script>