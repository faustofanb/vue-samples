<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

// 获取所有 challenges 下的 .vue 文件
const modules = import.meta.glob('../components/challenges/*/*.vue')
// 提取一级目录名并去重
const dirSet = new Set<string>()
Object.keys(modules).forEach((path) => {
    const match = path.match(/challenges\/([^/]+)\//)
    if (match) dirSet.add(match[1])
})
const links = Array.from(dirSet).map((dir) => ({
    path: `/challenge/${encodeURIComponent(dir)}`,
    name: dir,
}))

const router = useRouter()

onMounted(() => {
    if (router.currentRoute.value.path === '/challenge' && links.length > 0) {
        router.replace(links[0].path)
    }
})
</script>

<template>
    <div class="project-view-wrapper">
        <nav class="project-nav">
            <h3>Vue Challenge</h3>
            <RouterLink v-for="link in links" :key="link.path" :to="link.path" class="project-link">
                <span class="dot"></span>{{ link.name }}
            </RouterLink>
        </nav>
        <div class="project-content">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
.project-view-wrapper {
    display: flex;
    height: 100vh;
    min-height: 0;
}
.project-content {
    flex: 1 1 0;
    min-width: 0;
    min-height: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
}
.project-nav {
    width: 220px;
    padding: 32px 18px 24px 18px;
    border-right: 1.5px solid var(--color-border, #e0e6ed);
    background: var(--color-background-soft, #f4f8fb);
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: flex-start;
    border-radius: 12px 0 0 12px;
    box-shadow: 2px 0 8px #0001;
}

.project-nav h3 {
    margin-top: 0;
    margin-bottom: 18px;
    color: var(--color-heading, #2980b9);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
    padding-left: 2px;
}

.project-link {
    text-decoration: none;
    color: var(--color-text, #34495e);
    padding: 7px 0 7px 18px;
    border-radius: 6px;
    font-size: 15px;
    display: flex;
    align-items: center;
    transition:
        background 0.18s,
        color 0.18s;
    position: relative;
    width: 100%;
}

.project-link .dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #b3c6e0;
    margin-right: 10px;
    transition: background 0.2s;
}

.project-link.router-link-exact-active {
    font-weight: bold;
    color: #219a6b;
    background: #e0f7ef;
}
.project-link.router-link-exact-active .dot {
    background: #219a6b;
}

.project-link:hover {
    background: #9b9dcc;
    color: #2980b9;
}
</style>
