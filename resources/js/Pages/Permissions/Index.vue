<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { computed, ref, watch, defineProps } from 'vue';
import { router, usePage, useForm } from '@inertiajs/vue3';
import FormSectionWide from '@/Components/FormSectionWide.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import ToggleButton from '@/Components/ToggleButton.vue'

const props = defineProps({
    currentPerms: {
        type: Object,
        default: () => ({}),
    },
    permissions: {
        type: Object,
        default: () => ({}),
    },
    user: {
        type: Object,
        default: () => ({}),
    },
    userRole: {
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

const form = useForm({
    permissions: props.currentPerms,
});

const onPermissionChange = (event, id, name, category) => {
    if (!props.currentPerms[id]) {
        props.currentPerms.push([id => event]);
    }
    if (name == 'create') {
        let id = props.permissions[category]['update'];
        props.currentPerms[id] = event;
    }
    if (name == 'edit') {
        let id = props.permissions[category]['store'];
        props.currentPerms[id] = event;
    }
}

const ucFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const permissionName = (name) => {
    switch(name) {
    case 'destroy':
        return 'Delete';
    case 'index':
        return 'View';
    case 'show':
        return 'View';
    default:
        return ucFirst(name);
    }
};

const savePermissions = () => {
    form.put(route(
        'permissions.update',
        props.user.id
    ), {
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true,
    });
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

const resetButton = () => {
    router.get(route(
        'permissions.edit',
        props.user.id
    ));
};

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;Permissions
            </h2>
        </template>

        <div class="py-4">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="flex mr-2 mb-2">
                    <div class="mt-8 mr-4 mb-4">
                        Permissions for: {{ $page.props.user.first_name }} {{ $page.props.user.last_name }} (ID: {{ $page.props.user.id }}) | {{ $page.props.userRole.toUpperCase() }}
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
                <FormSectionWide @submitted="savePermissions">
                    <template #form>
                        <div
                            id="PermissionsTable"
                            class="bg-white overflow-hidden shadow-xl sm:rounded-lg"
                        >
                            <div
                                v-for="(permission, category) in permissions"
                                :key="permission.id"
                                style="width: auto; padding: 20px 30px 25px 20px;margin: 15px;float: left;border:1px solid #e2e8f0;border-radius: 0.5em;"
                            >
                                <span class="ml-2 text-gray-600 uppercase ">{{ (category == 'planners') ? 'PLANNERS' : category }}</span>
                                <div
                                    v-for="(item, key) in permission"
                                    :id="category + '_' + key"
                                    :key="category + '_' + key"
                                    :name="key"
                                    :category="category"
                                    style="width: 175px; padding-left: 15px;"
                                >
                                    <div v-if="key !== 'store' && key !== 'update'">
                                        <div style="float: left;padding-top: 6px;">
                                            {{ permissionName(key) }}:
                                        </div>
                                        <ToggleButton
                                            v-model="$page.props.currentPerms[item]"
                                            on-label="On"
                                            off-label="Off"
                                            labelledby="toggle-label"
                                            describedby="toggle-description"
                                            :disabled="($page.props.userRole == 'super-admin')"
                                            false-value="false"
                                            true-value="true"
                                            style="float: right;"
                                            :classes="{
                                                container: 'mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30',
                                            }"
                                            @change="onPermissionChange($event, item, key, category)"
                                        />
                                        <div style="clear: both;" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #actions>
                        <a href="/permissions">
                            <SecondaryButton
                                type="button"
                                @click.prevent="resetButton"
                            >
                                Reset
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
                </FormSectionWide>
            </div>
        </div>
    </AppLayout>
</template>
