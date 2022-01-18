import axios from 'axios'
import { get } from 'lodash-es'
import { helpers } from '../../boot/helpers.js'
const { apiName } = helpers
const api = axios.create({ baseURL: process.env.VIDEO_API })

export async function fetchCollection(store, collectionName) {
  const response = await api
    .get('/v1/get-collection', {
      params: {
        name: apiName(collectionName),
      },
    })
    .catch((err) => console.error(err.response))

  console.log(
    "get(response, 'data.collection')",
    get(response, 'data.collection')
  )
  if (get(response, 'data.collection')) {
    const newCollection = response.data.collection
    store.commit('addCollection', newCollection)
  }
}

export function getCollection(store, collectionName) {
  return store.state.collections.find((collection) => {
    return apiName(collection.name) === apiName(collectionName)
  })
}
