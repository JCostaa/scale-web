<script setup lang="ts">
import { onMounted, ref, withDefaults, computed } from 'vue'
import DataTable from '@/components/DataTable/DataTable.vue'

interface IProps {
  columns: Array<any>
  data: Array<any>,
  total?: number,
  perPage?: number,
  serveSide?: boolean,
}


withDefaults(defineProps<IProps>(), {
  total: 0,
  perPage: 10,
  serveSide: false
});
</script>

<template>
  <DataTable :columns="columns" :data="data" title="Funcionários" :total="20" :perPage="10" >

  </DataTable>
</template>
