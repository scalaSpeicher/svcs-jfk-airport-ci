<script setup>
import { computed, ref, watch, reactive } from 'vue';
import { router, usePage, useForm } from '@inertiajs/vue3';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import FormSectionWide from '@/Components/FormSectionWide.vue';

const props = defineProps({
    planners: {
        type: Object,
        default: () => ({}),
    },
    checkinDesks: {
        type: Array,
        default: () => ([]),
    },
    airlineLabels: {
        type: Object,
        default: () => ({}),
    },
    canEditPlanners: {
        type: Boolean,
        default: () => false,
    },
    formMode: {
        type: String,
        default: () => (''),
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

const plannerChanges = reactive({});
const plannerUpdates = reactive([]);

const form = useForm({
    checkindesk: '',
    flight_identity: '',
    checkin_plan_open_date_time: '',
    checkin_plan_close_date_time: '',
    checkin_open_date_time: '',
    checkin_close_date_time: '',
    class_code: '',
});

const updatePlannersInformation = () => {
    if (props.formMode == 'edit') {
        Object.keys(plannerChanges).forEach(function callback(index) {
            let plannerUpdate = {};
            plannerUpdate['id'] = index;
            let planner = props.planners.find(planner => planner.id == index);
            plannerUpdate['converted_open'] = planner['converted_open'];
            plannerUpdate['converted_close'] = planner['converted_close'];
            let plannerChange = plannerChanges[index];
            Object.keys(plannerChange).forEach(function callback(index) {
                if (index == 'converted_open' || index == 'converted_close') {
                    plannerUpdate[index]['value'] = plannerChange[index];
                } else {
                    plannerUpdate[index] = plannerChange[index];
                }
            });
            plannerUpdates.push(plannerUpdate);
        });
        router.put(route(
            'planners.update',
            JSON.stringify(plannerUpdates)
        ), {
            preserveScroll: true,
        });
    } else {

        form.post(route(
            'planners.store',
        ), {
            preserveScroll: true,
        });
    }
};

const handleChange = (event) => {
    let recordId = event.target.id.split('-')[1];
    let plannerChange = [];
    plannerChange[event.target.name] = event.target.value;
    let keys = Object.keys(plannerChanges);
    if (!keys.includes(recordId)) {
        plannerChanges[recordId] = plannerChange;
        document.getElementById(recordId).classList.add('planner-row-color-changed');
    } else {
        plannerChanges[recordId][event.target.name] = event.target.value;
    }
    // console.log(plannerChanges);
};

const checkinChange = (event) => {
    let original = event.target.oldvalue;
    event.target.value = event.target.value.replace(/[^\w-]/gi, '');
    if (event.target.value != original) {
        handleChange(event);
    }
};

const flightChange = (event) => {
    handleChange(event);
};

const planOpenChange = (event) => {
    handleChange(event);
};

const planCloseChange = (event) => {
    handleChange(event);
};

const classCodeChange = (event) => {
    let original = event.target.oldvalue;
    if (typeof event.key === 'undefined') {
        event.target.value = event.target.value.replace(/[^A-Za-z0-9.]/gi, '').toUpperCase();
        if (event.target.value != original) {
            handleChange(event);
        }
    } else if (event.key.length == 1) {
        event.preventDefault();
        event.target.value = event.key.replace(/[^A-Za-z0-9.]/gi, '').toUpperCase();
        if (event.target.value != original) {
            handleChange(event);
        }
    } else {
        if (event.target.value != original) {
            handleChange(event);
        }
    }
};

let plannerErrorIds = [];

const processFlash = (messages) => {
    let processedMessage = '';
    if (typeof messages === 'object') {
        processedMessage += 'Problem updating planners! (records with issues marked in red)<br/>';
        Object.entries(messages).forEach(entry => {
            const [key, value] = entry;
            plannerErrorIds.push(key);
            processedMessage += value;
        });
        return processedMessage;
    }

    return messages;
}

const markPlannerErrors = (errorIds) => {
    errorIds.forEach((id) => {
        let element = document.getElementById(id)
        if (element !== null) {
            document.getElementById(id).className = "planner-row-color-error";
        }
    });
}

router.on('success', () => {
    markPlannerErrors(plannerErrorIds)
})

</script>
<template>
    <FormSectionWide @submitted="updatePlannersInformation">
        <!-- <FormSectionWide> -->
        <template #title>
            <span>{{ ($page.props.formMode === 'add') ? 'New Planner' : ($page.props.planners.length > 1) ? 'Bulk Update Planners' : 'Update Planner' }}</span>
        </template>
        <template #form>
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
                v-if="$page.props.formMode === 'add'"
                id="PlannerAddForm"
            >
                <table class="min-w-full divide-y divide-gray-200 border-separate">
                    <thead class="bg-gray-200 border">
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Check-In Desk
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Flight Identity
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Plan Open Date
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Plan Close Date
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Actual Open Date
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Actual Close Date
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Class Code
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <select
                                    id="checkindesk"
                                    v-model="form.checkindesk"
                                    name="checkindesk"
                                    class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm planners-edit-class-code-input"
                                    style="width:100px;"
                                >
                                    <option
                                        v-for="(item, index) in $page.props.checkinDesks"
                                        :key="index"
                                        :value="item"
                                    >
                                        {{ item }}
                                    </option>
                                </select>
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <TextInput
                                    id="flight_identity"
                                    v-model="form.flight_identity"
                                    name="flight_identity"
                                    type="text"
                                    class="block w-full"
                                    autocomplete="Flight ID"
                                    style="width:100px;"
                                />
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <TextInput
                                    id="checkin_plan_open_date_time"
                                    v-model="form.checkin_plan_open_date_time"
                                    name="checkin_plan_open_date_time"
                                    type="datetime-local"
                                    class="block w-full"
                                    autocomplete="Plan Open Time"
                                    style="width:125px;"
                                />
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <TextInput
                                    id="checkin_plan_close_date_time"
                                    v-model="form.checkin_plan_close_date_time"
                                    name="checkin_plan_close_date_time"
                                    type="datetime-local"
                                    class="block w-full"
                                    autocomplete="Plan Close Time"
                                    style="width:125px;"
                                />
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <TextInput
                                    id="checkin_open_date_time"
                                    v-model="form.checkin_open_date_time"
                                    name="checkin_open_date_time"
                                    type="datetime-local"
                                    class="block w-full"
                                    autocomplete="Actual Open Time"
                                    style="width:125px;"
                                />
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <TextInput
                                    id="checkin_close_date_time"
                                    v-model="form.checkin_close_date_time"
                                    name="checkin_close_date_time"
                                    type="datetime-local"
                                    class="block w-full"
                                    autocomplete="Actual Close Time"
                                    style="width:125px;"
                                />
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <TextInput
                                    id="class_code"
                                    v-model="form.class_code"
                                    name="class_code"
                                    type="text"
                                    class="block w-full"
                                    autocomplete="Class Code"
                                    style="width:100px;"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                v-else
                id="PlannerEditForm"
            >
                <table class="min-w-full divide-y divide-gray-200 border-separate">
                    <thead class="bg-gray-200 border">
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Check-In Desk
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Flight Identity
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Open Date
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Close Date
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                            >
                                Class Code{{ ($page.props.formMode === 'edit') ? ': Label' : '' }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="planner in planners"
                            :id="planner.id"
                            :key="planner.id"
                        >
                            <td
                                :id="'checkindesk' + '-' + planner.id"
                                class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            >
                                {{ planner.checkindesk }}
                            </td>
                            <td
                                :id="'flight_identity' + '-' + planner.id"
                                class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                            >
                                {{ planner.flight_identity }}
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <TextInput
                                    :id="'converted_open' + '-' + planner.id"
                                    v-model="planner.converted_open.value"
                                    name="converted_open"
                                    type="datetime-local"
                                    step="1"
                                    class="block w-full planners-edit-open-date-input"
                                    autocomplete="Plan Open Time"
                                    @change="planOpenChange"
                                />
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <TextInput
                                    :id="'converted_close' + '-' + planner.id"
                                    v-model="planner.converted_close.value"
                                    name="converted_close"
                                    type="datetime-local"
                                    step="1"
                                    class="block w-full planners-edit-close-date-input"
                                    autocomplete="Plan Close Time"
                                    @change="planCloseChange"
                                />
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <select
                                    :id="'class_code' + '-' + planner.id"
                                    v-model="planner.class_code"
                                    name="class_code"
                                    class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm planners-edit-class-code-input"
                                    @change="classCodeChange"
                                >
                                    <option
                                        v-for="(item, index) in $page.props.airlineLabels[planner.id]"
                                        :key="item.id"
                                        :value="index"
                                    >
                                        {{ index }}: {{ item }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
        <template #actions>
            <a href="/planners">
                <SecondaryButton type="button">
                    Cancel
                </SecondaryButton>
            </a>
            <span style="width:20px" />
            <PrimaryButton>
                Save
            </PrimaryButton>
        </template>
    </FormSectionWide>
</template>
