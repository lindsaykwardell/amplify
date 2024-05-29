<template>
  <slot />
</template>

<script setup lang="ts">
const router = useRouter();
const props = defineProps<{
  to: string;
}>();

onMounted(() => {
  router.push(props.to);
});
</script>
