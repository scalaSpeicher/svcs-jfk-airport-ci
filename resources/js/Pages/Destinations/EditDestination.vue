<script setup>

import AppLayout from '@/Layouts/AppLayout.vue';
import EditDestinationForm from'@/Pages/Destinations/Partials/EditDestinationForm.vue'
import SectionBorder from '@/Components/SectionBorder.vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    destination: {
        type: Object,
        default: () => ({}),
    },
    canEditDestinations: {
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
                AirPortal JFK Terminal 4&nbsp;|&nbsp;{{ (props.formMode === 'editDestination') ? 'Modify ' : 'Add ' }}Destination
            </h2>
        </template>
        <div v-if="canEditDestinations">
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <EditDestinationForm
                    :can-edit-destinations="canEditDestinations"
                    :destination="$page.props.destination"
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
                :href="route('destinations.index')"
                :active="route().current('destinations.index')"
            >
                Return to Destinations List Page
            </NavLink>
        </div>
    </AppLayout>
</template>
