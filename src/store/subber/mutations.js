export function thing(state, args) {
  state[args.key] = args.val
}

export function deletePlaylistId(state, idx) {
  state.playlistIds.splice(idx, 1)
}

export function addPlaylistId(state, idx) {
  state.playlistIds.push('')
}

export function addPlaylistIds(state, idxs) {
  idxs.forEach((idx) => {
    if (!state.playlistIds.includes(idx)) {
      state.playlistIds.push(idx)
    }
  })
}

export function clearPlaylistIds(state) {
  state.playlistIds = []
}
