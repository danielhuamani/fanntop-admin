<template>
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
</template>
<style lang="scss">
    .alert_container{
        position: fixed;
        top: 56px;
        width: calc(100% - 250px);
        z-index: 200;
        margin-left: 250px;
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
  export default {
    name: 'alert',
    props: ['data_alert'],
    data () {
      return {
        exist_alert: false
      }
    },
    methods: {
      closeAlert () {
        this.exist_alert = true
      }
    },
    computed: {
      cls_status () {
        this.alert = false
        return (alert + this.data_alert.status)
      },
      existAlert () {
        console.log(Object.values(this.data_alert), 'Object.keys(this.data_alert)')
        return (this.data_alert.status && !this.exist_alert)
      }
    }
  }
</script>
