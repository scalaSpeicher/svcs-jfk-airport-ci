<script setup>
import { ref, watchEffect } from "vue";
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import Slider from "@/Components/Slider.vue";
import FlipSwitch from "@/Components/FlipSwitch.vue";
import Multiselect from 'vue-multiselect';

const { show, messageComponents, modelValue } = defineProps({
    show: {
        type: Boolean,
        default: () => false,
    },
    messageComponents: {
        type: Object,
        default: () => ({}),
    },
    modelValue: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits(["update:modelValue"]);
const playerValue = ref(modelValue);
const player = ref(null);
const selectedAirlines = ref((playerValue.value.airlines) ? playerValue.value.airlines : []);

const onMultiSelectChange = (event, action) => {
    if (action === 'add') {
        selectedAirlines.value.push(event);
    } else {
        selectedAirlines.value =
            selectedAirlines.value.filter(function (airline) {
                return airline.id != event.id
            })
    }
    playerValue.value.airlines = selectedAirlines.value;
}

watchEffect(() => {
    if (player.value) {
        emit("update:modelValue", playerValue.value);
    }
});

</script>
<template>
    <div
        class="item item-skinny"
    >
        <InputLabel
            for="name"
            value="Message Name"
        />
        <TextInput
            id="name"
            ref="player"
            v-model="playerValue['name']"
            name="name"
            type="text"
            class="mt-2 block w-full"
        />
        <InputError
            :message="playerValue.errors['name']"
            class="mt-2"
        />
    </div>
    <div
        v-for="(messageComponent, name) in messageComponents"
        :key="name"
        v-bind="$attrs"
        :class="(messageComponent.type === 'font'
            || messageComponent.type === 'textarea'
            || messageComponent.type === 'number'
            || messageComponent.type === 'airlines-select'
            || messageComponent.type === 'toggle')
            ? 'item item-fat' : 'item item-skinny'"
    >
        <InputLabel
            :for="name"
            :value="messageComponent.label"
        />
        <div v-if="messageComponent.type === 'text'">
            <TextInput
                :id="name"
                ref="player"
                v-model="playerValue[name]"
                :name="name"
                :type="messageComponent.type"
                :disabled="messageComponent.readonly"
                class="mt-2 block w-full"
            />
        </div>

        <div v-else-if="messageComponent.type === 'number'">
            <div class="slider">
                <Slider
                    :id="name"
                    ref="player"
                    v-model="playerValue[name]"
                    :name="name"
                    :min="messageComponent.min"
                    :max="messageComponent.max"
                    :disabled="messageComponent.readonly"
                    class="mt-2 block w-full"
                    :step="1"
                    @input="({ target }) => (playerValue[name] = parseFloat(target.value))"
                />
            </div>
        </div>

        <div v-else-if="messageComponent.type === 'textarea'">
            <textarea
                :id="name"
                ref="player"
                :name="name"
                :value="playerValue[name]"
                :type="messageComponent.type"
                style="width:100%;"
                :rows="messageComponent.rows"
                :disabled="messageComponent.readonly"
                class="mt-2 block w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                @input="({ target }) => (playerValue[name] = target.value)"
            />
        </div>

        <div v-else-if="messageComponent.type === 'select'">
            <select
                :id="name"
                ref="player"
                :name="name"
                :value="playerValue[name]"
                :disabled="messageComponent.readonly"
                class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-2 block w-full"
                @change="({ target }) => (playerValue[name] = target.value)"
            >
                <option
                    v-for="option in messageComponent.options"
                    :key="option.value"
                    :value="option.value"
                    :selected="option.default"
                >
                    {{ option.label }}
                </option>
            </select>
        </div>

        <div v-else-if="messageComponent.type === 'airlines-select'">
            <multiselect
                :id="name"
                ref="player"
                v-model="playerValue[name]"
                :name="name"
                :disabled="messageComponent.readonly"
                class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-2 block w-full"
                placeholder="Select Airlines"
                track-by="id"
                label="name"
                :options="messageComponent.options"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                @select="onMultiSelectChange($event, 'add')"
                @remove="onMultiSelectChange($event, 'sub')"
            >
                <template #selection="{ values }">
                    <div class="multiselect-multiple-label">
                        {{ values.length }} airlines selected
                    </div>
                </template>
            </multiselect>
        </div>

        <div v-else-if="messageComponent.type === 'toggle'">
            <FlipSwitch
                :id="name"
                ref="player"
                v-model="playerValue[name]"
                :name="name"
                :flip-options="messageComponent.options"
                :disabled="messageComponent.readonly"
                classes="mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30 mt-2 block w-full"
                @change="({ target }) => (playerValue[name] = target.value)"
            />
        </div>

        <!-- <div v-else-if="messageComponent.type === 'boolean'">
            <ToggleButton
                :id="name"
                ref="player"
                v-model="playerValue[name]"
                :name="name"
                :disabled="messageComponent.readonly"
                on-label="On"
                off-label="Off"
                labelledby="toggle-label"
                describedby="toggle-description"
                false-value="false"
                true-value="true"
                classes="mt-2 focus:ring focus:ring-white-500 focus:ring-opacity-30 mt-2 block w-full"
                @change="({ target }) => (playerValue[name] = target.value)"
            />
        </div> -->

        <div v-else-if="messageComponent.type === 'picker'">
            <div class="flex">
                <div
                    class="col-span-6"
                >
                    <TextInput
                        :id="name + '_picker'"
                        ref="player"
                        v-model="playerValue[name]"
                        type="color"
                        class="mt-2 block w-full"
                        autocomplete="Color"
                        :disabled="messageComponent.readonly"
                        style="width:24px;"
                        @input="({ target }) => (playerValue[name] = target.value)"
                    />
                </div>
                <div
                    class="col-span-6  mt-0"
                >
                    <TextInput
                        :id="name"
                        ref="player"
                        v-model="playerValue[name]"
                        :name="name"
                        type="text"
                        class="mt-1 ml-2 block w-full"
                        autocomplete="Primary Color"
                        :disabled="messageComponent.readonly"
                        style="width:100px;"
                        @input="({ target }) => (playerValue[name] = target.value)"
                    />
                </div>
            </div>
        </div>

        <div v-else-if="messageComponent.type === 'font'">
            <div
                class="sm:p-6 shadow sm:rounded-md mt-2 bg-gray-50"
            >
                <div
                    v-if="messageComponent.family"
                    class="flex mb-3"
                >
                    <div
                        class="col-span-6 mt-2 mr-2"
                        style="width: 55px;"
                    >
                        Family:
                    </div>
                    <div
                        class="col-span-6 mt-0"
                        style="min-width: 132px;width:150px;"
                    >
                        <select
                            :id="name + '.family'"
                            ref="player"
                            :name="name + '.family'"
                            :value="playerValue[name].family"
                            :disabled="messageComponent.readonly"
                            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            style="min-width: 132px;width:150px;"
                            @change="({ target }) => (playerValue[name].family = target.value)"
                        >
                            <option
                                v-for="option in messageComponent.family.options"
                                :key="option.value"
                                :value="option.value"
                                :selected="option.value == messageComponent.family.options.default"
                            >
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                </div>
                <div
                    v-if="messageComponent.color"
                    class="flex mb-3"
                >
                    <div
                        class="col-span-6 mt-2 mr-2"
                        style="width: 55px;"
                    >
                        Color:
                    </div>
                    <div
                        class="col-span-6 mt-0"
                    >
                        <TextInput
                            ref="player"
                            v-model="playerValue[name].color"
                            :name="name + '.color_picker'"
                            :disabled="messageComponent.readonly"
                            type="color"
                            class="mt-2 block w-full"
                            autocomplete="Color"
                            style="width:24px;"
                            @input="({ target }) => (playerValue[name].color = target.value)"
                        />
                    </div>
                    <div
                        class="col-span-6 "
                    >
                        <TextInput
                            :id="name + '.color'"
                            ref="player"
                            v-model="playerValue[name].color"
                            :disabled="messageComponent.readonly"
                            :name="name + '.color'"
                            type="text"
                            class="mt-0 ml-2 block w-full"
                            autocomplete="Primary Color"
                            style="width:100px;"
                            @input="({ target }) => (playerValue[name].color = target.value)"
                        />
                    </div>
                </div>
                <div
                    v-if="messageComponent.weight"
                    class="flex mb-3"
                >
                    <div
                        class="col-span-6 mt-3 mr-2"
                        style="width: 55px;"
                    >
                        Weight:
                    </div>
                    <div
                        class="col-span-6 "
                    >
                        <div class="slider">
                            <Slider
                                :id="name + '.weight'"
                                ref="player"
                                v-model="playerValue[name].weight"
                                :disabled="messageComponent.readonly"
                                :name="name + '.weight'"
                                :min="messageComponent.weight.min"
                                :max="messageComponent.weight.max"
                                :step="50"
                                @input="({ target }) => (playerValue[name].weight = parseFloat(target.value))"
                            />
                        </div>
                    </div>
                </div>
                <div
                    v-if="messageComponent.size"
                    class="flex mb-3"
                >
                    <div
                        class="col-span-6  mt-3 mr-2"
                        style="width: 55px;"
                    >
                        Size:
                    </div>
                    <div
                        class="col-span-6 "
                    >
                        <div class="slider">
                            <Slider
                                :id="name + '.size'"
                                ref="player"
                                v-model="playerValue[name].size"
                                :disabled="messageComponent.readonly"
                                :name="name + '.size'"
                                :min="messageComponent.size.min"
                                :max="messageComponent.size.max"
                                :step="1"
                                @input="({ target }) => (playerValue[name].size = parseFloat(target.value))"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <TextInput
                :id="name"
                ref="player"
                v-model="playerValue[name]"
                :disabled="messageComponent.readonly"
                :name="name"
                :type="messageComponent.type"
                class="mt-2 block w-full"
                @input="({ target }) => (playerValue[name] = target.value)"
            />
        </div>
        <InputError
            :message="modelValue.errors[name]"
            class="mt-2"
        />
    </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>