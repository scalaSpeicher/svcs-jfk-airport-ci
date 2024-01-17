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

const select = ref(null);

const emit = defineEmits(['update:modelValue'])

const updateInput = ($event) => {
    emit('update:modelValue', $event.target.value)
}
</script>

<template>
    <select
        :ref="componentProps.name"
        :value="modelValue"
        :style="componentProps.style"
        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        @change="updateInput"
    >
        <option
            v-for="option in componentProps.options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.label }}
        </option>
    </select>
</template>
