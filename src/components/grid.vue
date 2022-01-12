<template lang="pug">
.videos-container.pt-12.pb-24
  .flex.flex-row.align-center.pt-12.pb-12.mobile-spacing
    .videos(v-if='videos.length') {{ videos.length }} Results
    .toggle-embedded.ml-auto
      q-toggle(
        label='Embedded',
        v-model='embedded',
        color='accent',
        left-label
      )
  template(v-for='(video, idx) in videos')
    result(v-if='idx < idxLimit', :video='video')
  .load-more.mobile-spacing(v-if='videos.length > idxLimit')
    q-btn.full-width(color='secondary', @click='idxLimit += 5') Show More
</template>
<script>
import { defineComponent, ref } from 'vue'
import result from 'components/result.vue'

export default defineComponent({
  name: 'Grid',
  components: {
    result,
  },
  props: {
    videos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      idxLimit: ref(5),
    }
  },
  computed: {
    embedded: {
      get() {
        return this.$store.state.subber.embedded
      },
      set(val) {
        this.$store.commit('subber/thing', {
          key: 'embedded',
          val,
        })
      },
    },
  },
})
</script>
<style></style>
