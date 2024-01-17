<script setup>

import AppLayout from '@/Layouts/AppLayout.vue';
import AddRoleForm from'@/Pages/Roles/Partials/AddRoleForm.vue'
import SectionBorder from '@/Components/SectionBorder.vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    role: {
        type: Object,
        default: () => ({})
    },
    usersOptions: {
        type: Array,
        default: () => ([]),
    },
    formMode: {
        type: String,
        default: () => (''),
    },
    canReadRoles: {
        type: Boolean,
        default: () => false,
    },
    canEditRoles: {
        type: Boolean,
        default: () => false,
    },
    canAddRoles: {
        type: Boolean,
        default: () => false,
    },
    canDeleteRoles: {
        type: Boolean,
        default: () => false,
    },
});

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;{{ ($page.props.formMode == 'editRole') ? 'Update' : 'Add' }} Role
            </h2>
        </template>
        <div v-if="canReadRoles">
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <AddRoleForm
                    :can-edit-roles="canEditRoles"
                    :can-add-roles="canAddRoles"
                    :can-delete-roles="canDeleteRoles"
                    :role="$page.props.role"
                    :users-options="$page.props.usersOptions"
                    :form-mode="$page.props.formMode"
                />
                <SectionBorder />
            </div>
        </div>
        <!-- If can't add new role -->
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
