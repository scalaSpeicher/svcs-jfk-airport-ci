<script setup>
import { computed, useSlots } from 'vue';
import SectionTitle from './SectionTitleWide.vue';

defineEmits(['submitted']);

const hasActions = computed(() => !! useSlots().actions);
</script>

<template>
    <div class="">
        <SectionTitle>
            <template #title>
                <slot name="title" />
            </template>
        </SectionTitle>

        <div class="mt-5 md:mt-0">
            <form @submit.prevent="$emit('submitted')">
                <div class="">
                    <slot name="form" />
                </div>

                <div
                    v-if="hasActions"
                    class="flex items-center justify-end px-4 py-3 bg-gray-50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md"
                >
                    <slot name="actions" />
                </div>
            </form>
        </div>
    </div>
</template>
