<template>
    <div>
        <label for="">Cateogria</label>
        <div class=" " v-for="(categ, index) in data_category">
            <select v-on:change="getCategory($event, index)" class="custom-select"  :id="'id_category_' + index">
                <option value=""  >Seleccione Categoria</option>
                <option v-for="cat in categ" :value="cat.id">{{cat.name}}</option>
            </select>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'categorySelect',
    props: ['data_category', 'category_value', 'levels_category'],
    data () {
      return {
        category: this.category_value,
        category_prev: null,
        categoryAll: [],
        nivelCategory: null
      }
    },
    mounted () {
    },
    methods: {
      lenLevels () {
        return this.levels_category.length > 0
      },
      setSelectedInitial (categoryId) {
        if (this.levels_category.indexOf(categoryId) === -1) {
          return null
        } else {
          return true
        }
      },
      getCategory (event, nivelCategory) {
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