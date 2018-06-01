<template>
  <div class="cnt_alert">
    <div :class="['alert-' + data_alert.status, 'alert alert_container fade show']" role="alert" v-if="existAlert">
      <button type="button" class="close" @click="closeAlert">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="alert_container__message">
        <div class="alert_container__item" v-for="(item, index) in data_alert.message">
          <strong>{{index}} </strong>
          <ul>
            <li v-for="message in item">{{message}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="['alert-' + data_status_bus, 'alert alert_container fade show']" role="alert" v-if="existAlertBus">
      <button type="button" class="close" @click="closeAlertBus">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="alert_container__message">
        <div class="alert_container__item" v-for="(item, index) in data_message_bus">
          <strong>{{index}} </strong>
          <ul>
            <li v-for="message in item">{{message}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
    .alert_container{
        position: fixed;
        top: 56px;
        width: calc(100% - 200px);
        z-index: 200;
        margin-left:200px;
        left: 0;
        &__item{
          strong{
            font-size: 14px;
          }
          ul{
            margin: 0;
            li{
              font-size: 14px;
            }
          }
        }
    }
</style>
<script>
  import { EventBus } from '@/bus'
  export default {
    name: 'alert',
    props: ['data_alert'],
    data () {
      return {
        exist_alert: true,
        data_message_bus: [],
        data_status_bus: ''
      }
    },
    mounted () {
      const self = this
      EventBus.$on('alert_bus', (status, data) => {
        console.log('alert_bus')
        self.data_status_bus = status
        self.data_message_bus = data
      })
    },
    methods: {
      closeAlert () {
        this.$emit('clearAlert')
      },
      closeAlertBus () {
        console.log('close bus')
        this.data_message_bus = []
        this.data_status_bus = ''
      }
    },
    computed: {
      cls_status () {
        this.alert = false
        return (alert + this.data_alert.status)
      },

      existAlert () {
        var alert = false
        var self = this
        if (Object.values(this.data_alert.message).length > 0) {
          setTimeout(function () {
            self.closeAlert()
          }, 4000)
          alert = true
        }
        return alert
      },
      existAlertBus () {
        var alert = false
        var self = this
        if (Object.values(this.data_message_bus).length > 0) {
          setTimeout(function () {
            self.closeAlertBus()
          }, 4000)
          alert = true
        }
        return alert
      }
    }
  }
</script>
