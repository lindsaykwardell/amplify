<template>
  <div v-if="currentLocation">
    <img
      :src="currentLocation.image ?? '/img/ot-game-loss.png'"
      :alt="currentLocation.name ?? ''"
      class="w-2/3 max-w-[1000px] m-auto"
    />
    <ul>
      <li
        v-for="post in locationPosts"
        :key="post.id"
        class="flex w-[80ch] gap-2 m-auto"
      >
        <img
          :src="post.settings?.avatarUrl || '/img/default.png'"
          class="w-12"
        />
        <div class="relative w-full">
          <p class="float-right text-sm text-gray-400">
            {{ formatDate(post.createdAt) }}
          </p>
          <p>{{ post.content }}</p>
          <p class="italic text-sm pl-6 text-gray-400">{{ post.event }}</p>
        </div>
      </li>
    </ul>
    <!-- Interface for a user to make a post-->
    <form @submit.prevent="createPost" class="flex flex-col items-center pt-6">
      <div class="flex w-full justify-center">
        <img :src="avatarUrl" class="w-16" />
        <textarea v-model="newPost" class="w-5/6 rounded text-black" rows="2" />
      </div>
      <button
        class="bg-blue-700 hover:bg-blue-800 transition duration-75 rounded px-4 py-2"
      >
        Submit post
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "logged-in",
});

const route = useRoute();
const posts = usePosts();
const locations = useLocations();
const settings = useSettings();

const slug = route.params.slug as string;
const newPost = ref("");

const avatarUrl = computed(() => {
  return settings.avatarUrl ?? "/img/default.png";
});

const currentLocation = computed(() => {
  return locations.locations.find((location) => location.slug === slug);
});

const locationPosts = computed(() => {
  if (!currentLocation.value) {
    return [];
  }

  return posts.getByLocationId(currentLocation.value.id);
});

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

async function createPost() {
  if (!currentLocation.value) {
    return;
  }

  await posts.createPost({
    content: newPost.value,
    locationId: currentLocation.value.id,
    settingsId: settings.settingsId!,
  });

  newPost.value = "";
}

watchEffect(() => {
  if (currentLocation.value) {
    posts.fetchPosts(currentLocation.value.id);
  }
});

onMounted(() => {
  settings.fetchSettings();
  locations.fetchLocations();
});
</script>
