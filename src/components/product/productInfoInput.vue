<template lang="html">
  <input type="text" :name='nameValidate' data-vv-name='nameValidate' v-on:keyup="updateAttrValue($event.target.value)"
  v-validate="'required'" :key="nameValidate" v-model='input' :field="nameValidate"
  :class="{'form-control--error': errors.has(nameValidate) }"  class="form-control">
</template>

<script>
export default {
  props: ['nameValidate', 'id_attr', 'valueAttr', 'valueId'],
  data () {
    return {
      input: this.valueAttr
    }
  },
  mounted () {
    this.input = this.valueAttr
  },
  methods: {
    get_form_name () {
      return this.nameValidate
    },
    getValue () {
      return this.valueAttr
    },
    updateAttrValue (value) {
      const self = this
      this.$store.dispatch('updateProductClassAttrValue', {
        attribute: this.id_attr,
        type: 'value_input',
        value: self.input,
        id: self.valueId
      })
    }
  }
}
</script>

<style lang="css">
</style>
