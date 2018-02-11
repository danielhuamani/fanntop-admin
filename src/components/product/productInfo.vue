<template lang="html">
  <div class="col-12 material content specifications">
    <h5 class="material__title">Especificaciones</h5>
    <div class="row">
      <div class="col-12" v-for="family_group in getFamilyGroupAttr"  >
        <h5 class="specifications__title">{{family_group.name}}</h5>
        <div class="row specifications__attr align-items-center" v-if="!attr.is_variation" v-for="attr in family_group.familygroup_familygroupatribute">
          <div class="col-4">
            <h6 class="specifications__sub_title">{{attr.name_attr}}</h6>

          </div>
          <div class="col-8">
            <component :is="getTypeAttr(attr.type_name)" :nameValidate='attr.name_attr'  :id_attr='attr.atribute'>

            </component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productInfoInput from './productInfoInput'
import productInfoSelect from './productInfoSelect'
export default {
  name: 'productInfo',
  props: ['family_id'],
  components: {
    productInfoInput,
    productInfoSelect
  },
  data () {
    return {
      familyGroupAttr: []
    }
  },
  created () {
  },
  methods: {
    // getFamilyGroupAttr () {
    //   const self = this
    //   if (self.family_id) {
    //     this.axios.get('/family/family-group/', {
    //       params: {
    //         fields: 'id,name,familygroup_familygroupatribute',
    //         family: self.family_id
    //       }
    //     }).then(response => {
    //       self.familyGroupAttr = response.data
    //     })
    //   } else {
    //     self.familyGroupAttr = []
    //   }
    // },
    getTypeAttr (typeAttr) {
      var typeComponent = ''
      switch (typeAttr) {
        case 'INPUT':
          typeComponent = 'productInfoInput'
          break
        case 'SELECT_SINGLE':
          typeComponent = 'productInfoSelect'
          break
      }
      return typeComponent
    }
  },
  computed: {
    getFamilyGroupAttr () {
      return this.$store.getters.familyGroupAttr
    }
  }
}
</script>

<style lang="scss">
  @import "~styles/abstract/variables";
  .specifications{
    &__title{
      font-size: 18px;

    }
    &__attr{
      margin-left: 0px;
      margin: 8px 0;
    }
    &__sub_title{
      font-size: 15px;
      margin-bottom: 0;
      color: $color-table-link

    }
    &__title:last-child{
      margin-top: 15px;
    }
  }
</style>
