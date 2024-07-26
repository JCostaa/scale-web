<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { EmployeeService } from '@/services/employee-serivce'
import { inject } from 'vue'
const Swal: any = inject('$swal')

const pageTitle = ref('Funcionários')

const file = ref<File | null>()
const form = ref<HTMLFormElement>()
const loading = ref(true)
const preloader: any = ref(document.getElementById('progress-csv'))
function onFileChanged($event: Event) {
  const target = $event.target as HTMLInputElement
  if (target && target.files) {
    file.value = target.files[0]
  }
}

const handleOnSend = () => {
  loading.value = true
  setTimeout(function () {
    preloader.value = '15%'
    preloader.value = '35%'
    preloader.value = '55%'
    preloader.value = '65%'
    preloader.value = '75%'
    preloader.value = '100%'

    saveImage()
  }, 1500)

  async function saveImage() {
    if (file.value) {
      try {
        const formData = new FormData()
        formData.append('csv', file.value)
        const response = await EmployeeService.importCSV(formData)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Dados importados com sucesso!',
          showConfirmButton: false
        })
      } catch (error) {
        form.value?.reset()
        file.value = null
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          text: 'Não foi possível importar suas informações!',
          showConfirmButton: true,
          showCancelButton: false
        })
        // loading.value = false
      } finally {
        //
        //loading.value = false
      }
    }
  }
}
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
      <div
        class="h-[300px] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <div class="flex flex-col justify-center item-center content-center w-full h-max">
          <h1 class="text-center">Você pode importar seus funcionários</h1>
          <span class="text-center text-[10px]"
            >Importe seus fincionarios aqui, o formato aceito e apenas
            <span class="text-red font-bold">.CSV</span></span
          >
        </div>
        <div class="w-full flex justify-center mt-6">
          <label>
            <input
              :onchange="onFileChanged"
              accept=".csv"
              type="file"
              class="text-sm text-grey-500 file:mr-5 file:py-3 file:px-10 file:rounded-full file:border-0 file:text-md file:font-semibold file:text-white file:bg-gradient-to-r file:from-blue-600 file:to-blue-600 hover:file:cursor-pointer hover:file:opacity-80"
            />
          </label>
        </div>
        <div class="flex justify-center mt-6">
          <button
            :disabled="!file ? true : false"
            :onClick="handleOnSend"
            class="focus:outline-none w-[400px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Enviar
          </button>
          <!-- <div
          class="mt-6 flex justify-start w-[600px] bg-gray-200 rounded-full h-2.5 bg-gray"
        >
          <div class="bg-blue-600 h-2.5 rounded-full" style="width:   0%"></div>
        </div> -->
        </div>
        <div class="flex justify-center mt-6" v-show="loading" id="progress-csv">
          <div class="mt-6 flex justify-start w-[600px] bg-gray-200 rounded-full h-2.5 bg-gray">
            <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: preloader }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- <DataTable :columns="columns" :data="brandData" :total="brandData.length" :perPage="10" :title="pageTitle">
        <template #header-data-table>
          <div class="flex w-full justify-between items-baseline content-center">
            <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">{{ pageTitle }}</h4>
            <div class="w-full flex justify-end">
              <ButtonDefault :onclick="handleImportCSV" route="#" label="Importar Funcionário" customClasses="bg-meta-3 text-white rounded-md" />
            </div>

          </div>
        </template>
</DataTable> -->
  </DefaultLayout>
</template>
