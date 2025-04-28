<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const modules = import.meta.glob('../components/small_project/*.vue')
const links = Object.keys(modules).map((path) => {
    const name = path.match(/\/([^/]+)\.vue$/)?.[1] || ''
    return {
        path: `/project/${name.toLowerCase()}`,
        name: name.replace(/([A-Z])/g, ' $1').trim(), // 添加空格在大写字母前
    }
})
</script>

<template>
    <div class="project-view-wrapper">
        <nav class="project-nav">
            <h3>小项目演示</h3>
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
    height: 100%;
    min-height: 500px;
    background: linear-gradient(120deg, #f8fafc 0%, #eaf6fb 100%);
    border-radius: 12px;
    box-shadow: 0 4px 24px #0001;
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

.project-content {
    flex-grow: 1;
    padding: 36px 32px 32px 32px;
    overflow-y: auto;
    min-width: 0;
}
</style>
