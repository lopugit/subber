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
        //- q-item-section
        q-item-section(avatar)
          q-btn(
            flat,
            dense,
            round,
            icon='close',
            aria-label='Menu',
            @click='leftDrawerOpen = false'
          )
      q-item
        q-item-section.text-bold
          | Presets
      q-item(clickable, href='/')
        q-item-section
          q-item-label Home
      template(v-for='(aggregate, idx) in aggregates')
        q-item(clickable, :href='aggregate[0].replace(/ /gi, "-")')
          q-item-section
            q-item-label {{ aggregate[0] }}
      q-item.p-12
        q-item-section.text-bold
          | Privacy
      q-item(clickable, href='/privacy-policy')
        q-item-section
          q-item-label Privacy Policy
      q-item(clickable, href='https://www.youtube.com/t/terms')
        q-item-section
          q-item-label YouTube Terms of Service
      q-item(clickable, href='https://policies.google.com/privacy')
        q-item-section
          q-item-label Google Privacy Policy
  q-page-container
    router-view
  .footer.full-width.bg-primary.flex-center
    q-list.footer-list
      q-item
        q-item-section
          a(href='/privacy-policy') Privacy Policy
      q-item
        q-item-section
          a(href='https://www.youtube.com/t/terms') YouTube Terms of Service
      q-item
        q-item-section
          a(href='https://policies.google.com/privacy') Google Privacy Policy
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
    aggregates: {
      get() {
        return this.$store.state.subber.aggregates
      },
      set(val) {
        this.$store.commit('subber/thing', {
          key: 'aggregates',
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
.footer-list
  margin-left: auto
  margin-right: auto
  max-width: 600px
</style>
