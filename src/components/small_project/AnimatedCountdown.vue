<template>
    <div class="componentWrapper">
        <div class="counter" :class="{ hide: isCounterHide }">
            <div class="nums">
                <!-- 遍历数字，动态绑定动画类 -->
                <span v-for="(num, idx) in nums" :key="num" :class="numClass(idx)">{{ num }}</span>
            </div>
            <h4>Get Ready</h4>
        </div>
        <div class="final" :class="{ show: isFinalShow }">
            <h1>GO</h1>
            <button class="btn-replay" @click="onReplay">
                <span>Replay</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

// 倒计时数字数组
const nums = [99, 5, 4, 3, 2, 1, 0]
// 当前显示的数字索引
const currentIdx = ref(0)
// 当前动画阶段：'in' 或 'out'
const phase = ref('in')
// 控制倒计时区域隐藏
const isCounterHide = ref(false)
// 控制最终GO区域显示
const isFinalShow = ref(false)

// 根据索引返回对应的动画类名
function numClass(idx: number) {
    if (idx < currentIdx.value) return 'out'
    if (idx === currentIdx.value) return phase.value
    return ''
}

// 启动动画流程
function startAnimation() {
    currentIdx.value = 0
    phase.value = 'in'
    isCounterHide.value = false
    isFinalShow.value = false
    // 等待DOM更新后启动动画
    nextTick(() => animateStep())
}

// 控制每一步动画的切换
function animateStep() {
    if (phase.value === 'in') {
        setTimeout(() => {
            if (currentIdx.value < nums.length - 1) {
                phase.value = 'out'
                animateStep()
            } else {
                // 最后一个数字in动画结束，显示GO
                isCounterHide.value = true
                setTimeout(() => {
                    isFinalShow.value = true
                }, 200)
            }
        }, 500)
    } else if (phase.value === 'out') {
        setTimeout(() => {
            currentIdx.value++
            phase.value = 'in'
            animateStep()
        }, 500)
    }
}

// 点击Replay按钮重新开始动画
function onReplay() {
    startAnimation()
}

// 组件挂载后自动启动动画
onMounted(() => {
    startAnimation()
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

// SCSS 变量定义，统一管理主题色、字体、尺寸等
$main-color: #3498db; // 主色调
$btn-hover-color: darken($main-color, 10%); // 按钮悬停色
$font-main: 'Roboto', sans-serif; // 主字体
$nums-width: 250px; // 数字区域宽度
$nums-height: 50px; // 数字区域高度
$nums-font-size: 50px; // 数字字体大小

// 全局盒模型设置，方便布局
* {
    box-sizing: border-box;
}

// 组件整体样式，设置字体、全屏高度、背景色
.componentWrapper {
    font-family: $font-main;
    margin: 0;
    height: 100vh;
    overflow: hidden;
    background: #f8fafc;
}

// 副标题样式
h4 {
    font-size: 20px;
    margin: 5px;
    text-transform: uppercase;
}

// 倒计时数字区域样式，居中、动画性能优化
.counter {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    will-change: transform;
    transition: transform 0.2s;

    // 隐藏时的动画
    &.hide {
        transform: translate(-50%, -50%) scale(0);
        animation: hide 0.2s ease-out;
    }
}

// 隐藏动画关键帧
@keyframes hide {
    0% {
        transform: translate(-50%, -50%) scale(1);
    }
    100% {
        transform: translate(-50%, -50%) scale(0);
    }
}

// 最终“GO”区域样式，初始隐藏，动画显示
.final {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    text-align: center;
    will-change: transform;
    transition: transform 0.2s;

    // 显示时的动画
    &.show {
        transform: translate(-50%, -50%) scale(1);
        animation: show 0.2s ease-out;
    }
}

// 显示动画关键帧
@keyframes show {
    0% {
        transform: translate(-50%, -50%) scale(0);
    }
    30% {
        transform: translate(-50%, -50%) scale(1.4);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
    }
}

// 数字动画区域样式
.nums {
    color: $main-color;
    font-size: $nums-font-size;
    position: relative;
    overflow: hidden;
    width: $nums-width;
    height: $nums-height;
    margin: 0 auto;
    will-change: transform;

    // 每个数字的动画初始状态
    span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(120deg);
        transform-origin: bottom center;
        will-change: transform;

        // 数字进入动画
        &.in {
            transform: translate(-50%, -50%) rotate(0deg);
            animation: goIn 0.5s ease-in-out;
        }
        // 数字离开动画
        &.out {
            animation: goOut 0.5s ease-in-out;
        }
    }
}

// 数字进入动画关键帧
@keyframes goIn {
    0% {
        transform: translate(-50%, -50%) rotate(120deg);
    }
    30% {
        transform: translate(-50%, -50%) rotate(-20deg);
    }
    60% {
        transform: translate(-50%, -50%) rotate(10deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
}

// 数字离开动画关键帧
@keyframes goOut {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    60% {
        transform: translate(-50%, -50%) rotate(20deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(-120deg);
    }
}

// 响应式适配，适配小屏幕
@media (max-width: 500px) {
    .nums {
        width: 140px;
        height: 32px;
        font-size: 28px;
    }
    .counter,
    .final {
        h4,
        h1 {
            font-size: 16px;
        }
    }
}

// 按钮样式，使用类名，带有悬停动画
.btn-replay {
    background-color: $main-color;
    border-radius: 3px;
    border: none;
    color: aliceblue;
    padding: 5px 18px;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 18px;
    margin-top: 10px;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.08);
    outline: none;

    // 悬停时变色
    &:hover {
        background-color: $btn-hover-color;
    }

    // 按钮文字动画
    span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.3s;

        // 箭头动画
        &:after {
            content: '\00bb';
            position: absolute;
            opacity: 0;
            top: 0;
            right: -20px;
            transition: 0.5s;
        }
    }

    // 悬停时文字右移并显示箭头
    &:hover span {
        padding-right: 25px;

        &:after {
            opacity: 1;
            right: 0;
        }
    }
}
</style>
