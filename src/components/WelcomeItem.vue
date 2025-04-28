<template>
    <div class="item flex relative mt-8 md:mt-0 md:px-0 md:py-1 md:pl-[calc(var(--section-gap)/2)]">
        <i
            class="flex items-center justify-center w-8 h-8 text-[var(--color-text)] md:absolute md:top-1/2 md:left-[-26px] md:border md:border-[var(--color-border)] md:bg-[var(--color-background)] md:rounded-lg md:w-[50px] md:h-[50px]"
        >
            <slot name="icon"></slot>
        </i>
        <div class="details flex-1 ml-4">
            <h3 class="text-[1.2rem] font-medium mb-2 text-[var(--color-heading)]">
                <slot name="heading"></slot>
            </h3>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.item:before,
.item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
}
.item:before {
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
}
.item:after {
    top: calc(50% + 25px);
    height: calc(50% - 25px);
}
.item:first-of-type:before {
    display: none;
}
.item:last-of-type:after {
    display: none;
}
</style>
