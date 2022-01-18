<template lang="pug">
.latest-vids-positioner(
  :style=`{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  }`
)
  .latest-vids.l-container.pt-12(:style=`{
      maxWidth: '100%'
    }`)
    .search-container.pt-12.mobile-spacing
      .collection-search.pt-24.flex.flex-col(v-if='currentCollectionName')
        .text-h4.capitalize(style='font-weight: 700')
          | {{ renderableName(currentCollectionName) }}
        .views-count {{ collectionViews }} views
      template(v-if='!currentCollectionName')
        .input-container.pt-12
          q-input.channel-search(
            v-model='query',
            placeholder='Start typing to search for channels to add to your collection',
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
        .title {{ currentCollectionName ? 'Featured Channels' : 'Selected Channels' }}
        .flex.flex-row
          template(v-for='channel in channels')
            .channel-icon.relative.mr-16.mt-8
              .channel-icon-inner
                .channel-icon-img
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
                  v-if='!currentCollectionName'
                )
                  q-icon(name='close')
      .save-as-container.pt-18(v-if='channels.length')
        .flex-align-center.flex-row
          q-btn.pl-12.pr-12(
            color='accent',
            dense,
            @click='saveIntent = !saveIntent'
          ) {{ currentCollectionName ? 'Fork Collection' : 'Save Collection' }}
        q-dialog(
          v-model='saveIntent',
          @hide='saveSuccess = false; incorrectPassword = false'
        )
          q-card(dark)
            q-card-section.mw-100
              .message-section.flex-col(v-if='saveSuccess') Congratulations! Your collection has been saved.
                .message You can access it here:
                router-link.underline.pt-4(
                  :to='`/collections/${apiName(collectionName)}`'
                ) {{ origin }}/collections/{{ apiName(collectionName) }}

              .form-section.flex-center.flex-col(v-if='!saveSuccess')
                q-input.w-420.mw-100.pb-24(
                  v-model='collectionName',
                  label='Collection Name',
                  placeholder='Enter a collection name to save as',
                  dense,
                  dark,
                  v-show='saveIntent',
                  @blur='v$.collectionName.$touch',
                  :rules=`[
                    val => !v$.collectionName.$error || v$.collectionName.$errors[0].$message.replace('Value', 'Collection Name'),
                    val => !incorrectPassword || 'This collection name already exists and the wrong password was used to modify it'
                  ]`,
                  reactive-rules
                )
                q-input.w-full.pb-24(
                  v-model='collectionAuthor',
                  label='Author',
                  placeholder='Enter an Author name',
                  dense,
                  dark,
                  @blur='v$.collectionAuthor.$touch',
                  :rules=`[
                    val => !this.v$.collectionAuthor.$error || this.v$.collectionAuthor.$errors[0].$message.replace('Value', 'Author')
                  ]`,
                  reactive-rules
                )
                q-input.w-full.pb-24(
                  v-model='collectionEmail',
                  label='Email',
                  placeholder='Enter an email incase you forget the password',
                  dense,
                  dark,
                  @blur='v$.collectionEmail.$touch',
                  :rules=`[
                    val => !this.v$.collectionEmail.$error || this.v$.collectionEmail.$errors[0].$message.replace('Value', 'Email')
                  ]`,
                  reactive-rules
                )
                q-input.w-full.pb-24(
                  v-model='collectionPassword',
                  label='Password',
                  placeholder='Enter a password so you can edit it later',
                  dense,
                  :type='isPwd ? "password" : "text"',
                  dark,
                  @blur='v$.collectionPassword.$touch',
                  :rules=`[
                    val => !v$.collectionPassword.$error || v$.collectionPassword.$errors[0].$message.replace('Value', 'Password')
                  ]`,
                  reactive-rules
                )
                  template(v-slot:append)
                    q-icon.cursor-pointer(
                      :name='isPwd ? "visibility_off" : "visibility"',
                      @click='isPwd = !isPwd'
                    )
                q-btn.w-full(@click='saveAs', color='primary') {{ saveLoading ? 'Saving' : 'Save' }}
                  q-spinner(
                    :style=`{
                    marginLeft: '10px'
                  }`,
                    v-if='saveLoading',
                    color='tertiary',
                    size='1.2em'
                  )
      //- .collections-container.pt-24(
      //-   v-if='collections.length && collections.length !== 1 && !currentCollectionName'
      //- )
      //-   .pb-12 Some suggested networks
      //-   template(v-for='collection in collections')
      //-     q-btn.pl-10.pr-10(
      //-       v-if='collection.name',
      //-       style='margin-right: 12px',
      //-       outline,
      //-       dense,
      //-       rounded,
      //-       color='accent',
      //-       @click='addChannels(collection.channels || [])'
      //-     )
      //-       | {{ renderableName(collection.name) }}
      .error-container.pt-24(v-if='error')
        q-banner.bg-negative(color='error', rounded, inline-actions)
          | {{ error }}
          template(v-slot:action)
            q-btn(flat, label='Dismiss', @click='error = undefined')
    grid(:videos='results', :loading='loading')
</template>
<script>
import { defineComponent } from 'vue'
import grid from 'components/grid.vue'
import { debounce, get } from 'lodash'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default defineComponent({
  name: 'Search',
  components: {
    grid,
  },
  props: {
    currentCollectionName: {
      type: String,
      default: '',
    },
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      collectionName: { required },
      collectionAuthor: { required },
      collectionEmail: { required, email },
      collectionPassword: { required, minLength: minLength(8) },
    }
  },
  data() {
    return {
      loading: false,
      channelSearchLoading: false,
      error: undefined,
      query: '',
      searchResults: [],
      results: [],
      searchResultLimit: 4,
      searchInterval: null,
      collectionName: '',
      collectionAuthor: '',
      collectionEmail: '',
      collectionPassword: '',
      saveIntent: false,
      saveLoading: false,
      isPwd: true,
      saveSuccess: false,
      incorrectPassword: false,
    }
  },
  computed: {
    collectionViews() {
      return get(this.collection, 'views', 0)
    },
    origin() {
      return location.origin
    },
    collections: {
      get() {
        return get(this, '$store.state.subber.collections', [])
      },
      set(val) {
        this.$store.commit('subber/thing', {
          key: 'collections',
          val,
        })
      },
    },
    collection() {
      return this.collections.find(
        (collection) =>
          collection.name === this.apiName(this.currentCollectionName)
      )
    },
    channels: {
      get() {
        return get(this, 'collection.channels', [])
      },
      set(val) {
        this.$store.commit('subber/thing', {
          key: 'collections.' + this.apiName(this.currentCollectionName),
          val,
        })
      },
    },
  },
  watch: {
    async currentCollectionName() {
      await this.init()
    },
    query() {
      if (this.query) {
        this.searchForChannels()
      } else {
        this.clearSearch()
      }
    },
  },
  async mounted() {
    await this.init()
  },
  methods: {
    async init() {
      this.results = []
      await this.$store.dispatch(
        'subber/fetchCollection',
        this.apiName(this.currentCollectionName)
      )
      this.searchVideos()

      // count collection view
      if (this.apiName(this.currentCollectionName)) {
        const response = await this.$api
          .get('/v1/count-view', {
            params: {
              name: this.apiName(this.currentCollectionName),
            },
          })
          .catch((err) => console.error(err.response.data))
        if (get(response, 'data.counted')) {
          console.log('View counted')
        }
      }
    },
    async saveAs() {
      this.v$.$touch()
      const endpoint = '/v1/save-collection'
      this.saveLoading = true
      const response = await this.$api
        .post(endpoint, {
          name: this.collectionName,
          email: this.collectionEmail,
          password: this.collectionPassword,
          author: this.collectionAuthor,
          channels: this.channels,
        })
        .catch((err) => {
          console.error(err.response)
          if (err.response.data.error === 'Incorrect password') {
            this.incorrectPassword = true
          }
        })
      this.saveLoading = false
      if (get(response, 'data')) {
        console.log('Success')
        await this.$store.dispatch(
          'subber/fetchCollection',
          this.collectionName
        )
        this.saveSuccess = true
      }
    },
    setSearchInterval() {
      // clearInterval(this.searchInterval)
      // this.searchInterval = setInterval(() => {
      //   this.searchVideos()
      // }, 1000 * 60 * 2)
    },
    showMoreSearchResults() {
      this.searchResultLimit += 4
    },
    clearSearch() {
      this.query = ''
      this.searchResults = []
    },
    removeChannel(channel) {
      this.$store.commit('subber/removeChannel', {
        channel,
        collectionName: this.apiName(this.currentCollectionName),
      })
      this.searchVideos()
    },
    async searchForChannels() {
      if (this.query) {
        this.channelSearchLoading = true

        const endpoint = '/v1/channel-search'
        console.log('Sending request to', endpoint)
        const resp = await this.$api
          .get(endpoint, {
            params: {
              query: this.query,
            },
          })
          .catch((err) => {
            console.error(err.response)
          })

        this.channelSearchLoading = false
        if (resp && resp.data) {
          this.searchResults = resp.data.results
          console.log('Got resp searchForChannels', resp)
        }
      }
    },
    selectSearchResult(searchResult) {
      this.addChannel(searchResult)
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
      const search = true
      if (search) {
        this.error = false
        this.loading = true

        const endpoint = '/v1/videos'
        console.log('Sending request to', endpoint)
        const resp = await this.$api
          .get(endpoint, {
            params: {
              playlistIds: this.channels.map((channel) => {
                return channel.id.channelId
              }),
            },
          })
          .catch((err) => {
            console.error(err.response.data)
          })

        this.loading = false

        if (get(resp, 'data.videos')) {
          this.results = resp.data.videos
        } else {
          console.log('No resp.data')
          this.results = []
        }

        if (get(resp, 'data.error')) {
          this.error = resp.data.error
        }

        // start interval
        this.setSearchInterval()
      }
    }, 850),
    addChannels(channels) {
      this.$store.commit('subber/addChannels', {
        channels,
        collectionName: this.apiName(this.currentCollectionName),
      })
      this.searchVideos()
    },
    addChannel(channel) {
      this.$store.commit('subber/addChannel', {
        channel,
        collectionName: this.apiName(this.currentCollectionName),
      })
    },
    deleteChannel(idx) {
      this.$store.commit('subber/deleteChannel', {
        collectionName: this.apiName(this.currentCollectionName),
        idx,
      })
      this.searchVideos()
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
