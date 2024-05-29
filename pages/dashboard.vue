<template>
  <div>
    <h1>Authed</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "logged-in",
});
</script>
