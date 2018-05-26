const format = {
  methods: {
    formatDate (date) {
      var year = date.getFullYear().toString()
      var month = (date.getMonth() + 101).toString().substring(1)
      var day = (date.getDate() + 100).toString().substring(1)
      return day + '/' + month + '/' + year
    },
    existFilter () {
      const self = this
      var exist = false
      var excludeField = ['fields', 'search', 'field', 'orderBy']
      for (let val in self.filter) {
        if (self.filter[val].length > 0 && excludeField.indexOf(val) === -1) {
          exist = true
        }
      }
      return exist
    },
    search (value) {
      console.log(value)
      this.filter.search = value
      this.setFilter()
    },
    orderBy (order) {
      this.filter.field = order.field
      this.filter.orderBy = order.orderBy
      this.setFilter()
    },
    cleanFilter (field) {
      this.$set(this.filter, field, '')
      this.getDataList()
    },
    setFilter () {
      this.getDataList()
    }
  }
}
export default format
