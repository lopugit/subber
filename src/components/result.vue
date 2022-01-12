<template lang="pug">
.result-container.pb-36
  .embedded-container.relative(
    v-if='$store.state.subber.embedded',
    :style=`{
      width: '100%',
      paddingTop: '56%'
    }`
  )
    iframe(
      :src='`https://www.youtube.com/embed/${videoId}`',
      :style=`{
        width: '100%',
        height: '100%',
        border: 'none',
        position: 'absolute',
        top: '0',
        left: '0',
      }`
    )
  a(:href='"https://www.youtube.com/watch?v=" + videoId', target='_blank')
    img.w-100(
      v-if='!$store.state.subber.embedded',
      :src='video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.standard?.url'
    )
    .title.mobile-spacing(
      :style=`{
        paddingTop: '4px',
        fontSize: '20px',
        fontWeight: 500
      }`
    )
      span {{ video.snippet.title }}
      span(:style=`{
        paddingLeft: '8px'
      }`) | {{ video.snippet.videoOwnerChannelTitle }}
  .yt-description-container.mobile-spacing
    .yt-description(
      ref='ytDescription',
      :class='{ showMore }',
      v-html='parsedDescription'
    )
    .show-more.pt-6(v-if='needShowMore', @click='showMore = !showMore') {{ showMore ? 'SHOW MORE' : 'SHOW LESS' }}
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Result',
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mounted: ref(false),
      showMore: ref(true),
    }
  },
  computed: {
    needShowMore() {
      if (!this.mounted) {
        return false
      }
      if (this.$refs.ytDescription.offsetHeight >= 100) {
        return true
      }
      return false
    },
    videoId() {
      return this.video.contentDetails.videoId
    },
    parsedDescription() {
      /* eslint-disable */
      const urlRegex =
        /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi
      /* eslint-enable */

      let ret = this.video.snippet.description.replace(
        urlRegex,
        function (url) {
          const newUrl = !url.includes('http') ? 'http://' + url : url
          return '<a href="' + newUrl + '" target="_blank">' + url + '</a>'
        }
      )

      ret = ret.replace(/\n/g, '<br>')

      return ret
    },
  },
  mounted() {
    this.mounted = true
  },
})
</script>
<style lang="sass">
.yt-description
  overflow: hidden
  &.showMore
    max-height: 100px
  max-height: auto
  a
    color: rgb(62, 166, 255)
.show-more
  color: rgb(170, 170, 170)
  font-size: 12px
  cursor: pointer
  font-weight: 600
</style>
