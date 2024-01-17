<script setup>

import AppLayout from '@/Layouts/AppLayout.vue';
import EditPlannersForm from'@/Pages/Planners/Partials/EditPlannersForm.vue'
import SectionBorder from '@/Components/SectionBorder.vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    planners: {
        type: Object,
        default: () => ({}),
    },
    checkinDesks: {
        type: Array,
        default: () => ([]),
    },
    canEditPlanners: {
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
                AirPortal JFK Terminal 4&nbsp;|&nbsp;{{ (props.formMode === 'add') ? 'New Planner' : 'Modify Planner(s)' }}
            </h2>
        </template>
        <div v-if="canEditPlanners">
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <EditPlannersForm
                    :planners="$page.props.planners"
                    :checkin-desks="$page.props.checkinDesks"
                    :can-edit-planners="canEditPlanners"
                    :form-mode="$page.props.formMode"
                />
                <SectionBorder />
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
