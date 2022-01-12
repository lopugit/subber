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
      .aggregate-search.pt-12.flex.flex-col(v-if='aggregate')
        .text-h4.text-center(style='font-weight: 700')
          | {{ aggregate }}
      template(v-if='!aggregate')
        .input-container.pt-12
          q-input.channel-search(
            v-model='query',
            placeholder='Start typing to search for channels',
            filled,
            outlined,
            dark,
            debounce='500'
          )
            template(v-slot:append)
              q-spinner(
                :style=`{
                marginLeft: '10px'
              }`,
                v-if='channelSearchLoading',
                color='tertiary',
                size='1.5em'
              )
          .search-results(v-if='searchResults.length')
            q-list.bg-secondary(bordered, separator)
              template(v-for='(searchResult, idx) in searchResults')
                q-item.pt-16.pb-16(
                  @click='selectSearchResult(searchResult)',
                  clickable,
                  v-ripple,
                  v-if='idx <= searchResultLimit'
                )
                  q-item-section(avatar)
                    img(
                      :src='searchResult.snippet.thumbnails.default.url',
                      :style=`{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        marginRight: '16px',
                      }`
                    )
                  q-item-section
                    q-item-label {{ searchResult.snippet.channelTitle }}
                    q-item-label {{ searchResult.snippet.description }}
                  q-item-section(avatar)
                    q-btn(flat)
                      q-icon(name='add')
              q-item(clickable, @click='showMoreSearchResults')
                q-item-section
                  q-item-label Show more
                q-item-section(
                  side,
                  v-if='searchResults.length - searchResultLimit > 0'
                )
                  q-item-label {{ searchResults.length - searchResultLimit }} More
            .clear-btn.flex.w-100.pt-12(v-if='searchResults.length')
              q-btn.ml-auto(@click='clearSearch', color='secondary') Clear
      .profile-pictures.pt-24.flex.flex-col.flex-wrap(v-if='channels.length')
        .title Selected Channels
        .flex.flex-row
          template(v-for='channel in channels')
            .channel-icon.relative.mr-16.mt-8
              .channel-icon-inner
                a(
                  v-if='channel',
                  :href='"https://www.youtube.com/channel/" + channel.id.channelId',
                  target='_blank'
                )
                  img(
                    :src='channel.snippet.thumbnails.default.url',
                    :style=`{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%'
                    }`
                  )
                q-btn.absolute.channel-remove-icon(
                  color='accent',
                  round,
                  dense,
                  size='xs',
                  @click='removeChannel(channel)',
                  v-if='!aggregate'
                )
                  q-icon(name='close')
      template(v-if='!aggregate')
        .aggregates-container.pt-24
          .pb-12 Some suggested networks
          template(v-for='aggregate in aggregates')
            q-btn(
              style='margin-right: 12px',
              color='accent',
              @click='addChannels(aggregate[1])'
            )
              | {{ aggregate[0] }}
      .error-container.pt-24(v-if='error')
        q-banner.bg-negative(color='error', rounded, inline-actions)
          | {{ error }}
          template(v-slot:action)
            q-btn(flat, label='Dismiss', @click='error = undefined')
    grid(:videos='results', :loading='loading')
</template>
<script>
import { defineComponent, ref } from 'vue'
import grid from 'components/grid.vue'
import { debounce } from 'lodash'

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
    aggregate: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      loading: ref(false),
      channelSearchLoading: ref(false),
      error: ref(undefined),
      query: ref(''),
      searchResults: ref([]),
      results: ref([]),
      searchResultLimit: ref(4),
    }
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
    channels: {
      get() {
        return this.$store.state.subber.user.home.channels
      },
      set(val) {
        this.$store.commit('subber/thing', {
          key: 'user.home.channels',
          val,
        })
      },
    },
  },
  watch: {
    query() {
      if (this.query) {
        this.searchForChannels()
      } else {
        this.clearSearch()
      }
    },
  },
  mounted() {
    console.log('this.presetMode', this.presetMode)
    if (this.presetMode) {
      console.log('this.aggregates', this.aggregates)
      console.log('this.aggregate', this.aggregate)
      const aggregateChannels = this.aggregates.find(
        (s) => s[0] === this.aggregate
      )[1]

      console.log('aggregateChannels', aggregateChannels)
      if (aggregateChannels) {
        console.log(
          'aggregateChannels.map((s) => s)',
          aggregateChannels.map((s) => s)
        )
        this.channels = aggregateChannels.map((s) => s)
      }
      console.log('this.channels', this.channels)
    }
    this.searchVideos()
  },
  methods: {
    showMoreSearchResults() {
      this.searchResultLimit += 4
    },
    clearSearch() {
      this.query = ''
      this.searchResults = []
    },
    removeChannel(channel) {
      this.$store.commit('subber/removeChannel', channel)
      this.searchVideos()
    },
    async searchForChannels() {
      if (this.query) {
        this.channelSearchLoading = true

        let apiUrl
        try {
          apiUrl = `${
            process.env.VIDEO_API || 'https://subber-api.herokuapp.com'
          }/v1/channel-search`
        } catch (err) {
          console.error(err)
          apiUrl = 'https://subber-api.herokuapp.com/v1/channel-search'
        }

        console.log('Sending request to', apiUrl)
        const resp = await this.$axios
          .get(apiUrl, {
            params: {
              query: this.query,
            },
          })
          .catch((err) => {
            console.error(JSON.stringify(err, null, 2))
          })

        this.channelSearchLoading = false
        if (resp && resp.data) {
          this.searchResults = resp.data.results
          console.log('Got resp searchForChannels', resp)
        }
      }
    },
    selectSearchResult(searchResult) {
      console.log('test')
      console.log('searchResult', searchResult)
      console.log('this.channels', this.channels)
      console.log('this.channels[0]', this.channels[0])
      console.log('this.channels[1]', this.channels[1])
      this.addChannel(searchResult)
      this.query = ''
      this.searchResults = this.searchResults.filter((result) => {
        return result.id.channelId !== searchResult.id.channelId
      })
      this.searchVideos()
    },
    clearChannels() {
      this.$store.commit('subber/clearChannels')
      this.searchVideos()
    },
    searchVideos: debounce(async function () {
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
            playlistIds: this.channels.map((channel) => {
              return channel.id.channelId
            }),
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
    }, 850),
    addChannels(channels) {
      this.$store.commit('subber/addChannels', channels)
      this.searchVideos()
    },
    addChannel(channel) {
      this.$store.commit('subber/addChannel', channel)
    },
    deleteChannel(idx) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.searchVideos()
      }, 300)
      this.$store.commit('subber/deleteChannel', idx)
    },
  },
})
</script>
<style lang="sass">
.channel-remove-icon
  opacity: 0
  transition: opacity 350ms ease
.channel-icon:hover
  .channel-remove-icon
    opacity: 1
.channel-remove-icon
  top: -5px
  left: -7px
</style>
