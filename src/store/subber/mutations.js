const _ = require('lodash')

export function thing(state, args) {
  _.set(state, args.key, args.val)
}

export function deleteChannel(state, idx) {
  state.channels.splice(idx, 1)
}

export function addChannel(state, channel) {
  if (
    !state.user.home.channels.find(
      (search) => search.id.channelId === channel.id.channelId
    )
  ) {
    state.user.home.channels.push(channel)
  }
}

export function addChannels(state, channels) {
  channels.forEach((channel) => {
    if (
      !state.user.home.channels.find(
        (search) => search.id.channelId === channel.id.channelId
      )
    ) {
      state.user.home.channels.push(channel)
    }
  })
}

export function removeChannel(state, channel) {
  state.user.home.channels = state.user.home.channels.filter((found) => {
    return found.id.channelId !== channel.id.channelId
  })
}

export function clearChannels(state) {
  state.channels = []
}
