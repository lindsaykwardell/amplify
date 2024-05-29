import type { Schema } from "~/amplify/data/resource";
import { defineStore } from "pinia";

export const useLocations = defineStore("locations", {
  state: () => ({
    locations: [] as Schema["Location"]["type"][],
  }),
  getters: {
    getLocations(): Schema["Location"]["type"][] {
      return this.locations;
    },
    getIndependenceId(): string {
      return "246741ba-f85e-4afe-9d1c-4fcec9285f90";
    },
  },
  actions: {
    async fetchLocations() {
      if (this.locations.length) return;

      try {
        const { data } =
          await useNuxtApp().$Amplify.GraphQL.client.models.Location.list();
        this.locations = data;
      } catch (error) {
        console.error("Error fetching locations", error);
      }
    },
  },
});
