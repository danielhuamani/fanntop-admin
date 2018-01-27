<template>
  <transition name="modal">
          <div class="modal-mask" @click="close" v-show="show">
              <div class="modal-container" @click.stop>
                  <div class="modal-header">
                      <h4>{{familyGroup.name}}</h4>
                  </div>
                  <div class="modal-body d-flex">
                    <div class="col-6 content__field">
                      <label for="">Nombre</label>
                      <input class="form-control" v-model="familyGroup.name">
                    </div>
                    <div class="col-6 content__field">
                      <label for="">Posición</label>
                      <input class="form-control" v-model="familyGroup.position">
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
    name: 'familyGroupModal',
    props: ['modalFamilyGroupId', 'urlFamilyGroup', 'show'],
    data () {
      return {
        familyGroup: {
          name: '',
          position: ''
        }
      }
    },
    mounted () {
      this.getFamilyGroup(this.modalFamilyGroupId)
    },
    methods: {
      getFamilyGroup (id) {
        var self = this
        this.axios.get(self.urlFamilyGroup + id + '/', {
        }).then(response => {
          self.familyGroup = response.data
        })
      },
      close () {
        this.$emit('close')
      },
      savePost () {
        var self = this
        this.axios({
          method: 'put',
          url: self.urlFamilyGroup + self.familyGroup.id + '/',
          data: self.familyGroup
        }).then(response => {
          EventBus.$emit('alert_bus', 'success', {'Se modifico correctamente': []})
          self.$emit('reloadFamilyGroup')
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
