<template>
  <h1 class="text-4xl text-center font-raleway">Dashboard</h1>
  <section>
    <p class="text-2xl text-center">Choose a location</p>
    <ul class="flex flex-wrap">
      <li
        v-for="location in locations.getLocations"
        :key="location.id"
        class="w-1/3 text-center"
      >
        <nuxt-link :to="`/l/${location.slug}`" class="p-2">
          <img
            :src="location.image || `/img/ot-game-loss.png`"
            class="w-full"
            :alt="location.name || 'Location image'"
          />
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "logged-in",
});

const locations = useLocations();
const settings = useSettings();

onMounted(() => {
  settings.fetchSettings();
  locations.fetchLocations();
});
</script>
