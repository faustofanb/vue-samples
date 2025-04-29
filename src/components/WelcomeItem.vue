<template>
    <div class="item">
        <div class="icon-col">
            <i class="icon">
                <slot name="icon"></slot>
            </i>
        </div>
        <div class="content-col">
            <h3 class="title">
                <slot name="heading"></slot>
            </h3>
            <div class="details">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// ...existing code...
</script>

<style scoped lang="scss">
.item {
    display: flex;
    align-items: center;
    width: 100%;
}
.icon-col {
    flex: 0 0 48px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
}
.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
}
.content-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 12px;
}
.title {
    font-size: 1.2em;
    font-weight: 600;
    color: #222;
    margin: 0 0 8px 0;
    line-height: 40px;
    display: flex;
    align-items: center;
}
.details {
    flex: 1;
}
</style>
