<template lang="pug">
q-page.flex(
  :style=`{
    flexDirection: 'column',
    alignItems: 'center'
  }`
)
  search(:embed='embed', :currentCollectionName='$route.params.collectionName')
</template>
<script>
import { defineComponent } from 'vue'
import search from 'components/search.vue'
export default defineComponent({
  name: 'PageIndex',
  components: {
    search,
  },
  props: {
    embed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  mounted() {
    document.title =
      this.$store.state.subber.pageTitle +
      ' - ' +
      this.titleise(this.$route.params.collectionName) +
      ' - Collection'
    if (this.$route.fullPath.includes('embed')) {
      document.title += ' - Embed'
    }
  },
})
</script>
