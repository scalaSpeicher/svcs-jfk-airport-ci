<script setup>
import { ref, watch, reactive, computed } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue'
import NavLink from '@/Components/NavLink.vue';
import TextInput from '@/Components/TextInput.vue';
import Checkbox from '@/Components/Checkbox.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import Pagination from '@/Components/Pagination.vue';
import Sort from '@/Components/Sort.vue';
import ItemsPerPage from '@/Components/ItemsPerPage.vue';
import Debounce from "lodash/debounce";
import { setDefaultProps as setTippyProps } from 'vue-tippy';

const props = defineProps({
    planners: {
        type: Object,
        default: () => ({}),
    },
    planner: {
        type: Object,
        default: () => ({}),
    },
    canReadPlanners: {
        type: Boolean,
        default: () => false,
    },
    canEditPlanners: {
        type: Boolean,
        default: () => false,
    },
    canAddPlanners: {
        type: Boolean,
        default: () => false,
    },
    canDeletePlanners: {
        type: Boolean,
        default: () => false,
    },
    isSuperAdmin : {
        type: Boolean,
        default: () => false,
    },
    filters: {
        type: Object,
        default: () => ({}),
    },
});

setTippyProps({
    onShow(instance) {
        let tippyRef = instance.reference.id.split('_');
        if (tippyRef[0] === 'planner') {
            return false;
        }
    }
})

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

const confirmingPlannerDeletion = ref(false);
let plannersTrash = [];
let search = ref(props.filters.search);
let checkinOpen = ref(props.filters.checkin_open);
let checkinClose = ref(props.filters.checkin_close);

// Sets an item with a Key to local storage
const saveStorage = function(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
};

// Looks for a local storage item and returns if present
const getStorage = function(key) {
    if(!localStorage.getItem(key)) {
        saveStorage(key, [])
    }

    return JSON.parse(localStorage.getItem(key))
};

// Clear a single item or the whole local storage
const clearStorage = function(key='false') {
    if(key) {
        localStorage.removeItem(key);
        saveStorage(key, []);
    } else {
        localStorage.clear();
    }
}
const clearBoxes = () => {
    boxesChecked.active = false;
    boxesChecked.allCheck = false;
    checkedBoxes = [];
    plannersTrash = [];
    //selectAllVisible(false);
    clearStorage('checkedBoxes');
}
let url = new URL(document.location);
if (url.searchParams.get("sort") === null) {
    clearStorage('checkedBoxes')
}
const boxesChecked = reactive({
    active: false,
    allCheck: true,
});
let checkedBoxes = getStorage('checkedBoxes');

const setChecks = (e) => {
    checkedBoxes = getStorage('checkedBoxes');
    if (e.target.checked == true) {
        checkedBoxes.push(parseInt(e.target.value))
    } else {
        let index = checkedBoxes.indexOf(parseInt(e.target.value))
        checkedBoxes.splice(index, 1)
    }
    if (checkedBoxes.length > 0) {
        boxesChecked.active = true;
        saveStorage('checkedBoxes', checkedBoxes)
    } else {
        boxesChecked.active = false;
        boxesChecked.allCheck = true;
        checkedBoxes = [];
        clearStorage('checkedBoxes');
    }
};

const editPlanner = (id = null) => {
    if (id) {
        checkedBoxes = [id];
    }
    if(checkedBoxes.length > 0) {
        saveStorage('clearBoxes', true)
        router.get(route(
            'planners.edit',
            JSON.stringify(checkedBoxes)
        ));
    }
}

const addPlanner = () => {
    saveStorage('clearBoxes', true)
    router.get(route(
        'planners.create',
    ));
}

const tdClick = (id) => {
    let checkbox = document.getElementById(id);
    checkbox.click();
};

const selectAllVisible = (click = true) => {
    let inputs = document.querySelectorAll('input[type="checkbox"]');
    checkedBoxes = getStorage('checkedBoxes');
    for (let i = 0; i < inputs.length; i++) {
        let parentRow = inputs[i].parentNode.parentNode.parentNode.parentNode;
        if (boxesChecked.allCheck && click) {
            inputs[i].checked = true;
            checkedBoxes.push(parseInt(inputs[i].value))
            parentRow.classList.add("scala-tr-selected");
        } else {
            inputs[i].checked = false;
            let index = checkedBoxes.indexOf(parseInt(inputs[i].value))
            checkedBoxes.splice(index, 1)
            parentRow.classList.remove("scala-tr-selected");
        }
    }
    if (boxesChecked.allCheck && click) {
        document.getElementById('selectAllButton').innerText = 'Unselect All';
        boxesChecked.active = true;
        boxesChecked.allCheck = false;
        saveStorage('checkedBoxes', checkedBoxes)
    } else {
        document.getElementById('selectAllButton').innerText = 'Select All';
        checkedBoxes = [];
        boxesChecked.active = false;
        boxesChecked.allCheck = true;
        clearStorage('checkedBoxes');
    }
};

const confirmPlannerDeletion = () => {
    checkedBoxes = getStorage('checkedBoxes');
    plannersTrash = [];
    props.planners.data.forEach((planner) => {
        let index = plannersTrash.indexOf(planner);
        if (checkedBoxes.includes(planner.id)) {
            if (index === -1) {
                plannersTrash.push(planner);
            }
        } else {
            if (index > -1) {
                plannersTrash.splice(index, 1);
            }
        }
    });
    saveStorage('clearBoxes', true)
    confirmingPlannerDeletion.value = true;
};

const closeModal = (clear = false) => {
    if (clear) {
        clearBoxes();
    }
    confirmingPlannerDeletion.value = false;
};

const todayOnlyClick = () => {
    todayOnly = !todayOnly;
    activeOnly = false;
    filterChange();
}

const activeOnlyClick = () => {
    activeOnly = !activeOnly;
    todayOnly = false;
    filterChange();
}

const searchByOpenClick = () => {
    searchByOpen = !searchByOpen;
    filterChange();
}

const filterChange = () => {
    let closeText, openText, searchByText, searchText = '';
    if (checkinClose.value !== 'undefined') {
        closeText = checkinClose.value;
    }
    if (checkinOpen.value !== 'undefined') {
        openText = checkinOpen.value;
    }
    if (search.value !== 'undefined' ) {
        searchText = search.value;
    }
    router.get('/planners', {
                   search: searchText,
                   checkin_close: todayOnly ? '' : closeText,
                   checkin_open: todayOnly ? '' : openText,
                   search_by: searchByOpen ? 'open' : 'close',
                   today_only: todayOnly ? '1' : '0',
                   active_only: activeOnly ? '1' : '0'
               },
               {
                   replace: true,
               }
    );
}

watch(search, Debounce(function (value) {
    filterChange(value);
}, 300));

watch(checkinOpen, function (value) {
    filterChange(value);
});

watch(checkinClose, function (value) {
    filterChange(value);
});

let todayOnly = (url.searchParams.get("today_only")==='1' || props.filters.today_only==='1') ? true : false;
let activeOnly = (url.searchParams.get("active_only")==='1' || props.filters.active_only==='1') ? true : false;
let searchByOpen = (url.searchParams.get("search_by")==='close'  || props.filters.search_by==='close') ? false : true;
let searchByOpenText = searchByOpen ? 'Open' : 'Close';
let searchByOpenClass = searchByOpen ? 'search-by-open-btn' : 'search-by-close-btn';

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
};
router.on('success', () => {
    if (getStorage('clearBoxes') == true) {
        clearBoxes();
    }
    checkedBoxes = getStorage('checkedBoxes');
    if (checkedBoxes.length > 0) {
        checkedBoxes.forEach((checkedBox) => {
            if (document.getElementById(checkedBox)) {
                document.getElementById(checkedBox).checked = true;
            }
        });
        boxesChecked.active = true;
    } else {
        boxesChecked.active = false;
    }
    saveStorage('checkedBoxes', checkedBoxes)
})

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;Planners
            </h2>
        </template>

        <div class="py-4">
            <div class="max-w-9xl mx-auto sm:px-6 lg:px-8">
                <div class="flex justify-between ml-2">
                    <div class="planners-search-text-div">
                        <div
                            style="margin-bottom: 2px;"
                            class="self-align-center ml-2 mb-2"
                        >
                            <small>Search:</small>
                        </div>
                        <TextInput
                            id="search"
                            v-model="search"
                            type="text"
                            placeholder="Check In Desk, Flight Identity..."
                            class="mb-4 planners-search-text-input"
                            style="opacity:.75;"
                        />
                    </div>
                    <div class="planners-search-time-div">
                        <div
                            style="margin-bottom: 2px;"
                            class="self-align-center ml-2 mb-2"
                        >
                            <small>Search By
                                <SecondaryButton
                                    id="searchByOpenButton"
                                    :class="searchByOpenClass"
                                    :disabled="activeOnly"
                                    @click="searchByOpenClick()"
                                >{{ searchByOpenText }}
                                </SecondaryButton>
                                <SecondaryButton
                                    v-show="!todayOnly"
                                    class="today-only-btn"
                                    @click="todayOnlyClick()"
                                >Today Only
                                </SecondaryButton>
                                <PrimaryButton
                                    v-show="todayOnly"
                                    class="today-only-btn"
                                    @click="todayOnlyClick()"
                                >Today Only
                                </PrimaryButton>
                                <SecondaryButton
                                    v-show="!activeOnly"
                                    class="active-only-btn"
                                    @click="activeOnlyClick()"
                                >Active
                                </SecondaryButton>
                                <PrimaryButton
                                    v-show="activeOnly"
                                    class="active-only-btn"
                                    @click="activeOnlyClick()"
                                >Active
                                </PrimaryButton>
                            </small>
                        </div>
                        <div class="planners-search-datetime-div">
                            <TextInput
                                id="checkinOpenDate"
                                v-model="checkinOpen"
                                type="datetime-local"
                                format-value="yyyy-MM-ddTHH:mm"
                                placeholder="Start Date / Time"
                                :disabled="(todayOnly || activeOnly)"
                                onfocus="(this.type='datetime-local')"
                                onblur="if(!this.value)this.type='text'"
                                autoblur
                                class="mb-4 planners-search-datetime-input"
                                style="opacity:.75; margin-right: 5px;"
                            />
                            <TextInput
                                id="checkinCloseDate"
                                v-model="checkinClose"
                                type="datetime-local"
                                placeholder="End Date / Time"
                                format-value="yyyy-MM-ddTHH:mm"
                                :disabled="(todayOnly || activeOnly)"
                                onfocus="(this.type='datetime-local')"
                                onblur="if(!this.value)this.type='text'"
                                autoblur
                                class="mb-4 planners-search-datetime-input"
                                style="opacity:.75;"
                            />
                        </div>
                        <div class="planners-bulk-buttons-slim">
                            <span v-show="canEditPlanners">
                                <SecondaryButton
                                    id="selectAllButton"
                                    class="scala-edit-btn slim-header-btn planners-select-all-btn"
                                    :disabled="Object.keys(props.planners.data).length === 0"
                                    @click="selectAllVisible()"
                                >
                                    Select All
                                </SecondaryButton>
                                <SecondaryButton
                                    class="slim-header-btn planners-edit-btn scala-edit-btn"
                                    :disabled="boxesChecked.active === false"
                                    @click="editPlanner()"
                                >
                                    Edit &#x2713;
                                </SecondaryButton>
                                <!-- <SecondaryButton
                                        class="slim-header-btn planners-delete-btn"
                                        :disabled="boxesChecked.active === false"
                                        @click="confirmPlannerDeletion()"
                                    >
                                        Delete &#x2713;
                                    </SecondaryButton> -->
                            </span>
                            <span
                                v-if="canAddPlanners"
                                class="mt-8 mr-2"
                            >
                                <PrimaryButton
                                    v-show="boxesChecked.active === false"
                                    class="slim-header-btn planners-create-btn"
                                    style="margin-left: 5px;"
                                    @click="addPlanner()"
                                >
                                    Create
                                </PrimaryButton>
                                <SecondaryButton
                                    v-show="boxesChecked.active === true"
                                    class="slim-header-btn planners-create-btn"
                                    disabled
                                >
                                    Create
                                </SecondaryButton>
                            </span>
                        </div>
                    </div>
                    <div class="mt-8 mr-2 planners-bulk-buttons-wide">
                        <span v-show="canEditPlanners">
                            <SecondaryButton
                                id="selectAllButton"
                                class="scala-edit-btn slim-header-btn planners-select-all-btn"
                                :disabled="Object.keys(props.planners.data).length === 0"
                                @click="selectAllVisible()"
                            >
                                Select All
                            </SecondaryButton>
                            <SecondaryButton
                                class="slim-header-btn planners-edit-btn"
                                :disabled="boxesChecked.active === false"
                                @click="editPlanner()"
                            >
                                Edit &#x2713;
                            </SecondaryButton>
                            <!-- <SecondaryButton
                                    class="slim-header-btn planners-delete-btn"
                                    :disabled="boxesChecked.active === false"
                                    @click="confirmPlannerDeletion()"
                                >
                                    Delete &#x2713;
                                </SecondaryButton> -->
                        </span>
                        <span
                            v-if="canAddPlanners"
                            class="mt-8 mr-2"
                        >
                            <PrimaryButton
                                v-show="boxesChecked.active === false"
                                class="slim-header-btn planners-create-btn"
                                style="margin-left: 5px;"
                                @click="addPlanner()"
                            >
                                Create
                            </PrimaryButton>
                            <SecondaryButton
                                v-show="boxesChecked.active === true"
                                class="slim-header-btn planners-create-btn"
                                disabled
                            >
                                Create
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
                    v-if="canReadPlanners"
                    id="PlannersTable"
                    class="bg-white overflow-hidden shadow-xl sm:rounded-lg planners-table"
                >
                    <table class="min-w-full divide-y divide-gray-200 border-separate">
                        <thead class="bg-gray-200 border">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                    style="max-width: 130px;"
                                >
                                    <Sort
                                        label="Check-In Desk"
                                        attribute="checkindesk"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border tight-cols"
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
                                        label="Open Date"
                                        attribute="converted_open"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Close Date"
                                        attribute="converted_close"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border tight-cols"
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
                                    v-show="canEditPlanners"
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                    style="width: 95px;"
                                >
                                    SELECT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!planners.data || !planners.data.length">
                                <td>
                                    No data to display
                                </td>
                            </tr>
                            <tr
                                v-for="plannerData in planners.data"
                                v-else
                                :id="(plannerData.manual_override_id === null) ? 'planner_' + plannerData.id : 'override_' + plannerData.id"
                                :key="(plannerData.manual_override_id === null) ? 'planner_' + plannerData.id : 'override_' + plannerData.id"
                                v-tippy="(plannerData.manual_override !== null) ? 'Planner Override Exists!<br />&bull; Overwritten by: <b>' + plannerData.manual_override.actor_email + '</b>' : 'Click to edit planner'"
                                :class="(plannerData.manual_override_id === null) ? 'cursor-pointer scala-tr planner-row-color' : 'cursor-pointer scala-tr planner-row-color-override'"
                            >
                                <td
                                    v-tippy="{ content: 'Click to edit planner' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editPlanner(plannerData.id)"
                                >
                                    {{ plannerData.checkindesk }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to edit planner' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editPlanner(plannerData.id)"
                                >
                                    {{ plannerData.flight_identity }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to edit planner' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editPlanner(plannerData.id)"
                                >
                                    {{ plannerData.converted_open.value }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to edit planner' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editPlanner(plannerData.id)"
                                >
                                    {{ plannerData.converted_close.value }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to edit planner' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editPlanner(plannerData.id)"
                                >
                                    {{ plannerData.class_code }}
                                </td>
                                <td
                                    v-tippy="{ content: 'Click to edit planner' }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editPlanner(plannerData.id)"
                                >
                                    {{ plannerData.label }}
                                </td>
                                <td
                                    v-show="canEditPlanners"
                                    v-tippy="{ content: 'Click to select planner' }"
                                    class="border cursor-pointer"
                                    @click="tdClick('checkbox' + plannerData.id)"
                                >
                                    <div class="px-6 py-4 ml-3 border-none">
                                        <Checkbox
                                            :id="'checkbox' + plannerData.id"
                                            :value="plannerData.id.toString()"
                                            @click="tdClick('checkbox' + plannerData.id)"
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
                            <Pagination :links="planners.links" />
                        </div>
                    </div>
                </div>

                <!-- If can't read planners -->
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
    <!-- <DialogModal
        :show="confirmingPlannerDeletion"
        @close="closeModal(true)"
    >
        <template #title>
            <span>DELETE PLANNER(S)</span>
        </template>
        <template #content>
            <span>Are you sure you want to delete {{ (checkedBoxes.length > 1) ? 'these planners?' : 'this planner?' }}</span>
            <table class="min-w-full divide-y divide-gray-200 border-separate">
                <tbody>
                    <tr
                        v-for="plannerTrash in plannersTrash"
                        :key="plannerTrash.id"
                    >
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ plannerTrash.checkindesk }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ plannerTrash.flight_identity }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ plannerTrash.converted_open.value }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ plannerTrash.converted_close.value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
        <template #footer>
            <SecondaryButton @click="closeModal(false)">
                NO
            </SecondaryButton>
            <span style="width:20px" />
            <DangerButton @click="deletePlanner">
                YES
            </DangerButton>
        </template>
    </DialogModal> -->
</template>
