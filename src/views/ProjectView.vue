<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="project-view-wrapper">
        <nav class="project-nav">
            <RouterLink to="/project/form">Form Example</RouterLink>
            <RouterLink to="/project/fetch">Data Fetching</RouterLink>
            <RouterLink to="/project/3d-boxes-background">3D Boxes</RouterLink>
        </nav>
        <div class="project-content">
            <RouterView />
        </div>
    </div>
</template>

<style scoped>
.project-view-wrapper {
    display: flex;
    height: 100%; /* 确保填满父容器 (.content-area) 高度 */
}

.project-nav {
    width: 200px; /* 固定侧边导航宽度 */
    padding: 20px;
    border-right: 1px solid var(--color-border); /* 使用全局变量 */
    background-color: var(--color-background-soft); /* 使用全局变量 */
    display: flex;
    flex-direction: column;
    gap: 10px; /* 链接之间的间距 */
}

.project-nav h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--color-heading);
}

.project-nav a {
    text-decoration: none;
    color: var(--color-text);
    padding: 5px 0;
}

.project-nav a.router-link-exact-active {
    font-weight: bold;
    color: hsla(160, 100%, 37%, 1); /* Vue green */
}

.project-content {
    flex-grow: 1; /* 填充剩余宽度 */
    padding: 20px;
    overflow-y: auto; /* 内容过多时允许滚动 */
}
</style>
