<script setup>
import { defineProps } from 'vue';
import { useForm } from '@inertiajs/vue3';
import ActionMessage from '@/Components/ActionMessage.vue';
import FormSection from '@/Components/FormSection.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

import { reactive, ref } from 'vue';

const props = defineProps({
    counter: {
        type: Object,
        default: () => ({
            position: 'entry',
            type: 'single',
        })
    },
    formMode: {
        type: String,
        default: () => (''),
    }
});

const counterform = reactive({ changed: false });

const form = useForm({
    // _method: 'PUT',
    counter_location: (props.counter.counter_location) ? props.counter.counter_location : '1',
    row: (props.counter.row) ? props.counter.row : '1',
    position: (props.counter.position) ? props.counter.position : 'entry',
    width: (props.counter.width) ? props.counter.width : '1',
    type: (props.counter.type) ? props.counter.type : 'single',
});

const onChange = (event) => {
    form[event.target.name] = event.target.value;
    counterform.changed=true
}

const ucFirst = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

const updateCounterInformation = () => {
    if (props.formMode == 'editCounter') {
        form.put(route(
            'counters.update',
            props.counter.id
        ), {
            preserveScroll: true,
        });
    } else {
        form.post(route(
            'counters.store',
        ), {
            preserveScroll: true,
        });
    }
};


</script>

<template>
    <FormSection @submitted="updateCounterInformation">
        <!-- <FormSection> -->
        <template #title>
            <span v-if="props.formMode == 'editCounter'">Counter Update</span>
            <span v-else>Counter Add</span>
        </template>
        <template #description>
            <div>
                <span v-if="props.formMode == 'editCounter'">Update Counter Information</span>
                <span v-else>Add Counter Information</span>
                <div class="columns-1">
                    <div class="mt-4 ml-6">
                        <span>Location:&nbsp;&nbsp;</span><span style="font-weight:900">{{ (props.formMode == 'editCounter') ? counter.counter_location : '1' }}</span>
                    </div>
                    <div class="ml-6">
                        <span>Row:&nbsp;&nbsp;</span><span style="font-weight:900">{{ (props.formMode == 'editCounter') ? counter.row : '1' }}</span>
                    </div>
                    <div class="ml-6">
                        <span>Position:&nbsp;&nbsp;</span><span style="font-weight:900">{{ (props.formMode == 'editCounter') ? ucFirst(counter.position) : 'Entry' }}</span>
                    </div>
                    <div class="ml-6">
                        <span>Width:&nbsp;&nbsp;</span><span style="font-weight:900">{{ (props.formMode == 'editCounter') ? counter.width : '1' }}</span>
                    </div>
                    <div class="ml-6">
                        <span>Type:&nbsp;&nbsp;</span><span style="font-weight:900">{{ (props.formMode == 'editCounter') ? ucFirst(counter.type) : 'Single' }}</span>
                    </div>
                </div>
            </div>
        </template>
        <template #form>
            <div id="CounterEditForm">
                <!-- Counter Location -->
                <div class="col-span-6 sm:col-span-4 mt-2">
                    <InputLabel
                        for="counter_location"
                        value="Counter Location"
                        style="width:300px"
                    />
                    <TextInput
                        id="counter_location"
                        v-model="form.counter_location"
                        type="number"
                        min="1"
                        required
                        class="mt-2 block w-full"
                        autocomplete="Counter Location"
                        style="width:300px;"
                        name="counter_location"
                        @change="onChange"
                    />
                    <InputError
                        :message="form.errors.counter_location"
                        class="mt-2"
                    />
                </div>

                <!-- Counter Row -->
                <div class="col-span-6 sm:col-span-4 mt-2">
                    <InputLabel
                        for="row"
                        value="Counter Row"
                        style="width:300px"
                    />
                    <TextInput
                        id="row"
                        v-model="form.row"
                        type="number"
                        min="1"
                        class="mt-2 block w-full"
                        autocomplete="Row"
                        style="width:300px;"
                        name="row"
                        @change="onChange"
                    />
                    <InputError
                        :message="form.errors.row"
                        class="mt-2"
                    />
                </div>

                <!-- Position -->
                <div class="col-span-6 sm:col-span-4 mt-4">
                    <InputLabel
                        for="position"
                        value="Counter Position"
                        style="width:300px"
                    />
                    <select
                        v-model="form.position"
                        required
                        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        style="width:300px;"
                        name="position"
                        @change="onChange"
                    >
                        <option value="entry">
                            Entry
                        </option>
                        <option value="security">
                            Security
                        </option>
                    </select>
                    <InputError
                        :message="form.errors.position"
                        class="mt-2"
                    />
                </div>

                <!-- Counter Width -->
                <div class="col-span-6 sm:col-span-4 mt-2">
                    <InputLabel
                        for="width"
                        value="Counter Width"
                        style="width:300px"
                    />
                    <TextInput
                        id="width"
                        v-model="form.width"
                        type="number"
                        min="1"
                        class="mt-2 block w-full"
                        autocomplete="Width"
                        style="width:300px;"
                        name="width"
                        @change="onChange"
                    />
                    <InputError
                        :message="form.errors.width"
                        class="mt-2"
                    />
                </div>

                <!-- Counter Type -->
                <div class="col-span-6 sm:col-span-4 mt-4">
                    <InputLabel
                        for="type"
                        value="Counter Type"
                        style="width:300px"
                    />
                    <select
                        ref="counterType"
                        v-model="form.type"
                        required
                        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        style="width:300px;"
                        name="type"
                        @change="onChange"
                    >
                        <option value="single">
                            Single
                        </option>
                        <option value="double">
                            Double
                        </option>
                    </select>
                    <InputError
                        :message="form.errors.type"
                        class="mt-2"
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
            <a href="/counters">
                <SecondaryButton type="button">
                    Cancel
                </SecondaryButton>
            </a>
            <span style="width:20px" />
            <PrimaryButton
                v-show="counterform.changed===true || props.formMode == 'addCounter'"
                :class="{ 'opacity-25': form.processing }"
                :disabled="form.processing"
            >
                Save
            </PrimaryButton>
            <SecondaryButton
                v-show="counterform.changed===false && props.formMode != 'addCounter'"
                type="button"
                style="opacity:.5; cursor:default;"
            >
                Save
            </SecondaryButton>
        </template>
    </FormSection>
</template>

<!-- <style src="@vueform/toggle/themes/default.css"></style> -->
