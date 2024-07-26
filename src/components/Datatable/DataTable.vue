<script setup lang="ts">
import { onMounted, ref, withDefaults, computed } from 'vue'
import DataTableHeader from '@/components/DataTable/DataTableCustomHeader.vue'
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue'
import {format} from 'date-fns';

interface IProps {
    title: string,
    columns: Array<any>,
    data: Array<any>,
    total?: number,
    perPage?: number,
    serveSide?: boolean,
}


const props = withDefaults(defineProps<IProps>(), {
    title: "",
    total: 0,
    perPage: 100,
    serveSide: false
});
const currentPage = ref(1);

const totalPage = computed({
    get() {
        return Math.ceil(props.total / props.perPage)
    },
    set(){

    }
})





// onMounted(() => {
//     // console.log('oi')
//     // console.log(props)
//     // console.log(totalPage.value)

// })

const changePage = (value: number) => {
    console.log(value)
    currentPage.value = value;
}

const previousPage = () => {
    currentPage.value -= 1
}

const nextPage = () => {
    currentPage.value += 1
}

</script>

<template>
    <div
        class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <slot name="header-data-table">
            <div class="flex w-full justify-between items-baseline content-center">
                <h4 class="mb-6 text-xl font-semibold text-black dark:text-white">{{ title }}</h4>
                <ButtonDefault route="/" label="Add Funcionário" customClasses="bg-meta-3 text-white rounded-md" />
            </div>
        </slot>


        <div class="flex flex-col">
            <DataTableHeader :columns="columns" />

            <div v-for="(row, key) in data" :key="key" :class="`grid grid-cols-3 sm:grid-cols-5 ${key === data.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
                    }`">
                <slot v-for="(column, index) in columns" :key="index" name="data-table-row" :row="row" :column=column>
                    <div class="flex items-center justify-start p-2.5 xl:p-5">
                      <p v-if="row[column.name] == 'Trabalha'" class="text-red">Trabalhando</p>
                      <p v-if="row[column.name] == 'Folga'" class="text-green-600">De Folga</p>
                        <p v-else-if="row[column.name] != 'Trabalha'" class="dark:text-white" >{{ row[column.name] }}</p>
                    </div>
                </slot>
            </div>

        </div>
        <div class="flex w-full justify-end">
            <nav aria-label="Page navigation example">
                <ul class="flex items-center -space-x-px h-8 text-sm">
                    <li>
                        <a href="#" v-on:click="previousPage"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Anterior</span>
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </a>
                    </li>

                    <li v-for="index in totalPage" :key="index">
                         
                        <a href="#" v-on:click="changePage(index)"
                            :class="currentPage == index ? 'bg-blue-100' : ''"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ index }}</a>
                    </li>

                    <li>
                        <a href="#" v-on:click="nextPage"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Proximo</span>
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>
