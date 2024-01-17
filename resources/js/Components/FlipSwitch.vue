<script setup>
import { ref } from 'vue';

const { modelValue, componentProps, flipOptions } = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    componentProps: {
        type: Object,
        default: () => ({}),
    },
    flipOptions: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(["update:modelValue"]);
const flipValue = ref(modelValue);
const flip = ref(null);
const checked = (flipValue.value === flipOptions[1].value) ? true : false;
const flipLabel = (checked) ? flipOptions[1].label : flipOptions[0].label;


const switchFlipped = () => {
    if (flip.value) {
        if (checked) {
            flipValue.value = flipOptions[0].value;
        } else {
            flipValue.value = flipOptions[1].value;
        }
        emit("update:modelValue", flipValue.value);
    }
};

</script>

<template>
    <div class="flex">
        <div
            class="col-span-6 sm:col-span-4 mt-3 mr-2"
        >
            <div class="flipswitch">
                <input
                    :id="componentProps.name + '_flipswitch'"
                    ref="flip"
                    :name="componentProps.name + '_flipswitch'"
                    type="checkbox"
                    :value="flipValue"
                    :checked="checked"
                    class="flipswitch-cb"
                    @change="switchFlipped()"
                >
                <label
                    :for="componentProps.name + '_flipswitch'"
                    class="flipswitch-label"
                >
                    <div class="flipswitch-inner" />
                    <div class="flipswitch-switch" />
                </label>
            </div>
        </div>
        <div
            class="col-span-6 sm:col-span-4 mt-0"
        >
            <input
                :id="componentProps.name"
                ref="flip"
                :value="flipLabel"
                type="text"
                class="mt-1 ml-2 block w-full"
                style="width:150px;"
            >
        </div>
    </div>
</template>
