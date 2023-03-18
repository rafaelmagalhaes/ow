<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px">
      <li>
        <button
          id="previous"
          :disabled="isFirstPage"
          :class="{ 'disabled:opacity-25': isFirstPage, 'cursor-pointer': !isFirstPage }"
          class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="$emit('prev')"
        >
          Previous
        </button>
      </li>
      <li v-for="page in pages" :key="page">
        <button
          aria-current="page"
          :class="{
            'dark:bg-gray-700 dark:text-white text-blue-600': page === currentPage,
            'dark:hover:bg-gray-700 dark:bg-gray-800 dark:hover:text-white leading-tight':
              page !== currentPage,
          }"
          class="px-3 py-2 cursor-pointer text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400"
          @click="$emit('onPageChange', page)"
        >
          {{ page }}
        </button>
      </li>

      <li>
        <button
          id="next"
          :disabled="isLastPage"
          :class="{ 'disabled:opacity-25': isLastPage, 'cursor-pointer': !isLastPage }"
          class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="$emit('next')"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    isFirstPage: {
      type: Boolean,
      required: true,
    },
    isLastPage: {
      type: Boolean,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const pages = computed(() => {
      const pa = [];
      for (let i = 1; i <= props.totalPages; i++) {
        pa.push(i);
      }
      return pa;
    });
    return { pages };
  },
};
</script>
