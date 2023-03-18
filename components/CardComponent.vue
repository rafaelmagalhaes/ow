<template>
  <div
    class="bg-white border-b dark:bg-gray-800 cursor-pointer dark:border-gray-700 rounded-lg overflow-hidden shadow-md"
  >
    <div class="px-4 py-5 sm:p-6">
      <button
        class="mt-4 bg-gray-600 text-white hover:bg-gray-700 px-4 py-2 rounded"
        @click="goBack"
      >
        Go Back
      </button>
      <div class="flex w-[500] text-white justify-between items-center mb-2">
        <h2 class="text-lg font-bold">{{ landTitle.titleNumber }}</h2>
        <span class="inline-block bg-green-500 text-white px-2 py-1 rounded">{{
          landTitle.Tenure
        }}</span>
      </div>
      <div class="mt-4">
        <p class="text-sm text-gray-50">{{ landTitle.propertyAddress }}</p>
      </div>
      <div class="mt-4">
        <GMapMap
          :center="center"
          :zoom="14"
          map-type-id="terrain"
          style="width: 100%; height: 300px"
        >
          <GMapCluster>
            <GMapMarker
              v-for="(m, index) in markers"
              :key="index"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="center = m.position"
            >
              <GMapInfoWindow>
                <div>{{ landTitle.propertyAddress }}</div>
              </GMapInfoWindow>
            </GMapMarker>
          </GMapCluster>
        </GMapMap>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { LandRegistryInterface } from '~/types';
const props = defineProps({
  landTitle: { type: Object as PropType<LandRegistryInterface>, required: true },
});

const center = ref({ lat: props.landTitle.Y, lng: props.landTitle.X });
const markers = ref([
  {
    position: {
      lat: props.landTitle.Y,
      lng: props.landTitle.X,
    },
  },
]);
const router = useRouter();
const goBack = () => {
  if (history.state.back) {
    router.go(-1);
  } else {
    router.push('/');
  }
};
</script>
