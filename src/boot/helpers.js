import { boot } from 'quasar/wrappers'

const helpers = {
  apiName(name = '') {
    if (typeof name === 'string') {
      return name.replace(/ /gi, '-').toLowerCase()
    } else {
      return ''
    }
  },
  renderableName(name = '') {
    if (typeof name === 'string') {
      return name.replace(/-/gi, ' ').toLowerCase()
    } else {
      return ''
    }
  },
  titleise(name = '') {
    return this.renderableName(name).replace(/(^\w|\s\w)/g, (m) =>
      m.toUpperCase()
    )
  },
}

export default boot(({ app }) => {
  Object.assign(app.config.globalProperties, helpers)
})

export { helpers }
