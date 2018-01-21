<template>
  <div class="col-4 ">
    <div class="row material content content--read-edit">
      <div class="col-12 content__field content__field--one">
          <label for="">Nombre Grupo Atributo:</label>
          <span  class="help text_data">{{family.name}}</span>
          <i class="fa fa-edit content--read-edit__save content--read-edit__icon"
          @click='changeStatusFamily'></i>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'familyNameRead',
    data () {
      return {
        family: {
          id: '',
          name: ''
        }
      }
    },
    created () {
      this.getFamily()
    },
    methods: {
      changeStatusFamily () {
        this.$emit('changeStatusFamily', 'familyNameUpdate')
      },
      getFamily () {
        const id = this.$route.params.id
        const self = this
        this.axios.get('/family/family/' + id + '/', {

        }).then(response => {
          self.family = response.data
        })
      }
    }
  }
</script>