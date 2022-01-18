const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Collections.vue') }],
  },
  {
    path: '/create',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Search.vue') }],
  },
  {
    path: '/collections',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Collections.vue') }],
  },
  {
    path: '/collections/:collectionName',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Collection.vue') }],
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
