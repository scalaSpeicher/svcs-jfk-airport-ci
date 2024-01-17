<script setup>
import { ref } from 'vue';
import { Link, router, useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import ToggleButton from '@/Components/ToggleButton.vue';
import Multiselect from 'vue-multiselect';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
    roles: {
        type: Object,
        default: () => ({}),
    },
    airlines: {
        type: Object,
        default: () => ({}),
    },
    formMode: {
        type: String,
        default: () => (''),
    },
});

const form = useForm({
    // _method: 'PUT',
    first_name: props.user.first_name,
    last_name: props.user.last_name,
    email: props.user.email,
    selectedAirlines: props.user.selectedAirlines,
    selectedRole: props.user.selectedRole,
    status: (props.user.hasOwnProperty('status')) ? props.user.status : false,
});

const onRoleSelectChange = (event) => {
    props.user.selectedRole = event.target.options[event.target.selectedIndex].innerHTML;
}

const onAirlineSelectChange = (event) => {
    props.user.selectedAirlines.push(event);
}

const onStatusChange = (event) => {
    form.status = event;
}

const saveUserInformation = () => {
    if (props.formMode == 'editUser') {
        form.put(route(
            'users.update',
            props.user.id,
        ), {
            preserveScroll: true,
        });
    } else {
        form.post(route(
            'users.store',
        ), {
            preserveScroll: true,
        });
    }
};

</script>

<template>
    <FormSection @submitted="saveUserInformation">
        <!-- <FormSection> -->
        <template #title>
            {{ (props.formMode == 'editUser') ? 'Update' : 'Add' }} User
        </template>
        <template #description>
            {{ (props.formMode == 'editUser') ? 'Update' : 'Add' }} User information.
            <div class="columns-1">
                <div class="mt-4 ml-6 ">
                    <span>Name:&nbsp;&nbsp;</span><span style="font-weight:900">{{ (props.formMode == 'editUser') ? props.user.first_name + ' ' + props.user.last_name : '' }}</span>
                </div>
                <div class="ml-6 ">
                    <span>Email:&nbsp;&nbsp;</span><span style="font-weight:900">{{ (props.formMode == 'editUser') ? props.user.email : '' }}</span>
                </div>
                <div class="ml-6 ">
                    <span>Status:&nbsp;&nbsp;</span><span style="font-weight:900">{{ (props.formMode == 'editUser') ? props.user.status : '' }}</span>
                </div>
                <div class="ml-6 ">
                    <span>User Role:&nbsp;&nbsp;</span><span style="font-weight:900">{{ (props.user.selectedRole) ? props.user.selectedRole.toUpperCase() : '' }}</span>
                </div>
                <div class="ml-6 ">
                    <span>Airline(s):&nbsp;&nbsp;</span>
                    <div
                        v-for="airline in props.user.selectedAirlines"
                        v-show="props.user.selectedAirlines && props.user.selectedAirlines.length !== 0"
                        :key="airline.id"
                        style="font-weight: 900;;"
                    >
                        {{ '&nbsp;&nbsp;&bull;&nbsp;' + airline.name.toUpperCase() }}
                    </div>
                </div>
            </div>
        </template>
        <template #form>
            <div id="UserEditForm">
                <!-- First Name-->
                <div class="col-span-6 sm:col-span-4 mt-2">
                    <InputLabel
                        for="first_name"
                        value="First Name"
                        style="width:300px"
                    />
                    <TextInput
                        id="first_name"
                        v-model="form.first_name"
                        type="text"
                        class="mt-2 block w-full"
                        autocomplete="First Name"
                        style="width:300px;"
                        required
                    />
                    <InputError
                        :message="form.errors.first_name"
                        class="mt-2"
                    />
                </div>

                <!-- Last Name -->
                <div class="col-span-6 sm:col-span-4 mt-4">
                    <InputLabel
                        for="last_name"
                        value="Last Name"
                        style="width:300px"
                    />
                    <TextInput
                        id="last_name"
                        v-model="form.last_name"
                        type="text"
                        class="mt-2 block w-full"
                        autocomplete="Last Name"
                        style="width:300px;"
                        required
                    />
                    <InputError
                        :message="form.errors.last_name"
                        class="mt-2"
                    />
                </div>

                <!-- Email Address -->
                <div class="col-span-6 sm:col-span-4 mt-4">
                    <InputLabel
                        for="email"
                        value="Email Address"
                        style="width:300px"
                    />
                    <TextInput
                        id="email"
                        v-model="form.email"
                        type="email"
                        class="mt-2 block w-full"
                        autocomplete="Email Address"
                        style="width:300px"
                        required
                    />
                    <InputError
                        :message="form.errors.email"
                        class="mt-2"
                    />
                </div>

                <!-- User Roles -->
                <div class="col-span-6 sm:col-span-4 mt-4">
                    <InputLabel
                        for="role"
                        value="User Role"
                        style="width:300px"
                    />
                    <select
                        id="role"
                        v-model="form.selectedRole"
                        autocomplete="User Role"
                        style="width:300px;cursor:pointer;"
                        required
                        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        @change="onRoleSelectChange"
                    >
                        <option
                            v-for="role in $page.props.roles"
                            :key="role.id"
                            :name="role.id"
                            :value="role.name"
                        >
                            {{ role.name.toUpperCase() }}
                        </option>
                    </select>
                </div>

                <!-- Airlines -->
                <div class="col-span-6 sm:col-span-4 mt-4">
                    <InputLabel
                        for="airlines"
                        value="Airlines"
                        style="width:300px"
                    />
                    <multiselect
                        v-model="form.selectedAirlines"
                        style="width:300px"
                        placeholder="Select an Airline"
                        label="name"
                        track-by="id"
                        :options="airlinesOptions"
                        :multiple="true"
                        @select="onAirlineSelectChange($event)"
                    />
                </div>

                <!-- Status -->
                <div class="col-span-6 sm:col-span-4 mt-4">
                    <div
                        class="mt-2 block w-full"
                        style="width:300px"
                    >
                        <label
                            id="toggle-label"
                            class="block font-medium text-sm text-gray-700"
                            value=""
                        >User Status</label>
                    </div>
                    <div style="width:300px; opacity:.5;">
                        <small id="toggle-description">Set the user's status</small>
                    </div>
                    <ToggleButton
                        v-model="form.status"
                        on-label="On"
                        off-label="Off"
                        labelledby="toggle-label"
                        describedby="toggle-description"
                        false-value="Inactive"
                        true-value="Active"
                        :classes="{
                            container: 'mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30',
                        }"
                        @change="onStatusChange($event)"
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
            <a href="/users">
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

<script>
export default {
    components: {
        Multiselect
    },
    data () {
        let airlines = [];
        this.airlines.forEach((airline) => {
            airlines.push(
                {
                    name: airline.name,
                    id: airline.id
                }
            );
        });
        return {
            selectedAirlines: this.user.selectedAirlines,
            airlinesOptions: airlines,
        }
    },
    methods: {
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<!-- <style src="@vueform/toggle/themes/default.css"></style> -->
