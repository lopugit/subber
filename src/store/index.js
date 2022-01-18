import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { get } from 'lodash-es'
import subber from './subber'
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const currentStoreVersion = window.localStorage.getItem('storeVersion')
const storeVersion = 28
const fullReset = true
if (!currentStoreVersion || currentStoreVersion < storeVersion) {
  if (fullReset) {
    window.localStorage.setItem('vuex', undefined)
  } else {
    const store = JSON.parse(window.localStorage.getItem('vuex')) || {}
    window.localStorage.setItem(
      'vuex',
      JSON.stringify({
        subber: {
          user: get(store, 'subber.user', {}),
        },
      })
    )
  }
  window.localStorage.setItem('storeVersion', storeVersion)
}

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      subber,
    },

    plugins: [
      createPersistedState({
        paths: ['subber'],
      }),
    ],
  })
  window.store = Store
  window.$store = Store
  return Store
})
