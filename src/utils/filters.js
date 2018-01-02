import Vue from 'vue'

export default function setupFilters () {
  Vue.filter('slugify', function (value) {
    if (!value) {
      return ''
    }
    value = value.replace(/^\s+|\s+$/g, '')
    value = value.toLowerCase()
    var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
    var to = 'aaaaaeeeeeiiiiooooouuuunc------'
    for (var i = 0, l = from.length; i < l; i++) {
      value = value.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }
    value = value.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-') // collapse dashes
    return value
  })
}
