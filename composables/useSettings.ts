import { defineStore } from "pinia";

export const useSettings = defineStore("settings", {
  state: () => ({
    locationId: null as string | null,
  }),
  actions: {
    setLocationId(locationId: string) {
      this.locationId = locationId;
    },
    async fetchSettings() {
      const user = await useNuxtApp().$Amplify.Auth.getCurrentUser();

      const { data: settings } =
        await useNuxtApp().$Amplify.GraphQL.client.models.Settings.list({
          // filter: {
          //   owner: { eq: user.userId },
          // },
        });

      if (settings.length) {
        this.locationId = settings[0].locationId ?? null;
      } else {
        const locations = useLocations();

        // generate settings
        const { data } =
          await useNuxtApp().$Amplify.GraphQL.client.models.Settings.create({
            locationId: locations.getIndependenceId,
          });

        this.locationId = data?.locationId ?? null;
      }
    },
  },
  getters: {
    getLocationId(): string | null {
      return this.locationId;
    },
  },
});
