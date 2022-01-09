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
      .subtitle.text-white.pt-12.cursor-pointer(
        @click='howDoesItWork = !howDoesItWork'
      ) {{ howDoesItWork ? 'This is how! Click here to hide how-to guide' : 'How does it work? Click here to find out!' }}
      .answer(v-show='howDoesItWork')
        .pt-12 To use subber you will need to find the channel username or ID of your favourite YouTube channels
        .pt-12 Just go to your favourite YouTube channel in a browser, click on a video, and then click on the channel name next to the channel profile picture under the video. Then look for the value after either the /channel/, or /user/
        .pt-12 If the URL contains /c/, then that value won't work, this is why you need to click on a video and then the channel name under it
        .pt-12 Enter any number of channel IDs in separate inputs by using the 'Add Channel +' button. And then hit search to see the latest videos in order of release date from all of your channels.
  search
</template>

<script>
import { defineComponent, ref } from 'vue'
import search from 'components/search.vue'
export default defineComponent({
  name: 'PageIndex',
  components: {
    search,
  },
  data() {
    return {
      howDoesItWork: ref(false),
    }
  },
})
</script>
