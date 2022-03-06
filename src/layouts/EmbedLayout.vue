<template lang="pug">
q-layout.no-bg
  q-page-container.no-bg
    router-view.no-bg
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmbedLayout',
})
</script>
<style lang="sass">
html,
body,
.no-bg
  background: transparent
</style>
