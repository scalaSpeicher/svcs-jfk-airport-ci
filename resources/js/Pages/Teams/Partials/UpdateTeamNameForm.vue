<script setup>
import { useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

const props = defineProps({
    team: {
        type: Object,
        default: () => ({})
    },
    permissions: {
        type: Object,
        default: () => ({})
    },
    usersOptions: {
        type: Array,
        default: () => ([]),
    },
});

const form = useForm({
    name: props.team.name,
});

const updateTeamName = () => {
    form.put(route('teams.update', props.team), {
        errorBag: 'updateTeamName',
        preserveScroll: true,
    });
};
</script>

<template>
    <FormSection @submitted="updateTeamName">
        <template #form>
            <!-- Team Owner Information -->
            <div class="col-span-6">
                <InputLabel value="Team Owner" />

                <div class="flex items-center mt-2">
                    <img
                        class="w-12 h-12 rounded-full object-cover"
                        :src="($page.props.team.owner) ? $page.props.team.owner.profile_photo_url : ''"
                        :alt="($page.props.team.owner) ? $page.props.team.owner.email : ''"
                    >

                    <div class="ml-4 leading-tight">
                        <div class="text-gray-900">
                            {{ ($page.props.team.owner) ? $page.props.team.owner.first_name : '' }} {{ ($page.props.team.owner) ? $page.props.team.owner.last_name : '' }}
                        </div>
                        <div class="text-gray-700 text-sm">
                            {{ ($page.props.team.owner) ? $page.props.team.owner.email : '' }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- Team Name -->
            <div class="col-span-6 sm:col-span-4">
                <InputLabel
                    for="name"
                    value="Team Name"
                />

                <TextInput
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="mt-1 block w-full capitalize"
                    :disabled="! permissions.canUpdateTeam"
                />

                <InputError
                    :message="form.errors.name"
                    class="mt-2"
                />
            </div>
        </template>

        <template
            v-if="permissions.canUpdateTeam"
            #actions
        >
            <ActionMessage
                :on="form.recentlySuccessful"
                class="mr-3"
            >
                Saved.
            </ActionMessage>

            <PrimaryButton
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                Save
            </PrimaryButton>
        </template>
    </FormSection>
</template>
