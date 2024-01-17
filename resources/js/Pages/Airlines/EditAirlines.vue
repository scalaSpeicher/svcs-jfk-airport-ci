<script setup>

import AppLayout from '@/Layouts/AppLayout.vue';
import EditAirlinesGeneralForm from'@/Pages/Airlines/Partials/EditAirlinesGeneralForm.vue'
import EditAirlinesBrandingForm from'@/Pages/Airlines/Partials/EditAirlinesBrandingForm.vue'
import EditAirlinesLidsForm from'@/Pages/Airlines/Partials/EditAirlinesLidsForm.vue'
import EditAirlinesLogosForm from'@/Pages/Airlines/Partials/EditAirlinesLogosForm.vue'
import SectionBorder from '@/Components/SectionBorder.vue';
import { reactive } from 'vue';
import SecondaryNavLink from '@/Components/SecondaryNavLink.vue'
import NavLink from '@/Components/NavLink.vue';

const props = defineProps({
    airline: {
        type: Object,
        default: () => ({}),
    },
    airlines_basic: {
        type: Object,
        default: () => ({}),
    },
    airlines_branding: {
        type: Object,
        default: () => ({}),
    },
    airlines_labels_lid: {
        type: Object,
        default: () => ({}),
    },
    canEditAirlines: {
        type: Boolean,
        default: () => false,
    },
    canEditLabels: {
        type: Boolean,
        default: () => false,
    },
    canEditBranding: {
        type: Boolean,
        default: () => false,
    },
    canEditLogos: {
        type: Boolean,
        default: () => false,
    },
});

const formShown = reactive({ form: 'general', genActive: true, brandActive: false, lidsActive: false, logosActive: false });

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <div>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    AirPortal JFK Terminal 4&nbsp;|&nbsp;Modify Airline
                </h2>
            </div>
        </template>
        <!-- <div style="width:100%; height:30px;" />         -->
        <div v-if="canEditAirlines">
            <div class="space-x-8 flex justify-center bg-white shadow">
                <SecondaryNavLink
                    :active="formShown.genActive"
                    @click="formShown.form = 'general', formShown.genActive = true, formShown.brandActive = false, formShown.lidsActive = false, formShown.logosActive = false"
                >
                    General
                </SecondaryNavLink>
                <SecondaryNavLink
                    :active="formShown.brandActive"
                    @click="formShown.form = 'branding', formShown.genActive = false, formShown.brandActive = true, formShown.lidsActive = false, formShown.logosActive = false"
                >
                    Branding
                </SecondaryNavLink>
                <SecondaryNavLink
                    :active="formShown.logosActive"
                    @click="formShown.form = 'logos', formShown.genActive = false, formShown.brandActive = false, formShown.lidsActive = false, formShown.logosActive = true"
                >
                    Logos
                </SecondaryNavLink>
                <SecondaryNavLink
                    :active="formShown.lidsActive"
                    @click="formShown.form = 'lids', formShown.genActive = false, formShown.brandActive = false, formShown.lidsActive = true, formShown.logosActive = false"
                >
                    LIDS
                </SecondaryNavLink>
            </div>
            <div class="max-w-7xl mx-auto px-400 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div v-show="formShown.form === 'logos'">
                        <EditAirlinesLogosForm
                            :airlines_branding="$page.props.airlines_branding"
                            :airline="$page.props.airlines_basic"
                            :can-edit-logos="canEditLogos"
                            class="mt-6"
                        />
                    </div>
                    <div v-show="formShown.form === 'branding'">
                        <EditAirlinesBrandingForm
                            :airlines_branding="$page.props.airlines_branding"
                            :airline="$page.props.airlines_basic"
                            :can-edit-branding="canEditBranding"
                            class="mt-6"
                        />
                    </div>
                    <div v-show="formShown.form === 'general'">
                        <EditAirlinesGeneralForm
                            :airline="$page.props.airlines_basic"
                            :can-edit-airlines="canEditAirlines"
                            class="mt-6"
                        />
                    </div>
                    <div v-show="formShown.form === 'lids'">
                        <EditAirlinesLidsForm
                            :airlines_labels_lid="$page.props.airlines_labels_lid"
                            :airlines_branding="$page.props.airlines_branding"
                            :airline="$page.props.airlines_basic"
                            :can-edit-labels="canEditLabels"
                            class="mt-6"
                        />
                    </div>
                    <SectionBorder />
                </div>
            </div>
        </div>

        <!-- If can't edit airlines -->
        <!-- <div v-else class="sm:flex justify-center"> -->
        <div
            v-else
            class="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"
        >
            <p>You do not have permission to access this page.</p>
            <NavLink
                :href="route('airlines.index')"
                :active="route().current('airlines.index')"
            >
                Return to Airlines List Page
            </NavLink>
        </div>
    </AppLayout>
</template>
