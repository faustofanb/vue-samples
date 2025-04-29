<template>
    <div class="detail-container">
        <div v-if="allFiles.length === 0">暂无文件</div>
        <template v-else>
            <div class="file-tabs">
                <div
                    v-for="file in allFiles"
                    :key="file.path"
                    :class="['file-tab', { active: file.path === activeFile }]"
                    @click="selectFile(file.path)"
                >
                    {{ file.path }}
                </div>
            </div>
            <div v-if="currentFile" class="file-row">
                <div class="file-col code-col">
                    <pre class="code-block">{{ currentFile.code }}</pre>
                </div>
                <div
                    class="file-col preview-col"
                    v-if="currentFile.path.endsWith('.vue') && previewComponent(currentFile.path)"
                >
                    <h3>预览</h3>
                    <ErrorBoundary>
                        <template #default>
                            <component :is="previewComponent(currentFile.path)" />
                        </template>
                        <template #error>
                            <div class="preview-error-fail">挑战失败</div>
                        </template>
                    </ErrorBoundary>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineAsyncComponent, h } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const dirName = ref(decodeURIComponent(route.params.dirName as string))

// 该目录下所有文件（包括子目录）
const allFiles = ref<{ path: string; code: string }[]>([])
const activeFile = ref('')
const currentFile = ref<{ path: string; code: string } | null>(null)
const editContent = ref('') // 保留但不再使用

// 递归导入 challenges/dirName 下所有文件源码
const modules = import.meta.glob('../components/challenges/*/*', { as: 'raw' })
const vueModules = import.meta.glob('../components/challenges/*/*.vue')

// 添加计算属性来处理当前目录
const currentDir = ref('')

async function loadAllFiles() {
    allFiles.value = []
    for (const path in modules) {
        const match =
            path.match(/challenges\\([^/]+)\\(.+)$/) || path.match(/challenges\/([^/]+)\/(.+)$/)
        if (match && match[1] === dirName.value) {
            try {
                const code = await modules[path]()
                allFiles.value.push({ path: match[2], code })
                // 更新当前目录
                currentDir.value = match[1]
            } catch (e) {
                // 非文本文件可能无法读取，忽略
            }
        }
    }
    // 加载完毕后主动选中 App.vue 或第一个文件
    if (allFiles.value.length > 0) {
        const appFile = allFiles.value.find((f) => f.path === 'App.vue')
        if (appFile) {
            activeFile.value = appFile.path
            currentFile.value = appFile
        } else {
            activeFile.value = allFiles.value[0].path
            currentFile.value = allFiles.value[0]
        }
    } else {
        activeFile.value = ''
        currentFile.value = null
    }
}

function selectFile(path: string) {
    activeFile.value = path
    const file = allFiles.value.find((f) => f.path === path) || null
    currentFile.value = file
    // 不再赋值 editContent
}

function previewComponent(path: string) {
    if (!path.endsWith('.vue')) return null
    // 构建完整的模块路径
    const fullPath = `../components/challenges/${currentDir.value}/${path}`

    // 规范化路径处理
    const normalizedPath = fullPath.replace(/\\/g, '/')

    // 查找匹配的模块
    for (const key in vueModules) {
        const normalizedKey = key.replace(/\\/g, '/')
        if (normalizedKey === normalizedPath) {
            return defineAsyncComponent(vueModules[key] as any)
        }
    }
    return null
}

watch(
    currentFile,
    (file) => {
        if (file) {
            editContent.value = file.code
        }
    },
    { immediate: true },
)

onMounted(loadAllFiles)
watch(
    () => route.params.dirName,
    (val) => {
        dirName.value = decodeURIComponent(val as string)
        loadAllFiles()
    },
)

// 错误边界组件
const ErrorBoundary = {
    name: 'ErrorBoundary',
    props: { error: Object },
    data() {
        return { errorState: null }
    },
    errorCaptured(err) {
        this.errorState = err
        return false
    },
    render() {
        if (this.errorState) {
            return this.$slots.error
                ? this.$slots.error({ err: this.errorState })
                : h('div', '渲染出错')
        }
        return this.$slots.default?.()
    },
}
</script>

<style scoped>
.detail-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
}

.file-row {
    display: flex;
    gap: 24px;
    align-items: stretch;
    background: #ffffff;
    margin: 0;
    padding: 20px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.code-col,
.preview-col {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
}

.file-tabs {
    display: flex;
    gap: 1px;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 0;
    background: #f3f4f6;
    border-radius: 8px 8px 0 0;
    overflow-x: auto;
    position: sticky;
    top: 0;
    z-index: 2;
}

.file-tab {
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    color: #4b5563;
    background: #f3f4f6;
    border: none;
    outline: none;
    transition: all 0.2s ease;
    position: relative;
    font-family:
        system-ui,
        -apple-system,
        sans-serif;
}

.file-tab::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: transparent;
    transition: background-color 0.2s ease;
}

.file-tab:hover {
    color: #1a56db;
    background: #fff;
}

.file-tab.active {
    background: #fff;
    color: #1a56db;
    font-weight: 500;
}

.file-tab.active::after {
    background: #1a56db;
}

.code-col {
    flex: 6 0 0%;
    min-width: 0;
}

.preview-col {
    flex: 4 0 0%;
    min-width: 300px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 20px;
}

.preview-col h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    color: #334155;
    font-weight: 500;
    font-family:
        system-ui,
        -apple-system,
        sans-serif;
}

.code-block {
    background: #f8fafc;
    padding: 20px 24px;
    border-radius: 8px;
    max-width: 100%;
    overflow: auto;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    white-space: pre;
    font-family: 'Fira Code', 'Fira Mono', 'Consolas', monospace;
    color: #334155;
    min-height: 200px;
    border: 1px solid #e2e8f0;
}

/* 优化滚动条样式 */
.code-block::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

.code-block::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 8px;
}

.code-block::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 8px;
    border: 2px solid #f1f5f9;
}

.code-block::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}

@media (max-width: 1100px) {
    .file-row {
        gap: 20px;
        padding: 20px;
    }
    .preview-col {
        min-width: 260px;
        padding: 16px;
    }
    .code-block {
        padding: 16px;
        font-size: 13px;
    }
}

@media (max-width: 800px) {
    .file-row {
        flex-direction: column;
        gap: 24px;
    }
    .code-col,
    .preview-col {
        width: 100%;
    }
    .preview-col {
        min-width: 0;
    }
}

@media (max-width: 500px) {
    .file-tabs {
        gap: 0;
    }
    .file-tab {
        padding: 8px 16px;
        font-size: 13px;
    }
    .file-row {
        padding: 16px;
    }
    .code-block {
        font-size: 12px;
        padding: 12px;
    }
    .preview-col {
        padding: 12px;
    }
}
</style>
