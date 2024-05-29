import { defineStore } from "pinia";

export const useSettings = defineStore("settings", {
  state: () => ({
    locationId: null as string | null,
    avatarUrl: null as string | null,
    settingsId: null as string | null,
  }),
  actions: {
    setLocationId(locationId: string) {
      this.locationId = locationId;
    },
    async fetchSettings() {
      const locations = useLocations();

      const { data: settings } =
        await useNuxtApp().$Amplify.GraphQL.client.models.Settings.list({
          limit: 1,
        });

      if (settings.length) {
        this.locationId = settings[0].locationId ?? locations.getIndependenceId;
        this.avatarUrl = settings[0].avatarUrl ?? "/img/default.png";
        this.settingsId = settings[0].id;
      } else {
        // generate settings
        const { data } =
          await useNuxtApp().$Amplify.GraphQL.client.models.Settings.create({
            locationId: locations.getIndependenceId,
            avatarUrl: "/img/default.png",
          });

        this.locationId = data?.locationId ?? locations.getIndependenceId;
        this.avatarUrl = data?.avatarUrl ?? "/img/default.png";
        this.settingsId = data?.id!;
      }
    },
  },
  getters: {
    getLocationId(): string | null {
      return this.locationId;
    },
  },
});
