<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import DialogModal from '@/Components/DialogModal.vue';

const confirmingLabelDeletion = ref(false);
const confirmingLabelCreation = ref(false);
const displayMessage = ref(false);
const displayError = ref(false);
const errorMessage = ref('');

const props = defineProps({
    airline: {
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

let form = useForm('editAirlines', {
    background_color: (props.airlines_branding.lids_background_color) ? props.airlines_branding.lids_background_color : '',
    status_bar_color: (props.airlines_branding.lids_status_bar_color) ? props.airlines_branding.lids_status_bar_color : '',
    airlines_labels_lids: (props.airlines_labels_lid) ? props.airlines_labels_lid : '',
});

const labelCreateForm = useForm({
    airline_id: props.airline.id,
    label_name: '',
    class_code: '',
});

let deleteLabelId;
const labelDeleteForm = useForm({
    label_id: deleteLabelId,
});

const updateAirlineLidsInformation = () => {
    displayMessage.value = false;
    form.put(route(
        'airlines_labels_lids.update',
        props.airline.id
    ), {
        //errorBag: 'updateAirline',
        preserveScroll: true,
        onSuccess: () => displayingMessage(form, 10000),
        onError: () => displayingMessage(form, 10000, true),
    });
};

const deleteLabel = () => {
    labelDeleteForm.delete(route(
        'airlines_labels_lids.destroy',
        deleteLabelId
    ), {
        // preserveScroll: true,
        onSuccess: () => displayingMessage(form, 2000),
    });
};

const createLabel = () => {
    displayMessage.value = false;
    labelCreateForm.clearErrors();
    if (labelCreateForm.label_name == '') {
        labelCreateForm.setError('label_name', 'Label required.');
    }
    if (labelCreateForm.class_code == '') {
        labelCreateForm.setError('class_code', 'Class code required.');
    }
    for (let i = 0; i < props.airlines_labels_lid.length; i++) {
        if (props.airlines_labels_lid[i].label == labelCreateForm.label_name) {
            labelCreateForm.setError('label_name', 'Label must be unique.');
        }
        if (props.airlines_labels_lid[i].class_code == labelCreateForm.class_code) {
            labelCreateForm.setError('class_code', 'Class code must be unique.');
        }
    }
    if (Object.keys(labelCreateForm.errors).length > 0) {
        return;
    }
    labelCreateForm.post(route('airlines_labels_lids.store'), {
        onSuccess: () => displayingMessage(form, 2000),
        onError: () => label_name.value.focus(),
    });
};

const confirmLabelDeletion = (labelId) => {
    displayMessage.value = false;
    deleteLabelId = labelId;
    confirmingLabelDeletion.value = true;
};

const confirmLabelCreation = () => {
    confirmingLabelCreation.value = true;
};

const delay = ms => new Promise(res => setTimeout(res, ms));

const displayingMessage = async (form, time, error = false) => {
    displayError.value = false;
    if (confirmingLabelDeletion.value || confirmingLabelCreation.value) {
        closeModal();
        form.airlines_labels_lids = props.airlines_labels_lid;
    } else if (error) {
        displayError.value = true;
        errorMessage.value = form.errors.message;
        form.airlines_labels_lids = props.airlines_labels_lid;
    }
    displayMessage.value = true;
    await delay(parseInt(time));
    displayMessage.value = false;
};

const closeModal = () => {
    confirmingLabelDeletion.value = false;
    confirmingLabelCreation.value = false;
};

const classCodeChange = (event) => {
    if (typeof event.key === 'undefined') {
        event.target.value = event.target.value.replace(/[^A-Za-z0-9.]/gi, '').toUpperCase();
    } else if (event.key.length == 1) {
        event.preventDefault();
        event.target.value = event.key.replace(/[^A-Za-z0-9.]/gi, '').toUpperCase();
    }
};

</script>

<template>
    <FormSection @submitted="updateAirlineLidsInformation">
        <!-- <FormSection> -->
        <template #title>
            Airline LIDS Update
        </template>
        <template #description>
            <span>Update Airline LIDS information.</span>
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
            <fieldset :disabled="(canEditLabels === false)">
                <div id="EditAirlineLidsForm">
                    <InputLabel
                        for="iata"
                        value="Background Color"
                        style="width:300px"
                    />
                    <div class="flex">
                        <!-- Background Color -->
                        <div
                            class="col-span-6 sm:col-span-4"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="background_color_picker"
                                v-model="form.background_color"
                                type="color"
                                class="mt-4 block w-full"
                                autocomplete="Color"
                                style="width:24px;"
                            />
                            <InputError
                                :message="form.errors.background_color"
                                class="mt-2"
                            />
                        </div>
                        <div
                            class="col-span-6 sm:col-span-4 mt-2"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="background_color"
                                v-model="form.background_color"
                                type="text"
                                class="mt-1 ml-2 block w-full"
                                autocomplete="Color"
                                style="width:300px;"
                            />
                            <InputError
                                :message="form.errors.background_color"
                                class="mt-2"
                            />
                        </div>
                    </div>

                    <InputLabel
                        for="status_bar_color"
                        value="Status Bar Color"
                        class="mt-4"
                        style="width:300px"
                    />
                    <div class="flex">
                        <!-- Status Bar Color -->
                        <div
                            class="col-span-6 sm:col-span-4"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="status_bar_color_picker"
                                v-model="form.status_bar_color"
                                type="color"
                                class="mt-4 block w-full"
                                autocomplete="Color"
                                style="width:24px;"
                            />
                            <InputError
                                :message="form.errors.status_bar_color"
                                class="mt-2"
                            />
                        </div>
                        <div
                            class="col-span-6 sm:col-span-4 mt-2"
                            style="opacity:.75"
                        >
                            <TextInput
                                id="status_bar_color"
                                v-model="form.status_bar_color"
                                type="text"
                                class="mt-1 ml-2 block w-full"
                                autocomplete="Color"
                                style="width:300px;"
                            />
                            <InputError
                                :message="form.errors.status_bar_color"
                                class="mt-2"
                            />
                        </div>
                    </div>
                    <!-- Labels Table -->
                    <div class="col-span-6 sm:col-span-4 mt-6">
                        <!-- Default Counters Head when/if checkboxes are enabled-->
                        <!-- <div style="width:525px; text-align:right;" class="mb-4 mt-6"><span class="w-500 text-xs text-end font-bold text-gray-700 uppercase">Default Counters</span></div> -->
                        <table class="min-w-full max-w-full divide-y divide-gray-200 border-separate">
                            <thead class="bg-gray-200 border">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                    >
                                        LABELS
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                    >
                                        Delete
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                    >
                                        CLASS CODE
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="label in form.airlines_labels_lids"
                                    :key="label.id"
                                >
                                    <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                        {{
                                            label.label }}
                                    </td>
                                    <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                        <SecondaryButton @click="confirmLabelDeletion(label.id)">
                                            X
                                        </SecondaryButton>
                                    </td>
                                    <!-- Class Code -->
                                    <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                        <TextInput
                                            id="status_bar_color"
                                            v-model="label.class_code"
                                            type="text"
                                            class="mt-2 block w-full"
                                            autocomplete="Class Code"
                                            style="width:100px;"
                                            required
                                        />
                                        <InputError
                                            :message="form.errors.class_code"
                                            class="mt-2"
                                        />
                                    </td>
                                    <!-- end -->
                                </tr>
                                <tr class="h-30 px-6 py-3 text-xs font-bold text-right uppercase border col-span-2">
                                    <SecondaryButton
                                        class="mt-4 ml-4 mb-4"
                                        style="width:120px"
                                        @click="confirmLabelCreation"
                                    >
                                        New Label
                                    </SecondaryButton>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </fieldset>
        </template>

        <template #actions>
            <ActionMessage
                :on="displayMessage"
                :html="(displayError) ? errorMessage : $page.props.flash.message"
                class="mr-3 text-left"
            />
            <a href="/airlines">
                <SecondaryButton type="button">
                    Cancel
                </SecondaryButton>
            </a>
            <span style="width:20px" />
            <PrimaryButton
                v-show="(canEditLabels === true)"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                Save
            </PrimaryButton>
            <DialogModal
                :show="confirmingLabelDeletion"
                @close="closeModal"
            >
                <template #title>
                    <span>DELETE LABEL</span>
                </template>
                <template #content>
                    <span>Do you really want to delete this label?</span>
                </template>
                <template #footer>
                    <SecondaryButton @click="closeModal">
                        NO
                    </SecondaryButton>
                    <span style="width:20px" />
                    <PrimaryButton @click="deleteLabel">
                        YES
                    </PrimaryButton>
                </template>
            </DialogModal>
            <DialogModal
                :show="confirmingLabelCreation"
                @close="closeModal"
            >
                <template #title>
                    <span>ADD LABEL</span>
                </template>
                <template #content>
                    <div class="md:grid md:grid-cols-2 md:gap-6 mt-6">
                        <!-- Add New Label -->
                        <div
                            class="col-span-1 sm:col-span-1 mt-2 float-left"
                            style="opacity:.75"
                        >
                            <InputLabel
                                for="label_name"
                                value="Airline Label"
                                style="width:300px"
                            />
                            <TextInput
                                id="label_name"
                                v-model="labelCreateForm.label_name"
                                type="text"
                                class="mt-2 block w-full"
                                autocomplete="label_name"
                                style="width:300px;"
                                required
                            />
                            <InputError
                                :message="labelCreateForm.errors.label_name"
                                class="mt-2"
                            />
                        </div>
                        <div
                            class="col-span-1 sm:col-span-1 mt-2 float-left"
                            style="opacity:.75"
                        >
                            <InputLabel
                                for="class_code"
                                value="Class Code"
                                style="width:300px"
                            />
                            <TextInput
                                id="class_code"
                                v-model="labelCreateForm.class_code"
                                type="text"
                                class="mt-2 block w-full"
                                autocomplete="class_code"
                                style="width:300px;"
                                required
                                @keyup="classCodeChange"
                            />
                            <InputError
                                :message="labelCreateForm.errors.class_code"
                                class="mt-2"
                            />
                        </div>
                    </div>
                </template>
                <template #footer>
                    <SecondaryButton @click="closeModal">
                        CANCEL
                    </SecondaryButton>
                    <span style="width:20px" />
                    <PrimaryButton @click="createLabel">
                        ADD
                    </PrimaryButton>
                </template>
            </DialogModal>
        </template>
    </FormSection>
</template>
