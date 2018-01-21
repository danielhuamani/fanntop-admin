<template>
    <div>
        <label for="">Cateogria</label>
        <div class="select_category" v-for="(categ, index) in data_category">
            <select v-on:change="getCategory($event, index)" class="custom-select"  :id="'id_category_' + index">
                <option value="" :selected="index > nivelCategory || !category_value " >Seleccione Categoria</option>
                <option v-for="cat in categ" :selected="setSelectedInitial(cat.id)" :value="cat.id">{{cat.name}}</option>
            </select>
        </div>
    </div>
</template>
<style lang="scss">
  .select_category{
    margin-bottom: 10px;
  }
</style>
<script>
  export default {
    name: 'categorySelectUpdate',
    props: ['data_category', 'category_value', 'levels_category'],
    data () {
      return {
        category: null,
        category_prev: null,
        categoryAll: [],
        nivelCategory: null
      }
    },
    mounted () {
      this.category = parseInt(this.category_value)
    },
    methods: {
      lenLevels () {
        return this.levels_category.length > 0
      },
      setSelectedInitial (categoryId) {
        console.log(categoryId, 'category_id', this.levels_category, this.levels_category.indexOf(categoryId), 'selected')
        if (this.levels_category.indexOf(categoryId) === -1) {
          return null
        } else {
          return true
        }
      },
      getCategory (event, nivelCategory) {
        console.log(nivelCategory, event.target.value)
        var value = event.target.value
        this.categoryAll.push(value)
        this.nivelCategory = nivelCategory
        if (value) {
          this.category = value
        } else {
          var idSelected = parseInt(nivelCategory) - 1
          if (idSelected > 1) {
            this.category = document.getElementById('id_category_' + idSelected).value
          } else {
            this.category = null
          }
        }
        this.$emit('load_category', value, nivelCategory, this.category)
      }
    }
  }
</script>