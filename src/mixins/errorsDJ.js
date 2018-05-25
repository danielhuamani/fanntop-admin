const errorsDJ = {
  data () {
    return {
      errorsDj: []
    }
  },
  methods: {
    hasError (field) {
      return Boolean(this.errorsDj[field])
    },
    hasErrorNested (field, nested, index) {
      return Boolean(nested[index][field])
    },
    getError (field) {
      return this.errorsDj[field]
    },
    getErrorNested (nested, index, field) {
      return nested[index][field]
    }
  }
}
export default errorsDJ
