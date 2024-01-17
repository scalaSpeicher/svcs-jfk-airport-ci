<script setup>
import { ref, computed } from "vue";
import PrimaryButtton from '@/Components/PrimaryButton.vue'

const props = defineProps({
    file_description: {
        type: String,
        default: (""),
    },
    file: {
        type: File,
        default: null,
    },
});

const emit = defineEmits(['fileSelected']);

// eslint-disable-next-line vue/no-dupe-keys
const file = ref(null);

const fileName = computed(() => file.value?.name);

const uploadFile = (event) => {
    file.value = event.target.files[0];
    emit('fileSelected', event.target.files[0])
};
</script>

<template>
    <label>
        <div
            style="cursor:pointer"
            class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase shadow-sm tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
        >
            <span>Select File</span>
        </div>
        <!-- Display the filename if a file has been selected. -->
        <div class="ml-2 mt-4"><span
            v-if="file"
            class="text-sm font-medium leading-5 text-gray-500"
        >Selected File: {{ fileName }}</span></div>
        <div>
            <input
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                style="display:none"
                @change="uploadFile"
            >
        </div>
    </label>
</template>