<script setup lang="ts"></script>

<template>
  <img src="/img/welcome.png" class="w-3/4 max-w-[1000px] m-auto" />
  <h1 class="text-4xl text-center mt-4 font-raleway p-4">
    Dysentery: The Online Oregon Trail Community
  </h1>
  <p class="w-[80ch] m-auto text-xl p-4">
    Welcome to Dysentery! This is a community for fans of the classic game
    Oregon Trail. Here you can chat with other fans from within the game
    environment, as if you were playing the game. You can also share your
    favorite memories, tips, and tricks with other fans.
  </p>

  <div class="flex justify-center">
    <nuxt-link to="/login" class="bg-yellow-900 hover:bg-yellow-950 transition duration-150 px-4 py-2 text-lg font-raleway rounded-lg">
      Enter the Trail
    </nuxt-link>
  </div>
</template>
