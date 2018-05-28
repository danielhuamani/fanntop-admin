<template>
  <transition name="modal">
      <div class="modal-mask" @click="close" v-show="modal.show">
          <div class="modal-container modal-container--small" @click.stop>

              <div class="modal-body d-flex justify-content-center">
                <p>¿Desea eliminar {{modal.message}} ?</p>
              </div>
              <div class="modal-footer d-flex justify-content-center">
                  <a href="" @click.prevent="close" class='btn btn-dark'>No</a>
                  <a href="" @click.prevent='deleteId' class='btn btn-danger'>Si</a>
              </div>
          </div>
      </div>
  </transition>
</template>
<script>
  import { EventBus } from '@/bus'
  export default {
    name: 'modal',
    props: ['modal'],
    mounted () {
      console.log('modalData')
    },
    data () {
      return {

      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      deleteId () {
        var self = this
        this.axios({
          method: 'delete',
          url: self.modal.url
        }).then(response => {
          EventBus.$emit('alert_bus', 'success', {'Se elimino correctamente': []})
          self.$router.push({name: self.modal.urlRedirect})
        })
      }
    }
  }
</script>
