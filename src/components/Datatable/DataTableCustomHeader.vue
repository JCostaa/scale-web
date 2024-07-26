<script setup lang="ts">
interface Props {
  columns: Array<any>
}
defineProps<Props>()
</script>

<template>

  <div class="flex flex-col">
    <div class="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
      <div class="p-2.5 xl:p-5" v-for="(column, index) in columns" :key="index">
        <h5 class="text-sm font-medium uppercase xsm:text-base">{{ column.label }}</h5>
      </div>
    </div>
  </div>
</template>
