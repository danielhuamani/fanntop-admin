<template>
  <transition name="modal">
          <div class="modal-mask" @click="close" v-show="show">
              <div class="modal-container" @click.stop>
                  <div class="modal-header">
                      <h4>{{attributeOption.option}}</h4>
                  </div>
                  <div class="modal-body d-flex">
                    <div class="col-6 content__field">
                      <label for="">Color</label>
                      <input type="color" class="form-control" v-model="attributeOption.attr">
                    </div>
                    <div class="col-6 content__field">
                      <label for="">Valor Atributo</label>
                      <input class="form-control" v-model="attributeOption.option">
                    </div>
                  </div>
                  <div class="modal-footer text-right">
                      <button class="btn btn-info" @click="savePost()">
                          Guardar
                      </button>
                  </div>
              </div>
          </div>
      </transition>
</template>
<style >
  * {
    box-sizing: border-box;
  }


</style>
<script>
  import { EventBus } from '@/bus'
  export default {
    name: 'attributeOptionModal',
    props: ['idModalAttributeOption', 'urlAttributeOption', 'show'],
    data () {
      return {
        attributeOption: {
          id: '',
          attr: '',
          option: ''
        }
      }
    },
    mounted () {
      this.getAttributeOption()
    },
    methods: {
      getAttributeOption () {
        var self = this
        this.axios.get(self.urlAttributeOption + self.idModalAttributeOption + '/', {
        }).then(response => {
          self.attributeOption = response.data
        })
      },
      close () {
        this.$emit('close')
      },
      savePost () {
        var self = this
        this.axios({
          method: 'put',
          url: self.urlAttributeOption + self.idModalAttributeOption + '/',
          data: self.attributeOption
        }).then(response => {
          EventBus.$emit('alert_bus', 'success', {'Se modifico correctamente': []})
          self.$emit('reloadAttributeOption')
          self.close()
        })
      }
    }
    // watch: {
    //   modal_data: function () {
    //     this.id = this.modal_data.id
    //     this.name = this.modal_data.name
    //     this.position = this.modal_data.position
    //   }
    // }
  }
</script>
