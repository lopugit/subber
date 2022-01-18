import { set, get } from 'lodash-es'
import { helpers } from '../../boot/helpers.js'
const { apiName } = helpers
export function thing(state, args) {
  set(state, args.key, args.val)
}
export function thingpush(state, args) {
  const toPush = get(state, args.key)
  if (toPush && toPush.push && typeof toPush.push === 'function') {
    toPush.push(args.val)
  }
}

export function addCollection(state, newCollection) {
  const collectionIndex = state.collections.findIndex(
    (collection) => apiName(collection.name) === apiName(newCollection.name)
  )

  console.log('newCollection', newCollection)
  console.log('collectionIndex', collectionIndex)

  if (collectionIndex !== -1) {
    state.collections.splice(collectionIndex, 1, newCollection)
  } else {
    state.collections.push(newCollection)
  }
}

export function addChannel(state, { channel, collectionName = '' }) {
  const stateCollection = findCollection(state, collectionName)
  const stateCollectionChannels = get(stateCollection, 'channels', [])
  if (
    !stateCollectionChannels.find(
      (search) => search.id.channelId === channel.id.channelId
    )
  ) {
    stateCollectionChannels.push(channel)
  }
}

export function addChannels(state, { channels, collectionName = '' }) {
  const stateCollection = findCollection(state, collectionName)
  const stateCollectionChannels = get(stateCollection, 'channels', [])
  channels.forEach((channel) => {
    if (
      !stateCollectionChannels.find(
        (search) => search.id.channelId === channel.id.channelId
      )
    ) {
      stateCollectionChannels.push(channel)
    }
  })
}

export function removeChannel(state, { channel, collectionName = '' }) {
  const stateCollection = findCollection(state, collectionName)
  const stateCollectionChannels = get(stateCollection, 'channels', [])
  const idx = stateCollectionChannels.findIndex((found) => {
    return found.id.channelId !== channel.id.channelId
  })
  deleteChannel(state, { collectionName, idx })
}

export function deleteChannel(state, { collectionName = '', idx }) {
  const stateCollection = findCollection(state, collectionName)
  const stateCollectionChannels = get(stateCollection, 'channels', [])
  stateCollectionChannels.splice(idx, 1)
}

export function clearChannels(state) {
  state.channels = []
}

function findCollection(state, collectionName) {
  return state.collections.find(
    (collection) => apiName(collection.name) === apiName(collectionName)
  )
}
