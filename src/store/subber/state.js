export default function () {
  const state = {
    collections: [
      {
        name: '',
        channels: [],
      },
    ],
    embedded: true,
  }
  window.state = state
  return state
}
