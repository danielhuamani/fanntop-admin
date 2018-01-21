<template>
    <div class="row attributes_info__sub_header align-items-center">
        <div class="col-10" v-if='!is_edit'>
            <h6 class="">{{attrName}}</h6>
        </div>
        <div class="col-10 attributes_info__sub_header__row" v-else>
            <form action="" data-vv-scope="form-1">

              <div class="input-group">
                <input name="name" type="text" v-model='familyGroup.name' v-validate="'required|alpha_spaces'" class="form-control"  :class="{'input': true, 'form-control--error': errors.has('form-1.name') }"   >
                <input name="position" type="number" v-model='familyGroup.position' v-validate="'required|numeric'" class="form-control"  :class="{'input': true, 'form-control--error': errors.has('form-1.position') }"   >

              </div>
            </form>
        </div>
        <div class="col-1" v-if='!is_edit'>
            <i class="fa fa-edit icon_edit " @click="edit"></i>
        </div>
        <div class="col-1" v-if='!is_edit'>
            <i class="fa fa-times icon_delete"></i>
        </div>
        <div class="col-1" v-if='is_edit'>
            <i class="fa fa-save icon_save" @click="save"></i>
        </div>
    </div>
</template>

<script>
  import { EventBus } from '@/bus'
  export default {
    name: 'familyGroupHeaderRead',
    props: ['attrName', 'attrId', 'attrPosition'],
    data () {
      return {
        is_edit: false,
        familyGroup: {
          id: '',
          name: '',
          position: ''
        }
      }
    },
    mounted () {
      console.log('fami')
      this.$set(this.familyGroup, 'name', this.attrName)
      this.$set(this.familyGroup, 'id', this.attrId)
      this.$set(this.familyGroup, 'position', this.attrPosition)
    },
    methods: {
      edit () {
        this.is_edit = true
      },
      save () {
        const self = this
        this.$validator.validateAll('form-1').then((result) => {
          if (result) {
            this.axios({
              method: 'put',
              url: '/family/family-group/' + self.familyGroup.id + '/',
              data: self.familyGroup
            }).then(response => {
              EventBus.$emit('alert_bus', 'success', {'Se modifico correctamente': []})
              self.is_edit = false
              self.$emit('editGroupFamily')
            }).catch(error => {
              let status = ''
              if (error.response.status >= 400 && error.response.status < 500) {
                status = 'danger'
              }
              EventBus.$emit('alert_bus', status, error.response.data)
            })
            return
          }
          EventBus.$emit('alert_bus', 'danger', {'Verifique los campos resaltados': []})
        })
      }
    }
  }
</script>