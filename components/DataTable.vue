<template>
  <div class="inline-block rounded-md shadow-md shadow-gray-900 overflow-x-auto">
    <table id="table" class="text-sm table-fixed text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <slot name="headers">
          <table-header :headers="headers" @selected-sorting="selectedSorting" />
        </slot>
      </thead>
      <tbody v-if="loading">
        <tr>
          <td :colspan="headers.length">
            <span class="">{{ loadingMessage }}</span>
          </td>
        </tr>
      </tbody>
      <tbody class="min-h-full">
        <slot name="body">
          <tr v-if="items && !items.length">
            <td :colspan="headers.length">
              <span class="">No data available!</span>
            </td>
          </tr>
          <tr
            v-for="(item, i) in sortedItems"
            :key="i"
            class="bg-white border-b dark:bg-gray-800 cursor-pointer dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            @click="$emit('rowClick', item)"
          >
            <slot :item="item">
              <td v-for="(header, hIndex) in headers" :key="hIndex" class="px-6 py-4">
                <span v-if="hasValue(item, header)">
                  {{ item[header.id] }}
                </span>
              </td>
            </slot>
          </tr>
        </slot>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { TableHeaderItem } from '~/types';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  loading: { required: false, type: Boolean, default: false },
  loadingMessage: { required: false, default: 'Loading...', type: String },
});

const currentSort = ref('');
const currentSortDir = ref('');

const sortedItems = computed(() => {
  // create a copy of the items array to avoid mutating the original
  const currentItems = [...props.items];

  // check if there is a current sorting direction set
  if (currentSortDir.value) {
    // sort the items array based on the current sorting direction and sorting key
    return currentItems.sort((a, b) => {
      // get the values of the sorting key for the two items being compared
      const aValue = a[currentSort.value];
      const bValue = b[currentSort.value];

      // compare the values and return -1, 0, or 1 based on the sorting direction
      if (aValue < bValue) {
        return currentSortDir.value === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return currentSortDir.value === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  // if there is no sorting direction set, return a copy of the original items array
  return [...props.items];
});

function hasValue(item: any | object, column: TableHeaderItem) {
  if (item && column) {
    const value: unknown = item[column.id];
    return typeof value !== undefined;
  }
}
function selectedSorting(header: TableHeaderItem, isResetClick: boolean) {
  currentSort.value = header.id;
  currentSortDir.value = isResetClick ? '' : header.sorting;
}
</script>
