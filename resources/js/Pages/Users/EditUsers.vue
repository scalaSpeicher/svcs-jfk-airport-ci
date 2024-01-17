<script setup>

import AppLayout from '@/Layouts/AppLayout.vue';
import EditUserForm from'@/Pages/Users/Partials/EditUserForm.vue'
import SectionBorder from '@/Components/SectionBorder.vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
    airlines: {
        type: Object,
        default: () => ({})
    },
    roles: {
        type: Object,
        default: () => ({})
    },
    canEditUsers: {
        type: Boolean,
        default: () => false,
    },
    canAddUsers: {
        type: Boolean,
        default: () => false,
    },
    canDeleteUsers: {
        type: Boolean,
        default: () => false,
    },
    formMode: {
        type: String,
        default: () => (''),
    }
});

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;Modify User
            </h2>
        </template>
        <div v-if="canEditUsers">
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <EditUserForm
                    :can-edit-users="canEditUsers"
                    :can-add-users="canAddUsers"
                    :can-delete-users="canDeleteUsers"
                    :user="$page.props.user"
                    :roles="$page.props.roles"
                    :airlines="$page.props.airlines"
                    :form-mode="$page.props.formMode"
                />
                <SectionBorder />
            </div>
        </div>
        <!-- If can't edit destination -->
        <div
            v-else
            class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"
        >
            <p>You do not have permission to access this page.</p>
            <NavLink
                :href="route('users.index')"
                :active="route().current('users.index')"
            >
                Return to Users List Page
            </NavLink>
        </div>
    </AppLayout>
</template>
