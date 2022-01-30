<template lang="pug">
q-page.flex(
  :style=`{
    flexDirection: 'column',
    alignItems: 'center'
  }`
)
  collections-list
</template>
<script>
import { defineComponent } from 'vue'
import collectionsList from 'components/collections-list.vue'
export default defineComponent({
  name: 'PageIndex',
  components: {
    collectionsList,
  },
  data() {
    return {}
  },
  mounted() {
    if (this.$route.path !== '/') {
      document.title = this.$store.state.subber.pageTitle + ' - Collections'
    } else {
      document.title = this.$store.state.subber.pageTitle + ' - Home'
    }
  },
})
</script>
