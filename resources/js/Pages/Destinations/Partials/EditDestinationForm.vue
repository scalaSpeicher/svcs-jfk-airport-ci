<script setup>
import { ref } from 'vue';
import { Link, router, useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import ToggleButton from '@/Components/ToggleButton.vue'
// import Toggle from '@vueform/toggle'
import Multiselect from 'vue-multiselect'

const props = defineProps({
    destination: {
        type: Object,
        default: () => ({}),
    },
    formMode: {
        type: String,
        default: () => (''),
    }
});

const form = useForm({
    // _method: 'PUT',

    iata: props.destination.iata,
    icao: props.destination.icao,
    city: props.destination.city,
    airport_name: props.destination.airport_name,
    country: props.destination.country,
    latitude: (props.destination.latitude) ? props.destination.latitude.toString() : props.destination.latitude,
    longitude: (props.destination.longitude) ? props.destination.longitude.toString(): props.destination.longitude,
    country_code: props.destination.country_code,
    status: (props.destination.hasOwnProperty('status')) ? props.destination.status : false,
});

const onStatusChange = (event) => {
    form.status = event;
}

const updateDestinationInformation = () => {

    if (props.formMode == 'editDestination') {
        form.put(route(
            'destinations.update',
            props.destination.id
        ), {
            preserveScroll: true,
        });
    }
    else {
        form.post(route(
            'destinations.store',
        ), {
            preserveScroll: true,
        });
    }
};

</script>

<template>
    <FormSection @submitted="updateDestinationInformation">
        <!-- <FormSection> -->
        <template #title>
            <span v-if="props.formMode == 'editDestination'">Destination Update</span>
            <span v-else>Destination Add</span>
        </template>
        <template #description>
            <span v-if="props.formMode == 'editDestination'">Update Destination information.</span>
            <span v-else>Add Destination information.</span>
            <div
                v-if="props.formMode == 'editDestination'"
                class="columns-1"
            >
                <div class="mt-4 ml-6 ">
                    <span>IATA:&nbsp;&nbsp;</span><span style="font-weight:900">{{ form.iata }}</span>
                </div>
                <div class="ml-6 ">
                    <span>ICAO:&nbsp;&nbsp;</span><span style="font-weight:900">{{ form.icao }}</span>
                </div>
                <div class="ml-6 ">
                    <span>Airport Name:&nbsp;&nbsp;</span><span style="font-weight:900">{{ form.airport_name }}</span>
                </div>
                <div class="ml-6 ">
                    <span>Country:&nbsp;&nbsp;</span><span style="font-weight:900">{{ form.country }}</span>
                </div>
                <!-- <div class="ml-6 "><span>Latitude:&nbsp;&nbsp;</span><span style="font-weight:900">{{ form.latitude }}</span></div>
                <div class="ml-6 "><span>Longitude:&nbsp;&nbsp;</span><span style="font-weight:900">{{ form.longitude }}</span></div> -->
                <div class="ml-6 ">
                    <span>Country Code:&nbsp;&nbsp;</span><span style="font-weight:900">{{ form.country_code }}</span>
                </div>
            </div>
        </template>
        <template #form>
            <div id="DestinationEditForm">
                <!-- IATA-->
                <div
                    v-if="props.formMode == 'addDestination'"
                    class="col-span-6 sm:col-span-4 mt-2"
                >
                    <InputLabel
                        for="iata"
                        value="IATA"
                        style="width:300px"
                    />
                    <TextInput
                        id="iata"
                        v-model="form.iata"
                        required
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
                <div
                    v-if="props.formMode == 'addDestination'"
                    class="col-span-6 sm:col-span-4 mt-4"
                >
                    <InputLabel
                        for="icao"
                        value="ICAO"
                        style="width:300px"
                    />
                    <TextInput
                        id="icao"
                        v-model="form.icao"
                        required
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

                <!-- CITY -->
                <div class="col-span-6 sm:col-span-4 mt-4">
                    <InputLabel
                        for="city"
                        value="City"
                        style="width:300px"
                    />
                    <TextInput
                        id="city"
                        v-model="form.city"
                        required
                        type="text"
                        class="mt-2 block w-full"
                        autocomplete="City"
                        style="width:300px"
                    />
                    <InputError
                        :message="form.errors.city"
                        class="mt-2"
                    />
                </div>

                <!-- Airport Name -->
                <div
                    v-if="props.formMode == 'addDestination'"
                    class="col-span-6 sm:col-span-4 mt-4"
                >
                    <InputLabel
                        for="airport_name"
                        value="Airport Name"
                        style="width:300px"
                    />
                    <TextInput
                        id="airport_name"
                        v-model="form.airport_name"
                        required
                        type="text"
                        class="mt-2 block w-full"
                        autocomplete="Airport Name"
                        style="width:300px;"
                    />
                    <InputError
                        :message="form.errors.airport_name"
                        class="mt-2"
                    />
                </div>

                <!-- Country-->
                <div
                    v-if="props.formMode == 'addDestination'"
                    class="col-span-6 sm:col-span-4 mt-4"
                >
                    <InputLabel
                        for="country"
                        value="Country"
                        style="width:300px"
                    />
                    <multiselect
                        v-model="form.country"
                        style="width:300px"
                        :options="countryOptions"
                        :custom-label="nameWithLang"
                        placeholder="Select Country"
                        label="countryName"
                        track-by="countryCode"
                        :allow-empty="false"
                        :preselect-first="true"
                    />
                </div>

                <!-- Country-->
                <!-- <div class="col-span-6 sm:col-span-4 mt-4" style="opacity:.75">
                    <InputLabel for="country" value="Country" style="width:300px"/>
                    <TextInput
                        disabled
                        id="country"
                        v-model="form.country"
                        type="text"
                        class="mt-2 block w-full"
                        autocomplete="Country"
                        style="width:300px; opacity:.5;"
                    />
                    <InputError :message="form.errors.country" class="mt-2" />
                </div> -->

                <!-- Latitude-->
                <div
                    v-if="props.formMode == 'addDestination'"
                    class="col-span-6 sm:col-span-4 mt-4"
                >
                    <InputLabel
                        for="latitude"
                        value="Latitude"
                        style="width:300px"
                    />
                    <TextInput
                        id="latitude"
                        v-model="form.latitude"
                        required
                        type="number"
                        step="any"
                        class="mt-2 block w-full"
                        autocomplete="Latitude"
                        style="width:300px;"
                    />
                    <InputError
                        :message="form.errors.latitude"
                        class="mt-2"
                    />
                </div>

                <!-- Longitude-->
                <div
                    v-if="props.formMode == 'addDestination'"
                    class="col-span-6 sm:col-span-4 mt-4"
                >
                    <InputLabel
                        for="lonitude"
                        value="Longitude"
                        style="width:300px"
                    />
                    <TextInput
                        id="longitude"
                        v-model="form.longitude"
                        required
                        type="number"
                        step="any"
                        class="mt-2 block w-full"
                        autocomplete="Country"
                        style="width:300px;"
                    />
                    <InputError
                        :message="form.errors.longitude"
                        class="mt-2"
                    />
                </div>

                <!-- Country Code-->
                <!-- <div class="col-span-6 sm:col-span-4 mt-4" style="opacity:.75">
                    <InputLabel for="country_code" value="Country Code" style="width:300px"/>
                    <TextInput
                        disabled
                        id="country_code"
                        v-model="form.country_code"
                        type="text"
                        class="mt-2 block w-full"
                        autocomplete="Country Code"
                        style="width:300px; opacity:.5;"
                    />
                    <InputError :message="form.errors.country_code" class="mt-2" />
                </div> -->

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
                        >Destination Status</label>
                    </div>
                    <div style="width:300px; opacity:.5;">
                        <small id="toggle-description">Set the destination's status</small>
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
            <a href="/destinations">
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
</template>

<!-- <style src="@vueform/toggle/themes/default.css"></style> -->

<script>
export default {
    components: {
        Multiselect
    },
    data () {
        return {
            countryOptions: [
                { countryName: 'United States', countryCode: 'US' },
                { countryName: 'Afghanistan', countryCode: 'AF' },
                { countryName: 'Aland Islands', countryCode: 'AX' },
                { countryName: 'Albania', countryCode: 'AL' },
                { countryName: 'Algeria', countryCode: 'DZ' },
                { countryName: 'American Samoa', countryCode: 'AS' },
                { countryName: 'Andorra', countryCode: 'AD' },
                { countryName: 'Angola', countryCode: 'AO' },
                { countryName: 'Anguilla', countryCode: 'AI' },
                { countryName: 'Antarctica', countryCode: 'AQ' },
                { countryName: 'Antigua and Barbuda', countryCode: 'AG' },
                { countryName: 'Argentina', countryCode: 'AR' },
                { countryName: 'Armenia', countryCode: 'AM' },
                { countryName: 'Aruba', countryCode: 'AW' },
                { countryName: 'Australia', countryCode: 'AU' },
                { countryName: 'Austria', countryCode: 'AT' },
                { countryName: 'Azerbaijan', countryCode: 'AZ' },
                { countryName: 'Bahamas', countryCode: 'BS' },
                { countryName: 'Bahrain', countryCode: 'BH' },
                { countryName: 'Bangladesh', countryCode: 'BD' },
                { countryName: 'Barbados', countryCode: 'BB' },
                { countryName: 'Belarus', countryCode: 'BY' },
                { countryName: 'Belgium', countryCode: 'BE' },
                { countryName: 'Belize', countryCode: 'BZ' },
                { countryName: 'Benin', countryCode: 'BJ' },
                { countryName: 'Bermuda', countryCode: 'BM' },
                { countryName: 'Bhutan', countryCode: 'BT' },
                { countryName: 'Bolivia', countryCode: 'BO' },
                { countryName: 'Bosnia and Herzegovina', countryCode: 'BA' },
                { countryName: 'Botswana', countryCode: 'BW' },
                { countryName: 'Bouvet Island', countryCode: 'BV' },
                { countryName: 'Brazil', countryCode: 'BR' },
                { countryName: 'British Indian Ocean Territory', countryCode: 'IO' },
                { countryName: 'Brunei Darussalam', countryCode: 'BN' },
                { countryName: 'Bulgaria', countryCode: 'BG' },
                { countryName: 'Burkina Faso', countryCode: 'BF' },
                { countryName: 'Burundi', countryCode: 'BI' },
                { countryName: 'Cambodia', countryCode: 'KH' },
                { countryName: 'Cameroon', countryCode: 'CM' },
                { countryName: 'Canada', countryCode: 'CA' },
                { countryName: 'Cape Verde', countryCode: 'CV' },
                { countryName: 'Cayman Islands', countryCode: 'KY' },
                { countryName: 'Central African Republic', countryCode: 'CF' },
                { countryName: 'Chad', countryCode: 'TD' },
                { countryName: 'Chile', countryCode: 'CL' },
                { countryName: 'China', countryCode: 'CN' },
                { countryName: 'Christmas Island', countryCode: 'CX' },
                { countryName: 'Cocos (Keeling) Islands', countryCode: 'CC' },
                { countryName: 'Colombia', countryCode: 'CO' },
                { countryName: 'Comoros', countryCode: 'KM' },
                { countryName: 'Congo', countryCode: 'CG' },
                { countryName: 'Congo', countryCode: 'CD' },
                { countryName: 'Cook Islands', countryCode: 'CK' },
                { countryName: 'Costa Rica', countryCode: 'CR' },
                { countryName: "Cote D'Ivoire", countryCode: 'CI' },
                { countryName: 'Croatia', countryCode: 'HR' },
                { countryName: 'Cuba', countryCode: 'CU' },
                { countryName: 'Curacao', countryCode: 'CW' },
                { countryName: 'Cyprus', countryCode: 'CY' },
                { countryName: 'Czech Republic', countryCode: 'CZ' },
                { countryName: 'Denmark', countryCode: 'DK' },
                { countryName: 'Djibouti', countryCode: 'DJ' },
                { countryName: 'Dominica', countryCode: 'DM' },
                { countryName: 'Dominican Republic', countryCode: 'DO' },
                { countryName: 'Ecuador', countryCode: 'EC' },
                { countryName: 'Egypt', countryCode: 'EG' },
                { countryName: 'El Salvador', countryCode: 'SV' },
                { countryName: 'Equatorial Guinea', countryCode: 'GQ' },
                { countryName: 'Eritrea', countryCode: 'ER' },
                { countryName: 'Estonia', countryCode: 'EE' },
                { countryName: 'Ethiopia', countryCode: 'ET' },
                { countryName: 'Falkland Islands (Malvinas)', countryCode: 'FK' },
                { countryName: 'Faroe Islands', countryCode: 'FO' },
                { countryName: 'Fiji', countryCode: 'FJ' },
                { countryName: 'Finland', countryCode: 'FI' },
                { countryName: 'France', countryCode: 'FR' },
                { countryName: 'French Guiana', countryCode: 'GF' },
                { countryName: 'French Polynesia', countryCode: 'PF' },
                { countryName: 'French Southern Territories', countryCode: 'TF' },
                { countryName: 'Gabon', countryCode: 'GA' },
                { countryName: 'Gambia', countryCode: 'GM' },
                { countryName: 'Georgia', countryCode: 'GE' },
                { countryName: 'Germany', countryCode: 'DE' },
                { countryName: 'Ghana', countryCode: 'GH' },
                { countryName: 'Gibraltar', countryCode: 'GI' },
                { countryName: 'Greece', countryCode: 'GR' },
                { countryName: 'Greenland', countryCode: 'GL' },
                { countryName: 'Grenada', countryCode: 'GD' },
                { countryName: 'Guadeloupe', countryCode: 'GP' },
                { countryName: 'Guam', countryCode: 'GU' },
                { countryName: 'Guatemala', countryCode: 'GT' },
                { countryName: 'Guernsey', countryCode: 'GG' },
                { countryName: 'Guinea', countryCode: 'GN' },
                { countryName: 'Guinea-Bissau', countryCode: 'GW' },
                { countryName: 'Guyana', countryCode: 'GY' },
                { countryName: 'Haiti', countryCode: 'HT' },
                { countryName: 'Heard Island and Mcdonald Islands', countryCode: 'HM' },
                { countryName: 'Holy See (Vatican City State)', countryCode: 'VA' },
                { countryName: 'Honduras', countryCode: 'HN' },
                { countryName: 'Hong Kong', countryCode: 'HK' },
                { countryName: 'Hungary', countryCode: 'HU' },
                { countryName: 'CANARY ISLANDS', countryCode: 'IC' },
                { countryName: 'Iceland', countryCode: 'IS' },
                { countryName: 'India', countryCode: 'IN' },
                { countryName: 'Indonesia', countryCode: 'ID' },
                { countryName: 'Iran', countryCode: 'IR' },
                { countryName: 'Iraq', countryCode: 'IQ' },
                { countryName: 'Ireland', countryCode: 'IE' },
                { countryName: 'Isle of Man', countryCode: 'IM' },
                { countryName: 'Israel', countryCode: 'IL' },
                { countryName: 'Italy', countryCode: 'IT' },
                { countryName: 'Jamaica', countryCode: 'JM' },
                { countryName: 'Japan', countryCode: 'JP' },
                { countryName: 'Jersey', countryCode: 'JE' },
                { countryName: 'Jordan', countryCode: 'JO' },
                { countryName: 'Kazakhstan', countryCode: 'KZ' },
                { countryName: 'Kenya', countryCode: 'KE' },
                { countryName: 'Kiribati', countryCode: 'KI' },
                { countryName: 'North Korea', countryCode: 'KP' },
                { countryName: 'South Korea', countryCode: 'KR' },
                { countryName: 'Kosovo', countryCode: 'XK' },
                { countryName: 'Kuwait', countryCode: 'KW' },
                { countryName: 'Kyrgyzstan', countryCode: 'KG' },
                { countryName: "Lao People's Democratic Republic", countryCode: 'LA' },
                { countryName: 'Latvia', countryCode: 'LV' },
                { countryName: 'Lebanon', countryCode: 'LB' },
                { countryName: 'Lesotho', countryCode: 'LS' },
                { countryName: 'Liberia', countryCode: 'LR' },
                { countryName: 'Libya', countryCode: 'LY' },
                { countryName: 'Liechtenstein', countryCode: 'LI' },
                { countryName: 'Lithuania', countryCode: 'LT' },
                { countryName: 'Luxembourg', countryCode: 'LU' },
                { countryName: 'Macao', countryCode: 'MO' },
                { countryName: 'North Macedonia', countryCode: 'MK' },
                { countryName: 'Madagascar', countryCode: 'MG' },
                { countryName: 'Malawi', countryCode: 'MW' },
                { countryName: 'Malaysia', countryCode: 'MY' },
                { countryName: 'Maldives', countryCode: 'MV' },
                { countryName: 'Mali', countryCode: 'ML' },
                { countryName: 'Malta', countryCode: 'MT' },
                { countryName: 'Marshall Islands', countryCode: 'MH' },
                { countryName: 'Martinique', countryCode: 'MQ' },
                { countryName: 'Mauritania', countryCode: 'MR' },
                { countryName: 'Mauritius', countryCode: 'MU' },
                { countryName: 'Mayotte', countryCode: 'YT' },
                { countryName: 'Mexico', countryCode: 'MX' },
                { countryName: 'Micronesia', countryCode: 'FM' },
                { countryName: 'Moldova', countryCode: 'MD' },
                { countryName: 'Monaco', countryCode: 'MC' },
                { countryName: 'Mongolia', countryCode: 'MN' },
                { countryName: 'Montenegro', countryCode: 'ME' },
                { countryName: 'Montserrat', countryCode: 'MS' },
                { countryName: 'Morocco', countryCode: 'MA' },
                { countryName: 'Mozambique', countryCode: 'MZ' },
                { countryName: 'Myanmar', countryCode: 'MM' },
                { countryName: 'Namibia', countryCode: 'NA' },
                { countryName: 'Nauru', countryCode: 'NR' },
                { countryName: 'Nepal', countryCode: 'NP' },
                { countryName: 'Netherlands', countryCode: 'NL' },
                { countryName: 'Netherlands Antilles', countryCode: 'AN' },
                { countryName: 'New Caledonia', countryCode: 'NC' },
                { countryName: 'New Zealand', countryCode: 'NZ' },
                { countryName: 'Nicaragua', countryCode: 'NI' },
                { countryName: 'Niger', countryCode: 'NE' },
                { countryName: 'Nigeria', countryCode: 'NG' },
                { countryName: 'Niue', countryCode: 'NU' },
                { countryName: 'Norfolk Island', countryCode: 'NF' },
                { countryName: 'Northern Mariana Islands', countryCode: 'MP' },
                { countryName: 'Norway', countryCode: 'NO' },
                { countryName: 'Oman', countryCode: 'OM' },
                { countryName: 'Pakistan', countryCode: 'PK' },
                { countryName: 'Palau', countryCode: 'PW' },
                { countryName: 'Palestinian Territory', countryCode: 'PS' },
                { countryName: 'Panama', countryCode: 'PA' },
                { countryName: 'Papua New Guinea', countryCode: 'PG' },
                { countryName: 'Paraguay', countryCode: 'PY' },
                { countryName: 'Peru', countryCode: 'PE' },
                { countryName: 'Philippines', countryCode: 'PH' },
                { countryName: 'Pitcairn', countryCode: 'PN' },
                { countryName: 'Poland', countryCode: 'PL' },
                { countryName: 'Portugal', countryCode: 'PT' },
                { countryName: 'Puerto Rico', countryCode: 'PR' },
                { countryName: 'Qatar', countryCode: 'QA' },
                { countryName: 'Reunion', countryCode: 'RE' },
                { countryName: 'Romania', countryCode: 'RO' },
                { countryName: 'Russian Federation', countryCode: 'RU' },
                { countryName: 'Rwanda', countryCode: 'RW' },
                { countryName: 'Saint Barthelemy', countryCode: 'BL' },
                { countryName: 'Saint Helena', countryCode: 'SH' },
                { countryName: 'Saint Kitts and Nevis', countryCode: 'KN' },
                { countryName: 'Saint Lucia', countryCode: 'LC' },
                { countryName: 'Saint Martin', countryCode: 'MF' },
                { countryName: 'Saint Pierre and Miquelon', countryCode: 'PM' },
                { countryName: 'Saint Vincent and the Grenadines', countryCode: 'VC' },
                { countryName: 'Samoa', countryCode: 'WS' },
                { countryName: 'San Marino', countryCode: 'SM' },
                { countryName: 'Sao Tome and Principe', countryCode: 'ST' },
                { countryName: 'Saudi Arabia', countryCode: 'SA' },
                { countryName: 'Senegal', countryCode: 'SN' },
                { countryName: 'Serbia', countryCode: 'RS' },
                { countryName: 'Serbia and Montenegro', countryCode: 'CS' },
                { countryName: 'Seychelles', countryCode: 'SC' },
                { countryName: 'Sierra Leone', countryCode: 'SL' },
                { countryName: 'Singapore', countryCode: 'SG' },
                { countryName: 'Sint Maarten', countryCode: 'SX' },
                { countryName: 'Slovakia', countryCode: 'SK' },
                { countryName: 'Slovenia', countryCode: 'SI' },
                { countryName: 'Solomon Islands', countryCode: 'SB' },
                { countryName: 'Somalia', countryCode: 'SO' },
                { countryName: 'South Africa', countryCode: 'ZA' },
                { countryName: 'South Georgia and the South Sandwich Islands', countryCode: 'GS' },
                { countryName: 'South Sudan', countryCode: 'SS' },
                { countryName: 'Spain', countryCode: 'ES' },
                { countryName: 'Sri Lanka', countryCode: 'LK' },
                { countryName: 'Sudan', countryCode: 'SD' },
                { countryName: 'Suriname', countryCode: 'SR' },
                { countryName: 'Svalbard and Jan Mayen', countryCode: 'SJ' },
                { countryName: 'Swaziland', countryCode: 'SZ' },
                { countryName: 'Sweden', countryCode: 'SE' },
                { countryName: 'Switzerland', countryCode: 'CH' },
                { countryName: 'Syria', countryCode: 'SY' },
                { countryName: 'Taiwan', countryCode: 'TW' },
                { countryName: 'Tajikistan', countryCode: 'TJ' },
                { countryName: 'Tanzania', countryCode: 'TZ' },
                { countryName: 'Thailand', countryCode: 'TH' },
                { countryName: 'Timor-Leste', countryCode: 'TL' },
                { countryName: 'Togo', countryCode: 'TG' },
                { countryName: 'Tokelau', countryCode: 'TK' },
                { countryName: 'Tonga', countryCode: 'TO' },
                { countryName: 'Trinidad and Tobago', countryCode: 'TT' },
                { countryName: 'Tunisia', countryCode: 'TN' },
                { countryName: 'Turkey', countryCode: 'TR' },
                { countryName: 'Turkmenistan', countryCode: 'TM' },
                { countryName: 'Turks and Caicos Islands', countryCode: 'TC' },
                { countryName: 'Tuvalu', countryCode: 'TV' },
                { countryName: 'Uganda', countryCode: 'UG' },
                { countryName: 'Ukraine', countryCode: 'UA' },
                { countryName: 'United Arab Emirates', countryCode: 'AE' },
                { countryName: 'United Kingdom', countryCode: 'GB' },
                { countryName: 'United States Minor Outlying Islands', countryCode: 'UM' },
                { countryName: 'Uruguay', countryCode: 'UY' },
                { countryName: 'Uzbekistan', countryCode: 'UZ' },
                { countryName: 'Vanuatu', countryCode: 'VU' },
                { countryName: 'Venezuela', countryCode: 'VE' },
                { countryName: 'Viet Nam', countryCode: 'VN' },
                { countryName: 'Virgin Islands, British', countryCode: 'VG' },
                { countryName: 'Virgin Islands, U.s.', countryCode: 'VI' },
                { countryName: 'Wallis and Futuna', countryCode: 'WF' },
                { countryName: 'Western Sahara', countryCode: 'EH' },
                { countryName: 'Yemen', countryCode: 'YE' },
                { countryName: 'Zambia', countryCode: 'ZM' },
                { countryName: 'Zimbabwe', countryCode: 'ZW' }
            ]
        }
    },
    methods: {
        nameWithLang ({ countryName, countryCode }) {
            return `${countryName} — [${countryCode}]`
        }
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
