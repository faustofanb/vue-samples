<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
</script>
<template>
    <div class="about">
        <h1>About This Application</h1>
        <p class="description">
            Welcome to the about page! This is a sample Vue application demonstrating various
            features and layouts. Below is a simple counter using Pinia for state management.
        </p>
        <div class="counter-section">
            <button @click="counterStore.increment">Click Me!</button>
            <span>Current Count: {{ counterStore.count }}</span>
        </div>
    </div>
</template>

<style scoped>
.about {
    display: flex;
    flex-direction: column; /* Stack elements vertically */
    align-items: center; /* Center horizontally */
    justify-content: center; /* Center vertically */
    text-align: center;
    padding: 40px; /* Add some padding */
    height: 100%; /* Ensure it takes full height of its container */
    box-sizing: border-box; /* Include padding in height calculation */
}

h1 {
    color: var(--color-heading);
    margin-bottom: 20px;
    font-size: 2.5em; /* Larger heading */
}

.description {
    color: var(--color-text);
    max-width: 600px; /* Limit text width for readability */
    line-height: 1.8;
    margin-bottom: 30px;
}

.counter-section {
    display: flex;
    align-items: center;
    gap: 15px; /* Space between button and text */
}

button {
    padding: 12px 25px;
    font-size: 1em;
    color: white;
    background-color: hsla(160, 100%, 37%, 1); /* Vue green */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: hsla(160, 100%, 30%, 1); /* Darker green on hover */
}

.counter-section span {
    font-size: 1.1em;
    color: var(--color-text);
}
</style>
