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
          aggregate: 'Simon Whistler Empire',
        },
        component: () => import('src/components/search.vue'),
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
          aggregate: 'xQc Clips Empire',
        },
        component: () => import('src/components/search.vue'),
      },
    ],
  },
  {
    path: '/privacy-policy',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/PrivacyPolicy.vue'),
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
