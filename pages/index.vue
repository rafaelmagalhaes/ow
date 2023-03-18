<template>
  <div>
    <data-table
      :headers="rowHeader"
      :items="items"
      :loading="loading"
      @row-click="rowItem"
    ></data-table>
    <div class="justify-center flex">
      <Pagination
        :current-page="currentPage"
        :total-pages="pageCount"
        :is-first-page="isFirstPage"
        :is-last-page="isLastPage"
        class="mt-3"
        @on-page-change="fetchData"
        @prev="onPrevPage"
        @next="onNextPage"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useLandTitles } from '~/store/landTitles';
import { LandRegistryInterface, TableHeaderItem, TableHeaderSorting } from '~/types';

const store = useLandTitles();
const { fetchLandTitles } = store;
await fetchLandTitles();
const loading = ref(false);
const page = ref(1);
const pageSize = ref(5);

const { landTitles } = storeToRefs(store);
const router = useRouter();
const route = useRoute();

if (route.query.page) {
  page.value = Number(route.query.page);
}
const rowItem = (item: LandRegistryInterface) => {
  router.push(`/title/${item.titleNumber}`);
};
const fetchData = (newPage: number) => {
  currentPage.value = newPage;
  router.replace({ query: { page: newPage } });
};
const onNextPage = () => {
  next();
  router.replace({ query: { page: currentPage.value } });
};
const onPrevPage = () => {
  prev();
  router.replace({ query: { page: currentPage.value } });
};
const { currentPage, currentPageSize, pageCount, isFirstPage, isLastPage, prev, next } =
  useOffsetPagination({
    total: landTitles.value.length,
    page: page.value,
    pageSize: pageSize.value,
  });

/**
 * Returns a computed property that returns a slice of the landTitles array based on the current page and page size.
 * @returns {Array} The items to display on the current page.
 */
const items = computed<LandRegistryInterface[]>(() => {
  const start = (currentPage.value - 1) * currentPageSize.value;
  const end = start + currentPageSize.value;
  return landTitles.value.slice(start, end);
});
const rowHeader = ref<TableHeaderItem[]>([
  {
    id: 'titleNumber',
    label: 'Title Number',
    isSortable: true,
    activeSort: false,
    sorting: TableHeaderSorting.None,
  },
  {
    id: 'Tenure',
    label: 'Tenure',
    isSortable: true,
    activeSort: false,
    sorting: TableHeaderSorting.None,
  },
]);
</script>
