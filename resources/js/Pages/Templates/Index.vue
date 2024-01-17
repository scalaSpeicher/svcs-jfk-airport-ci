<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, watch, reactive } from 'vue';
import DialogModal from '@/Components/DialogModal.vue';
import Pagination from '@/Components/Pagination.vue';
import ItemsPerPage from '@/Components/ItemsPerPage.vue';
import Sort from '@/Components/Sort.vue';
import { router, useForm, usePage } from '@inertiajs/vue3';
import TextInput from '@/Components/TextInput.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue';
import NavLink from '@/Components/NavLink.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import Checkbox from '@/Components/Checkbox.vue';
import Debounce from "lodash/debounce";

const props = defineProps({
    templates: {
        type: Object,
        default: () => ({}),
    },
    templateField: {
        type: Object,
        default: () => ({}),
    },
    templateFields: {
        type: Object,
        default: () => ({}),
    },
    canReadTemplates: {
        type: Boolean,
        default: () => false,
    },
    canEditTemplates: {
        type: Boolean,
        default: () => false,
    },
    canDeleteTemplates: {
        type: Boolean,
        default: () => false,
    },
    canAddTemplates: {
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
    manifestUpload: {
        type: Boolean,
        default: () => false,
    },
    thumbnailUpload: {
        type: Boolean,
        default: () => true,
    },
    flash: {
        type: Object,
        default: () => ({}),
    },
});

const page = usePage();
const showFlashMessage = ref(false);
const showFlash = (source = null) => {
    showFlashMessage.value = true;
    //console.log((source) ? 'showFlash...' + source : 'showFlash...noSource')
    //console.log("flash: ", (page.props.flash && page.props.flash.message) ? page.props.flash.message : '');
};

const hideFlash = () => {
    showFlashMessage.value = false;
};

const addTemplateByUrl = (verify = false) => {
    templateForm.clearErrors();
    if (verify === true) {
        document.getElementById("full_url").style.display = "none";
        templateForm.full_url = 'verify';
    } else {
        if (templateForm.full_url == '') {
            templateForm.setError('full_url', 'Full URL required.');
            document.getElementById("full_url").classList.add("form-error-input");
        }
    }
    if (Object.keys(templateForm.errors).length > 0) {
        return;
    }
    templateForm.store_by_url = true;

    templateForm.post(route('templates.store'), {
        preserveScroll: true,
        onError: () => {
            showFlash('addTemplateByUrl onError');
        },
        onSuccess: () => {
            showFlash('addTemplateByUrl onSuccess');
            closeModal();
        },
        onFinish: () => {
            showFlash('addTemplateByUrl onFinish');
            closeModal();
            templateForm.reset();
        },
    });
}

const closeModal = (clear = false) => {
    confirmingTemplateDeletion.value = false;
    templateCreation.value = false;
    if (clear) {
        clearBoxes();
    }
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

const templateForm = useForm('templateForm', {
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
    templateTrash = [];
    confirmingTemplateDeletion.value = false;
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

const confirmingTemplateDeletion = ref(false);
const templateCreation = ref(false);
// const thumbnailPreview = ref(null);
// const thumbnailInput = ref(null);
// const manifestInput = ref(null);
let templateTrash = [];

const confirmTemplateDeletion = () => {
    props.templates.data.forEach((template) => {
        let index = templateTrash.indexOf(template);
        if (checkedBoxes.includes(template.id)) {
            if (index === -1) {
                templateTrash.push(template);
            }
        } else {
            if (index > -1) {
                templateTrash.splice(index, 1);
            }
        }
    });
    confirmingTemplateDeletion.value = true;
};

const deleteTemplate = () => {
    if (checkedBoxes.length > 0) {
        router.delete(route(
            'templates.destroy',
            JSON.stringify(checkedBoxes)
        ), {
            onError: () => {
                showFlash('onError');
            },
            onSuccess: () => {
                showFlash('onSuccess');
                closeModal();
            },
            onFinish: () => {
                showFlash('onFinish');
                closeModal();
                templateForm.reset();
            },
        });
    }
};

const createTemplate = () => {
    templateCreation.value = true;
};

const editTemplate = (template_id) => {
    router.get(route(
        'templates.edit',
        template_id
    ));
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
    router.get('/templates', { search: value },
               {
                   // preserveState: true,
                   replace: true
               }
    );
}, 300);
watch(search, debouncedWatch);

router.on('success', () => {
    confirmingTemplateDeletion.value = false;
    //clearBoxes();
});

// const updateThumbnailPreview = () => {
//     const thumbnail = thumbnailInput.value.files[0];
//     if (!thumbnail) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//         thumbnailPreview.value = e.target.result;
//     };
//     reader.readAsDataURL(thumbnail);
// };

// const selectNewThumbnail = () => {
//     thumbnailInput.value.click();
// };

// const addTemplate = () => {
//     templateForm.clearErrors();
//     if (thumbnailInput.value) {
//         templateForm.thumbnail = thumbnailInput.value.files[0];
//     }
//     if (templateForm.name == '') {
//         templateForm.setError('name', 'Template Name required.');
//         document.getElementById("template_name").classList.add("form-error-input");
//     }
//     if (Object.keys(templateForm.errors).length > 0) {
//         return;
//     }
//     if (props.formMode == 'edit') {
//         templateForm.put(route(
//             'templates.update',
//             props.templates.id
//         ), {
//             preserveScroll: true,
//         });
//     } else {
//         templateForm.post(route('templates.store'), {
//             onError: () => templateForm.focus(),
//             onSuccess: () => closeModal(),
//             onFinish: () => templateForm.reset(),
//         });
//     }
// }

// const updateManifest = () => {
//     const manifest = manifestInput.value.files[0];
//     if (!manifest) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//         templateForm.full_url = e.target.result;
//     };
//     reader.readAsDataURL(manifest);
// };

// const selectNewManifest = () => {
//     manifestInput.value.click();
// };

// const deleteManifest = () => {
//     clearManifestFileInput();
// };

// let templateErrorIds = [];

// const processFlash = (messages) => {
//     console.log("processFlash: ", messages);
//     // let processedMessage = '';
//     // if (typeof messages === 'object') {
//     //     processedMessage += 'Problem updating template! (records with issues marked in red)<br/>';
//     //     Object.entries(messages).forEach(entry => {
//     //         const [key, value] = entry;
//     //         templateErrorIds.push(key);
//     //         processedMessage += value;
//     //     });
//     //     return processedMessage;
//     // }

//     return messages;
// }

// if (manifestInput.value) {
//     templateForm.full_url =   manifestInput.value.files[0];
// }

// const clearManifestFileInput = () => {
//     if (manifestInput.value?.value) {
//         manifestInput.value.value = null;
//     }
// };

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;Templates
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
                            placeholder="Template Name, Message Name"
                            class="mb-6"
                            style="width:400px; opacity:.75;"
                        />
                    </div>
                    <div class="mt-8 mr-2 messages-bulk-buttons">
                        <span v-show="canEditTemplates">
                            <SecondaryButton
                                id="selectAllButton"
                                class="scala-edit-btn slim-header-btn"
                                :disabled="Object.keys(props.templates).length === 0"
                                @click="selectAllVisible()"
                            >
                                Select All
                            </SecondaryButton>
                            <SecondaryButton
                                class="scala-delete-btn slim-header-btn"
                                :disabled="boxesChecked.active === false || !canDeleteTemplates"
                                @click="confirmTemplateDeletion()"
                            >
                                Delete &#x2713;
                            </SecondaryButton>
                            <SecondaryButton
                                v-show="canAddTemplates"
                                class="scala-edit-btn slim-header-btn"
                                @click="createTemplate()"
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
                    v-if="canReadTemplates"
                    id="templatesTable"
                    class="bg-white overflow-hidden shadow-xl sm:rounded-lg templates-table"
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
                                    v-show="canDeleteTemplates || canEditTemplates"
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                    style="width: 95px;"
                                >
                                    SELECT
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="!templates.data || !templates.data.length">
                                <td>
                                    No data to display
                                </td>
                            </tr>
                            <tr
                                v-for="template in templates.data"
                                v-else
                                :key="template.id"
                                :class="(template.manifest_verified === 1) ? 'cursor-pointer scala-tr' : 'cursor-pointer scala-tr-warn'"
                            >
                                <td
                                    v-if="canEditTemplates"
                                    v-tippy="{
                                        content: (template.manifest_verified === 1) ? 'Click to Edit: <b>' + template.name + '</b>' : 'Click to Fix: <b>' + template.name + '</b>' + template.manifest_errors
                                    }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editTemplate(template.id)"
                                >
                                    <img
                                        v-if="template.thumbnail_photo_url"
                                        class="template-thumbnail-image"
                                        :src="template.thumbnail_photo_url"
                                        alt="template-thumbnail"
                                    >
                                    <svg
                                        v-else
                                        class="svg-icon template-preview-icon"
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
                                    v-tippy="'You do not have permission to edit templates.'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    <img
                                        v-if="template.thumbnail_photo_url"
                                        class="template-thumbnail-image"
                                        :src="template.thumbnail_photo_url"
                                        alt="template-thumbnail"
                                    >
                                    <svg
                                        v-else
                                        class="svg-icon template-preview-icon"
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
                                    v-if="canEditTemplates"
                                    v-tippy="{
                                        content: (template.manifest_verified === 1) ? 'Click to Edit: <b>' + template.name + '</b>' : 'Click to Fix: <b>' + template.name + '</b>' + template.manifest_errors
                                    }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editTemplate(template.id)"
                                >
                                    {{ template.name }}
                                </td>
                                <td
                                    v-else
                                    v-tippy="'You do not have permission to edit templates.'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    {{ template.name }}
                                </td>
                                <td
                                    v-if="canEditTemplates"
                                    v-tippy="{
                                        content: (template.manifest_verified === 1) ? 'Click to Edit: <b>' + template.name + '</b>' : 'Click to Fix: <b>' + template.name + '</b>' + template.manifest_errors
                                    }"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border cursor-pointer"
                                    @click="editTemplate(template.id)"
                                >
                                    {{ formatCategory(template.category) }}
                                </td>
                                <td
                                    v-else
                                    v-tippy="'You do not have permission to edit templates.'"
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                >
                                    {{ formatCategory(template.category) }}
                                </td>
                                <td
                                    v-show="canDeleteTemplates || canEditTemplates"
                                    v-tippy="{ content: 'Click to select template' }"
                                    class="border cursor-pointer"
                                    @click="tdClick('checkbox' + template.id)"
                                >
                                    <div class="px-6 py-4 ml-3 border-none">
                                        <Checkbox
                                            :id="'checkbox' + template.id"
                                            :value="template.id.toString()"
                                            @click="tdClick('checkbox' + template.id)"
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
                                <Pagination :links="templates.links" />
                            </div>
                        </div>
                        <div class="template-upload-btn-box" />
                    </div>
                </div>

                <!-- If can't read templates -->
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
        :show="confirmingTemplateDeletion"
        @close="closeModal()"
    >
        <template #content>
            <div class="scala-modal-notes">
                Are you sure you want to delete {{ (checkedBoxes.length > 1) ? 'these templates?' : 'this template?' }}<br>
                <span class="scala-modal-warning">Any messages linked to deleted template(s) will be deleted as well.</span><br>
                <span class="scala-modal-warning">Note: Templates that have linked messages are highlighted red.</span>
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
                        v-for="trashItem in templateTrash"
                        :key="trashItem.id"
                        :class="trashItem.messages.length > 0 ? 'scala-tr-warn' : ''"
                    >
                        <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                            <img
                                v-if="trashItem.thumbnail_photo_url"
                                class="template-thumbnail-image"
                                :src="trashItem.thumbnail_photo_url"
                                alt="template-thumbnail"
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
            <DangerButton @click="deleteTemplate">
                YES
            </DangerButton>
        </template>
    </DialogModal>
    <DialogModal
        :show="templateCreation"
        max-width="md"
        @close="closeModal()"
    >
        <template #title>
            <span>Create Template:</span>
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
                        v-model="templateForm.full_url"
                        name="full_url"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="templateForm.errors.full_url"
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <SecondaryButton
                v-show="isSuperAdmin"
                v-tippy="'Click to test the manifest.json validator'"
                class="scala-secret-btn"
                style="position: absolute;left: 20px;"
                @click="addTemplateByUrl(true)"
            >
                <svg
                    class="scala-secret-icon"
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="nonzero"
                        clip-rule="nonzero"
                        d="M7.19792 3.06C5.60434 3.06 4.3125 4.34978 4.3125 5.9408V12.3472C4.3125 13.5362 3.34711 14.5 2.15625 14.5C0.965386 14.5 0 13.5362 0 12.3472C0 11.9164 0.349778 11.5672 0.78125 11.5672C1.21272 11.5672 1.5625 11.9164 1.5625 12.3472C1.5625 12.6746 1.82833 12.94 2.15625 12.94C2.48417 12.94 2.75 12.6746 2.75 12.3472V5.9408C2.75 3.48821 4.7414 1.5 7.19792 1.5C9.22509 1.5 10.9355 2.85396 11.4715 4.70551C13.9858 4.78385 16 6.84348 16 9.3728C16 9.41167 15.9972 9.44987 15.9917 9.48721C15.9972 9.52454 16 9.56274 16 9.6016V13.72C16 14.1508 15.6502 14.5 15.2187 14.5H7.19792C6.76644 14.5 6.41667 14.1508 6.41667 13.72V9.6016C6.41667 9.17082 6.76644 8.8216 7.19792 8.8216C8.79149 8.8216 10.0833 7.53182 10.0833 5.9408C10.0833 4.34978 8.79149 3.06 7.19792 3.06ZM14.4458 9.48719C14.4403 9.44986 14.4375 9.41166 14.4375 9.3728C14.4375 7.75995 13.2076 6.43389 11.6332 6.27844C11.48 8.3122 9.95487 9.96383 7.97917 10.3133V12.94H10.4271V11.2032C10.4271 10.7724 10.7769 10.4232 11.2083 10.4232C11.6398 10.4232 11.9896 10.7724 11.9896 11.2032V12.94H14.4375V9.6016C14.4375 9.56274 14.4403 9.52453 14.4458 9.48719Z"
                    />
                </svg>
                test
            </SecondaryButton>
            <SecondaryButton
                class="scala-delete-btn"
                @click="closeModal()"
            >
                Cancel
            </SecondaryButton>
            <span style="width:20px" />
            <SecondaryButton
                class="scala-primary-btn"
                @click="addTemplateByUrl"
            >
                Create
            </SecondaryButton>
        </template>
    </DialogModal>
</template>
