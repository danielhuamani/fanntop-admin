<template lang="html">
  <select class="custom-select" @change="updateAttrValue($event.target.value)" :name='nameValidate' :class="{'form-control--error': errors.has(get_form_name()) }" v-validate="'required'" >
    <option value="">Seleccione Grupo</option>
    <option :value="option.id" v-for='option in options' :selected='option.id === getValue()'>{{option.option}}</option>
  </select>
</template>

<script>
export default {
  name: 'productoInfoSelect',
  props: ['id_attr', 'nameValidate', 'valueAttr', 'valueId'],
  data () {
    return {
      select: '',
      options: []
    }
  },
  created () {
    this.getAttributeOption()
  },
  mounted () {
    this.select = this.valueAttr
  },
  methods: {
    getAttributeOption () {
      const self = this
      this.axios.get('/attribute/attribute_option_list/', {
        params: {
          fields: 'id,option',
          attribute_id: self.id_attr
        }
      }).then(response => {
        self.options = response.data
      })
    },
    get_form_name () {
      return 'form-1.' + this.nameValidate
    },
    updateAttrValue (value) {
      this.$store.dispatch('updateProductClassAttrValue', {
        attribute: this.id_attr,
        type: 'value_option',
        value: value,
        id: this.valueId
      })
    },
    getValue () {
      return this.valueAttr
    }
  },
  computed: {
    setProductAttrValue () {
      console.log(this.select)
    }
  }
}
</script>

<style lang="css">
</style>
