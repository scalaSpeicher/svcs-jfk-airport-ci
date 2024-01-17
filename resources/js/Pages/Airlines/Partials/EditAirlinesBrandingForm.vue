<script setup>
import { useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

const props = defineProps({
    airlines_basic: {
        type: Object,
        default: () => ({}),
    },
    airline: {
        type: Object,
        default: () => ({}),
    },
    airlines_branding: {
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

const form = useForm({
    mode: props.airlines_branding.mode,
    primary_color: props.airlines_branding.primary_color,
    secondary_color: props.airlines_branding.secondary_color,
    tertiary_color: props.airlines_branding.tertiary_color,
    font: props.airlines_branding.font,
    font_color_primary: props.airlines_branding.font_color_primary,
    font_color_secondary: props.airlines_branding.font_color_secondary,
    fids_color: props.airlines_branding.fids_color,
    ssbd_logo: props.airlines_branding.ssbd_logo,
    logo_small_white: props.airlines_branding.logo_small_white,
    logo_small_color: props.airlines_branding.logo_small_color,
    logo_large_white: props.airlines_branding.logo_large_white,
    logo_large_color: props.airlines_branding.logo_large_color,
    lids_logo_large: props.airlines_branding.lids_logo_large,
    endcap_fids_logo_small_color: props.airlines_branding.endcap_fids_logo_small_color,
    wayfinding_arrow_color: props.airlines_branding.wayfinding_arrow_color,
    brand_accent_image: props.airlines_branding.brand_accent_image,
    form_name: 'airline_branding',
});

const onSelectChange = (event) => {
    form.mode = event.target.value;
}

const updateAirlineBrandingInformation = () => {
    form.put(route(
        'airlines_branding.update',
        props.airline.id
    ), {
        //errorBag: 'updateAirline',
        preserveScroll: true,
    });
};

</script>

<template>
    <FormSection @submitted="updateAirlineBrandingInformation">
        <!-- <FormSection> -->
        <template #title>
            Airline Branding Update
        </template>
        <template #description>
            <span>Update Airline branding information.</span>
            <div class="grid-cols-1">
                <div class="mt-4 ml-6">
                    <span>IATA:&nbsp;&nbsp;</span><span style="font-weight:900">{{ $page.props.airlines_basic.iata }}</span>
                </div>
                <div class="ml-6">
                    <span>ICAO:&nbsp;&nbsp;</span><span style="font-weight:900">{{ $page.props.airlines_basic.icao }}</span>
                </div>
                <div class="ml-6">
                    <span>Name:&nbsp;&nbsp;</span><span style="font-weight:900">{{ $page.props.airlines_basic.name }}</span>
                </div>
            </div>
        </template>
        <template #form>
            <fieldset :disabled="(canEditBranding === false)">
                <div id="EditAirlineBrandingForm">
                    <!-- Mode -->
                    <div class="col-span-6 sm:col-span-4 mt-4">
                        <InputLabel
                            for="mode"
                            value="Mode"
                            style="width:300px"
                        />
                        <select
                            ref="mode"
                            v-model="form.mode"
                            style="width:300px"
                            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            @change="onSelectChange($event)"
                        >
                            <option>
                                {{ props.airlines_branding.mode ? "Dark" : "Light" }}
                            </option>
                            <option>
                                {{ props.airlines_branding.mode ? "Light" : "Dark" }}
                            </option>
                        </select>
                        <InputError
                            :message="form.errors.mode"
                            class="mt-2"
                        />
                    </div>

                    <!-- Primary Color -->
                    <div class="mt-6 mb-0" />
                    <InputLabel
                        for="primary_color"
                        value="Primary Color"
                        style="width:300px"
                    />
                    <div class="flex">
                        <div
                            class="col-span-6 sm:col-span-4"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="primary_color_picker"
                                v-model="form.primary_color"
                                type="color"
                                class="mt-2 block w-full"
                                autocomplete="Color"
                                style="width:24px;"
                            />
                            <InputError
                                :message="form.errors.primary_color"
                                class="mt-2"
                            />
                        </div>
                        <div
                            class="col-span-6 sm:col-span-4 mt-0"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="primary_color"
                                v-model="form.primary_color"
                                type="text"
                                class="mt-1 ml-2 block w-full"
                                autocomplete="Primary Color"
                                style="width:300px"
                            />
                            <InputError
                                :message="form.errors.primary_color"
                                class="mt-2"
                            />
                        </div>
                    </div>

                    <!-- Secondary Color -->
                    <div class="mt-6 mb-0">
                        <InputLabel
                            for="secondary_color"
                            value="Secondary Color"
                            style="width:300px"
                        />
                    </div>
                    <div class="flex">
                        <div
                            class="col-span-6 sm:col-span-4"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="secondary_color_picker"
                                v-model="form.secondary_color"
                                type="color"
                                class="mt-2 block w-full"
                                autocomplete="Color"
                                style="width:24px;"
                            />
                            <InputError
                                :message="form.errors.secondary_color"
                                class="mt-2"
                            />
                        </div>
                        <div
                            class="col-span-6 sm:col-span-4 mt-0"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="secondary_color"
                                v-model="form.secondary_color"
                                type="text"
                                class="mt-1 ml-2 block w-full"
                                autocomplete="Secondary Color"
                                style="width:300px"
                            />
                            <InputError
                                :message="form.errors.secondary_color"
                                class="mt-2"
                            />
                        </div>
                    </div>

                    <!-- Tertiary Color -->
                    <div class="mt-6 mb-0">
                        <InputLabel
                            for="tertiary_color"
                            value="Tertiary Color"
                            style="width:300px"
                        />
                    </div>
                    <div class="flex">
                        <div
                            class="col-span-6 sm:col-span-4"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="tertiary_color_picker"
                                v-model="form.tertiary_color"
                                type="color"
                                class="mt-2 block w-full"
                                autocomplete="Color"
                                style="width:24px;"
                            />
                            <InputError
                                :message="form.errors.tertiary_color"
                                class="mt-2"
                            />
                        </div>
                        <div
                            class="col-span-6 sm:col-span-4 mt-0"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="tertiary_color"
                                v-model="form.tertiary_color"
                                type="text"
                                class="mt-1 ml-2 block w-full"
                                autocomplete="Tertiary Color"
                                style="width:300px"
                            />
                            <InputError
                                :message="form.errors.tertiary_color"
                                class="mt-2"
                            />
                        </div>
                    </div>

                    <!-- Font -->
                    <div
                        class="col-span-6 sm:col-span-4 mt-4"
                        style="opacity:.75"
                    >
                        <InputLabel
                            for="font"
                            value="Font"
                            class="ml-0 block w-full"
                            style="width:300px"
                        />
                        <TextInput
                            id="font"
                            v-model="form.font"
                            type="text"
                            class="mt-1 ml-0 block w-full"
                            autocomplete="Font"
                            style="width:300px"
                        />
                        <InputError
                            :message="form.errors.font"
                            class="mt-2"
                        />
                    </div>

                    <!-- Font Color Primary -->
                    <div class="mt-6 mb-0">
                        <InputLabel
                            for="font_color_primary"
                            value="Font Primary Color"
                            style="width:300px"
                        />
                    </div>
                    <div class="flex">
                        <div
                            class="col-span-6 sm:col-span-4"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="font_color_primary_picker"
                                v-model="form.font_color_primary"
                                type="color"
                                class="mt-2 block w-full"
                                autocomplete="Color"
                                style="width:24px;"
                            />
                            <InputError
                                :message="form.errors.font_color_primary"
                                class="mt-2"
                            />
                        </div>
                        <div
                            class="col-span-6 sm:col-span-4 mt-0"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="font_color_primary"
                                v-model="form.font_color_primary"
                                type="text"
                                class="mt-1 ml-2 block w-full"
                                autocomplete="Font"
                                style="width:300px"
                            />
                            <InputError
                                :message="form.errors.font_color_primary"
                                class="mt-2"
                            />
                        </div>
                    </div>

                    <!-- Font Color Secondary -->
                    <div class="mt-6 mb-0">
                        <InputLabel
                            for="font_color_secondary"
                            value="Font Secondary Color"
                            style="width:300px"
                        />
                    </div>
                    <div class="flex">
                        <div
                            class="col-span-6 sm:col-span-4"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="font_color_secondary_picker"
                                v-model="form.font_color_secondary"
                                type="color"
                                class="mt-2 block w-full"
                                autocomplete="Color"
                                style="width:24px;"
                            />
                            <InputError
                                :message="form.errors.font_color_secondary"
                                class="mt-2"
                            />
                        </div>
                        <div
                            class="col-span-6 sm:col-span-4 mt-0"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="font_primary_color"
                                v-model="form.font_color_secondary"
                                type="text"
                                class="mt-1 ml-2 block w-full"
                                autocomplete="Font"
                                style="width:300px"
                            />
                            <InputError
                                :message="form.errors.font_color_secondary"
                                class="mt-2"
                            />
                        </div>
                    </div>

                    <!-- Fids Color -->
                    <div class="mt-6 mb-0">
                        <InputLabel
                            for="fids_color"
                            value="Fids Color"
                            style="width:300px"
                        />
                    </div>
                    <div class="flex">
                        <div
                            class="col-span-6 sm:col-span-4"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="fids_color_picker"
                                v-model="form.fids_color"
                                type="color"
                                class="mt-2 block w-full"
                                autocomplete="Color"
                                style="width:24px;"
                            />
                            <InputError
                                :message="form.errors.fids_color"
                                class="mt-2"
                            />
                        </div>
                        <div
                            class="col-span-6 sm:col-span-4 mt-0"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="fids_color"
                                v-model="form.fids_color"
                                type="text"
                                class="mt-1 ml-2 block w-full"
                                autocomplete="Fids Color"
                                style="width:300px"
                            />
                            <InputError
                                :message="form.errors.fids_color"
                                class="mt-2"
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
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
                v-show="(canEditBranding === true)"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                Save
            </PrimaryButton>
        </template>
    </FormSection>
</template>

<script>
export default {
    data() {
        return {
            logo_small_white: null,
            file2: null
        }
    }
}
</script>
