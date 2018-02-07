<template lang="html">
  <select class="custom-select" v-model="select">
    <option value="">Seleccione Grupo</option>
    <option :value="option.id" v-for='option in options'>{{option.option}}</option>
  </select>
</template>

<script>
export default {
  name: 'productoInfoSelect',
  props: ['id_attr'],
  data () {
    return {
      select: '',
      options: []
    }
  },
  created () {
    this.getAttributeOption()
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
    }
  }
}
</script>

<style lang="css">
</style>
