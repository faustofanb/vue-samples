import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },

        {
            path: '/project',
            name: 'project',
            component: () => import('../views/ProjectView.vue'),
            children: [
                {
                    path: '/project/form',
                    name: 'form',
                    component: () => import('@/components/small_project/Form.vue'),
                },
                {
                    path: '/project/fetch',
                    name: 'fetch',
                    component: () => import('@/components/small_project/FetchData.vue'),
                },
                {
                    path: '/project/3d-boxes-background',
                    name: '3d-boxes-background',
                    component: () => import('@/components/small_project/3dBoxesBackground.vue'),
                }
            ]
        }
    ],
})

export default router
