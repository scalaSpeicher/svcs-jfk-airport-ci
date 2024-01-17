<script setup>
import { computed, ref, watch } from 'vue';
import { router, usePage, useForm } from '@inertiajs/vue3';
import TextInput from '@/Components/TextInput.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue'
import DangerButton from '@/Components/DangerButton.vue';
import FormSectionWide from '@/Components/FormSectionWide.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import DialogModal from '@/Components/DialogModal.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import ToggleButton from '@/Components/ToggleButton.vue'

const props = defineProps({
    location: {
        type: Object,
        default: () => ({}),
    },
    locations: {
        type: Object,
        default: () => ({}),
    },
    canEditLocations: {
        type: Boolean,
        default: () => false,
    },
    canAddLocations: {
        type: Boolean,
        default: () => false,
    },
    canDeleteLocations: {
        type: Boolean,
        default: () => false,
    },
    canAddFields: {
        type: Boolean,
        default: () => false,
    },
    formMode: {
        type: String,
        default: () => (''),
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

const thumbnailPreview = ref(null);
const photoInput = ref(null);
const manifestInput = ref(null);
const addingNewField = ref(false);
const locationFieldsVisible = ref(false)

const form = useForm('editLocation', {
    _method: 'PUT',
    id: props.locations.id,
    name: props.locations.name,
    category: props.locations.category,
    description: props.locations.description,
    full_url: props.locations.full_url,
    thumbnail: props.locations.thumbnail,
    fields: props.locations.fields,
    photo: null,
    manifest: null,
});

const toggleFields = () => {
    locationFieldsVisible.value = !locationFieldsVisible.value;
};

const confirmAddField = () => {
    addingNewField.value = true;
};

const addField = () => {
    fieldCreateForm.clearErrors();
    if (fieldCreateForm.type == '') {
        fieldCreateForm.setError('type', 'Type required.');
    }
    if (fieldCreateForm.name == '') {
        fieldCreateForm.setError('name', 'Name required.');
    }
    if (fieldCreateForm.label == '') {
        fieldCreateForm.setError('label', 'Label required.');
    }
    if (fieldCreateForm.default == '') {
        fieldCreateForm.setError('default', 'Default value required.');
    }
    if (fieldCreateForm.required == '') {
        fieldCreateForm.setError('required', 'Required required.');
    }
    if ((fieldCreateForm.type == 'string' || fieldCreateForm.type == 'integer') && fieldCreateForm.max == '') {
        fieldCreateForm.setError('max', 'Max required.');
    }
    if ((fieldCreateForm.type == 'string' || fieldCreateForm.type == 'integer') && fieldCreateForm.min == '') {
        fieldCreateForm.setError('min', 'Min required.');
    }
    if ((fieldCreateForm.type == 'string' || fieldCreateForm.type == 'integer') && fieldCreateForm.lines == '') {
        fieldCreateForm.setError('min', 'Lines required.');
    }
    if (Object.keys(fieldCreateForm.errors).length > 0) {
        return;
    }
    fieldCreateForm.post(route('location_fields.store'), {
        onSuccess: () => closeModal(),
        onError: () => fieldCreateForm.focus(),
        onFinish: () => fieldCreateForm.reset(),
    });
};

const updateThumbnailPreview = () => {
    const thumbnail = photoInput.value.files[0];
    if (!thumbnail) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        thumbnailPreview.value = e.target.result;
    };
    reader.readAsDataURL(thumbnail);
};

const updateManifest = () => {
    const manifest = manifestInput.value.files[0];

    if (!manifest) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        form.full_url = e.target.result;
    };
    reader.readAsDataURL(manifest);
};

const selectNewThumbnail = () => {
    photoInput.value.click();
};

const deleteThumbnail = () => {
    router.delete(route(
        'location_thumb.destroy',
        props.locations.id,
    ), {
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true,
        onSuccess: () => {
            thumbnailPreview.value = null;
            clearThumbnailFileInput();
        },
    });
};

const updateLocation = () => {
    form.clearErrors();
    if (photoInput.value) {
        form.photo =   photoInput.value.files[0];
    }
    if (manifestInput.value) {
        form.manifest =   manifestInput.value.files[0];
    }
    if (form.name == '') {
        form.setError('name', 'Location Name required.');
        document.getElementById("location_name").classList.add("form-error-input");
    }
    if (Object.keys(form.errors).length > 0) {
        return;
    }
    if (props.formMode == 'edit') {
        form.post(route('locations.update'), {
            onError: () => form.focus(),
            onFinish: () => form.reset(),
        });
    } else {
        form.post(route('locations.store'), {
            onError: () => form.focus(),
            onFinish: () => form.reset(),
        });
    }
};

const selectNewManifest = () => {
    manifestInput.value.click();
};

const deleteManifest = () => {
    clearManifestFileInput();
};

if (manifestInput.value) {
    form.full_url = manifestInput.value.files[0];
}

const clearManifestFileInput = () => {
    if (manifestInput.value?.value) {
        manifestInput.value.value = null;
    }
    form.full_url = '';
    form.manifest = null;
};

const clearThumbnailFileInput = () => {
    if (photoInput.value?.value) {
        photoInput.value.value = null;
    }
};

const closeModal = () => {
    addingNewField.value = false;
};

let locationErrorIds = [];

const processFlash = (messages) => {
    let processedMessage = '';
    if (typeof messages === 'object') {
        processedMessage += 'Problem updating location! (records with issues marked in red)<br/>';
        Object.entries(messages).forEach(entry => {
            const [key, value] = entry;
            locationErrorIds.push(key);
            processedMessage += value;
        });
        return processedMessage;
    }

    return messages;
}

const markLocationErrors = (errorIds) => {
    errorIds.forEach((id) => {
        let element = document.getElementById(id)
        if (element !== null) {
            document.getElementById(id).className = "location-row-color-error";
        }
    });
}

router.on('success', () => {
    markLocationErrors(locationErrorIds)
})

</script>
<template>
    <FormSectionWide>
        <!-- <FormSectionWide> -->
        <template #title>
            <div style="width: 50%;float: left; text-align: left;">
                <span>Location:</span>
            </div>
            <div style="width: 50%;float: left; text-align: right">
                <PrimaryButton
                    v-show="canAddFields"
                    @click="confirmAddField()"
                >
                    Add Field
                </PrimaryButton>
            </div>
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
                :class="(form.thumbnail || thumbnailPreview) ? 'grid grid-cols-5 gap-2 bg-gray-50 border py-4' : 'grid grid-cols-4 gap-2 bg-gray-50 border py-4'"
            >
                <div
                    class="px-2"
                >
                    <InputLabel
                        for="name"
                        value="Name"
                    />
                    <TextInput
                        id="location_name"
                        v-model="form.name"
                        name="name"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="form.errors.name"
                    />
                </div>
                <div
                    class="px-2"
                >
                    <InputLabel
                        for="category"
                        value="Category"
                    />
                    <select
                        id="category"
                        v-model="form.category"
                        name="category"
                        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm location-fields-modal-category"
                    >
                        <option value="pedestrian">
                            Pedestrian
                        </option>
                        <option value="pedestrian_emergency">
                            Pedestrian Emergency
                        </option>
                    </select>
                    <InputError
                        :message="form.errors.category"
                    />
                </div>
                <div
                    class="px-2"
                >
                    <InputLabel
                        for="description"
                        value="Description"
                    />
                    <TextInput
                        id="description"
                        v-model="form.description"
                        name="description"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="form.errors.description"
                    />
                </div>
                <div
                    v-if="manifestUpload"
                    class="px-2"
                >
                    <InputLabel
                        for="full_url"
                        value="Manifest"
                        class="hidden"
                    />
                    <SecondaryButton
                        v-if="form.full_url"
                        type="button"
                        class="mt-2 location-fields-modal-thumb-btn"
                        @click.prevent="deleteManifest"
                    >
                        Remove URL
                    </SecondaryButton>
                    <SecondaryButton
                        v-else
                        class="mt-2 location-fields-modal-thumb-btn"
                        type="button"
                        @click.prevent="selectNewManifest"
                    >
                        Set URL
                    </SecondaryButton>
                    <input
                        ref="manifestInput"
                        type="file"
                        class="hidden"
                        @change="updateManifest"
                    >
                    <InputError
                        :message="form.errors.full_url"
                        class="mt-2"
                    />
                </div>
                <div
                    v-else
                    class="px-2"
                >
                    <InputLabel
                        for="full_url"
                        value="Full URL"
                    />
                    <TextInput
                        id="full_url"
                        v-model="form.full_url"
                        name="full_url"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="form.errors.full_url"
                    />
                </div>
                <div
                    v-if="thumbnailUpload"
                    class="px-2"
                >
                    <SecondaryButton
                        v-if="form.thumbnail"
                        type="button"
                        class="mt-2 location-fields-modal-thumb-btn"
                        @click.prevent="deleteThumbnail"
                    >
                        Remove Thumbnail
                    </SecondaryButton>
                    <SecondaryButton
                        v-else
                        class="mt-2 location-fields-modal-thumb-btn"
                        type="button"
                        @click.prevent="selectNewThumbnail"
                    >
                        Upload Thumbnail
                    </SecondaryButton>
                    <InputError
                        :message="form.errors.thumbnail"
                        class="mt-2"
                    />
                </div>
                <div
                    v-show="form.thumbnail || thumbnailPreview"
                    class="px-2"
                >
                    <InputLabel
                        for="thumbnail"
                        value="Thumbnail"
                    />
                    <input
                        ref="photoInput"
                        type="file"
                        class="hidden"
                        @change="updateThumbnailPreview"
                    >
                    <div
                        v-if="thumbnailPreview && !form.thumbnail"
                    >
                        <span
                            class="location-thumbnail-preview"
                            :style="'background-image: url(\'' + thumbnailPreview + '\');'"
                        />
                    </div>
                    <div
                        v-else
                    >
                        <img
                            class="location-thumbnail-image"
                            :src="$page.props.locations.thumbnail_photo_url"
                            alt="location-thumbnail"
                        >
                    </div>
                </div>
            </div>
        </template>
        <template #actions>
            <div class="location-edit-form-actions">
                <div class="location-edit-show-fields">
                    <PrimaryButton
                        v-if="canAddFields"
                        @click="toggleFields"
                    >
                        Show Fields
                    </PrimaryButton>
                </div>
                <div class="location-edit-form-buttons">
                    <a
                        :href="route('locations.index')"
                    >
                        <SecondaryButton
                            type="button"
                            class="mr-2"
                        >
                            Cancel
                        </SecondaryButton>
                    </a>
                    <PrimaryButton
                        @click="updateLocation"
                    >
                        Save Location
                    </PrimaryButton>
                </div>
            </div>
        </template>
    </FormSectionWide>
    <div
        v-show="locationFieldsVisible"
        class="location-fields-container"
    >
        <table class="min-w-full divide-y divide-gray-200 border-separate">
            <thead class="bg-gray-200 border">
                <tr>
                    <th
                        scope="col"
                        class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"
                    >
                        Name
                    </th>
                    <th
                        scope="col"
                        class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"
                    >
                        Type
                    </th>
                    <th
                        scope="col"
                        class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"
                    >
                        Label
                    </th>
                    <th
                        scope="col"
                        class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"
                    >
                        Required?
                    </th>
                    <th
                        scope="col"
                        style="max-width: 100px;"
                        class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"
                    >
                        Data
                    </th>
                    <th
                        scope="col"
                        class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"
                    >
                        Max
                    </th>
                    <th
                        scope="col"
                        class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"
                    >
                        Min
                    </th>
                    <th
                        scope="col"
                        class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"
                    >
                        Lines
                    </th>
                    <th
                        scope="col"
                        class="px-2 py-3 text-xs font-bold text-left text-gray-700 border"
                    >
                        Default
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="field in locationFields"
                    :id="field.id"
                    :key="field.id"
                >
                    <td
                        class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                    >
                        {{ field.name }}
                    </td>
                    <td
                        class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                    >
                        {{ field.type }}
                    </td>
                    <td
                        class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                    >
                        {{ field.label }}
                    </td>
                    <td
                        class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                    >
                        {{ field.required }}
                    </td>
                    <td
                        class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                        style="max-width: 200px;"
                    >
                        <pre>{{ field.json_data }}</pre>
                    </td>
                    <td
                        class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                    >
                        {{ field.max }}
                    </td>
                    <td
                        class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                    >
                        {{ field.min }}
                    </td>
                    <td
                        class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                    >
                        {{ field.lines }}
                    </td>
                    <td
                        class="px-2 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                    >
                        {{ field.default }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <DialogModal
        :show="addingNewField"
        max-width="max"
        @close="closeModal()"
    >
        <template #title>
            <span><b>{{ form.name }}</b> Field:</span>
        </template>
        <template #content>
            <div class="location-fields-modal-grid">
                <div
                    class="px-2"
                >
                    <InputLabel
                        for="name"
                        value="Name"
                    />
                    <TextInput
                        id="name"
                        v-model="fieldCreateForm.name"
                        name="name"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="fieldCreateForm.errors.name"
                    />
                </div>
                <div
                    class="px-2"
                >
                    <InputLabel
                        for="type"
                        value="Type"
                    />
                    <select
                        id="type"
                        v-model="fieldCreateForm.type"
                        name="type"
                        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm planners-edit-class-code-input location-field-select"
                    >
                        <option value="string">
                            String
                        </option>
                        <option value="integer">
                            Integer
                        </option>
                        <option value="font">
                            Font
                        </option>
                        <option value="picker">
                            Color Picker
                        </option>
                        <option value="select">
                            Drop Down
                        </option>
                        <option value="textarea">
                            Text Box
                        </option>
                    </select>
                    <InputError
                        :message="fieldCreateForm.errors.type"
                    />
                </div>
                <div
                    class="px-2"
                >
                    <InputLabel
                        for="label"
                        value="Label"
                    />
                    <TextInput
                        id="label"
                        v-model="fieldCreateForm.label"
                        name="label"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="fieldCreateForm.errors.label"
                    />
                </div>
                <div
                    class="px-2"
                >
                    <InputLabel
                        for="default"
                        value="Default"
                    />
                    <TextInput
                        id="default"
                        v-model="fieldCreateForm.default"
                        name="default"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="fieldCreateForm.errors.default"
                    />
                </div>
                <div
                    v-show="(fieldCreateForm.type == 'string' || fieldCreateForm.type == 'integer' || fieldCreateForm.type == 'textarea')"
                    class="px-2"
                >
                    <InputLabel
                        for="max"
                        value="Max"
                    />
                    <TextInput
                        id="max"
                        v-model="fieldCreateForm.max"
                        name="max"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="fieldCreateForm.errors.max"
                    />
                </div>
                <div
                    v-show="(fieldCreateForm.type == 'string' || fieldCreateForm.type == 'integer' || fieldCreateForm.type == 'textarea')"
                    class="px-2"
                >
                    <InputLabel
                        for="min"
                        value="Min"
                    />
                    <TextInput
                        id="min"
                        v-model="fieldCreateForm.min"
                        name="min"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="fieldCreateForm.errors.min"
                    />
                </div>
                <div
                    v-show="(fieldCreateForm.type == 'string' || fieldCreateForm.type == 'integer' || fieldCreateForm.type == 'textarea')"
                    class="px-2"
                >
                    <InputLabel
                        for="lines"
                        value="Lines"
                    />
                    <TextInput
                        id="lines"
                        v-model="fieldCreateForm.lines"
                        name="lines"
                        type="text"
                        class="block w-full"
                    />
                    <InputError
                        :message="fieldCreateForm.errors.lines"
                    />
                </div>
                <div
                    class="px-2"
                >
                    <InputLabel
                        for="required"
                        value="Required?"
                    />
                    <ToggleButton
                        v-model="fieldCreateForm.required"
                        onlabel="Yes"
                        offlabel="No"
                        labelledby="toggle-label"
                        describedby="toggle-description"
                        false-value="0"
                        true-value="1"
                        :classes="{
                            container: 'mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30',
                        }"
                    />
                </div>
            </div>
        </template>
        <template #footer>
            <SecondaryButton @click="closeModal()">
                Cancel
            </SecondaryButton>
            <span style="width:20px" />
            <DangerButton @click="addField">
                Save
            </DangerButton>
        </template>
    </DialogModal>
</template>