<template lang="html">
  <input type="text" :name='nameValidate' data-vv-name='nameValidate' @input='updateAttrValue($event.target.value)'
  v-validate="'required'" :key="nameValidate" :field="nameValidate" :class="{'form-control--error': errors.has(nameValidate) }"  v-model="input" class="form-control">
</template>

<script>
export default {
  props: ['nameValidate', 'id_attr'],
  data () {
    return {
      input: ''
    }
  },
  methods: {
    get_form_name () {
      return this.nameValidate
    },
    updateAttrValue (value) {
      this.$store.dispatch('updateProductClassAttrValue', {
        attribute: this.id_attr,
        type: 'value_input',
        value: value
      })
    }
  }
}
</script>

<style lang="css">
</style>
