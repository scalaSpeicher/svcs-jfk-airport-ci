<script setup>
import { ref, watch, computed } from 'vue';
import { router, usePage, useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue'
import NavLink from '@/Components/NavLink.vue';
import DangerButton from '@/Components/DangerButton.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DialogModal from '@/Components/DialogModal.vue';
import Pagination from '@/Components/Pagination.vue';
import TextInput from '@/Components/TextInput.vue';
import Sort from '@/Components/Sort.vue';
import ItemsPerPage from '@/Components/ItemsPerPage.vue';
import Debounce from "lodash/debounce";

const props = defineProps({
    airlines: {
        type: Object,
        default: () => ({}),
    },
    canReadAirlines: {
        type: Boolean,
        default: () => false,
    },
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
    canDeleteAirlines: {
        type: Boolean,
        default: () => false,
    },
    isSuperAdmin: {
        type: Boolean,
        default: () => false,
    },
    filters: {
        type: Object,
        default: () => ({}),
    },
});

const page = usePage();
const showFlashMessage = ref(false);
let flashMessageSet = ref('');
const flashMessage = computed({
    get() {
        return (flashMessageSet.value) ? flashMessageSet.value : page.props.flash.message;
    },
    set(newValue) {
        flashMessageSet.value = newValue;
    }
});
const showError = () => {
    showFlashMessage.value = true;
    if (document.getElementById("alertnotification")) {
        document.getElementById("alertnotification").style="display:justify;"
    }
};

const hideError = () => {
    showFlashMessage.value = false;
    if (document.getElementById("alertnotification")) {
        document.getElementById("alertnotification").style="display:none;"
    }
};

watch(page.props, function (val) {
    if (val?.flashMessage) {
        showError();
    }
}, {
    immediate: true,
    deep: true,
});
watch(flashMessage, (newValue, oldValue) => {
    if (newValue) {
        showError();
    }}, {
    immediate: true,
    deep: true,
});

const addNewAirline = () => {
    router.get(route(
        'airlines.create'
    ));
}

const editAirline = (airlineId) => {
    router.get(route(
        'airlines.edit',
        airlineId
    ));
}

let deleteAirlineId;
const confirmingAirlineDeletion = ref(false);

const airlineDeleteForm = useForm({
    //form_name: 'airline_delete',
});

const confirmAirlineDeletion = (airlineId) => {
    deleteAirlineId = airlineId
    confirmingAirlineDeletion.value = true;
};

const deleteAirline = () => {
    airlineDeleteForm.delete(route(
        'airlines.destroy',
        deleteAirlineId
    ), {
        onSuccess: () => closeModal(),
    });
};

const closeModal = () => {
    confirmingAirlineDeletion.value = false;
};

const processFlash = (messages) => {
    let processedMessage = '';
    if (typeof messages === 'object') {
        processedMessage += 'Problem updating template! (records with issues marked in red)<br/>';
        Object.entries(messages).forEach(entry => {
            const [key, value] = entry;
            processedMessage += value;
        });
        return processedMessage;
    }

    return messages;
}

let search = ref(props.filters.search);
watch(search, Debounce(function (value) {
    router.get('/airlines', { search: value },
               {
                   // preserveState: true,
                   replace: true
               }
    );
}, 300));

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;Airlines
            </h2>
        </template>

        <div class="py-4">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="flex justify-between ml-2">
                    <div v-if="canReadAirlines">
                        <div class="self-align-center ml-2 mb-2">
                            <small>Search By:</small>
                        </div>
                        <TextInput
                            id="search"
                            v-model="search"
                            type="text"
                            placeholder="IATA, Airline Name"
                            class="mb-6"
                            style="width:400px; opacity:.75;"
                        />
                    </div>
                    <div
                        v-if="canAddAirlines"
                        class="mt-8 mr-2"
                    >
                        <PrimaryButton @click="addNewAirline()">
                            Create
                        </PrimaryButton>
                    </div>
                </div>
                <!-- flash message -->
                <div
                    v-show="showFlashMessage"
                    id="alertnotification"
                    class="flex justify-end items-center scala-alert text-white text-sm font-bold px-4 py-3"
                    role="alert"
                >
                    <svg
                        class="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    ><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                    <p
                        v-html="(flashMessage) ? processFlash(flashMessage) : ''"
                    />
                    <span class="px-4 py-3 justify-end">
                        <svg
                            class="fill-current h-6 w-6 text-indigo-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            @click="hideError()"
                        ><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span>
                </div>
                <!-- flash message end -->
                <div
                    v-if="canReadAirlines"
                    id="AirlinessTable"
                    class="bg-white overflow-hidden shadow-xl sm:rounded-lg"
                >
                    <table class="min-w-full divide-y divide-gray-200 border-separate">
                        <thead class="bg-gray-200 border">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="IATA"
                                        attribute="iata"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="NAME"
                                        attribute="name"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="STATUS"
                                        attribute="status"
                                    />
                                </th>
                                <th
                                    v-show="canDeleteAirlines"
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="airline in airlines.data"
                                :key="airline.id"
                                class="cursor-pointer scala-tr"
                            >
                                <td
                                    v-if="canEditAirlines"
                                    v-tippy="{ content: 'Click to Edit: <b>' + airline.name + '</b>'}"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editAirline(airline.id)"
                                >
                                    {{ airline.iata }}
                                </td>
                                <td
                                    v-else
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    {{ airline.iata }}
                                </td>
                                <td
                                    v-if="canEditAirlines"
                                    v-tippy="{ content: 'Click to Edit: <b>' + airline.name + '</b>'}"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editAirline(airline.id)"
                                >
                                    {{ airline.name }}
                                </td>
                                <td
                                    v-else
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    {{ airline.name }}
                                </td>
                                <td
                                    v-if="canEditAirlines"
                                    v-tippy="{ content: 'Click to Edit: <b>' + airline.name + '</b>'}"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editAirline(airline.id)"
                                >
                                    {{ airline.status }}
                                </td>
                                <td
                                    v-else
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    {{ airline.status }}
                                </td>
                                <td
                                    v-show="canDeleteAirlines"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border scala-delete-td"
                                    @click="confirmAirlineDeletion(airline.id)"
                                >
                                    <SecondaryButton
                                        class="scala-delete-btn"
                                        @click="confirmAirlineDeletion(airline.id)"
                                    >
                                        <svg
                                            class="svg-icon template-delete-icon"
                                            fill="#000000"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                            width="2em"
                                            height="2em"
                                            viewBox="0 0 482.428 482.429"
                                            xml:space="preserve"
                                        >
                                            <path
                                                d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
                                                            c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
                                                            h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
                                                            C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
                                                            C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
                                                            c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
                                                            c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
                                                            V115.744z"
                                            />
                                            <path
                                                d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			                                                c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
                                            />
                                            <path
                                                d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			                                                c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
                                            />
                                            <path
                                                d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			                                                c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
                                            />
                                        </svg>
                                    </SecondaryButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="display: flex;">
                        <!-- Items per page -->
                        <div class="mt-4 ml-4 mb-4">
                            <ItemsPerPage />
                        </div>
                        <!-- Pagination -->
                        <div class="mt-4 ml-4 mb-4">
                            <Pagination :links="airlines.links" />
                        </div>
                    </div>
                </div>

                <!-- If can't read airlines -->
                <div v-else>
                    <p>You do not have permission to access this page.</p>
                    <NavLink
                        :href="route('planners.index',{_query:{today_only:0,search_by:'open',active_only:1,sort:'checkindesk'}})"
                        :active="route().current('planners.index')"
                    >
                        Return to Main Page
                    </NavLink>
                </div>
            </div>
        </div>
    </AppLayout>
    <DialogModal
        :show="confirmingAirlineDeletion"
        @close="closeModal"
    >
        <template #title>
            <span>DELETE AIRLINE</span>
        </template>
        <template #content>
            <span>Are you sure you want to delete this airline?</span>
        </template>
        <template #footer>
            <SecondaryButton @click="closeModal">
                NO
            </SecondaryButton>
            <span style="width:20px" />
            <DangerButton @click="deleteAirline">
                YES
            </DangerButton>
        </template>
    </DialogModal>
</template>
