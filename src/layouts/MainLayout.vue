<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-header.header
    q-toolbar
      q-btn(
        flat,
        dense,
        round,
        icon='menu',
        aria-label='Menu',
        @click='leftDrawerOpen = !leftDrawerOpen'
      )
      q-toolbar-title.text-bold(style='padding-left: 14px')
        a(href='/') Subber

      .app-description-container(style='padding-right: 14px')
        | The best app for finding your favourite content
  q-drawer(v-model='leftDrawerOpen', overlay, dark)
    q-list
      q-item
        q-item-section.text-bold
          | Presets
        q-item-section(avatar)
          q-btn(
            flat,
            dense,
            round,
            icon='close',
            aria-label='Menu',
            @click='leftDrawerOpen = false'
          )
      q-item(clickable, href='/')
        q-item-section
          q-item-label Home
      template(v-for='(suggestion, idx) in suggestions')
        q-item(clickable, :href='suggestion[0].replace(/ /gi, "-")')
          q-item-section
            q-item-label {{ suggestion[0] }}
  q-page-container
    router-view
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {},
  setup() {
    return {
      leftDrawerOpen: ref(false),
    }
  },
  data() {
    return {}
  },
  computed: {
    suggestions: {
      get() {
        return this.$store.state.subber.suggestions
      },
      set(val) {
        this.$store.commit('subber/thing', {
          key: 'suggestions',
          val,
        })
      },
    },
  },
})
</script>
<style lang="sass">
.header
  background: #202020

@media (max-width: 481px)
  .app-description-container
    display: none
</style>
