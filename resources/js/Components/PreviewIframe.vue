<script setup>
const { frameHeight, frameWidth, frameSource } = defineProps({
    frameHeight: {
        type: Number,
        default: () => (540),
    },
    frameWidth: {
        type: Number,
        default: () => (960),
    },
    frameSource: {
        type: String,
        default: () => (''),
    },
});

const determineFrameScale = (frameHeight, frameWidth) => {
    let scaleClass = '';
    if (frameHeight >= 1080) {
        scaleClass = 'small'
    } else if (frameHeight <= 720) {
        scaleClass = 'medium'
    } else if (frameHeight <= 540) {
        scaleClass = 'large'
    } else {
        scaleClass = 'full'
    }

    return scaleClass
}
</script>

<template>
    <iframe
        :src="frameSource"
        :class="determineFrameScale()"
        :height="frameHeight"
        :width="frameWidth"
    />
</template>

<style scoped>
.small {
    transform: scale(0.25,0.25);
    transform-origin: 0% 0%;
}
.medium {
    transform: scale(0.5,0.5);
    transform-origin: 0% 0%;
}
.large {
    transform: scale(0.75,0.75);
    transform-origin: 0% 0%;
}
.full {
    transform: scale(1,1);
    transform-origin: 0% 0%;
}
</style>