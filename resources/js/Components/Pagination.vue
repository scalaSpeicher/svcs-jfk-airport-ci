<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

defineProps({
    links: {
        type: Array,
        default: () => ([]),
    },
    nextIcon: {
        type: Boolean,
        default: () => true,
    },
    previousIcon: {
        type: Boolean,
        default: () => true,
    },
});
</script>

<template>
    <div v-if="links && links.length > 3">
        <div class="flex flex-wrap -mb-1">
            <template v-for="(link, key) in links">
                <div
                    v-if="link.url === null"
                    :key="key"
                    class="mb-1 mr-1 px-4 py-3 text-gray-400 text-sm leading-4 border rounded"
                    v-html="link.label"
                />
                <Link
                    v-else
                    :key="`link-${key}`"
                    class="mb-1 mr-1 px-4 py-3 focus:text-indigo-500 text-sm leading-4 hover:bg-gray-50 border focus:border-indigo-500 rounded"
                    :class="{ 'bg-gray-200': link.active }"
                    :href="link.url"
                    v-html="link.label"
                />
            </template>
        </div>
    </div>
</template>
