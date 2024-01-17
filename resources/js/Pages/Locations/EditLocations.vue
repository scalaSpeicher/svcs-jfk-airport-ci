<script setup>

import AppLayout from '@/Layouts/AppLayout.vue';
import EditLocationsForm from'@/Pages/Locations/Partials/EditLocationsForm.vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    location: {
        type: Object,
        default: () => ({}),
    },
    locations: {
        type: Object,
        default: () => ({}),
    },
    canEditLocations: {
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
                AirPortal JFK Terminal 4&nbsp;|&nbsp;{{ (props.formMode === 'add') ? 'New Location' : 'Modify Location' }}
            </h2>
        </template>
        <div v-if="canEditLocations">
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <EditLocationsForm
                    :locations="$page.props.locations"
                    :location="$page.props.location"
                    :can-edit-locations="canEditLocations"
                    :form-mode="$page.props.formMode"
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
                Return to Planners List Page
            </NavLink>
        </div>
    </AppLayout>
</template>
