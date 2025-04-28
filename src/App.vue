<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="app-container">
        <header class="app-header">
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
            <nav class="app-nav">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/project">Project</RouterLink>
            </nav>
        </header>
        <main class="app-main">
            <div class="content-area">
                <RouterView />
            </div>
        </main>
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh; /* 使容器占满整个视口高度 */
}

.app-header {
    display: flex;
    align-items: center; /* 垂直居中对齐 */
    padding: 10px 20px;
    background-color: #f8f9fa; /* 添加背景色以便区分 */
    border-bottom: 1px solid #dee2e6; /* 添加底部边框 */
}

.logo {
    margin-right: 20px; /* logo 和导航栏之间的间距 */
}

.app-nav {
    display: flex;
    gap: 15px; /* 导航链接之间的间距 */
}

.app-nav a {
    text-decoration: none;
    color: #495057;
}

.app-nav a.router-link-exact-active {
    font-weight: bold;
    color: #007bff;
}

.app-main {
    display: flex;
    flex-grow: 1; /* 使主内容区域填充剩余空间 */
    overflow: hidden; /* 防止内容溢出 */
}

.app-sidebar {
    width: 200px; /* 侧边栏宽度 */
    border-right: 1px solid #dee2e6; /* 添加右边框 */
    padding: 15px;
    background-color: #f1f3f5; /* 侧边栏背景色 */
    overflow-y: auto; /* 如果内容过多则允许滚动 */
}

.content-area {
    flex-grow: 1; /* 内容区域填充剩余空间 */
    padding: 30px; /* Increased padding for better spacing */
    overflow-y: auto; /* 如果内容过多则允许滚动 */
    box-sizing: border-box; /* Ensure padding is included within the element's total width and height */
}
</style>
