<template lang="pug">
q-page.flex.flex-center(:style=`{
    flexDirection: 'column'
  }`)
  .description-container(
    :style=`{
        padding: '0px 8px',
        textAlign: 'center',
        width: '480px',
        maxWidth: '100%'
      }`
  )
    .description
      h1.title.text-primary(
        :style=`{
          fontSize: '48px',
          fontWeight: 'bold'
        }`
      )
        | Subber
      p.subtitle
        | A simple multi-channel YouTube subscription manager
      .pt-12
      p.subtitle.text-primary.pt-12(
        :style=`{
        fontWeight: 'bold'
      }`
      ) How does it work?
      p.answer
        .pt-12 To use subber you will need to find the channel username or ID of your favourite YouTube channels
        .pt-12 Just go to your favourite YouTube channel in a browser, and look for the value after either the /c/, /channel/, or /user/. Any will work.
        .pt-12 Enter any number of channel IDs in separate inputs by using the + button. And then hit search to see the latest videos in order from all of your channels.
  get-latest-videos
</template>

<script>
import { defineComponent } from 'vue'
import getLatestVideos from 'components/getLatestVideos.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {
    getLatestVideos,
  },
})
</script>
