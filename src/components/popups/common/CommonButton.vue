<template>
  <v-btn :v-bind="$attrs"
         :class="[rounded ? '':'pnf-button && rounded',variant]"
         :rounded="rounded"
         :disabled="disable"

  >
    <slot></slot>
  </v-btn>
</template>

<script setup lang="ts">

defineProps<{
  variant?: 'outlined' | 'no-color',
  rounded?: boolean,
  disable?: boolean

}>()
</script>

<style scoped>

.pnf-button {
  background-color: var(--active-button-color);
  color: var(--active-button-text-color);
  height: 3rem;
  max-width: 15svw;
  min-width: fit-content;
  min-height: fit-content;
  margin: 1svw;
}

.outlined {
  background-color: var(--active-button-text-color);
  color: var(--active-button-color);
  border: 2px solid var(--active-button-color);
}

.no-color {
  background-color: white;
  color: black;
  border: 1px solid black;
}

.pnf-rounded-button {
  min-width: 3rem;
  min-height: 3rem;
}


</style>
