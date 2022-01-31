<template lang="pug">
.collections-list.l-container.pb-96.mt-48
  .mobile-spacing.or-create-your-own.pb-12
    q-btn.full-width(color='primary', to='/create') Create your own
  .loader-spinner.w-full.flex-center.pb-12(v-if='loading')
    q-spinner(
      :style=`{
        marginLeft: '10px'
      }`,
      color='tertiary',
      size='2.5em'
    )
  .mobile-spacing.results-count-container.pb-12.pt-24(
    v-if='collections.length'
  ) {{ collections.length }} Results
  template(v-for='(collection, idx) in collections')
    q-card.mobile-spacing.collection.mb-24(dark, v-if='idx < idxLimit')
      q-card-section
        router-link.capitalize.text-h5.text-bold(
          :to='"/collections/" + collection.name.replace(/ /gi, "-").toLowerCase()'
        ) {{ renderableName(collection.name) }}
        .author.text-light Made by {{ collection.author }}
        .views-count.text-light {{ collection.views || 0 }} views
      q-card-section.flex-row.mw-100.flex-wrap
        .channel-icon.relative.mr-14.mb-8(
          v-for='(channel, channelIdx) in collection.channels'
        )
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
      q-card-actions(align='right')
        router-link.w-full(
          :to='"/collections/" + collection.name.replace(/ /gi, "-").toLowerCase()'
        )
          q-btn.w-full(color='primary') Visit
  q-btn.mt-24.w-full(
    color='primary',
    @click='idxLimit += 40',
    v-if='collections.length > idxLimit'
  ) Load {{ loadXMore }} of {{ collections.length - this.idxLimit }} More
</template>
<script>
import { defineComponent } from 'vue'
import { get } from 'lodash-es'
export default defineComponent({
  name: 'CollectionsList',
  data() {
    return {
      collections: [],
      idxLimit: 40,
      loading: false,
    }
  },
  computed: {
    loadXMore() {
      if (this.collections.length - this.idxLimit > 40) {
        return 40
      } else {
        return this.collections.length - this.idxLimit
      }
    },
  },
  mounted() {
    this.getCollections()
  },
  methods: {
    async getCollections() {
      this.loading = true
      const response = await this.$api
        .get('/v1/collections')
        .catch((err) => console.error(err.response.data))
      this.loading = false
      if (get(response, 'data.collections')) {
        this.collections = get(response, 'data.collections')
      }
    },
  },
})
</script>
