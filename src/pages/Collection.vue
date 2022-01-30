<template lang="pug">
q-page.flex(
  :style=`{
    flexDirection: 'column',
    alignItems: 'center'
  }`
)
  search(:currentCollectionName='$route.params.collectionName')
</template>
<script>
import { defineComponent } from 'vue'
import search from 'components/search.vue'
export default defineComponent({
  name: 'PageIndex',
  components: {
    search,
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
  },
})
</script>
