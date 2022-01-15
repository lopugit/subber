import axios from 'axios'
import { get } from 'lodash-es'
const api = axios.create({ baseURL: process.env.VIDEO_API })

export async function populateCollection(store, collectionName) {
  console.log(collectionName.replace(/-/gi, ' ').toLowerCase())

  const response = await api
    .get('/v1/get-collection', {
      params: {
        name: collectionName.replace(/-/gi, ' ').toLowerCase(),
      },
    })
    .catch((err) => console.error(err.response))

  console.log(store)

  if (get(response, 'data.collection')) {
    console.log(response.data)
    const newCollection = response.data.collection
    const collections = store.state.collections
    const collection = collections.find(
      (collection) => collection.name === newCollection.name
    )
    if (!collection) {
      store.commit('thingpush', {
        key: 'collections',
        val: newCollection,
      })
    }
  }
}

export function getCollection(store, collectionName) {
  return store.state.collections.find((collection) => {
    return collection.name === collectionName
  })
}
