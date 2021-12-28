<template lang="pug">
.latest-vids-container.pt-12(
  :style=`{
    padding: '0px 8px',
    maxWidth: '100%',
    width: '600px'
  }`
)
  .search-container.pt-12
    template(v-for='(playlistId, idx) in playlistIds')
      .input-container.pt-12
        q-input(
          v-model='playlistIds[idx]',
          filled,
          outlined,
          dark,
          placeholder='Enter a YouTube Channel ID'
        )
          template(v-slot:append)
            q-icon.cursor-pointer(
              name='cancel',
              @click='deletePlaylistId(idx)'
            )
    .add-playlistId-button.pt-12
      q-btn.full-width(color='primary', @click='addPlaylistId')
        q-icon(name='add')
    .search-videos-button.pt-24
      q-btn.full-width(color='secondary', @click='searchVideos')
        | {{ loading ? 'Searching' : 'Search' }}
        q-spinner(
          :style=`{
          marginLeft: '10px'
        }`,
          v-if='loading',
          color='tertiary',
          size='1.5em'
        )

    .suggestions-container.pt-24
      p Some suggestions
      .pt-12
      template(v-for='suggestion in suggestions')
        q-btn(color='accent', @click='addPlaylistIds(suggestion[1])')
          | {{ suggestion[0] }}
    .error-container.pt-24(v-if='error')
      q-banner.bg-negative(color='error', rounded, inline-actions)
        | {{ error }}
        template(v-slot:action)
          q-btn(flat, label='Dismiss', @click='error = undefined')
  .results-container.pt-24
    .results.pt-12(v-if='results.length') {{ results.length }} Results
    template(v-for='video in results')
      .result-container
        br
        a(
          :href='"https://www.youtube.com/watch?v=" + video.contentDetails.videoId',
          target='_blank'
        )
          img(
            :src='video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.standard?.url'
          )
          .title(:style=`{
              fontSize: '24px'
            }`)
            span {{ video.snippet.title }}
            span(:style=`{
              paddingLeft: '8px'
            }`) - {{ video.snippet.videoOwnerChannelTitle }}
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'GetLatestVideos',
  data() {
    return {
      loading: ref(false),
      error: ref(undefined),
      suggestions: ref([
        [
          'Simon Whistler Empire',
          [
            'UCQ-hpFPF4nOKoKPEAZM_THw', // Top Tenz Net
            'UC3Wn3dABlgESm8Bzn8Vamgg', // side projects
            'UCp1tsmksyf6TgKFMdt8-05Q', // casual criminilist
            'UCf-U0uPVQZtcqXUWa_Hl4Mw', // into the shadows
            'UCVH8lH7ZLDUe_d9mZ3dlyYQ', // xplrd
            'UCnb-VTwBHEV3gtiB9di9DZQ', // highlight history
            'TodayIFoundOut', // today I found out
            'UCYY5GWf7MHFJ6DZeHreoXgw', // brain blaze
            'UCHKRfxkMTqiiv4pF99qGKIw', // geographics
            'UClnDI2sdehVm1zm_LmUHsjQ', // biographics
            'UC0woBco6Dgcxt0h8SwyyOmw', // Mega projects
            'UC9h8BDcXwkhZtnqoQJ7PggA', // warographics
          ],
        ],
      ]),
    }
  },
  computed: {
    results: {
      get() {
        return this.$store.state.subber.results
      },
      set(val) {
        this.$store.commit('subber/thing', {
          key: 'results',
          val,
        })
      },
    },
    playlistIds: {
      get() {
        return this.$store.state.subber.playlistIds
      },
      set(val) {
        this.$store.commit('subber/thing', {
          key: 'playlistIds',
          val,
        })
      },
    },
  },
  mounted() {},
  methods: {
    async searchVideos() {
      this.error = false
      let apiUrl
      try {
        apiUrl = `${
          process.env.VIDEO_API || 'https://subber-api.herokuapp.com'
        }/v1/videos`
      } catch (err) {
        console.error(err)
        apiUrl = 'https://subber-api.herokuapp.com/v1/videos'
      }

      this.loading = true

      console.log('Sending request to', apiUrl)
      const resp = await this.$axios
        .get(apiUrl, {
          params: {
            playlistIds: this.playlistIds,
          },
        })
        .catch((err) => {
          console.error(JSON.stringify(err, null, 2))
        })

      this.loading = false

      console.log('Got resp', resp)

      if (resp && resp.data?.videos) {
        console.log('Got resp.data', resp.data)
        console.log('Got videos', resp?.data?.videos)
        this.results = resp.data.videos
      } else {
        console.log('No resp.data')
        this.results = []
      }

      if (resp?.data?.error) {
        this.error = resp.data.error
      }
    },
    addPlaylistIds(playlistIds) {
      this.$store.commit('subber/addPlaylistIds', playlistIds)
      this.searchVideos()
    },
    addPlaylistId() {
      this.$store.commit('subber/addPlaylistId')
    },
    deletePlaylistId(idx) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.searchVideos()
      }, 300)
      this.$store.commit('subber/deletePlaylistId', idx)
    },
  },
})
</script>
