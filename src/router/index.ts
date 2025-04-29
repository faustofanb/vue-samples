import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 生成动态路由配置
const smallProjectRoutes = Object.entries(import.meta.glob('../components/small_project/*.vue'))
    .map(([path, component]) => {
        // 从文件路径中提取文件名
        const match = path.match(/\/([^/]+)\.vue$/)
        if (!match) return null

        const fileName = match[1]
        // 移除数字前缀和点号，将文件名转换为适合路由的格式
        const routePath = fileName
            .replace(/^\d+\.\s*/, '') // 移除数字前缀和点号
            .toLowerCase() // 转换为小写
            .replace(/\s+/g, '-') // 将空格替换为连字符

        return {
            path: routePath,
            name: `project-${routePath}`,
            component,
        }
    })
    .filter((route): route is Exclude<typeof route, null> => route !== null)

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
            component: () => import('../views/ProjectView.vue'),
            children: smallProjectRoutes,
        },
        {
            path: '/challenge',
            name: 'challenge',
            component: () => import('../views/ChallengeView.vue'),
            children: [
                // 新增：支持 /challenge/:dirName 动态目录
                {
                    path: ':dirName',
                    name: 'challenge-detail',
                    component: () => import('../views/ChallengeDetailView.vue'),
                },
            ],
        },
    ],
})

export default router
