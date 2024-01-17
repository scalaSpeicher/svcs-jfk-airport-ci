<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';


const props = defineProps({
    counters: {
        type: Object,
        default: () => ({}),
    },
});
const form = useForm();

    // function destroy(id) {
    //     if (confirm("Are you sure you want to Delete")) {
    //         form.delete(route('counters.destroy', id));
    //     }
    // }
</script>

<template>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div
                id="LidsTable"
                class="bg-white overflow-hidden shadow-xl sm:rounded-lg"
            >
                <table class="min-w-full divide-y divide-gray-200 border-separate">
                    <thead class="bg-gray-50 border">
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border"
                            >
                                Counter ID
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border"
                            >
                                Row
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border"
                            >
                                Position
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border"
                            >
                                Airline
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border"
                            >
                                Label
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border"
                            >
                                Current Status
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase border"
                            />
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="counter in counters"
                            :key="counter.id"
                        >
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                {{ counter.id }}
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                {{ counter.row }}
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                {{ counter.position }}
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                {{ counter.airline_id }}
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                {{ counter.label_id }}
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                {{ counter.status }}
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap border">
                                <button
                                    class="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    @click="editCounter(counter.id)"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>