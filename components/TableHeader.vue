<template>
  <tr>
    <th v-for="(header, index) in headers" :key="index" scope="col" class="px-6 w-52 py-3">
      <button v-if="header.isSortable" class="header-button" @click="sortColumn(header)">
        <span>{{ header.label }}</span>
        <svg
          v-show="header.activeSort && header.sorting === 'asc'"
          class="ml-2"
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.83733 7.70711C3.4468 7.31658 3.4468 6.68342 3.83733 6.29289L7.83733 2.29289C8.22785 1.90237 8.86102 1.90237 9.25154 2.29289L13.2515 6.29289C13.6421 6.68342 13.6421 7.31658 13.2515 7.70711C12.861 8.09763 12.2279 8.09763 11.8373 7.70711L9.54443 5.41421L9.54443 13C9.54443 13.5523 9.09672 14 8.54443 14C7.99215 14 7.54443 13.5523 7.54443 13L7.54443 5.41421L5.25154 7.70711C4.86102 8.09763 4.22785 8.09763 3.83733 7.70711Z"
            fill="#1F1F1F"
          />
        </svg>
        <svg
          v-show="header.activeSort && header.sorting === 'desc'"
          class="ml-2"
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.7213 8.29289C13.1118 8.68342 13.1118 9.31658 12.7213 9.70711L8.72127 13.7071C8.33074 14.0976 7.69758 14.0976 7.30705 13.7071L3.30705 9.70711C2.91653 9.31658 2.91653 8.68342 3.30705 8.29289C3.69758 7.90237 4.33074 7.90237 4.72127 8.29289L7.01416 10.5858L7.01416 3C7.01416 2.44771 7.46188 2 8.01416 2C8.56645 2 9.01416 2.44771 9.01416 3L9.01416 10.5858L11.3071 8.29289C11.6976 7.90237 12.3307 7.90237 12.7213 8.29289Z"
            fill="#1F1F1F"
          />
        </svg>
      </button>
      <span v-else>{{ header.label }}</span>
    </th>
  </tr>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { TableHeaderItem, TableHeaderSorting } from '~/types';

const props = defineProps({
  headers: { type: Array as PropType<TableHeaderItem[]>, required: true },
});

const emit = defineEmits(['selectedSorting']);

const sortColumn = (header: TableHeaderItem) => {
  props.headers.forEach((item) => {
    const isSelectedHeader = item.id === header.id;
    let isResetClick = false;
    let newSorting: TableHeaderSorting;

    if (isSelectedHeader && header.sorting === TableHeaderSorting.None) {
      newSorting = TableHeaderSorting.Asc;
    } else if (isSelectedHeader && header.sorting === TableHeaderSorting.Asc) {
      newSorting = TableHeaderSorting.Desc;
    } else {
      newSorting = TableHeaderSorting.None;
      isResetClick = true;
    }

    item.sorting = newSorting;
    item.activeSort = isSelectedHeader;

    if (isSelectedHeader) {
      emit('selectedSorting', header, isResetClick);
    }
  });
};
</script>

<style scoped>
.header-button {
  display: flex;
  align-items: center;
  font-size: inherit;
  font-weight: inherit;
  text-transform: inherit;
  font-family: inherit;
  color: inherit;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: all 200ms;
}
.header-button :hover {
  opacity: 0.75;
}

span {
  white-space: nowrap;
}
</style>
