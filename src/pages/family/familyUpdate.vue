<template>
  <div class="row">
    <div class="col-12 page">
      <h3 class="title_page">Nuevo Grupo Atributo</h3>
      <div class="page__header material d-flex  justify-content-end">
        <router-link :to="{ name: 'family'}" class="btn btn-secondary btn-cancel">
          <i class="fa fa-undo-alt"></i>
          Cancelar
        </router-link>
      </div>
      <div class="d-flex  ">
        <component v-bind:is="statusFamily" v-on:changeStatusFamily='changeStatusFamily'>
        </component>
        <family-group-read>
        </family-group-read>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "~styles/abstract/variables";
  .attributes{
    &__item{
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid $color-panel;
      padding: 5px 0px;
      align-items: center;
      &__name{
        margin: 0;
        font-size: 14px;
      }
      &__add{
        font-size: 14px;
        cursor: pointer;
        color: $color-success;
      }
    }
  }
  .attributes_info{
    &__header{
      border-bottom: 1px solid $color-gray-cl;
      padding-bottom: 4px;
      margin-bottom: 0px;
      p{
        margin-bottom: 0px;
      }
    }
    &__sub_header{
      margin-top: 15px;
      margin-bottom: 15px;
      border-bottom: 1px solid $color-gray-cl;
      &__row{
        margin-bottom: 4px;
      }
    }
    &__attr{
      &__item{
        margin: 10px 0;
        border-bottom: 2px solid $color-panel;


      }
      &__value{
        margin: 0;
      }
    }
  }
  i[class*="icon"]{
    font-size: 18px
  }
  .icon_edit{
    color: $color-info;
  }
  .icon_delete{
    color: $color-danger;
  }
  .icon_add{
    color: $color-success;
  }
  .status{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: $color-gray-cl;
    &--active{
      background: $color-success;

    }
  }
</style>
<script>
  import VueCkeditor from 'vueckeditor'
  import familyNameUpdate from '@/components/family/familyNameUpdate'
  import familyNameRead from '@/components/family/familyNameRead'
  import familyGroupRead from '@/components/family/familyGroupRead'
  export default {
    name: 'familyUpdate',
    components: {
      VueCkeditor,
      familyNameUpdate,
      familyNameRead,
      familyGroupRead
    },
    data () {
      return {
        family: {
          id: null,
          name: ''

        },
        attributes: [],
        is_component: '',
        statusFamily: 'familyNameRead',
        statusFamilyGroup: 'familyGroupRead'
      }
    },
    created () {
    },
    mounted () {

    },
    methods: {
      getAttribute () {
        var self = this
        this.axios.get('/family/family_attribute/', {
          params: self.params
        }).then(response => {
          self.attributes = response.data
        })
      },
      changeStatusFamily (status) {
        this.statusFamily = status
      }
    },
    computed: {

    }
  }
</script>
