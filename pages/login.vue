<template>
  <Authenticator v-slot="{ user, signOut }">
    <RedirectTo v-if="user" to="/dashboard" />
  </Authenticator>
</template>

<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";

definePageMeta({
  middleware: ["guest"],
});
</script>
