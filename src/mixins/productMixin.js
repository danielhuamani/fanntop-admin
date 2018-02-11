const productMixin = {
  data () {
    return {
      categories: [],
      influencers: [],
      families: [],
      attributes_variations: []
    }
  },
  methods: {
    getInfluencers () {
      var self = this
      this.axios.get('/influencer', {
        params: {
          fields: 'id,name'
        }
      }).then(response => {
        self.influencers = response.data
      })
    },
    getCategories () {
      var self = this
      this.axios.get('/category', {
        params: {
          fields: 'id,name'
        }
      }).then(response => {
        self.categories = response.data
      })
    },
    getFamilies () {
      var self = this
      this.axios.get('/family/family/', {
        params: {
          fields: 'id,name'
        }
      }).then(response => {
        self.families = response.data
      })
    }
  }
}

export default productMixin
