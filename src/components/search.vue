<template lang="pug">
.latest-vids-positioner(
  :style=`{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }`
)
  .latest-vids-container.pt-12(
    :style=`{
      maxWidth: '100%',
      width: '600px'
    }`
  )
    .search-container.pt-12.mobile-spacing
      .suggestion-search.pt-12.flex.flex-col(v-if='suggestion')
        .text-h4.text-center(style='font-weight: 700')
          | {{ suggestion }}
        .loading-spinner.pt-12.flex.justify-center(v-if='loading')
          q-spinner(
            :style=`{
              marginLeft: '10px'
            }`,
            color='tertiary',
            size='1.5em'
          )
      .profile-pictures.pt-12.flex.flex-col.flex-wrap
        .title Selected Channels
        .flex.flex-row
          template(v-for='picture in profilePictures')
            a(
              :href='"https://www.youtube.com/channel/" + picture.id',
              target='_blank'
            )
              //- onerror='this.parentNode.removeChild(this)',
              img(
                :src='picture.url',
                :style=`{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  marginRight: '16px',
                  marginTop: '8px'
                }`
              )
      template(v-if='!suggestion')
        template(v-for='(playlistId, idx) in playlistIds')
          .input-container.pt-12
            q-input.channelID-input(
              v-model='playlistIds[idx]',
              label='Channel ID',
              filled,
              outlined,
              dark,
              placeholder='Enter a YouTube Channel ID'
            )
              template(v-slot:append)
                q-icon.channelID-icon.cursor-pointer(
                  name='cancel',
                  @click='deletePlaylistId(idx)'
                )
        .clear-and-add.pt-12.flex.flex-row
          .clear-container.w-50.pr-6
            q-btn.full-width(color='primary', @click='clearPlaylistIds') Clear All
          .add-playlistId-button.w-50.pl-6
            q-btn.full-width(color='accent', @click='addPlaylistId')
              | Add Channel
              q-icon(name='add')
        .search-videos-button.pt-12
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
          .pb-12 Some suggestions
          template(v-for='suggestion in suggestions')
            q-btn(
              style='margin-right: 12px',
              color='accent',
              @click='addPlaylistIds(suggestion[1])'
            )
              | {{ suggestion[0] }}
      .error-container.pt-24(v-if='error')
        q-banner.bg-negative(color='error', rounded, inline-actions)
          | {{ error }}
          template(v-slot:action)
            q-btn(flat, label='Dismiss', @click='error = undefined')
    grid(:videos='results')
</template>
<script>
import { defineComponent, ref } from 'vue'
import grid from 'components/grid.vue'

export default defineComponent({
  name: 'Search',
  components: {
    grid,
  },
  props: {
    presetMode: {
      type: Boolean,
      default: false,
    },
    suggestion: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      loading: ref(false),
      error: ref(undefined),
      profilePictures: [],
    }
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
  mounted() {
    if (this.presetMode) {
      this.playlistIds = (this.suggestions.find(
        (s) => s[0] === this.suggestion
      ) || ['', []])[1]
    }
    this.searchVideos()
  },
  methods: {
    clearPlaylistIds() {
      this.$store.commit('subber/clearPlaylistIds')
      this.searchVideos()
    },
    async getProfilePictures() {
      let apiUrl
      try {
        apiUrl = `${
          process.env.VIDEO_API || 'https://subber-api.herokuapp.com'
        }/v1/profile-pictures`
      } catch (err) {
        console.error(err)
        apiUrl = 'https://subber-api.herokuapp.com/v1/profile-pictures'
      }

      console.log('Sending request to', apiUrl)
      const resp = await this.$axios
        .get(apiUrl, {
          params: {
            channelIds: this.playlistIds,
          },
        })
        .catch((err) => {
          console.error(JSON.stringify(err, null, 2))
        })

      console.log('getProfilePictures resp', resp)
      console.log('getProfilePictures resp.data', resp.data)
      if (resp && resp.data) {
        // let idx = 0
        // const interval = setInterval(() => {
        //   if (idx >= resp.data.profilePictures.length) {
        //     clearInterval(interval)
        //   } else {
        //     this.profilePictures.push(resp.data.profilePictures[idx])
        //     idx++
        //   }
        // }, 3500)
        this.profilePictures = resp.data.profilePictures
      }
    },
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

      this.getProfilePictures()

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
<style lang="sass">
.channelID-input .channelID-icon
  opacity: 0
  transition: all 350ms ease
.channelID-input:hover .channelID-icon
  opacity: 1
</style>
