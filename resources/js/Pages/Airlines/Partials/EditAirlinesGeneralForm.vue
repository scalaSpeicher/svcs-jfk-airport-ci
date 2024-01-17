<script setup>
import { useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import ToggleButton from '@/Components/ToggleButton.vue'

const props = defineProps({
    airline: {
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
    status: props.airline.status,
});

const onStatusChange = (event) => {
    form.status = event;
}

const updateAirlineGeneralInformation = () => {
    form.put(route(
        'airlines.update',
        props.airline.id
    ), {
        //errorBag: 'updateAirline',
        preserveScroll: true,
    });
};

</script>

<template>
    <FormSection @submitted="updateAirlineGeneralInformation">
        <!-- <FormSection> -->
        <template #title>
            Airline General Update
        </template>
        <template #description>
            <span>Update Airline general information.</span>
            <div class="grid-cols-1">
                <div class="mt-4 ml-6 ">
                    <span>IATA:&nbsp;&nbsp;</span><span style="font-weight:900">{{ $page.props.airlines_basic.iata }}</span>
                </div>
                <div class="ml-6 ">
                    <span>ICAO:&nbsp;&nbsp;</span><span style="font-weight:900">{{ $page.props.airlines_basic.icao }}</span>
                </div>
                <div class="ml-6 ">
                    <span>Name:&nbsp;&nbsp;</span><span style="font-weight:900">{{ $page.props.airlines_basic.name }}</span>
                </div>
            </div>
        </template>
        <template #form>
            <div id="EditAirlineGeneralForm">
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
                        :disabled="(canEditAirlines === false)"
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
                v-show="(canEditAirlines === true)"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                Save
            </PrimaryButton>
        </template>
    </FormSection>
</template>
