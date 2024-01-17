<script setup>
import { computed, useSlots } from 'vue';
import SectionTitle from '@/Components/SectionTitle.vue';

const { previewHeight, previewWidth, defaultPreview, defaultPreviewSlot } = defineProps({
    previewHeight: {
        type: Number,
        default: () => (540),
    },
    previewWidth: {
        type: Number,
        default: () => (960),
    },
    defaultPreview: {
        type: Boolean,
        default: () => (false),
    },
    defaultPreviewSlot: {
        type: Boolean,
        default: () => (true),
    },
});

defineEmits(["submitted"]);

const hasActions = computed(() => !! useSlots().actions);

</script>

<template>
    <div
        class="player-preview-flex"
    >
        <div
            class="player-preview-left"
            :style="'width: ' + (previewWidth * 0.5) + 'px;'"
        >
            <SectionTitle>
                <template #title>
                    <slot name="title" />
                </template>
                <template #description>
                    <slot name="description" />
                    <div
                        v-if="defaultPreviewSlot"
                        id="message-preview-container-left"
                        class="message-preview-container"
                    >
                        <slot name="preview" />
                    </div>
                </template>
            </SectionTitle>
        </div>
        <div
            class="player-preview-right"
        >
            <form @submit.prevent="$emit('submitted')">
                <div
                    class="px-4 py-5 bg-white sm:p-6 shadow"
                    :class="hasActions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md'"
                >
                    <slot name="form" />
                </div>
                <div
                    v-if="hasActions"
                >
                    <slot name="actions" />
                </div>
            </form>
        </div>
    </div>
    <div class="player-preview-bottom mt-4">
        <div class="block w-full border-t border-gray-200 mb-4" />
        <div
            v-if="!defaultPreview && !defaultPreviewSlot"
            id="message-preview-container-bottom"
            class="message-preview-container"
        >
            <slot name="preview" />
        </div>
        <div
            v-if="defaultPreview"
            class="message-preview-container"
        >
            <div
                :style="'height: ' + previewHeight + 'px; width: ' + previewWidth + 'px;'"
                class="message-preview"
            >
                <div
                    :class="containerClass"
                >
                    <iframe
                        id="iframe"
                        ref="iframe"
                        :key="iframeUpdate"
                        :src="iframeSource"
                        style="position:absolute;top:0;left:0;transform: scale(0.5, 0.5);transform-origin: 0% 0%;"
                        height="1080"
                        width="1920"
                        @change="refreshPreview()"
                    />
                </div>
            </div>
        </div>
    </div>
</template>