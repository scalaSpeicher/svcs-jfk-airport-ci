<script setup>

import AppLayout from '@/Layouts/AppLayout.vue';
import EditTemplatesForm from'@/Pages/Templates/Partials/EditTemplatesForm.vue';
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    template: {
        type: Object,
        default: () => ({}),
    },
    templates: {
        type: Object,
        default: () => ({}),
    },
    templateField: {
        type: Object,
        default: () => ({}),
    },
    templateFields: {
        type: Object,
        default: () => ({}),
    },
    canEditTemplates: {
        type: Boolean,
        default: () => false,
    },
    canDeleteTemplates: {
        type: Boolean,
        default: () => false,
    },
    canAddTemplates: {
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
                AirPortal JFK Terminal 4&nbsp;|&nbsp;{{ (props.formMode === 'add') ? 'New Template' : 'Modify Template' }}
            </h2>
        </template>
        <div v-if="canEditTemplates">
            <div class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <EditTemplatesForm
                    :templates="$page.props.templates"
                    :template="$page.props.template"
                    :template-fields="$page.props.templateFields"
                    :template-field="$page.props.templateField"
                    :can-edit-templates="canEditTemplates"
                    :can-delete-templates="canDeleteTemplates"
                    :can-add-templates="canAddTemplates"
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
