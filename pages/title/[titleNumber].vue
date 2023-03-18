<template>
  <div class="w-[50%]"><card-component :land-title="landTitle"></card-component></div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useLandTitles } from '~/store/landTitles';
import CardComponent from '~/components/CardComponent.vue';

const route = useRoute();
const store = useLandTitles();
const titleNumber = computed<string>(() => route.params.titleNumber as string);
const { fetchSingleLandTitle } = store;
await fetchSingleLandTitle(titleNumber.value);
const { landTitle } = storeToRefs(store);
</script>
