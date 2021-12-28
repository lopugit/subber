const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },
  {
    path: '/simon-whistler-empire',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        props: {
          presetMode: true,
          suggestion: 'Simon Whistler Empire',
        },
        component: () => import('components/getLatestVideos.vue'),
      },
    ],
  },
  {
    path: '/xqc-clips-empire',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        props: {
          presetMode: true,
          suggestion: 'xQc Clips Empire',
        },
        component: () => import('components/getLatestVideos.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
