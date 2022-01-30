<template lang="pug">
q-page.flex(
  :style=`{
    flexDirection: 'column',
    alignItems: 'center'
  }`
)
  .privacy-policy-container.mobile-spacing(
    :style=`{
        textAlign: 'center',
        width: '480px',
        maxWidth: '100%'
      }`
  )
    .privacy-policy
      h1.title.text-white(
        :style=`{
          fontSize: '48px',
          fontWeight: 'bold'
        }`
      )
        | Privacy Policy
      .subtitle
        | The friendly Subber Privacy Policy
      .answer
        .pt-12 This API Client uses YouTube API Services
        .pt-12 Subber uses Google Analytics Tag Manager to track page views, clicks, and scroll events. This data is only stored in Google servers and Google Analytics servers, there is no custom user data tracking done or stored anywhere outside Google servers.
        .pt-12 User data is collected about the user's device such as Country, City, Browser, OS, and model
        .pt-12 User data is not shared with anyone outside of Google servers and Subber developers analyzing Google Analytics
        .pt-12 We do not allow any 3rd parties to serve Ads on Subber
      .pt-12 You can contact Subber at
        a(href='emailto:subber@alopu.com') subber@alopu.com
      .pt-12
        a.underline(href='https://www.youtube.com/t/terms') YouTube Terms of Service
      .pt-12
        a.underline(href='https://policies.google.com/privacy') Google Privacy Policy
Services
  get-latest-videos
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PrivacyPolicy',
  components: {},
  mounted() {
    document.title = this.$store.state.subber.pageTitle + ' - Privacy Policy'
  },
})
</script>
