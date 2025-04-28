<script setup lang="ts">
import { ref } from 'vue'

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

<template>
    <div class="component-wrapper">
        <button class="magic-button" @click="toggleBoxesSize">Magic 🎩</button>
        <div class="boxes-container" :class="{ big: isBig }">
            <div
                v-for="(box, index) in boxes"
                :key="index"
                class="box"
                :style="{ backgroundPosition: box.backgroundPosition }"
            />
        </div>
    </div>
</template>

<style scoped>
/* General styles for the component wrapper */
.component-wrapper {
    /* Mimic original body centering if needed, or style as appropriate */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* Center content vertically */
    gap: 20px; /* Space between button and boxes */
    padding: 20px;
    width: 100%;
    min-height: 100vh; /* Ensure it takes full viewport height */
    box-sizing: border-box;
    /* Original background, can be adjusted or inherited */
    background-color: #fafafa;
    overflow: hidden; /* Prevent scrollbars from pseudo-elements */
    font-family: 'Roboto', sans-serif; /* Match original font if needed */
}

/* Styles for the button, adapted from original */
.magic-button {
    background-color: #f9ca24; /* Original yellow color */
    color: #fff;
    border: 0;
    border-radius: 3px;
    font-size: 16px;
    padding: 12px 20px;
    cursor: pointer;
    /* Removed fixed positioning */
    /* position: fixed; */
    /* top: 20px; */
    letter-spacing: 1px;
    box-shadow: 0 3px rgba(249, 202, 36, 0.5);
    z-index: 100;
    transition:
        transform 0.1s ease,
        box-shadow 0.1s ease;
}

.magic-button:focus {
    outline: none;
}

.magic-button:active {
    /* Slightly move down and reduce shadow on click */
    transform: translateY(2px);
    box-shadow: 0 1px rgba(249, 202, 36, 0.5);
}

/* Styles for the boxes container */
.boxes-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; /* Distribute space evenly */
    align-items: center; /* Align items vertically */
    /* Initial size (small state), adjust if needed */
    height: 500px;
    width: 500px;
    position: relative; /* Needed for pseudo-elements of children */
    transition: 0.4s ease; /* Smooth transition for size change */
    /* Center the container itself if wrapper is wider */
    /* margin: 0 auto; - Handled by flex in wrapper */
}

/* Styles for the container when it has the 'big' class */
.boxes-container.big {
    width: 600px;
    height: 600px;
}

/* Styles for the individual boxes */
.box {
    /* The background image (Minions GIF) */
    background-image: url('https://media.giphy.com/media/EZqwsBSPlvSda/giphy.gif');
    background-repeat: no-repeat;
    /* The size of the full background image */
    background-size: 500px 500px;
    position: relative; /* For positioning pseudo-elements */
    /* Size of each individual box */
    height: 125px;
    width: 125px;
    transition: transform 0.4s ease; /* Smooth transition for rotation */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Subtle shadow */
}

/* When container is big, rotate the boxes */
.boxes-container.big .box {
    transform: rotateZ(360deg);
}

/* Pseudo-elements for the 3D effect */
/* Right side */
.box::after {
    content: '';
    background-color: #f6e58d; /* Slightly lighter yellow for side */
    position: absolute;
    top: 8px;
    right: -15px; /* Position outside the box */
    height: 100%;
    width: 15px; /* Thickness of the side */
    transform: skewY(45deg); /* Skew to create 3D perspective */
}

/* Bottom side */
.box::before {
    content: '';
    background-color: #f9ca24; /* Main yellow for bottom */
    position: absolute;
    bottom: -15px; /* Position below the box */
    left: 8px;
    height: 15px; /* Thickness of the bottom */
    width: 100%;
    transform: skewX(45deg); /* Skew to create 3D perspective */
}
</style>
