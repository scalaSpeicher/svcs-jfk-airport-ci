<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, watch, reactive } from 'vue';
import { router, usePage, useForm } from '@inertiajs/vue3';
import Pagination from '@/Components/Pagination.vue';
import ItemsPerPage from '@/Components/ItemsPerPage.vue';
import Sort from '@/Components/Sort.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue'
import TextInput from '@/Components/TextInput.vue';
import DangerButton from '@/Components/DangerButton.vue';
import NavLink from '@/Components/NavLink.vue';
import DialogModal from '@/Components/DialogModal.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import Checkbox from '@/Components/Checkbox.vue';
import Debounce from "lodash/debounce";

const props = defineProps({
    messages: {
        type: Object,
        default: () => ({}),
    },
    templates: {
        type: Object,
        default: () => ({}),
    },
    canReadMessages: {
        type: Boolean,
        default: () => false,
    },
    canEditMessages: {
        type: Boolean,
        default: () => false,
    },
    canUnlockMessages: {
        type: Boolean,
        default: () => false,
    },
    canDeleteMessages: {
        type: Boolean,
        default: () => false,
    },
    canAddMessages: {
        type: Boolean,
        default: () => false,
    },
    canDuplicateMessages: {
        type: Boolean,
        default: () => false,
    },
    canRefreshMessages: {
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
    flash: {
        type: Object,
        default: () => ({}),
    },
});

const page = usePage();
const showFlashMessage = ref(false);
const showFullSizeSelect = ref(false);
const showFlash = (source = null) => {
    showFlashMessage.value = true;
    //console.log((source) ? 'showFlash...' + source : 'showFlash...noSource')
    //console.log("flash: ", (page.props.flash && page.props.flash.message) ? page.props.flash.message : '');
};

const hideFlash = () => {
    showFlashMessage.value = false;
};

watch(page.props, function (val) {
    if (val?.flash && val.flash.message) {
        //console.log("watcher...");
        showFlash();
    }
}, {
    immediate: true,
    deep: true,
});

const newMessage = useForm('newMessage', {
    template_id: '',
    name: '',
    full_size: 'full',
    json_data: {},
});
const boxesChecked = reactive({
    active: false,
    allCheck: true,
});
let checkedBoxes = [];
const confirmingMessageDupe = ref(false);
let messageDupes = [];
let messageDupeNames = {};
const confirmingMessageDeletion = ref(false);
let messageTrash = [];
const messageCreation = ref(false);
let search = ref(props.filters.search);

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

const clearBoxes = () => {
    boxesChecked.active = false;
    boxesChecked.allCheck = false;
    checkedBoxes = [];
    messageTrash = [];
    messageDupes = [];
    messageDupeNames = {};
    selectAllVisible(false);
};

const confirmMessageDupe = () => {
    props.messages.data.forEach((message) => {
        let index = messageDupes.indexOf(message);
        if (checkedBoxes.includes(message.id)) {
            if (index === -1) {
                messageDupes.push(message);
                messageDupeNames[message.id] = '';
            }
        } else {
            if (index > -1) {
                messageDupes.splice(index, 1);
            }
        }
    });
    confirmingMessageDupe.value = true;
};

const dupeMessages = () => {
    if (checkedBoxes.length > 0) {
        router.post(route(
            'messages.dupe',
            JSON.stringify(messageDupeNames)
        ), {
            onSuccess: () => {
                showFlash('onSuccess');
                closeModal();
            },
            onFinish: () => {
                showFlash('onFinish');
                closeModal(true);
            },
        });
    }
};

const confirmMessageDeletion = () => {
    props.messages.data.forEach((message) => {
        let index = messageTrash.indexOf(message);
        if (checkedBoxes.includes(message.id)) {
            if (index === -1) {
                messageTrash.push(message);
            }
        } else {
            if (index > -1) {
                messageTrash.splice(index, 1);
            }
        }
    });
    confirmingMessageDeletion.value = true;
};

const deleteMessage = () => {
    if (checkedBoxes.length > 0) {
        router.delete(route(
            'messages.destroy',
            JSON.stringify(checkedBoxes)
        ), {
            onSuccess: () => {
                showFlash('onSuccess');
                closeModal();
            },
            onFinish: () => {
                showFlash('onFinish');
                closeModal(true);
            },
        });
    }
};

const chooseTemplate = () => {
    if (props.templates.length === 0) {
        // flashMessage.value = 'No templates available to create messages.';
        // showFlash();
        alert('No templates available to create messages.');
        return;
    }
    messageCreation.value = true;
};

const addMessage = () => {
    newMessage.clearErrors();
    if (newMessage.name == '') {
        newMessage.setError('name', 'Name required.');
        document.getElementById("name").classList.add("form-error-input");
    };
    if (newMessage.template_id == '') {
        newMessage.setError('template_id', 'Template required.');
        document.getElementById("template_id").classList.add("form-error-input");
    };
    if (Object.keys(newMessage.errors).length > 0) {
        return;
    };
    newMessage.post(route('messages.create'), {
        preserveScroll: true,
        onError: () => {
            showFlash();
            newMessage.focus();
        },
        onSuccess: () => closeModal(),
        onFinish: () => newMessage.reset(),
    });
}

const editMessage = (message) => {
    // if (message.locked_by !== 0) {
    //     flashMessage.value = 'Message is being edited by ' + message.locked_by_email;
    //     showFlash();
    //     return;
    // }
    router.get(route(
        'messages.edit',
        message.id
    ));
}

const unlockMessage = (message) => {
    router.post(route(
        'messages.unlock',
        message.id
    ), {
    });
    showFlash();
}

// const processFlash = (messages) => {
//     let processedMessage = '';
//     if (typeof messages === 'object') {
//         processedMessage += 'Problem updating template! (records with issues marked in red)<br/>';
//         Object.entries(messages).forEach(entry => {
//             const [key, value] = entry;
//             processedMessage += value;
//         });
//         return processedMessage;
//     }

//     return messages;
// }

const templateChanged = (event) => {
    // if (event.target.selectedOptions[0].text.toLowerCase() === 'curbside') {
    //     showFullSizeSelect.value = true;
    // } else {
    //     showFullSizeSelect.value = false;
    // }
}

const closeModal = (clear = false) => {
    confirmingMessageDeletion.value = false;
    messageCreation.value = false;
    confirmingMessageDupe.value = false;
    if (clear) {
        clearBoxes();
    }

};

const debouncedWatch = Debounce((value) => {
    router.get('/messages', { search: value },
               {
                   // preserveState: true,
                   replace: true
               }
    );
}, 300);
watch(search, debouncedWatch);

router.on('success', () => {
    confirmingMessageDeletion.value = false;
    messageCreation.value = false;
    confirmingMessageDupe.value = false;
    //clearBoxes();
});

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;Messages
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
                            placeholder="Message Name, Template Name"
                            class="mb-6"
                            style="width:400px; opacity:.75;"
                            autofocus
                        />
                    </div>
                    <div class="mt-8 mr-2 messages-bulk-buttons">
                        <span v-show="canEditMessages">
                            <SecondaryButton
                                id="selectAllButton"
                                class="scala-edit-btn slim-header-btn"
                                :disabled="Object.keys(props.messages).length === 0"
                                @click="selectAllVisible()"
                            >
                                Select All
                            </SecondaryButton>
                            <SecondaryButton
                                class="scala-edit-btn slim-header-btn"
                                :disabled="boxesChecked.active === false || !canDuplicateMessages"
                                @click="confirmMessageDupe()"
                            >
                                Duplicate &#x2713;
                            </SecondaryButton>
                            <SecondaryButton
                                class="scala-delete-btn slim-header-btn"
                                :disabled="boxesChecked.active === false || !canDeleteMessages"
                                @click="confirmMessageDeletion()"
                            >
                                Delete &#x2713;
                            </SecondaryButton>
                            <SecondaryButton
                                v-show="canAddMessages"
                                class="scala-edit-btn slim-header-btn"
                                :disabled="!canAddMessages"
                                @click="chooseTemplate()"
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
                        v-html="(flash) ? flash.message : ''"
                    />
                    <span class="px-4 py-3 justify-end">
                        <svg
                            class="fill-current h-6 w-6 text-indigo-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            @click="hideFlash()"
                        ><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span>
                </div>
                <!-- flash message end -->

                <div
                    v-if="canReadMessages"
                    id="messagesTable"
                    class="bg-white overflow-hidden shadow-xl sm:rounded-lg messages-table"
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
                                        label="Template"
                                        attribute="template_name"
                                    />
                                </th>
                                <th
                                    v-show="canDeleteMessages || canEditMessages"
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                    style="width: 95px;"
                                >
                                    SELECT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!messages.data || !messages.data.length">
                                <td>
                                    No data to display
                                </td>
                            </tr>
                            <tr
                                v-for="message in messages.data"
                                v-else
                                :key="message.id"
                                class="cursor-pointer scala-tr"
                            >
                                <td
                                    v-if="canEditMessages"
                                    v-tippy="(message.locked_by !== 0) ? 'Message being edited by ' + message.locked_by_email : 'Click to Edit: <b>' + message.name + '</b>'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editMessage(message)"
                                >
                                    <svg
                                        class="svg-icon template-preview-icon"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                    ><path d="M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20 20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60 26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z" /><path d="M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167 74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5 0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127 127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9 20-20s-9-20-20-20h-61.7z" /></svg>
                                </td>
                                <td
                                    v-else
                                    v-tippy="'You do not have permission to edit messages.'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    <svg
                                        class="svg-icon template-preview-icon"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                    ><path d="M545 793.6H243.8c-11 0-20-9-20-20V250.4c0-11 9-20 20-20h432.4c11 0 20 9 20 20v131.8c0 11 9 20 20 20s20-9 20-20V250.4c0-33.1-26.9-60-60-60H243.8c-33.1 0-60 26.9-60 60v523.2c0 33.1 26.9 60 60 60H545c11 0 20-9 20-20s-8.9-20-20-20z" /><path d="M834.6 789.8l-88.8-91.7c23.4-28.7 37.5-65.4 37.5-105.3 0-92.1-74.9-167-167-167s-167 74.9-167 167 74.9 167 167 167c37.8 0 72.7-12.6 100.7-33.9l89 91.8c3.9 4 9.1 6 14.3 6 5 0 10.1-1.9 14-5.7 7.8-7.6 8-20.3 0.3-28.2z m-218.4-69.9c-70 0-127-57-127-127s57-127 127-127 127 57 127 127-57 127-127 127zM565 382.2c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20H545c11.1 0 20-9 20-20zM443.5 493.5c0-11-9-20-20-20H308.7c-11 0-20 9-20 20s9 20 20 20h114.8c11.1 0 20-8.9 20-20zM308.7 584.8c-11 0-20 9-20 20s9 20 20 20h61.7c11 0 20-9 20-20s-9-20-20-20h-61.7z" /></svg>
                                </td>
                                <td
                                    v-if="canEditMessages"
                                    v-tippy="(message.locked_by !== 0) ? 'Message being edited by ' + message.locked_by_email : 'Click to Edit: <b>' + message.name + '</b>'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editMessage(message)"
                                >
                                    {{ message.name }}
                                </td>
                                <td
                                    v-else
                                    v-tippy="'You do not have permission to edit messages.'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    {{ message.name }}
                                </td>
                                <td
                                    v-if="canEditMessages && message.locked_by !== page.props.auth.user.id"
                                    v-tippy="(message.locked_by !== 0) ? 'Message being edited by ' + message.locked_by_email : 'Click to Edit: <b>' + message.name + '</b>'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editMessage(message)"
                                >
                                    {{ message.template_name }}
                                </td>
                                <td
                                    v-else-if="canUnlockMessages && message.locked_by === page.props.auth.user.id"
                                    v-tippy="'Click unlock button to force close your open edit.'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    {{ message.template_name }}
                                    <div
                                        class="float-right border-none"
                                    >
                                        <SecondaryButton
                                            class="scala-unlock-btn"
                                            style="height: 21px !important;"
                                            @click="unlockMessage(message)"
                                        >
                                            <svg
                                                version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                                class="scala-unlock-icon"
                                                style="margin-right: 4px;"
                                                width="11"
                                                height="11"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xml:space="preserve"
                                            >
                                                <g transform="matrix(1 0 0 -1 0 1638)">
                                                    <path
                                                        d="M16.5,1630.688h-2.484c0,0.734-0.168,1.305-0.504,1.711s-0.848,0.609-1.535,0.609c-1.336,
                                                        0-2.004-0.777-2.004-2.332v-2.801h8.578v-9.07H7.125c-0.461,0-0.855,0.164-1.184,0.492s-0.492,
                                                        0.727-0.492,1.195v7.383H7.5v2.812c0,1.406,0.43,2.594,1.289,3.562s1.93,1.453,3.211,
                                                        1.453s2.352-0.484,3.211-1.453S16.5,1632.094,16.5,1630.688z"
                                                    />
                                                </g>
                                            </svg>
                                        </SecondaryButton>
                                    </div>
                                </td>
                                <td
                                    v-else
                                    v-tippy="'You do not have permission to edit messages.'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    {{ message.template_name }}
                                </td>
                                <td
                                    v-show="canDeleteMessages || canEditMessages"
                                    v-tippy="{ content: 'Click to select message' }"
                                    class="border cursor-pointer"
                                    @click="tdClick('checkbox' + message.id)"
                                >
                                    <div class="px-6 py-4 ml-3 border-none float-left">
                                        <Checkbox
                                            :id="'checkbox' + message.id"
                                            :value="message.id.toString()"
                                            @click="tdClick('checkbox' + message.id)"
                                            @change="setChecks($event)"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="grid-cols-2">
                        <div class="template-pagination">
                            <!-- Items per page -->
                            <div class="mt-4 ml-4 mb-4">
                                <ItemsPerPage />
                            </div>
                            <!-- Pagination -->
                            <div class="mt-4 ml-4 mb-4">
                                <Pagination :links="messages.links" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- If can't read messages -->
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
        :show="confirmingMessageDeletion"
        @close="closeModal()"
    >
        <template #content>
            <div class="scala-modal-notes">
                Are you sure you want to delete {{ (checkedBoxes.length > 1) ? 'these messages?' : 'this message?' }}
            </div>
            <table class="min-w-full divide-y divide-gray-200 border-separate">
                <thead class="bg-gray-200 border">
                    <tr>
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
                            Template
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="trashItem in messageTrash"
                        :key="trashItem.id"
                    >
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ trashItem.name }}
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ trashItem.template_name }}
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
            <DangerButton
                :disabled="!canDeleteMessages"
                @click="deleteMessage"
            >
                YES
            </DangerButton>
        </template>
    </DialogModal>
    <DialogModal
        :show="messageCreation"
        max-width="md"
        @close="closeModal()"
    >
        <template #title>
            <span>New Message</span>
        </template>
        <template #content>
            <div
                class="px-2 mb-4"
            >
                <InputLabel
                    for="name"
                    value="Name"
                />
                <TextInput
                    id="name"
                    v-model="newMessage.name"
                    name="name"
                    type="text"
                    class="block w-full"
                />
                <InputError
                    :message="newMessage.errors.name"
                />
            </div>
            <div
                class="px-2 mb-4"
            >
                <InputLabel
                    for="template_id"
                    value="Template"
                />
                <select
                    id="template_id"
                    v-model="newMessage.template_id"
                    name="template_id"
                    class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md
                        shadow-sm message-fields-modal-category block w-full"
                    @change="templateChanged"
                >
                    <option
                        v-for="template in templates"
                        :key="template.id"
                        :value="template.id"
                    >
                        {{ template.name }}
                    </option>
                </select>
                <InputError
                    :message="newMessage.errors.template_id"
                />
            </div>
            <div
                v-show="showFullSizeSelect"
                class="px-2"
            >
                <InputLabel
                    for="full_size"
                    value="Full or Split"
                />
                <select
                    id="full_size"
                    v-model="newMessage.full_size"
                    name="full_size"
                    class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md
                        shadow-sm message-fields-modal-category block w-full"
                >
                    <option value="full">
                        Full
                    </option>
                    <option value="split">
                        Split
                    </option>
                </select>
                <InputError
                    :message="newMessage.errors.full_size"
                />
            </div>
        </template>
        <template #footer>
            <SecondaryButton
                class="scala-delete-btn"
                @click="closeModal(false)"
            >
                Cancel
            </SecondaryButton>
            <span style="width:20px" />
            <SecondaryButton
                class="scala-primary-btn"
                :disabled="!canAddMessages"
                @click="addMessage(newMessage)"
            >
                Create
            </SecondaryButton>
        </template>
    </DialogModal>
    <DialogModal
        :show="confirmingMessageDupe"
        @close="closeModal()"
    >
        <template #content>
            <div class="scala-modal-notes">
                Please provide new names for {{ (checkedBoxes.length > 1) ? 'these messages.' : 'this message.' }}
            </div>
            <span />
            <table class="min-w-full divide-y divide-gray-200 border-separate">
                <thead class="bg-gray-200 border">
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                        >
                            Duplicate Name
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                        >
                            Message Name
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="messageDupe in messageDupes"
                        :key="messageDupe.id"
                    >
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            <TextInput
                                :id="'name' + messageDupe.id"
                                v-model="messageDupeNames[messageDupe.id]"
                                name="name"
                                type="text"
                                class="mt-2 block w-full"
                            />
                        </td>
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            {{ messageDupe.name }}
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
                Cancel
            </SecondaryButton>
            <span style="width:20px" />
            <SecondaryButton
                class="scala-primary-btn"
                @click="dupeMessages"
            >
                Dupe &#x2713;
            </SecondaryButton>
        </template>
    </DialogModal>
</template>
