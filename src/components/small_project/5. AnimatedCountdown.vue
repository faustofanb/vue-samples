<template>
    <div :class="styles.componentWrapper">
        <div :class="[styles.counter, { [styles.hide]: isCounterHide }]">
            <div :class="styles.nums">
                <span v-for="(num, idx) in nums" :key="num" :class="[styles[numClass(idx)]]">
                    {{ num }}
                </span>
            </div>
            <h4>Get Ready</h4>
        </div>
        <div :class="[styles.final, { [styles.show]: isFinalShow }]">
            <h1>GO</h1>
            <button :class="styles.btnReplay" @click="onReplay">
                <span>Replay</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import styles from '@/assets/modules/5. AnimatedCountdown.module.scss'

const nums = [3, 2, 1, 0]
const currentIdx = ref(0)
const phase = ref('in')
const isCounterHide = ref(false)
const isFinalShow = ref(false)

function numClass(idx: number) {
    if (idx < currentIdx.value) return 'out'
    if (idx === currentIdx.value) return phase.value
    return ''
}

function startAnimation() {
    currentIdx.value = 0
    phase.value = 'in'
    isCounterHide.value = false
    isFinalShow.value = false
    nextTick(() => animateStep())
}

function animateStep() {
    if (currentIdx.value >= nums.length) {
        isCounterHide.value = true
        setTimeout(() => {
            isFinalShow.value = true
        }, 200)
        return
    }

    // 当前数字的 in 动画
    phase.value = 'in'
    setTimeout(() => {
        // 当前数字的 out 动画
        phase.value = 'out'
        setTimeout(() => {
            // out 动画完成后，移动到下一个数字
            currentIdx.value++
            // 继续下一个动画循环
            animateStep()
        }, 500) // out 动画持续时间
    }, 500) // in 动画持续时间
}

function onReplay() {
    startAnimation()
}

onMounted(() => {
    startAnimation()
})
</script>
