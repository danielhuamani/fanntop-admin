<template lang="html">
  <div class="col-12 material content">
    <h5 class="material__title">Variantes</h5>
    <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-4">
              Atributo
            </div>
            <div class="col-8">
              Valores
            </div>
          </div>
        </div>
        <div class="col-12" v-for="attr in attributes">
          <div class="row">
            <div class="col-4">
              {{attr.name}}
            </div>
            <div class="col-8">
              <div class="row">
                <div class="col-3" v-for="option in attr.attribute_options">
                  <label class="custom-control custom-checkbox">
                    <input type="checkbox" :value="option.id" class="custom-control-input" >
                    <span class="custom-control-indicator"></span>
                    {{option.option}}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'productVariant',
  props: ['is_variation', 'attribute_ids'],
  data () {
    return {
      'attributes': []
    }
  },
  mounted () {
    this.getAttributesOption(this.attribute_ids)
  },
  methods: {
    getAttributesOption (attributeIds) {
      const self = this
      this.axios.get('/product/product-attributes/', {
        params: {
          fields: 'id,name,attribute_options',
          attribute_ids: attributeIds
        }
      }).then(response => {
        self.attributes = response.data
      })
    }
  }
}
</script>

<style lang="css">
</style>
