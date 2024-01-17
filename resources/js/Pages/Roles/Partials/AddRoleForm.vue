<script setup>
import { ref, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import Multiselect from 'vue-multiselect';
import ToggleButton from '@/Components/ToggleButton.vue'

const props = defineProps({
    role: {
        type: Object,
        default: () => ({})
    },
    usersOptions: {
        type: Array,
        default: () => ([]),
    },
    formMode: {
        type: String,
        default: () => (''),
    },
    isSuperAdmin: {
        type: Boolean,
        default: () => false,
    },
    canReadRoles: {
        type: Boolean,
        default: () => false,
    },
    canEditRoles: {
        type: Boolean,
        default: () => false,
    },
    canAddRoles: {
        type: Boolean,
        default: () => false,
    },
    canDeleteRoles: {
        type: Boolean,
        default: () => false,
    },
});

const roleUsers = ref(props.role.selectedUsers);
const currentPerms = ref(props.role.currentPerms);
const permissions = ref(props.role.perms);

const disablePerms = computed(() => {
    return (form.name == 'super-admin' || props.isSuperAdmin);
})

const form = useForm({
    name: props.role.name,
    selectedUsers: roleUsers.value,
    selectedPermissions: currentPerms.value,
});

const onPermissionChange = (event, id, name, category) => {
    if (!currentPerms.value[id]) {
        currentPerms.value.push([id => event]);
    }
    if (name == 'create') {
        let id = permissions.value[category]['store'];
        currentPerms.value[id] = event;
    }
    if (name == 'edit') {
        let id = permissions.value[category]['update'];
        currentPerms.value[id] = event;
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
    case 'restore':
        return 'Remove';
    default:
        return ucFirst(name);
    }
};

const saveRole = () => {
    if (props.formMode == 'editRole') {
        form.put(route(
            'roles.update',
            props.role.id,
        ), {
            preserveScroll: true,
        });
    } else {
        form.post(route(
            'roles.store',
        ), {
            preserveScroll: true,
        });
    }
};

const onUsersSelectChange = (event, action) => {
    if (typeof props.role.selectedUsers === "undefined") {
        props.role.selectedUsers = [];
    }
    if (action === 'add') {
        roleUsers.value.push(event);
    } else {
        roleUsers.value =
            roleUsers.value.filter(function (user) {
                return user.id != event.id
            })
    }
}

</script>

<template>
    <FormSection @submitted="saveRole">
        <!-- <FormSection> -->
        <template #title>
            {{ ($page.props.formMode == 'editRole') ? 'Update' : 'Add' }} Role
        </template>
        <template #description>
            {{ ($page.props.formMode == 'editRole') ? 'Update' : 'Add' }} Role information.
            <div class="columns-1">
                <div class="mt-4 ml-6">
                    <span>Name:&nbsp;&nbsp;</span><span style="font-weight:900">{{
                        ($page.props.formMode == 'editRole') ? $page.props.role.name : '' }}</span>
                </div>
                <div class="ml-6">
                    <span>Associated Account(s):&nbsp;&nbsp;</span>
                    <div
                        v-for="user in roleUsers"
                        :key="user.id"
                    >
                        <span style="font-weight: 900;">
                            {{ '&nbsp;&nbsp;&bull;&nbsp;' + user.email }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
        <template #form>
            <div
                id="EditRoleForm"
                class="col-span-6 mt-2"
            >
                <!-- Role Name-->
                <div class="col-span-6">
                    <InputLabel
                        for="name"
                        value="Name"
                        style="min-width:300px;"
                        class="mt-2"
                    />
                    <TextInput
                        id="name"
                        v-model="form.name"
                        class="block w-full"
                        type="text"
                        autocomplete="Name"
                        style="min-width:300px;"
                        required
                    />
                    <InputError
                        :message="form.errors.name"
                        class="mt-2"
                    />
                </div>
                <!-- Associated Accounts -->
                <div class="col-span-6">
                    <InputLabel
                        for="users"
                        value="Associated Account(s)"
                        class="mt-2 block w-full"
                        style="min-width:300px;"
                    />
                    <multiselect
                        v-model="form.selectedUsers"
                        style="min-width:300px;"
                        placeholder="Select Account(s)"
                        label="email"
                        track-by="id"
                        :options="$page.props.usersOptions"
                        :multiple="true"
                        :close-on-select="false"
                        :clear-on-select="false"
                        :preserve-search="true"
                        @select="onUsersSelectChange($event, 'add')"
                        @remove="onUsersSelectChange($event, 'sub')"
                    >
                        <template #selection="{ values }">
                            <div class="multiselect-multiple-label">
                                {{ values.length }} users selected
                            </div>
                        </template>
                    </multiselect>
                </div>
                <!-- Associated Permissions -->
                <InputLabel
                    for="permissions"
                    value="Associated Permissions(s)"
                    style="min-width:300px;"
                    class="mt-2 block w-full"
                />
                <div
                    v-for="(permission, category) in permissions"
                    :key="permission.id"
                    style="width: 30%;min-width:190px; padding: 1%;margin:5px;float:left;border:1px solid #e2e8f0;border-radius: 0.5em;"
                >
                    <span class="ml-2 text-gray-600 uppercase ">{{ (category == 'airlines_labels_lids') ? 'LIDS'
                        : (category == 'airlines_branding') ? 'BRANDING'
                            : (category == 'airlines_logos') ? 'LOGOS'
                                : (category == 'tokens') ? 'API TOKENS'
                                    : category }}
                    </span>
                    <div
                        v-for="(item, key) in permission"
                        :id="category + '_' + key"
                        :key="category + '_' + key"
                        :name="key"
                        :category="category"
                        style="width: 175px; padding-left: 15px;"
                    >
                        <div v-if="(category !== 'teams')">
                            <div v-if="key !== 'store' && key !== 'update' && key !== 'cancel'">
                                <div style="float: left;padding-top: 6px;">
                                    {{ permissionName(key) }}:
                                </div>
                                <ToggleButton
                                    v-model="form.selectedPermissions[item]"
                                    on-label="On"
                                    off-label="Off"
                                    labelledby="toggle-label"
                                    describedby="toggle-description"
                                    false-value="false"
                                    true-value="true"
                                    style="float: right;"
                                    :disabled="disablePerms"
                                    :classes="{
                                        container: 'mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30',
                                    }"
                                    @change="onPermissionChange($event, item, key, category)"
                                />
                                <div style="clear: both;" />
                            </div>
                        </div>
                        <div v-else>
                            <div
                                style="float: left;padding-top: 6px;"
                                class="role-perm-div-singles"
                            >
                                View
                            </div>
                            <ToggleButton
                                v-model="form.selectedPermissions[item]"
                                on-label="On"
                                off-label="Off"
                                labelledby="toggle-label"
                                describedby="toggle-description"
                                false-value="false"
                                true-value="true"
                                style="float: right;"
                                :disabled="disablePerms"
                                :classes="{
                                    container: 'mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30',
                                }"
                                @change="onPermissionChange($event, item, 'edit', category)"
                            />
                            <div style="clear: both;" />
                        </div>
                    </div>
                    <div
                        v-show="(category === 'airlines_labels_lids' || category === 'airlines_branding' || category === 'airlines_logos' || category === 'teams')"
                        style="height: 10px;"
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
            <a href="/roles">
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

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
