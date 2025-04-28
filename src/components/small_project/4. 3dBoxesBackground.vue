<template>
    <div :class="styles.componentWrapper">
        <button :class="styles.magicButton" @click="toggleBoxesSize">Magic 🎩</button>
        <div :class="[styles.boxesContainer, { [styles.big]: isBig }]">
            <div
                v-for="(box, index) in boxes"
                :key="index"
                :class="styles.box"
                :style="{ backgroundPosition: box.backgroundPosition }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import styles from '@/assets/modules/4. 3dBoxesBackground.module.scss'

// 创建4x4的网格数据
const boxes = ref(
    Array.from({ length: 4 }, (_, i) =>
        Array.from({ length: 4 }, (_, j) => ({
            backgroundPosition: `${-j * 125}px ${-i * 125}px`,
        })),
    ).flat(),
)

// 控制大小状态
const isBig = ref(true)

// 切换大小的函数
function toggleBoxesSize() {
    isBig.value = !isBig.value
}
</script>
