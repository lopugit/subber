export default function () {
  const state = {
    collections: [
      {
        name: '',
        channels: [],
      },
    ],
    embedded: false,
  }
  window.state = state
  return state
}
