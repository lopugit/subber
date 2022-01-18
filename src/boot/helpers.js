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
}

export default boot(({ app }) => {
  app.config.globalProperties.apiName = helpers.apiName

  app.config.globalProperties.renderableName = helpers.renderableName
})

export { helpers }
