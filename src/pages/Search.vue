<template lang="pug">
q-page.flex(
  :style=`{
    flexDirection: 'column',
    alignItems: 'center'
  }`
)
  search
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
})
</script>
