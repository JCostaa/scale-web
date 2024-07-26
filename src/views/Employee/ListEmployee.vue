<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { computed, reactive, ref, type Ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { EmployeeService } from '@/services/employee-serivce'
import { inject } from 'vue'
import DataTable from '@/components/Datatable/DataTable.vue'
import type { Employee } from '@/models/employee'
import monthNames from '@/const/months'

const Swal: any = inject('$swal')

const pageTitle = ref('Funcionários')
const loandig = ref<Boolean>(false)

const filters = reactive({
  year: '',
  month: '',
  branch_code: ''
})
const columns = ref([
  {
    label: 'Domingo',
    name: 'sunday',
    type: 'date',
    format: ''
  },
  {
    label: 'Funcionário',
    name: 'name',
    type: 'string'
  },
  {
    label: 'Codigo da filial',
    name: 'branch_code',
    type: 'string'
  },
  {
    label: 'Status',
    name: 'status',
    type: 'string'
  },
  {
    label: 'Ciclo',
    name: 'cycles',
    type: 'string'
  }
])

const data = ref<Array<Employee>>([])

const validateFilters = () => {
  if (!filters.year) {
    Swal.fire({ text: 'É Necessario informa um ano para a filtragem', icon: 'error' })
    return false
  }

  if (!filters.month) {
    Swal.fire({ text: 'É Necessario informa um mês para a filtragem', icon: 'error' })
    return false
  }
  return true
}

const handleGetEmployee = async () => {
  loandig.value = true
  try {
    if (validateFilters()) {
      console.log(filters)
      const response = await EmployeeService.getEmployees(
        filters.year,
        filters.month,
        filters.branch_code
      )
      data.value = response
      loandig.value = true
    }
  } catch (err) {
    Swal.fire({ text: 'Problemas ao fazer essa consulta', icon: 'error' })
    console.log(err)
    loandig.value = false
  }
}

const brandData = ref([])
</script>

<template>
  <DefaultLayout>
    <NotificationGroup>
      <Notification>
        <!-- Here you have typed `notifications` -->
      </Notification>
    </NotificationGroup>
    <!-- Breadcrumb Start -->
    <BreadcrumbDefault :pageTitle="pageTitle" />
    <!-- Breadcrumb End -->

    <div class="flex flex-col gap-10">
      <DataTable
        :columns="columns"
        :data="data"
        :total="data.length"
        :perPage="200"
        :title="pageTitle"
        :serveSide="true"
      >
        <template #header-data-table>
          <div class="flex w-full justify-between items-baseline content-center"></div>
          <div class="w-full">
            <div class="flex flex-col mb-10">
              <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <div class="flex flex-col">
                    <label for="manufacturer" class="text-sm font-medium text-stone-600">Ano</label>
                    <select
                      id="manufacturer"
                      v-model="filters.year"
                      class="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option v-for="(year, index) in 11" :key="index" :value="2025 - year">
                        {{ 2025  - year }}
                      </option>
                    </select>
                  </div>

                  <div class="flex flex-col">
                    <label for="manufacturer" class="text-sm font-medium text-stone-600">Mês</label>

                    <select
                      id="manufacturer"
                      v-model="filters.month"
                      class="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                      <option v-for="(month, index) in monthNames" :key="index" :value="index + 1">
                        {{ month }}
                      </option>
                    </select>
                  </div>

                  <div class="flex flex-col">
                    <label for="name" class="text-sm font-medium text-stone-600"
                      >Codigo da filial</label
                    >
                    <input
                      type="text"
                      id="name"
                      placeholder="2"
                      v-model="filters.branch_code"
                      class="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div class="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                    <button
                      class="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring"
                      :onclick="handleGetEmployee"
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataTable>
    </div>
  </DefaultLayout>
</template>
