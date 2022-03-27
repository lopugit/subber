<template lang="pug">
q-layout#embed-wrapper.no-bg
  q-page-container.no-bg
    router-view.no-bg
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmbedLayout',
  mounted() {
    function sendHeight() {
      if (parent.postMessage) {
        // replace #wrapper with element that contains
        // actual page content
        const height = document.getElementById('embed-wrapper').offsetHeight
        parent.postMessage('subberHeight' + height, '*')
      }
    }
    sendHeight()

    setInterval(() => {
      sendHeight()
    }, 500)
  },
})
</script>
<style lang="sass">
html,
body,
.no-bg
  background: transparent
</style>
