<script setup>

import AppLayout from '@/Layouts/AppLayout.vue';
import EditMessagesForm from'@/Pages/Messages/Partials/EditMessagesForm.vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    playerMessage: {
        type: Object,
        default: () => ({}),
    },
    messageComponents: {
        type: Object,
        default: () => ({}),
    },
    template: {
        type: Object,
        default: () => ({}),
    },
    canEditMessages: {
        type: Boolean,
        default: () => false,
    },
    canAddMessages: {
        type: Boolean,
        default: () => false,
    },
    canDeleteMessages: {
        type: Boolean,
        default: () => false,
    },
    canRefreshMessages: {
        type: Boolean,
        default: () => false,
    },
    formMode: {
        type: String,
        default: () => (''),
    },
    flash: {
        type: Object,
        default: () => ({}),
    },
});

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;{{ (props.formMode === 'add') ? 'New Message' : 'Modify Message(s)' }}
            </h2>
        </template>
        <div v-if="canEditMessages">
            <div class="w-full mx-auto py-10 sm:px-6 lg:px-8">
                <EditMessagesForm
                    :player-message="$page.props.playerMessage"
                    :message-components="$page.props.messageComponents"
                    :template="$page.props.template"
                    :can-edit-messages="canEditMessages"
                    :can-refresh-messages="canRefreshMessages"
                    :can-add-messages="canAddMessages"
                    :form-mode="$page.props.formMode"
                    :flash="$page.props.flash"
                />
            </div>
        </div>
        <!-- If can't edit counter -->
        <div
            v-else
            class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"
        >
            <p>You do not have permission to access this page.</p>
            <NavLink
                :href="route('planners.index',{_query:{today_only:0,search_by:'open',active_only:1,sort:'checkindesk'}})"
                :active="route().current('planners.index')"
            >
                Return to Main Page
            </NavLink>
        </div>
    </AppLayout>
</template>