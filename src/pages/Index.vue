<template lang="pug">
q-page.flex(
  :style=`{
    flexDirection: 'column',
    alignItems: 'center'
  }`
)
  .description-container(
    :style=`{
        padding: '0px 8px',
        textAlign: 'center',
        width: '480px',
        maxWidth: '100%'
      }`
  )
    .description
      h1.title.text-white(
        :style=`{
          fontSize: '48px',
          fontWeight: 'bold'
        }`
      )
        | Subber
      p.subtitle
        | A simple multi-channel YouTube subscription manager
      .pt-12
      p.subtitle.text-white.pt-12(
        :style=`{
        fontWeight: 'bold'
      }`
      ) How does it work?
      p.answer
        .pt-12 To use subber you will need to find the channel username or ID of your favourite YouTube channels
        .pt-12 Just go to your favourite YouTube channel in a browser, click on a video, and then click on the channel name next to the channel profile picture under the video. Then look for the value after either the /channel/, or /user/
        .pt-12 If the URL contains /c/, then that value won't work, this is why you need to click on a video and then the channel name under it
        .pt-12 Enter any number of channel IDs in separate inputs by using the + button. And then hit search to see the latest videos in order of release date from all of your channels.
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
