<script setup>
defineProps({
    on: Boolean,
    html: {
        type: String,
        default: () => (''),
    },
});
</script>

<template>
    <div>
        <transition
            leave-active-class="transition ease-in-out delay-100 duration-1000"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="html == ''"
                v-show="on"
                class="text-sm text-gray-600"
            >
                <slot />
            </div>
            <div
                v-else
                v-show="on"
                class="text-sm text-gray-600"
                v-html="html"
            />
        </transition>
    </div>
</template>
