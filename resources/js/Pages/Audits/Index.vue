<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import { ref, watch, reactive, computed } from 'vue';
import { router, usePage, useForm, Link } from '@inertiajs/vue3';
import Pagination from '@/Components/Pagination.vue';
import ItemsPerPage from '@/Components/ItemsPerPage.vue';
import Sort from '@/Components/Sort.vue';
import TextInput from '@/Components/TextInput.vue';
import Debounce from "lodash/debounce";

const props = defineProps({
    audits: {
        type: Object,
        default: () => ({}),
    },
    canReadAudits: {
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

const debouncedWatch = Debounce((value) => {
    router.get('/audits', { search: value },
               {
                   // preserveState: true,
                   replace: true
               }
    );
}, 300);

let search = ref(props.filters.search);
watch(search, debouncedWatch);

</script>

<template>
    <AppLayout title="AirPortal JFK Terminal 4">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                AirPortal JFK Terminal 4&nbsp;|&nbsp;Audits
            </h2>
        </template>

        <div class="py-4">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="flex justify-between ml-2">
                    <div v-if="canReadAudits">
                        <div class="self-align-center ml-2 mb-2">
                            <small>Search By:</small>
                        </div>
                        <TextInput
                            id="search"
                            v-model="search"
                            type="text"
                            placeholder="Data, Person, Change"
                            class="mb-6"
                            style="width:400px; opacity:.75;"
                        />
                    </div>
                    <div class="mt-8 mr-2" />
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
                    id="AuditsTable"
                    class="bg-white overflow-hidden shadow-xl sm:rounded-lg"
                >
                    <table class="min-w-full divide-y divide-gray-200 border-separate">
                        <thead class="bg-gray-200 border">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Data"
                                        attribute="data"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Person"
                                        attribute="actor"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Change"
                                        attribute="audit_changes"
                                    />
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-bold text-left text-gray-700 uppercase border"
                                >
                                    <Sort
                                        label="Date"
                                        attribute="updated_at"
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="audit in audits.data"
                                :key="audit.id"
                            >
                                <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                    <div
                                        v-if="audit.user_email === ''"
                                    >
                                        {{ audit.data }}
                                    </div>
                                    <div
                                        v-else
                                    >
                                        <Link
                                            v-tippy="'Click to view user'"
                                            style="cursor: pointer;"
                                            :href="route('users.index',{_query:{search:audit.user_email}})"
                                        >
                                            {{ audit.data }}
                                        </Link>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                    <Link
                                        v-tippy="'Click to view user'"
                                        style="cursor: pointer;"
                                        :href="route('users.index',{_query:{search:audit.actor_email}})"
                                    >
                                        {{ audit.actor }}
                                    </Link>
                                </td>
                                <td
                                    class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border"
                                    v-html="audit.audit_changes"
                                />
                                <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                    {{ audit.updated_at }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style="display: flex;">
                        <!-- Items per page -->
                        <div class="mt-4 ml-4 mb-4">
                            <ItemsPerPage />
                        </div>
                        <!-- Pagination -->
                        <div class="mt-4 ml-4 mb-4">
                            <Pagination :links="audits.links" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
