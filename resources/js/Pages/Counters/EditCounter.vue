<script setup>

import AppLayout from '@/Layouts/AppLayout.vue';
import EditCounterForm from'@/Pages/Counters/Partials/EditCounterForm.vue'
import SectionBorder from '@/Components/SectionBorder.vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    counter: {
        type: Object,
        default: () => ({}),
    },
    canEditCounters: {
        type: Boolean,
        default: () => false,
    },
    airlinesData: {
        type: Object,
        default: () => ({}),
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
            <h2
                class="font-semibold text-xl text-gray-800 leading-tight"
            >
                AirPortal JFK Terminal 4&nbsp;|&nbsp;{{ (props.formMode === 'editCounter') ? 'Modify ' : 'Add ' }}Counter
            </h2>
        </template>
        <div v-if="canEditCounters">
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <EditCounterForm
                    :counter="$page.props.counter"
                    :airlines-data="$page.props.airlinesData"
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
                :href="route('counters.index')"
                :active="route().current('counters.index')"
            >
                Return to Counters List Page
            </NavLink>
        </div>
    </AppLayout>
</template>
