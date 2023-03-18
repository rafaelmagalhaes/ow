import { defineStore } from 'pinia';
import data from '~/data/titles.json';
import { LandRegistryInterface } from '~/types';

export const useLandTitles = defineStore('landTitles', {
  state: () => ({
    landTitles: [] as LandRegistryInterface[],
    landTitle: {} as LandRegistryInterface,
  }),
  actions: {
    async fetchLandTitles() {
      // mocking an async call,so it's more like a real world example
      await Promise.resolve(data).then((data) => {
        this.landTitles = data;
      });
    },
    async fetchSingleLandTitle(titleNumber: string) {
      // mocking an async call,so it's more like a real world example
      await Promise.resolve(data).then((data) => {
        this.landTitle = data.filter((title) => title.titleNumber === titleNumber)[0];
      });
    },
  },
});
