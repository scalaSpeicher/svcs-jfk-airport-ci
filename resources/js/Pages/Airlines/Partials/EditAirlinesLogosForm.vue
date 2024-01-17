<script setup>
import { ref, reactive } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import FileInput from '@/Components/FileInput.vue';
import DialogModal from '@/Components/DialogModal.vue';

const props = defineProps({
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

const confirmingLogoCreation = ref(false);
let logoName = '';
let logoInfo = '';
const storagePath = props.airlines_branding.brand_store;

const generateRandomQueryParam = () => '?r=' + Math.random();
const logoPreview = reactive({
    ssbd_logo: storagePath + props.airlines_branding.ssbd_logo + generateRandomQueryParam(),
    logo_small_color: storagePath + props.airlines_branding.logo_small_color + generateRandomQueryParam(),
    logo_large_color: storagePath + props.airlines_branding.logo_large_color + generateRandomQueryParam(),
    lids_logo_large: storagePath + props.airlines_branding.lids_logo_large + generateRandomQueryParam(),
    endcap_fids_logo_small_color: storagePath + props.airlines_branding.endcap_fids_logo_small_color + generateRandomQueryParam(),
    wayfinding_arrow_color: storagePath + props.airlines_branding.wayfinding_arrow_color + generateRandomQueryParam(),
});

const form = useForm({
    _method: 'PUT',
    ssbd_logo: props.airlines_branding.ssbd_logo,
    logo_small_color: props.airlines_branding.logo_small_color,
    logo_large_color: props.airlines_branding.logo_large_color,
    lids_logo_large: props.airlines_branding.lids_logo_large,
    endcap_fids_logo_small_color: props.airlines_branding.endcap_fids_logo_small_color,
    wayfinding_arrow_color: props.airlines_branding.wayfinding_arrow_color,
    form_name: 'airline_logos',
});

const logoInformationMap = {
    'Self-Service Bag Drop Position': 'Specifications: 3168 pixels width X 360 pixels height; Format: PNG; Safe Zone: avoid encroaching on the top 100 pixels to allow for LIDS labels overlay.',
    'Check-In Counter Position': 'Specifications: 710 pixels width X 360 pixels height; Format: PNG; Safe Zone: avoid encroaching on the top 100 pixels to allow for LIDS labels overlay.',
    'Medium Wayfinding': 'Specifications: 214 pixels width x 55 pixels height; Format: PNG; Center horizontally and vertically.',
    'Small Wayfinding': 'Specifications: 55 pixels width x 55 pixels height; Format: PNG; Center horizontally and vertically.',
    'Endcap FIDS Small': 'Specifications: 37 pixels width x 37 pixels height; Format: PNG; Center horizontally and vertically.',
    'Endcap Wayfinding Arrow': 'Specifications: 55 pixels width x 55 pixels height; Format: PNG; Center horizontally and vertically. Use primary brand color matching Medium and Small wayfinding logos',
};

const getLogoInformation = () => logoInformationMap[logoName] || '';

const confirmLogoCreation = (name) => {
    confirmingLogoCreation.value = true;
    logoName = name;
    logoInfo = getLogoInformation();
};

const validateLogoDimensions = (logoName, height, width) => {
    const dimensionsMap = {
        'Self-Service Bag Drop Position': { width: 3168, height: 360 },
        'Check-In Counter Position': { width: 710, height: 360 },
        'Medium Wayfinding': { width: 214, height: 55 },
        'Small Wayfinding': { width: 55, height: 55 },
        'Endcap FIDS Small': { width: 37, height: 37 },
        'Endcap Wayfinding Arrow': { width: 55, height: 55 },
    };

    const requiredDimensions = dimensionsMap[logoName];
    if (requiredDimensions && (width !== requiredDimensions.width || height !== requiredDimensions.height)) {
        logoupload.uploaded = false;
        logoError.status = true;
    } else {
        logoupload.uploaded = true;
        logoError.status = false;
    }
};

const logoupload = reactive({ uploaded: false });
const logoError = reactive({ status: false });
const photoPreview = reactive({ value: null });

let logofile = null;
const processFile = (fileUploaded) => {
    logofile = fileUploaded;

    const img = new Image();
    img.onload = function () {
        const width = img.width;
        const height = img.height;
        validateLogoDimensions(logoName, height, width);
    };
    img.onerror = function () {
        alert('not a valid image file: ' + fileUploaded.type);
    };
    img.src = URL.createObjectURL(fileUploaded);

    const reader = new FileReader();
    reader.readAsDataURL(logofile);
    reader.onload = (e) => {
        photoPreview.value = e.target.result;
    };
    logoupload.uploaded = true;
};

const logos = reactive({
    ssbd: null,
    lidsLarge: null,
    logoLargeColor: null,
    logoSmallColor: null,
    endcapSmallColor: null,
    wayfindArrow: null,
});

const logosUpdated = reactive({
    ssbd: false,
    lidsLarge: false,
    logoLargeColor: false,
    logoSmallColor: false,
    endcapSmallColor: false,
    wayfindArrow: false,
});

const initialLogo = {
    ssbd: true,
    lidsLarge: true,
    logoLargeColor: true,
    logoSmallColor: true,
    endcapSmallColor: true,
    wayfindArrow: true,
};

const logoSaved = reactive({
    ssbd: false,
    lidsLarge: false,
    logoLargeColor: false,
    logoSmallColor: false,
    endcapSmallColor: false,
    wayfindArrow: false,
});

const submitLogoFile = (name) => {
    if (logofile !== null) {
        const logosMap = {
            'Self-Service Bag Drop Position': { property: 'ssbd', updated: 'ssbd', initial: 'ssbd', saved: 'ssbd' },
            'Check-In Counter Position': { property: 'lidsLarge', updated: 'lidsLarge', initial: 'lidsLarge', saved: 'lidsLarge' },
            'Medium Wayfinding': { property: 'logoLargeColor', updated: 'logoLargeColor', initial: 'logoLargeColor', saved: 'logoLargeColor' },
            'Small Wayfinding': { property: 'logoSmallColor', updated: 'logoSmallColor', initial: 'logoSmallColor', saved: 'logoSmallColor' },
            'Endcap FIDS Small': { property: 'endcapSmallColor', updated: 'endcapSmallColor', initial: 'endcapSmallColor', saved: 'endcapSmallColor' },
            'Endcap Wayfinding Arrow': { property: 'wayfindArrow', updated: 'wayfindArrow', initial: 'wayfindArrow', saved: 'wayfindArrow' },
        };
        const logoMap = logosMap[logoName];
        if (logoMap) {
            logos[logoMap.property] = photoPreview.value;
            logosUpdated[logoMap.updated] = true;
            initialLogo[logoMap.initial] = false;
            logoSaved[logoMap.saved] = false;
        }
    }
    closeModal();
};


const clearFile = () => {
    logofile = null;
    logoName = "";
    photoPreview.value = null;
};

const closeModal = () => {
    clearFile();
    logoupload.uploaded=false;
    logoError.status=false;
    confirmingLogoCreation.value = false;
};

const updateAirlineBrandingInformation = () => {

    form.ssbd_logo = logos.ssbd;
    form.logo_small_color = logos.logoSmallColor;
    form.logo_large_color = logos.logoLargeColor;
    form.lids_logo_large = logos.lidsLarge;
    form.endcap_fids_logo_small_color = logos.endcapSmallColor;
    form.wayfinding_arrow_color = logos.wayfindArrow;

    form.put(route(
        'airlines_branding.update',
        props.airline.id
    ), {
        //errorBag: 'updateAirline',
        preserveScroll: true,
        //resetOnSuccess: true,
        preserveState: true,
    });

    logoSaved.ssbd = true;
    logoSaved.logoSmallColor = true;
    logoSaved.logoLargeColor = true;
    logoSaved.lidsLarge = true;
    logoSaved.endcapSmallColor = true;
    logoSaved.wayfindArrow = true;

};

const handleImageError = (event) => {
    event.target.style.display = 'none';
}

</script>

<template>
    <FormSection @submitted="updateAirlineBrandingInformation">
        <!-- <FormSection> -->
        <template #title>
            Airline Logo Update
        </template>
        <template #description>
            <span>Update Airline logo information.</span>
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
            <fieldset :disabled="(canEditLogos === false)">
                <div id="EditAirlineLogosForm">
                    <!-- Logos -->
                    <div class="col-span-6 sm:col-span-4 mt-4 block">
                        <!-- SSBD Logo File Input -->
                        <div>
                            <InputLabel
                                for="ssbd_logo"
                                value="Self-Service Bag Drop Position"
                                style="width:300px;font-weight:900;"
                            />
                            <div
                                v-if="logoSaved.ssbd===false & logosUpdated.ssbd"
                                class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500"
                                style="width:500px"
                            >
                                Logo changed - pending final save.
                            </div>
                            <!-- <div class="mt-1 ml-2 text-sm font-medium leading-5 text-gray-500" style="width:500px">Current File: {{ form.ssbd_logo }}</div> -->
                            <div
                                v-if="logosUpdated.ssbd"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logos.ssbd"
                                    class="mt-4 mb-4 pt1 border"
                                >
                            </div>
                            <div
                                v-if="initialLogo.ssbd"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logoPreview.ssbd_logo"
                                    class="mt-4 mb-4 pt1 border"
                                    :style="{'display':'block'}"
                                    @error="handleImageError"
                                >
                            </div>
                            <SecondaryButton
                                class="mt-2 ml-2"
                                style="width:180px"
                                type="button"
                                @click.prevent="confirmLogoCreation('Self-Service Bag Drop Position')"
                            >
                                Select A New Logo
                            </SecondaryButton>
                            <InputError
                                :message="form.errors.ssbd_logo"
                                class="mt-2"
                                style="width:300px;"
                            />
                        </div>
                        <!-- Check-In Counter Logo File Input -->
                        <div>
                            <InputLabel
                                for="lids_logo_large"
                                value="Check-In Counter Position"
                                class="mt-6"
                                style="width:300px;font-weight:900;"
                            />
                            <!-- <div class="mt-1 ml-2 text-sm font-medium leading-5 text-gray-500" style="width:500px">Current File: {{ form.lids_logo_large }}</div> -->
                            <div
                                v-if="logoSaved.lidsLarge===false & logosUpdated.lidsLarge"
                                class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500"
                                style="width:500px"
                            >
                                Logo changed - pending final save.
                            </div>
                            <div
                                v-if="logosUpdated.lidsLarge"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logos.lidsLarge"
                                    class="mt-4 mb-4 pt1 border"
                                >
                            </div>
                            <div
                                v-if="initialLogo.lidsLarge"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logoPreview.lids_logo_large"
                                    class="mt-4 mb-4 pt1 border"
                                    :style="{'display':'block'}"
                                    @error="handleImageError"
                                >
                            </div>
                            <SecondaryButton
                                class="mt-2 ml-2"
                                style="width:180px"
                                type="button"
                                @click.prevent="confirmLogoCreation('Check-In Counter Position')"
                            >
                                Select A New Logo
                            </SecondaryButton>
                            <InputError
                                :message="form.errors.lids_logo_large"
                                class="mt-2"
                                style="width:300px;"
                            />
                        </div>
                        <!-- Wayfinding Medium Logo File Input -->
                        <div>
                            <InputLabel
                                for="logo_large_color"
                                value="Medium Wayfinding"
                                class="mt-6"
                                style="width:300px;font-weight:900;"
                            />
                            <!-- <div class="mt-1 ml-2 text-sm font-medium leading-5 text-gray-500" style="width:500px">Current File: {{ form.logo_large_color }}</div> -->
                            <div
                                v-if="logoSaved.logoLargeColor===false & logosUpdated.logoLargeColor"
                                class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500"
                                style="width:500px"
                            >
                                Logo changed - pending final save.
                            </div>
                            <div
                                v-if="logosUpdated.logoLargeColor"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logos.logoLargeColor"
                                    class="mt-4 mb-4 pt1 border"
                                >
                            </div>
                            <div
                                v-if="initialLogo.logoLargeColor"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logoPreview.logo_large_color"
                                    class="mt-4 mb-4 pt1 border"
                                    :style="{'display':'block'}"
                                    @error="handleImageError"
                                >
                            </div>
                            <SecondaryButton
                                class="mt-2 ml-2"
                                style="width:180px"
                                type="button"
                                @click.prevent="confirmLogoCreation('Medium Wayfinding')"
                            >
                                Select A New Logo
                            </SecondaryButton>
                            <InputError
                                :message="form.errors.logo_large_color"
                                class="mt-2"
                                style="width:300px;"
                            />
                        </div>
                        <!-- Wayfinding Small Logo File Input -->
                        <div>
                            <InputLabel
                                for="logo_small_color"
                                value="Small Wayfinding"
                                class="mt-6"
                                style="width:300px;font-weight:900;"
                            />
                            <!-- <div class="mt-1 ml-2 text-sm font-medium leading-5 text-gray-500" style="width:500px">Current File: {{ form.logo_small_color }}</div> -->
                            <div
                                v-if="logoSaved.logoSmallColor===false & logosUpdated.logoSmallColor"
                                class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500"
                                style="width:500px"
                            >
                                Logo changed - pending final save.
                            </div>
                            <div
                                v-if="logosUpdated.logoSmallColor"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logos.logoSmallColor"
                                    class="mt-4 mb-4 pt1 border"
                                >
                            </div>
                            <div
                                v-if="initialLogo.logoSmallColor"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logoPreview.logo_small_color"
                                    class="mt-4 mb-4 pt1 border"
                                    :style="{'display':'block'}"
                                    @error="handleImageError"
                                >
                            </div>
                            <SecondaryButton
                                class="mt-2 ml-2"
                                style="width:180px"
                                type="button"
                                @click.prevent="confirmLogoCreation('Small Wayfinding')"
                            >
                                Select A New Logo
                            </SecondaryButton>
                            <InputError
                                :message="form.errors.logo_small_color"
                                class="mt-2"
                                style="width:300px;"
                            />
                        </div>
                        <!-- Endcap FIDS Small Logo File Input -->
                        <div>
                            <InputLabel
                                for="endcap_fids_logo_small_color"
                                value="Endcap FIDS Small"
                                class="mt-6"
                                style="width:300px;font-weight:900;"
                            />
                            <!-- <div class="mt-1 ml-2 text-sm font-medium leading-5 text-gray-500" style="width:500px">Current File: {{ form.endcap_fids_logo_small_color }}</div> -->
                            <div
                                v-if="logoSaved.endcapSmallColor===false & logosUpdated.endcapSmallColor"
                                class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500"
                                style="width:500px"
                            >
                                Logo changed - pending final save.
                            </div>
                            <div
                                v-if="logosUpdated.endcapSmallColor"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logos.endcapSmallColor"
                                    class="mt-4 mb-4 pt1 border"
                                >
                            </div>
                            <div
                                v-if="initialLogo.endcapSmallColor"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logoPreview.endcap_fids_logo_small_color"
                                    class="mt-4 mb-4 pt1 border"
                                    :style="{'display':'block'}"
                                    @error="handleImageError"
                                >
                            </div>
                            <SecondaryButton
                                class="mt-2 ml-2"
                                style="width:180px"
                                type="button"
                                @click.prevent="confirmLogoCreation('Endcap FIDS Small')"
                            >
                                Select A New Logo
                            </SecondaryButton>
                            <InputError
                                :message="form.errors.endcap_fids_logo_small_color"
                                class="mt-2"
                                style="width:300px;"
                            />
                        </div>
                        <!-- Endcap Wayfinding Arrow Logo File Input -->
                        <div v-if="canEditAirlines">
                            <InputLabel
                                for="wayfinding_arrow_color"
                                value="Endcap Wayfinding Arrow"
                                class="mt-6"
                                style="width:300px;font-weight:900;"
                            />
                            <!-- <div class="mt-1 ml-2 text-sm font-medium leading-5 text-gray-500" style="width:500px">Current File: {{ form.wayfinding_arrow_color }}</div> -->
                            <div
                                v-if="logoSaved.wayfindArrow===false & logosUpdated.wayfindArrow"
                                class="mt-1 ml-2 text-sm font-medium leading-5 text-green-500"
                                style="width:500px"
                            >
                                Logo changed - pending final save.
                            </div>
                            <div
                                v-if="logosUpdated.wayfindArrow"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logos.wayfindArrow"
                                    class="mt-4 mb-4 pt1 border"
                                >
                            </div>
                            <div
                                v-if="initialLogo.wayfindArrow"
                                class="mt-2"
                                style="width:480px"
                            >
                                <img
                                    :src="logoPreview.wayfinding_arrow_color"
                                    class="mt-4 mb-4 pt1 border"
                                    :style="{'display':'block'}"
                                    @error="handleImageError"
                                >
                            </div>
                            <SecondaryButton
                                class="mt-2 ml-2"
                                style="width:180px"
                                type="button"
                                @click.prevent="confirmLogoCreation('Endcap Wayfinding Arrow')"
                            >
                                Select A New Logo
                            </SecondaryButton>
                            <InputError
                                :message="form.errors.wayfinding_arrow_color"
                                class="mt-2"
                                style="width:300px;"
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
        </template>
        <template #actions>
            <DialogModal
                :show="confirmingLogoCreation"
                @close="closeModal"
            >
                <template #title>
                    <span>Update {{ logoName }} Logo</span>
                </template>
                <template #content>
                    <div class="mb-4 ml-2 text-sm font-medium leading-5 text-gray-500">
                        {{ logoInfo }}
                    </div>
                    <!-- Add New Logo -->
                    <div class="col-span-6 sm:col-span-4 mt-2">
                        <FileInput
                            class="ml-2"
                            @file-selected="processFile"
                        />
                    </div>
                    <div
                        v-show="logoError.status===true"
                        class="mb-4 ml-2 text-sm font-medium leading-5 text-red-500"
                    >
                        !! - The image uploaded does not meet the dimensions required for this logo type.
                    </div>
                    <div class="flex justify-center">
                        <img
                            v-show="logoupload.uploaded===true"
                            :src="photoPreview.value"
                            class="mt-4 mb-4 pt1 border"
                        >
                    </div>
                </template>
                <template #footer>
                    <SecondaryButton @click="closeModal">
                        CANCEL
                    </SecondaryButton>
                    <span style="width:20px" />
                    <PrimaryButton
                        v-show="logoupload.uploaded===true"
                        @click="submitLogoFile({ logoName })"
                    >
                        SUBMIT
                    </PrimaryButton>
                    <SecondaryButton
                        v-show="logoupload.uploaded===false"
                        style="opacity:.5;cursor:default;"
                    >
                        SUBMIT
                    </SecondaryButton>
                </template>
            </DialogModal>
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
                v-show="(canEditLogos === true)"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                Save
            </PrimaryButton>
        </template>
    </FormSection>
</template>

<style scoped>
    .pt1 {
        background-color: #f7f7f7;
        background-size: 8px 8px;
        background-position: 0 0, 4px 4px;
        background-image: -webkit-linear-gradient(45deg, rgb(235, 235, 235) 25%, transparent 25%, transparent 75%, rgb(235, 235, 235) 75%, rgb(235, 235, 235)), -webkit-linear-gradient(45deg, rgb(235, 235, 235) 25%, transparent 25%, transparent 75%, blacrgb(235, 235, 235)k 75%, rgb(235, 235, 235));
        background-image: -moz-linear-gradient(45deg, rgb(235, 235, 235) 25%, transparent 25%, transparent 75%, rgb(235, 235, 235) 75%, rgb(235, 235, 235)), -moz-linear-gradient(45deg, rgb(235, 235, 235) 25%, transparent 25%, transparent 75%, rgb(235, 235, 235) 75%, rgb(235, 235, 235));
        background-image: -ms-linear-gradient(45deg, rgb(235, 235, 235) 25%, transparent 25%, transparent 75%, rgb(235, 235, 235) 75%, rgb(235, 235, 235)), -ms-linear-gradient(45deg, rgb(235, 235, 235) 25%, transparent 25%, transparent 75%, rgb(235, 235, 235) 75%, rgb(235, 235, 235));
        background-image: -o-linear-gradient(45deg, rgb(235, 235, 235) 25%, transparent 25%, transparent 75%, rgb(235, 235, 235) 75%, rgb(235, 235, 235)), -o-linear-gradient(45deg, rgb(235, 235, 235) 25%, transparent 25%, transparent 75%, rgb(235, 235, 235) 75%, rgb(235, 235, 235));
        background-image: linear-gradient(45deg, rgb(235, 235, 235) 25%, transparent 25%, transparent 75%, rgb(235, 235, 235) 75%, rgb(235, 235, 235)), linear-gradient(45deg, rgb(235, 235, 235) 25%, transparent 25%, transparent 75%, rgb(235, 235, 235) 75%, rgb(235, 235, 235));
    }

</style>
