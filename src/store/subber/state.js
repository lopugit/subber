export default function () {
  const state = {
    collections: [
      {
        name: '',
        channels: [],
      },
    ],
    embedded: false,
    pageTitle: 'Subber',
  }
  window.state = state
  return state
}
