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
                <RouterLink to="/challenge">Challenge</RouterLink>
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
    align-items: center;
    padding: 18px 32px;
    background: #fff;
    border-bottom: 1px solid #e0e6ed;
    box-shadow: 0 2px 8px 0 rgba(60, 60, 60, 0.06);
    border-radius: 0 0 12px 12px;
    min-height: 70px;
}
.logo {
    margin-right: 20px;
    border-radius: 8px;
    box-shadow: none;
    border: none;
    background: none;
    width: 56px;
    height: 56px;
    object-fit: contain;
    display: block;
}
.app-nav {
    display: flex;
    gap: 18px;
    background: #f7f8fa;
    padding: 6px 18px;
    border-radius: 20px;
    box-shadow: 0 1px 4px 0 rgba(60, 60, 60, 0.04);
    border: none;
}
.app-nav a {
    text-decoration: none;
    color: #495057;
    font-weight: 500;
    padding: 8px 20px;
    border-radius: 14px;
    transition:
        background 0.2s,
        color 0.2s;
    background: transparent;
    display: inline-block;
    border: none;
}
.app-nav a:hover {
    background: #e3e9f3;
    color: #2563eb;
}
.app-nav a.router-link-exact-active {
    font-weight: bold;
    color: #fff;
    background: linear-gradient(90deg, #69e8ca 60%, #68eab0 100%);
    box-shadow: 0 2px 8px 0 rgba(60, 60, 60, 0.1);
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
    /* padding: 30px; Increased padding for better spacing */
    overflow-y: auto; /* 如果内容过多则允许滚动 */
    box-sizing: border-box; /* Ensure padding is included within the element's total width and height */
}
</style>
