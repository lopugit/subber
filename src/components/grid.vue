<template lang="pug">
.videos-container.pt-24.pb-24
  .flex.flex-row.align-center.pt-12.pb-12.mobile-spacing
    .videos.flex-center(v-if='!loading && videos.length') {{ videos.length }} Results
    .videos.flex-center(v-if='loading')
      | Loading results
      q-spinner.ml-12(color='tertiary', size='1.2em')
    .toggle-embedded.ml-auto(v-if='videos.length')
      q-toggle(
        label='Embedded',
        v-model='embedded',
        color='accent',
        left-label
      )
  template(v-for='(video, idx) in videos')
    result(v-if='idx < idxLimit', :video='video')
  .load-more.mobile-spacing(v-if='videos.length > idxLimit')
    q-btn.w-full(color='secondary', @click='idxLimit += 10') Show More
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      idxLimit: 10,
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
