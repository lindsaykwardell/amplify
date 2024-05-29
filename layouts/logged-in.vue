<template>
  <div>
    <nav class="flex gap-4 items-center">
      <img src="/img/header.avif" class="w-[250px]" />
      <div class="text-2xl font-raleway italic">Dysentery</div>
      <div class="flex gap-4 justify-end flex-grow p-2">
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <button @click="initSignOut">Sign out</button>
      </div>
    </nav>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const signOut = useNuxtApp().$Amplify.Auth.signOut;

function initSignOut() {
  signOut();
  router.push("/");
}
</script>
