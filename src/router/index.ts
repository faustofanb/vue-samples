import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'

// 自动导入small_project下的所有组件
const modules = import.meta.glob('../components/small_project/*.vue')

// 生成动态路由配置
const smallProjectRoutes = Object.entries(modules).map(([path, component]) => {
    const name = path.match(/\/([^/]+)\.vue$/)?.[1] || ''
    return {
        path: `/project/${name.toLowerCase()}`,
        name,
        component,
    }
})

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
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/project',
            name: 'project',
            component: ProjectView,
            children: smallProjectRoutes,
        },
    ],
})

export default router
