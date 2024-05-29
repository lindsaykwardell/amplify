<template>
  <ElmCounter />
</template>

<script setup lang="ts">
import { Elm } from "~/src/Main.elm";
import elmBridge from "elm-vue-bridge";

const ElmCounter = elmBridge(Elm, "Counter");
</script>
