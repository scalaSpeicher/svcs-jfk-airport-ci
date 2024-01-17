<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, watch, reactive, computed } from 'vue';
import { router, usePage, useForm, Link } from '@inertiajs/vue3';
import Pagination from '@/Components/Pagination.vue';
import ItemsPerPage from '@/Components/ItemsPerPage.vue';
import Sort from '@/Components/Sort.vue';
import TextInput from '@/Components/TextInput.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue';
import NavLink from '@/Components/NavLink.vue';
import Checkbox from '@/Components/Checkbox.vue';
import Debounce from "lodash/debounce";
import DialogModal from '@/Components/DialogModal.vue';

const props = defineProps({
    overrides: {
        type: Object,
        default: () => ({}),
    },
    canReadOverrides: {
        type: Boolean,
        default: () => false,
    },
    canRestoreOverrides: {
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

const boxesChecked = reactive({
    active: false,
    allCheck: true,
});
let checkedBoxes = [];

const setChecks = (e) => {
    if (e.target.checked == true) {
        checkedBoxes.push(parseInt(e.target.value))
    } else {
        let index = checkedBoxes.indexOf(parseInt(e.target.value))
        checkedBoxes.splice(index, 1)
    }
    if (checkedBoxes.length > 0) {
        boxesChecked.active = true;
    } else {
        boxesChecked.active = false;
        boxesChecked.allCheck = true;
        checkedBoxes = [];
    }
};

const tdClick = (id) => {
    let element = document.getElementById(id);
    element.click();
};

const selectAllVisible = () => {
    let inputs = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < inputs.length; i++) {
        if (boxesChecked.allCheck) {
            inputs[i].checked = true;
            checkedBoxes.push(parseInt(inputs[i].value))
        } else {
            inputs[i].checked = false;
            let index = checkedBoxes.indexOf(parseInt(inputs[i].value))
            checkedBoxes.splice(index, 1)
        }
    }
    if (boxesChecked.allCheck) {
        document.getElementById('selectAllButton').innerText = 'Unselect All';
        boxesChecked.active = true;
        boxesChecked.allCheck = false;

    } else {
        document.getElementById('selectAllButton').innerText = 'Select All';
        checkedBoxes = [];
        boxesChecked.active = false;
        boxesChecked.allCheck = true;

    }
};

const confirmingOverrideRestore = ref(false);
let overridesRestore = [];
const confirmOverrideRestore = () => {
    props.overrides.data.forEach((override) => {
        let index = overridesRestore.indexOf(override);
        if (checkedBoxes.includes(override.id)) {
            if (index === -1) {
                overridesRestore.push(override);
            }
        } else {
            if (index > -1) {
                overridesRestore.splice(index, 1);
            }
        }
    });
    confirmingOverrideRestore.value = true;
};

const restoreOverride = () => {
    if (checkedBoxes.length > 0) {

        router.put(route(
            'overrides.restore',
            JSON.stringify(checkedBoxes)
        ), {
            onSuccess: () => closeModal(),
        });
    }
};

const closeModal = () => {
    confirmingOverrideRestore.value = false;
};

const debouncedWatch = Debounce((value) => {
    router.get('/overrides', { search: value },
               {
                   // preserveState: true,
                   replace: true
               }
    );
}, 300);

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
watch(search, debouncedWatch);

router.on('success', () => {
    boxesChecked.active = false;
    boxesChecked.allCheck = false;
    checkedBoxes = [];
    overridesRestore = [];
});

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;Overrides
            </h2>
        </template>

        <div class="py-4">
            <div class="max-w-9xl mx-auto sm:px-6 lg:px-8">
                <div class="flex justify-between ml-2">
                    <div v-if="canReadOverrides">
                        <div class="self-align-center ml-2 mb-2">
                            <small>Search By:</small>
                        </div>
                        <TextInput
                            id="search"
                            v-model="search"
                            type="text"
                            placeholder="Check In Desk, Flight Identity, Class Code"
                            class="mb-6"
                            style="width:400px; opacity:.75;"
                        />
                    </div>
                    <div class="mt-8 mr-2 overrides-bulk-buttons">
                        <span v-show="canRestoreOverrides">
                            <SecondaryButton
                                id="selectAllButton"
                                class="slim-header-btn"
                                :disabled="Object.keys(props.overrides.data).length === 0"
                                @click="selectAllVisible()"
                            >
                                Select All
                            </SecondaryButton>
                            <SecondaryButton
                                class="slim-header-btn"
                                :disabled="boxesChecked.active === false"
                                @click="confirmOverrideRestore()"
                            >
                                Remove &#x2713;
                            </SecondaryButton>
                        </span>
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
                    v-if="canReadOverrides"
                    id="overridesTable"
                    class="bg-white overflow-hidden shadow-xl sm:rounded-lg overrides-table"
                >
                    <table class="min-w-full divide-y divide-gray-200 border-separate">
                        <thead class="bg-gray-200 border">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Check-In Desk"
                                        attribute="checkindesk"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Flight Identity"
                                        attribute="flight_identity"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Plan Open Date"
                                        attribute="checkin_plan_open_date_time"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Plan Close Date"
                                        attribute="checkin_plan_close_date_time"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Actual Open Date"
                                        attribute="checkin_open_date_time"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Actual Close Date"
                                        attribute="checkin_close_date_time"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Class Code"
                                        attribute="class_code"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Label"
                                        attribute="label"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Overridden By"
                                        attribute="overridden_by_name"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Created At"
                                        attribute="updated_at"
                                    />
                                </th>
                                <th
                                    v-show="canRestoreOverrides"
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                    style="width: 95px;"
                                >
                                    SELECT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!overrides.data || !overrides.data.length">
                                <td>
                                    No data to display
                                </td>
                            </tr>
                            <tr
                                v-for="overrideData in overrides.data"
                                v-else
                                :key="overrideData.id"
                                v-tippy="(overrideData.deletion) ? { content: 'Deleted Planner' } : { content: 'Overriden Planner' }"
                                :class="(overrideData.deletion) ? 'cursor-pointer override-deletion-row-color' : 'cursor-pointer override-row-color'"
                            >
                                <td
                                    v-tippy="{ content: 'Click to select override' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('checkbox' + overrideData.id)"
                                >
                                    {{ overrideData.checkindesk }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to select override' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('checkbox' + overrideData.id)"
                                >
                                    {{ overrideData.flight_identity }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to select override' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('checkbox' + overrideData.id)"
                                >
                                    {{ overrideData.checkin_plan_open_date_time }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to select override' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('checkbox' + overrideData.id)"
                                >
                                    {{ overrideData.checkin_plan_close_date_time }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to select override' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('checkbox' + overrideData.id)"
                                >
                                    {{ overrideData.checkin_open_date_time }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to select override' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('checkbox' + overrideData.id)"
                                >
                                    {{ overrideData.checkin_close_date_time }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to select override' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('checkbox' + overrideData.id)"
                                >
                                    {{ overrideData.class_code }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to select override' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('checkbox' + overrideData.id)"
                                >
                                    {{ overrideData.label }}
                                </td>
                                <td
                                    v-tippy="'Click to View: <b>' + overrideData.overridden_by_name + '</b>'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('user' + overrideData.id)"
                                >
                                    <Link
                                        :id="'user' + overrideData.id"
                                        style="cursor: pointer;"
                                        :href="route('users.index',{_query:{search:overrideData.actor_email}})"
                                    >
                                        {{ overrideData.overridden_by_name }}
                                    </Link>
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to select override' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('checkbox' + overrideData.id)"
                                >
                                    {{ overrideData.updated_at }}
                                </td>
                                <td
                                    v-show="canRestoreOverrides"
                                    v-tippy="{ content: 'Click to select override' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="tdClick('checkbox' + overrideData.id)"
                                >
                                    <div class="px-6 py-4 ml-3 border-none">
                                        <Checkbox
                                            :id="'checkbox' + overrideData.id"
                                            :value="overrideData.id.toString()"
                                            @click="tdClick('checkbox' + overrideData.id)"
                                            @change="setChecks($event)"
                                        />
                                    </div>
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
                            <Pagination :links="overrides.links" />
                        </div>
                    </div>
                </div>

                <!-- If can't read overrides -->
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
        :show="confirmingOverrideRestore"
        @close="closeModal()"
    >
        <template #title>
            <span>REMOVE OVERRIDE(S)</span>
        </template>
        <template #content>
            <span>Are you sure you want to remove {{ (checkedBoxes.length > 1) ? 'these overrides?' : 'this override?' }}</span>
            <table class="min-w-full divide-y divide-gray-200 border-separate">
                <tbody>
                    <tr
                        v-for="overrideRestore in overridesRestore"
                        :key="overrideRestore.id"
                    >
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ overrideRestore.checkindesk }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ overrideRestore.flight_identity }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ overrideRestore.checkin_plan_open_date_time }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ overrideRestore.checkin_plan_close_date_time }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
        <template #footer>
            <SecondaryButton @click="closeModal()">
                NO
            </SecondaryButton>
            <span style="width:20px" />
            <DangerButton @click="restoreOverride">
                YES
            </DangerButton>
        </template>
    </DialogModal>
</template>
