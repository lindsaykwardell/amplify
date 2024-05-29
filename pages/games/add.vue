<template></template>

<script setup lang="ts">
import type { Schema } from "@/amplify/data/resource";

const game = ref<
  Partial<
    Omit<Schema["Game"]["type"], "party"> & {
      party: Schema["PartyMember"]["type"][];
    }
  >
>({
  datePlayed: new Date().toISOString(),
  profession: null,
  startMonth: null,
  endMonth: null,
  endYear: null,
  party: [],
  wagon: 0,
  oxen: 0,
  spareParts: 0,
  setsOfClothing: 0,
  bullets: 0,
  money: 0,
});
</script>
