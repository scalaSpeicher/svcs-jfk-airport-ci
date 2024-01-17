<script setup>

import AppLayout from '@/Layouts/AppLayout.vue';
import { useForm } from '@inertiajs/vue3';
import NavLink from '@/Components/NavLink.vue';
import FormSection from '@/Components/FormSection.vue';
import ActionMessage from '@/Components/ActionMessage.vue';
import ToggleButton from '@/Components/ToggleButton.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';

const props = defineProps({
    canAddAirlines: {
        type: Boolean,
        default: () => false,
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

const form = useForm({
    iata: '',
    icao: '',
    name: '',
    status: false,
    mode: 'Light',
    primary_color: '#a03d8c',
    secondary_color: '#d31c77',
    tertiary_color: '#002b5c',
    font: 'Poppins',
    font_color_primary: '#ffffff',
    font_color_secondary: '#ffffff',
    fids_color: 'black',
    lids_background_color: '#162f56',
    lids_status_bar_color: '#323237',
    ssbd_logo: 'ssbd_logo/jfkT4_SSBD_3168px_Logo.png',
    logo_small_white: 'default_generic_logo/default_airline_logo.png',
    logo_small_color: 'logo_small_color/wayfinding_icon_jfkT4.png',
    logo_large_white: 'default_generic_logo/default_airline_logo.png',
    logo_large_color: 'logo_large_color/wayfinding_jfkT4.png',
    lids_logo_large: 'lids_logo_large/JFKIAT_Check_In_Counter_Logo.png',
    endcap_fids_logo_small_color: 'endcap_fids_logo_small_color/small_airlines_jfkT4.png',
    wayfinding_arrow_color: 'wayfinding_arrow_color/jfkT4_wf_arrow_up_55x55.png',
    brand_accent_image: 'default_generic_logo/default_airline_logo.png',
});

const onStatusChange = (event) => {
    form.status = event;
}

const addAirlineGeneralInformation = () => {
    form.post(route(
        'airlines.store',
    ), {
        //errorBag: 'createAirline',
        preserveScroll: true,
    });
};

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <div>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    AirPortal JFK Terminal 4&nbsp;|&nbsp;Add Airline
                </h2>
            </div>
        </template>
        <div style="width:100%; height:30px;" />
        <div v-if="canAddAirlines">
            <div class="max-w-7xl mx-auto px-400 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div>
                        <FormSection @submitted="addAirlineGeneralInformation">
                            <template #title>
                                Airline General Information
                            </template>
                            <template #description>
                                <span>Add Airline general information.</span>
                            </template>
                            <template #form>
                                <div id="AddAirlineGeneralForm">
                                    <!-- IATA -->
                                    <div class="col-span-6 sm:col-span-4 mt-2">
                                        <InputLabel
                                            for="iata"
                                            value="IATA"
                                            style="width:300px"
                                        />
                                        <TextInput
                                            id="iata"
                                            v-model="form.iata"
                                            type="text"
                                            class="mt-2 block w-full"
                                            autocomplete="IATA"
                                            style="width:300px;"
                                        />
                                        <InputError
                                            :message="form.errors.iata"
                                            class="mt-2"
                                        />
                                    </div>

                                    <!-- ICAO -->
                                    <div class="col-span-6 sm:col-span-4 mt-4">
                                        <InputLabel
                                            for="icao"
                                            value="ICAO"
                                            style="width:300px"
                                        />
                                        <TextInput
                                            id="icao"
                                            v-model="form.icao"
                                            type="text"
                                            class="mt-2 block w-full"
                                            autocomplete="ICAO"
                                            style="width:300px;"
                                        />
                                        <InputError
                                            :message="form.errors.icao"
                                            class="mt-2"
                                        />
                                    </div>

                                    <!-- Name -->
                                    <div class="col-span-6 sm:col-span-4 mt-4">
                                        <InputLabel
                                            for="name"
                                            value="Airline Name"
                                            style="width:300px"
                                        />
                                        <TextInput
                                            id="name"
                                            v-model="form.name"
                                            type="text"
                                            class="mt-2 block w-full"
                                            autocomplete="Name"
                                            style="width:300px;"
                                        />
                                        <InputError
                                            :message="form.errors.name"
                                            class="mt-2"
                                        />
                                    </div>

                                    <!-- Status -->
                                    <div class="col-span-6 sm:col-span-4 mt-4">
                                        <div
                                            class="mt-2 block w-full"
                                            style="width:300px"
                                        >
                                            <label
                                                id="toggle-label"
                                                class="block font-medium text-sm text-gray-700"
                                                value=""
                                            >Airline Status</label>
                                        </div>
                                        <div style="width:300px; opacity:.5;">
                                            <small id="toggle-description">Turn ON to set airline status to Active</small>
                                        </div>
                                        <ToggleButton
                                            v-model="form.status"
                                            on-label="On"
                                            off-label="Off"
                                            labelledby="toggle-label"
                                            describedby="toggle-description"
                                            false-value="Inactive"
                                            true-value="Active"
                                            :classes="{
                                                container: 'mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30',
                                            }"
                                            @change="onStatusChange($event)"
                                        />
                                    </div>
                                </div>
                            </template>

                            <template #actions>
                                <ActionMessage
                                    :on="form.recentlySuccessful"
                                    class="mr-3"
                                >
                                    {{ $page.props.flash.message }}
                                </ActionMessage>
                                <a href="/airlines">
                                    <SecondaryButton type="button">
                                        Cancel
                                    </SecondaryButton>
                                </a>
                                <span style="width:20px" />
                                <PrimaryButton
                                    :class="{ 'opacity-25': form.processing }"
                                    :disabled="form.processing"
                                >
                                    Save
                                </PrimaryButton>
                            </template>
                        </FormSection>
                    </div>
                </div>
            </div>
        </div>

        <!-- If can't add airline -->
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
