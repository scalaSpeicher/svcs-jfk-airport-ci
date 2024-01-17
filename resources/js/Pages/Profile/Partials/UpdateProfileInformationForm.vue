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

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
});

const form = useForm({
    _method: 'PUT',
    first_name: props.user.first_name,
    last_name: props.user.last_name,
    email: props.user.email,
    photo: null,
});

const verificationLinkSent = ref(false);
const photoPreview = ref(null);
const photoInput = ref(null);

const updatePhotoPreview = () => {
    const photo = photoInput.value.files[0];
    if (!photo) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        photoPreview.value = e.target.result;
    };
    reader.readAsDataURL(photo);
};

const selectNewPhoto = () => {
    photoInput.value.click();
};

const clearPhotoFileInput = () => {
    if (photoInput.value?.value) {
        photoInput.value.value = null;
    }
};

const deletePhoto = () => {
    router.delete(route('current-user-photo.destroy'), {
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true,
        onSuccess: () => {
            photoPreview.value = null;
            clearPhotoFileInput();
        },
    });
};

const updateProfileInformation = () => {
    if (photoInput.value) {
        form.photo = photoInput.value.files[0];
    }

    form.post(route('user-profile-information.update'), {
        errorBag: 'updateProfileInformation',
        preserveScroll: true,
        preserveState: false,
        resetOnSuccess: true,
        onSuccess: () => clearPhotoFileInput(),
    });
};

const sendEmailVerification = () => {
    verificationLinkSent.value = true;
};
</script>

<template>
    <FormSection @submitted="updateProfileInformation">
        <template #title>
            Profile Information
        </template>
        <template #description>
            <div class="font-medium text-gray-900">
                User Role:&nbsp;&nbsp;
            </div>
            <div>
                {{ ($page.props.userData.currentUserRole.name) ? '&nbsp;&nbsp;&bull;&nbsp;' + $page.props.userData.currentUserRole.name.toUpperCase() : '' }}
            </div>
            <div
                v-show="$page.props.userData.canReadTeams"
            >
                <div class="font-medium text-gray-900">
                    User Team:&nbsp;&nbsp;
                </div>
                <div>
                    {{ ($page.props.userData.currentUserTeam.name) ? '&nbsp;&nbsp;&bull;&nbsp;' + $page.props.userData.currentUserTeam.name.toUpperCase() : '' }}
                </div>
            </div>
            <div class="font-medium text-gray-900">
                User Airline(s):&nbsp;&nbsp;
            </div>
            <div
                v-for="airline in $page.props.userData.userAirlines"
                v-show="props.user.airlines && props.user.airlines.length !== 0"
                :key="airline.id"
            >
                {{ '&nbsp;&nbsp;&bull;&nbsp;' + airline['name'].toUpperCase() }}
            </div>
        </template>
        <template #form>
            <div
                v-if="$page.props.jetstream.managesProfilePhotos"
                class="col-span-6 sm:col-span-4"
            >
                <input
                    ref="photoInput"
                    type="file"
                    class="hidden"
                    @change="updatePhotoPreview"
                >
                <InputLabel
                    for="photo"
                    value="Photo"
                />
                <div
                    v-show="!photoPreview"
                    class="mt-2"
                >
                    <img
                        class="rounded-full h-20 w-20 object-cover"
                        :src="$page.props.auth.user.profile_photo_url"
                        :alt="$page.props.auth.user.email"
                    >
                </div>
                <div
                    v-show="photoPreview"
                    class="mt-2"
                >
                    <span
                        class="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center"
                        :style="'background-image: url(\'' + photoPreview + '\');'"
                    />
                </div>
                <SecondaryButton
                    class="mt-2 mr-2"
                    type="button"
                    @click.prevent="selectNewPhoto"
                >
                    Select A New Photo
                </SecondaryButton>
                <SecondaryButton
                    v-show="$page.props.auth.user.profile_photo_path"
                    type="button"
                    class="mt-2"
                    @click.prevent="deletePhoto"
                >
                    Remove Photo
                </SecondaryButton>
                <InputError
                    :message="form.errors.photo"
                    class="mt-2"
                />
            </div>

            <div class="col-span-6 sm:col-span-4">
                <InputLabel
                    for="first_name"
                    value="First Name"
                />
                <TextInput
                    id="first_name"
                    v-model="form.first_name"
                    type="text"
                    class="mt-1 block w-full"
                    autocomplete="first_name"
                />
                <InputError
                    :message="form.errors.first_name"
                    class="mt-2"
                />
            </div>

            <div class="col-span-6 sm:col-span-4">
                <InputLabel
                    for="last_name"
                    value="Last Name"
                />
                <TextInput
                    id="last_name"
                    v-model="form.last_name"
                    type="text"
                    class="mt-1 block w-full"
                    autocomplete="last_name"
                />
                <InputError
                    :message="form.errors.last_name"
                    class="mt-2"
                />
            </div>

            <div class="col-span-6 sm:col-span-4">
                Email Address: <b>{{ form.email }}</b>
            </div>
            <!-- <small>Contact administrator to update email address.</small> -->

            <div v-if="$page.props.jetstream.hasEmailVerification && user.email_verified_at === null">
                <p class="text-sm mt-2">
                    Your email address is unverified.
                    <Link
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        @click.prevent="sendEmailVerification"
                    >
                        Click here to re-send the verification email.
                    </Link>
                </p>
                <div
                    v-show="verificationLinkSent"
                    class="mt-2 font-medium text-sm text-green-600"
                >
                    A new verification link has been sent to your email address.
                </div>
            </div>
        </template>
        <template #actions>
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
