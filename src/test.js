const test = {
  tags: {
    headTags: [
      {
        tagName: 'script',
        voidTag: false,
        meta: {
          plugin: 'html-webpack-plugin',
        },
        attributes: {
          defer: true,
          src: 'vendor.js',
        },
      },
      {
        tagName: 'script',
        voidTag: false,
        meta: {
          plugin: 'html-webpack-plugin',
        },
        attributes: {
          defer: true,
          src: 'app.js',
        },
      },
    ],
    bodyTags: [],
  },
  files: {
    publicPath: '',
    js: ['vendor.js', 'app.js'],
    css: [],
  },
  options: {
    template:
      '/Users/lopu/things/git/lopugit/subber/node_modules/html-webpack-plugin/lib/loader.js!/Users/lopu/things/git/lopugit/subber/src/index.template.html',
    templateContent: false,
    templateParameters: {
      ctx: {
        dev: true,
        prod: false,
        mode: {
          spa: true,
        },
        modeName: 'spa',
        target: {},
        arch: {},
        bundler: {},
        debug: false,
        vueDevtools: false,
      },
      process: {
        env: {
          VIDEO_API: 'http://localhost:3847',
          NODE_ENV: 'development',
          CLIENT: true,
          SERVER: false,
          DEV: true,
          PROD: false,
          DEBUGGING: true,
          MODE: 'spa',
          VUE_ROUTER_MODE: 'history',
          VUE_ROUTER_BASE: '/',
          APP_URL: 'http://localhost:8374/',
        },
      },
      productName: 'Subber',
      productDescription: 'Subber YouTube Organizer',
    },
    filename: 'index.html',
    publicPath: 'auto',
    hash: false,
    inject: true,
    scriptLoading: 'defer',
    compile: true,
    favicon: false,
    minify: false,
    cache: true,
    showErrors: true,
    chunks: 'all',
    excludeChunks: [],
    chunksSortMode: 'none',
    meta: {},
    base: false,
    title: 'Webpack App',
    xhtml: false,
  },
}
