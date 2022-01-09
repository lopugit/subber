import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
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
const storeVersion = 8
if (!currentStoreVersion || currentStoreVersion < storeVersion) {
  const store = JSON.parse(window.localStorage.getItem('vuex'))
  window.localStorage.setItem(
    'vuex',
    JSON.stringify({
      subber: {
        playlistIds: store.subber.playlistIds,
      },
    })
  )
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
  return Store
})
