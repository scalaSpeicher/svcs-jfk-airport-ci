<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, watch, reactive, computed } from 'vue';
import Pagination from '@/Components/Pagination.vue';
import ItemsPerPage from '@/Components/ItemsPerPage.vue';
import Sort from '@/Components/Sort.vue';
import { router, useForm, usePage } from '@inertiajs/vue3';
import TextInput from '@/Components/TextInput.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue';
import NavLink from '@/Components/NavLink.vue';
import DialogModal from '@/Components/DialogModal.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import Checkbox from '@/Components/Checkbox.vue';
import Debounce from "lodash/debounce";

const props = defineProps({
    schedules: {
        type: Object,
        default: () => ({}),
    },
    canReadSchedules: {
        type: Boolean,
        default: () => false,
    },
    canEditSchedules: {
        type: Boolean,
        default: () => false,
    },
    canDeleteSchedules: {
        type: Boolean,
        default: () => false,
    },
    canAddSchedules: {
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
    }
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

const scheduleForm = useForm('scheduleForm', {
    name: '',
    category: '',
    description: '',
    full_url: null,
    thumbnail: null,
    store_by_url: false,
});

const clearBoxes = () => {
    boxesChecked.active = false;
    boxesChecked.allCheck = false;
    checkedBoxes = [];
    scheduleTrash = [];
    confirmingScheduleDeletion.value = false;
    selectAllVisible(false);
}

const boxesChecked = reactive({
    active: false,
    allCheck: true,
});
let checkedBoxes = [];

const setChecks = (e) => {
    let parentRow = e.target.parentNode.parentNode.parentNode.parentNode;
    if (e.target.checked == true) {
        checkedBoxes.push(parseInt(e.target.value))
        parentRow.classList.add("scala-tr-selected");
    } else {
        let index = checkedBoxes.indexOf(parseInt(e.target.value))
        checkedBoxes.splice(index, 1)
        parentRow.classList.remove("scala-tr-selected");
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
    let checkbox = document.getElementById(id);
    checkbox.click();
};

const selectAllVisible = (click = true) => {
    let inputs = document.querySelectorAll('input[type="checkbox"]');
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
    } else {
        document.getElementById('selectAllButton').innerText = 'Select All';
        checkedBoxes = [];
        boxesChecked.active = false;
        boxesChecked.allCheck = true;
    }
};

const confirmingScheduleDeletion = ref(false);
const scheduleCreation = ref(false);
const thumbnailPreview = ref(null);
const thumbnailInput = ref(null);
const manifestInput = ref(null);
let scheduleTrash = [];

const confirmScheduleDeletion = () => {
    props.schedules.data.forEach((schedule) => {
        let index = scheduleTrash.indexOf(schedule);
        if (checkedBoxes.includes(schedule.id)) {
            if (index === -1) {
                scheduleTrash.push(schedule);
            }
        } else {
            if (index > -1) {
                scheduleTrash.splice(index, 1);
            }
        }
    });
    confirmingScheduleDeletion.value = true;
};

const deleteSchedule = () => {
    if (checkedBoxes.length > 0) {
        router.delete(route(
            'schedules.destroy',
            JSON.stringify(checkedBoxes)
        ), {
            onSuccess: () => closeModal(),
            onFinish: () => closeModal(),
        });
    }
};

const createSchedule = () => {
    scheduleCreation.value = true;
};

const editSchedule = (schedule_id) => {
    router.get(route(
        'schedules.edit',
        schedule_id
    ));
}

const updateThumbnailPreview = () => {
    const thumbnail = thumbnailInput.value.files[0];
    if (!thumbnail) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        thumbnailPreview.value = e.target.result;
    };
    reader.readAsDataURL(thumbnail);
};

const selectNewThumbnail = () => {
    thumbnailInput.value.click();
};

const addSchedule = () => {
    scheduleForm.clearErrors();
    if (thumbnailInput.value) {
        scheduleForm.thumbnail = thumbnailInput.value.files[0];
    }
    if (scheduleForm.name == '') {
        scheduleForm.setError('name', 'Schedule Name required.');
        document.getElementById("schedule_name").classList.add("form-error-input");
    }
    if (Object.keys(scheduleForm.errors).length > 0) {
        return;
    }
    if (props.formMode == 'edit') {
        scheduleForm.put(route(
            'schedules.update',
            props.schedules.id
        ), {
            preserveScroll: true,
        });
    } else {
        scheduleForm.post(route('schedules.store'), {
            onError: () => scheduleForm.focus(),
            onSuccess: () => closeModal(),
            onFinish: () => scheduleForm.reset(),
        });
    }
}

const addScheduleByUrl = () => {
    scheduleForm.clearErrors();
    if (scheduleForm.full_url == '') {
        scheduleForm.setError('full_url', 'Full URL required.');
        document.getElementById("full_url").classList.add("form-error-input");
    }
    if (Object.keys(scheduleForm.errors).length > 0) {
        return;
    }
    scheduleForm.store_by_url = true;

    scheduleForm.post(route('schedules.store'), {
        preserveScroll: true,
        onError: () => scheduleForm.focus(),
        onSuccess: () => closeModal(),
        onFinish: () => scheduleForm.reset(),
    });
}

const updateManifest = () => {
    const manifest = manifestInput.value.files[0];
    if (!manifest) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        scheduleForm.full_url = e.target.result;
    };
    reader.readAsDataURL(manifest);
};

const selectNewManifest = () => {
    manifestInput.value.click();
};

const deleteManifest = () => {
    clearManifestFileInput();
};

if (manifestInput.value) {
    scheduleForm.full_url =   manifestInput.value.files[0];
}

const clearManifestFileInput = () => {
    if (manifestInput.value?.value) {
        manifestInput.value.value = null;
    }
};

const closeModal = (clear = false) => {
    confirmingScheduleDeletion.value = false;
    scheduleCreation.value = false;
    if (clear) {
        clearBoxes();
    }

};

let scheduleErrorIds = [];

const processFlash = (messages) => {
    let processedMessage = '';
    if (typeof messages === 'object') {
        processedMessage += 'Problem updating schedule! (records with issues marked in red)<br/>';
        Object.entries(messages).forEach(entry => {
            const [key, value] = entry;
            scheduleErrorIds.push(key);
            processedMessage += value;
        });
        return processedMessage;
    }

    return messages;
}

const formatCategory = (string) => {
    let category = string;
    if (category.indexOf('_') > -1) {
        category = category.split('_');
        category = category[0].charAt(0).toUpperCase() + category[0].slice(1) + ' ' + category[1].charAt(0).toUpperCase() + category[1].slice(1);
    } else {
        category = category.charAt(0).toUpperCase() + category.slice(1);
    }

    return category;
};

let search = ref(props.filters.search);
const debouncedWatch = Debounce((value) => {
    router.get('/schedules', { search: value },
               {
                   // preserveState: true,
                   replace: true
               }
    );
}, 300);
watch(search, debouncedWatch);

router.on('success', () => {
    confirmingScheduleDeletion.value = false;
    //clearBoxes();
});

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;Schedules
            </h2>
        </template>

        <div class="py-4">
            <div class="max-w-9xl mx-auto sm:px-6 lg:px-8">
                <div class="flex justify-between ml-2">
                    <div class="messages-search-text-div">
                        <div class="self-align-center ml-2 mb-2">
                            <small>Search By:</small>
                        </div>
                        <TextInput
                            id="search"
                            v-model="search"
                            type="text"
                            placeholder="Schedule Name, Message Name"
                            class="mb-6"
                            style="width:400px; opacity:.75;"
                        />
                    </div>
                    <div class="mt-8 mr-2 messages-bulk-buttons">
                        <span v-show="canEditSchedules">
                            <SecondaryButton
                                id="selectAllButton"
                                class="scala-edit-btn slim-header-btn"
                                :disabled="Object.keys(props.schedules).length === 0"
                                @click="selectAllVisible()"
                            >
                                Select All
                            </SecondaryButton>
                            <SecondaryButton
                                class="scala-delete-btn slim-header-btn"
                                :disabled="boxesChecked.active === false"
                                @click="confirmScheduleDeletion()"
                            >
                                Delete &#x2713;
                            </SecondaryButton>
                            <SecondaryButton
                                v-show="canAddSchedules"
                                class="scala-edit-btn slim-header-btn"
                                @click="createSchedule()"
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
                    v-if="canReadSchedules"
                    id="schedulesTable"
                    class="bg-white overflow-hidden shadow-xl sm:rounded-lg schedules-table"
                >
                    <table class="min-w-full divide-y divide-gray-200 border-separate">
                        <thead class="bg-gray-200 border">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    Preview
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Name"
                                        attribute="name"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Categories"
                                        attribute="category"
                                    />
                                </th>
                                <th
                                    v-show="canDeleteSchedules || canEditSchedules"
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                    style="width: 95px;"
                                >
                                    SELECT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!schedules.data || !schedules.data.length">
                                <td>
                                    No data to display
                                </td>
                            </tr>
                            <tr
                                v-for="schedule in schedules.data"
                                v-else
                                :key="schedule.id"
                                class="cursor-pointer scala-tr"
                            >
                                <td
                                    v-if="canEditSchedules"
                                    v-tippy="{ content: 'Click to Edit: <b>' + schedule.name + '</b>'}"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editSchedule(schedule.id)"
                                >
                                    <img
                                        v-if="schedule.thumbnail_photo_url"
                                        class="schedule-thumbnail-image"
                                        :src="schedule.thumbnail_photo_url"
                                        alt="schedule-thumbnail"
                                    >
                                    <svg
                                        v-else
                                        class="svg-icon schedule-preview-icon"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20
                                            20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60
                                            26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z"
                                        />
                                        <path
                                            d="M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167
                                            74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5
                                            0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127
                                            127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9
                                            20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20
                                            20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9
                                            20-20s-9-20-20-20h-61.7z"
                                        />
                                    </svg>
                                </td>
                                <td
                                    v-else
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    <img
                                        v-if="schedule.thumbnail_photo_url"
                                        class="schedule-thumbnail-image"
                                        :src="schedule.thumbnail_photo_url"
                                        alt="schedule-thumbnail"
                                    >
                                    <svg
                                        v-else
                                        class="svg-icon schedule-preview-icon"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20
                                            20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60
                                            26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z"
                                        />
                                        <path
                                            d="M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167
                                            74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5
                                            0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127
                                            127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9
                                            20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20
                                            20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9
                                            20-20s-9-20-20-20h-61.7z"
                                        />
                                    </svg>
                                </td>
                                <td
                                    v-if="canEditSchedules"
                                    v-tippy="{ content: 'Click to Edit: <b>' + schedule.name + '</b>'}"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editSchedule(schedule.id)"
                                >
                                    {{ schedule.name }}
                                </td>
                                <td
                                    v-else
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    {{ schedule.name }}
                                </td>
                                <td
                                    v-if="canEditSchedules"
                                    v-tippy="{ content: 'Click to Edit: <b>' + schedule.name + '</b>'}"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editSchedule(schedule.id)"
                                >
                                    {{ formatCategory(schedule.category) }}
                                </td>
                                <td
                                    v-else
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    {{ formatCategory(schedule.category) }}
                                </td>
                                <td
                                    v-show="canDeleteSchedules || canEditSchedules"
                                    v-tippy="{ content: 'Click to select schedule' }"
                                    class="border cursor-pointer"
                                    @click="tdClick('checkbox' + schedule.id)"
                                >
                                    <div class="px-6 py-4 ml-3 border-none">
                                        <Checkbox
                                            :id="'checkbox' + schedule.id"
                                            :value="schedule.id.toString()"
                                            @click="tdClick('checkbox' + schedule.id)"
                                            @change="setChecks($event)"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="grid-cols-2">
                        <div class="schedule-pagination">
                            <!-- Items per page -->
                            <div class="mt-4 ml-4 mb-4">
                                <ItemsPerPage />
                            </div>
                            <!-- Pagination -->
                            <div class="mt-4 ml-4 mb-4">
                                <Pagination :links="schedules.links" />
                            </div>
                        </div>
                        <div class="schedule-upload-btn-box" />
                    </div>
                </div>

                <!-- If can't read schedules -->
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
        :show="confirmingScheduleDeletion"
        @close="closeModal()"
    >
        <template #content>
            <div class="scala-modal-notes">
                Are you sure you want to delete {{ (checkedBoxes.length > 1) ? 'these schedules?' : 'this schedule?' }}<br>
                <span class="scala-modal-warning">Any messages linked to deleted schedule(s) will be deleted as well.</span><br>
                <span class="scala-modal-warning">Note: Schedules that have linked messages are highlighted red.</span>
            </div>
            <table class="min-w-full divide-y divide-gray-200 border-separate">
                <thead class="bg-gray-200 border">
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                        >
                            Preview
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                        >
                            Category
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="trashItem in scheduleTrash"
                        :key="trashItem.id"
                        :class="trashItem.messages.length > 0 ? 'scala-tr-warn' : ''"
                    >
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            <img
                                v-if="trashItem.thumbnail_photo_url"
                                class="schedule-thumbnail-image"
                                :src="trashItem.thumbnail_photo_url"
                                alt="schedule-thumbnail"
                            >
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ trashItem.name }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ formatCategory(trashItem.category) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
        <template #footer>
            <SecondaryButton
                class="scala-delete-btn"
                @click="closeModal()"
            >
                NO
            </SecondaryButton>
            <span style="width:20px" />
            <DangerButton @click="deleteSchedule">
                YES
            </DangerButton>
        </template>
    </DialogModal>
    <DialogModal
        :show="scheduleCreation"
        max-width="md"
        @close="closeModal()"
    >
        <template #title>
            <span>Create Schedule:</span>
        </template>
        <template #content>
            <div class="grid-cols-2">
                <div
                    class="px-2"
                >
                    <InputLabel
                        for="full_url"
                        value="Full URL"
                    />
                    <TextInput
                        id="full_url"
                        v-model="scheduleForm.full_url"
                        name="full_url"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="scheduleForm.errors.full_url"
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <SecondaryButton
                class="scala-delete-btn"
                @click="closeModal()"
            >
                Cancel
            </SecondaryButton>
            <span style="width:20px" />
            <SecondaryButton
                class="scala-primary-btn"
                @click="addScheduleByUrl"
            >
                Create
            </SecondaryButton>
        </template>
    </DialogModal>
</template>
