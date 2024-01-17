<script setup>
import ApiTokenManager from '@/Pages/API/Partials/ApiTokenManager.vue';
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({
    tokens: {
        type: Object,
        default: () => ({}),
    },
    availablePermissions: {
        type: Array,
        default: () => ([]),
    },
    apiRoutes: {
        type: Array,
        default: () => ([]),
    },
    defaultPermissions: {
        type: Array,
        default: () => ([]),
    },
    canReadTokens: {
        type: Boolean,
        default: false,
    },
    canCreateTokens: {
        type: Boolean,
        default: false,
    },
    canDeleteTokens: {
        type: Boolean,
        default: false,
    },
    canEditTokens: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <AppLayout title="API Manager">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                API Access & Token Manager
            </h2>
        </template>

        <div>
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <ApiTokenManager
                    :tokens="tokens"
                    :available-permissions="availablePermissions"
                    :default-permissions="defaultPermissions"
                    :api-routes="apiRoutes"
                    :can-read-tokens="canReadTokens"
                    :can-create-tokens="canCreateTokens"
                    :can-delete-tokens="canDeleteTokens"
                    :can-edit-tokens="canEditTokens"
                />
            </div>
        </div>
    </AppLayout>
</template>
