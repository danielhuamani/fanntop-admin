<template>
    <div class="search_component material d-flex  ">
        <a href="" v-if='isFilter' @click.prevent='displayFilter' class="btn btn-dark search_component__btn-filter">
          Filtros
        </a>
        <div class="input-group search_component__group" :class='{"search_component__group--active": nameUrl}'>
          <span class="input-group-addon search_component__icon" id="basic-addon1">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
          <input type="search" placeholder="Buscar" class="search_component__input form-control"  v-model='query_search' @keyup='search($event.target.value)'>

        </div>
        <router-link v-if='nameUrl' :to="{ name: nameUrl}" class="btn btn-primary btn-create search_component__create">
        <i class="far fa-plus"></i>
       Crear</router-link>

    </div>
</template>
<style lang="scss">
  @import "~styles/abstract/variables";
  .search_component{
    padding: 15px;
    background: $color-white;
    position:relative;
    &__btn-filter{
      border-top-right-radius:0;
      border-bottom-right-radius:0;
      line-height: 23px;
      padding-left: 20px;
      padding-right: 20px;
    }
    &__input{
      padding-left: 40px;
      border-radius: 0;
    }
    &__icon{
      position: absolute;
      left:10px;
      top:8px;
      display:block;
      z-index: 10;
      height: 100%;
    }

    &__create{
      width: 120px;
    }
  }
</style>

<script>
  export default {
    name: 'searchGlobal',
    props: ['nameUrl', 'isFilter'],
    data () {
      return {
        query_search: ''
      }
    },
    methods: {
      search (value) {
        if (value.length > 2) {
          this.$emit('search', value)
        } else {
          if (value.length === 0) {
            this.$emit('search', '')
          }
        }
      },
      displayFilter () {
        this.$emit('displayFilter')
      }
    }
  }
</script>