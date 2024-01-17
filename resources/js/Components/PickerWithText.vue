<script setup>
import { ref } from 'vue';

defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    componentProps: {
        type: Object,
        default: () => ({}),
    },
});

defineEmits(['update:modelValue']);

const input = ref(null);

</script>

<template>
    <div class="flex">
        <div
            class="col-span-6 sm:col-span-4"
        >
            <TextInput
                :id="componentProps.name + '_picker'"
                v-model="modelValue"
                type="color"
                class="mt-2 block w-full"
                autocomplete="Color Picker"
                style="width:24px;"
            />
        </div>
        <div
            class="col-span-6 sm:col-span-4 mt-0"
        >
            <TextInput
                :id="componentProps.name"
                v-model="modelValue"
                type="text"
                class="mt-1 ml-2 block w-full"
                autocomplete="Color"
                style="width:100px;"
            />
        </div>
    </div>
</template>
