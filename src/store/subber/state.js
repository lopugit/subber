import simonWhistlerEmpire from './presets/simonWhistlerEmpire'
import xqcClipsEmpire from './presets/xqcClipsEmpire'
export default function () {
  const state = {
    user: {
      home: {
        channels: [],
      },
    },
    embedded: true,
    aggregates: [
      ['Simon Whistler Empire', simonWhistlerEmpire],
      ['xQc Clips Empire', xqcClipsEmpire],
    ],
  }
  window.state = state
  return state
}
