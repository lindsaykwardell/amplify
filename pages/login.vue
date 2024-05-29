<template>
  <Authenticator v-slot="{ user, signOut }">
    
  </Authenticator>
</template>

<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import { getCurrentUser } from "aws-amplify/auth";
import { onMounted } from "vue";
</script>
