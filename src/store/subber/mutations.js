import { set, get } from 'lodash-es'

export function thing(state, args) {
  set(state, args.key, args.val)
}
export function thingpush(state, args) {
  const toPush = get(state, args.key)
  if (toPush && toPush.push && typeof toPush.push === 'function') {
    toPush.push(args.val)
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

export function addCollection(state, { collectionName = '', collection }) {
  thing(state, {
    key: 'collections.' + collectionName,
    val: collection,
  })
}

function findCollection(state, collectionName) {
  return state.collections.find(
    (collection) => collection.name === collectionName
  )
}
