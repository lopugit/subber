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
        a(to='/') ytSubber

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
      q-item(clickable, to='/')
        q-item-section.text-bold
          | Home
      q-item.text-bold(clickable, to='/create')
        q-item-section
          | Create
      q-item.text-bold(clickable, to='/collections')
        q-item-section
          | Collections
      template(v-for='collection in collections')
        q-item(
          v-if='collection.name',
          clickable,
          :to='"/collections/" + collection.name.replace(/ /gi, "-")'
        )
          q-item-section
            q-item-label.capitalize.pl-12 {{ collection.name }}
      q-item.p-12
        q-item-section.text-bold
          | Privacy
      q-item(clickable, to='/privacy-policy')
        q-item-section
          q-item-label.pl-12 Privacy Policy
      q-item(clickable, href='https://www.youtube.com/t/terms')
        q-item-section
          q-item-label.pl-12 YouTube Terms of Service
      q-item(clickable, href='https://policies.google.com/privacy')
        q-item-section
          q-item-label.pl-12 Google Privacy Policy
  q-page-container
    router-view
  .footer.w-full.bg-primary.flex-center.flex-row.pt-8.pb-8
    .l-container.flex-row
      q-list.footer-list
        q-item
          q-item-section
            a(to='/privacy-policy') Privacy Policy
        q-item
          q-item-section
            a(href='https://www.youtube.com/t/terms') YouTube Terms of Service
        q-item
          q-item-section
            a(href='https://policies.google.com/privacy') Google Privacy Policy
      q-list.footer-list
        q-item
          q-item-section
            .creator.pb-4 Created By
            .creator Nikolaj Frey
            a.underline(href='mailto:nikolaj@alopu.com') nikolaj@alopu.com
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
    return {
      collections: [
        {
          name: 'Simon Whistler',
        },
        {
          name: 'XQC',
        },
        {
          name: 'Lopu',
        },
      ],
    }
  },
  computed: {},
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
</style>
