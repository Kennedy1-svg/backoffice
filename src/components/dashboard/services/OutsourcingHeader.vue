<script lang="ts">
export default {
  name: 'OutsourcingHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import multiselect from '@vueform/multiselect'
// import AddStudent from './AddStudents.vue';
import * as actionTypes from '../../../store/module/services/constants/action'
import { ref } from 'vue';
import { api_url } from '../../../config'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

const route = useRouter();

const store:any = useStore()

let isSearching:any = ref(false)

let info:any = ref('Status')

const batchId:any = ref('')

const deselect:any = async () => {
    // const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
    await store.dispatch(actionTypes.FetchOutsourcing)
    // await store.getters.getStudents
}

const addOutsourcing:any = async () => {
  // console.log('outsourcingid', id)
  route.push({
      name: 'AddOutsourcing'
  })
}

const cancan:any = async (name:any) => {
  console.log('i can can')
  console.log('name', name)
  // if (name == 'All') {
  //   const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
  //   store.dispatch(actionTypes.FetchStudents, request)
  //   store.getters.getStudents
  //   // console.log('all url', url) 
  //   return info.value = 'Status'
  // } else if (name == 'Active') {
    const request:any = `${api_url}api/outsourcing/filter/{pageIndex}/{pageSize}/${name}`;
    await store.dispatch(actionTypes.FetchOutsourcing, request)
  //   // store.dispatch(actionTypes.FilterStudent, `${url}filter-students/1/10/1`)
  //   store.getters.getStudents
  //   // console.log('active url', url)
  //   return info.value = name
  // } else if (name == 'Disabled') {
  //   const request:any = `${api_url}api/student/filter-students/{pageIndex}/{pageSize}/0`;
  //   store.dispatch(actionTypes.FilterStudent, request)
  //   store.getters.getStudents
  //   // console.log('disabled url', url)
  //   return info.value = name
  // }
}

const statusoptions:any = [
  {
    label: 'Pending',
    value: 0
  },
  {
    label: 'Rejected',
    value: 1
  },
  {
    label: 'Approved',
    value: 2
  }
]

const statusField:any = ref('')

const setFilterStatus:any = async (name:any) => {
  // let status:any = ref(1)
  // let url:any = `${api_url}api/students/`
  // console.log('base url', url)
  // if (name == 'All') {
  //   const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
  //   await store.dispatch(actionTypes.FetchStudents, request)
  //   await store.getters.getStudents
  //   // console.log('all url', url) 
  //   return info.value = 'Status'
  // } else if (name == 'Active') {
  //   const request:any = `${api_url}api/student/filter-students/{pageIndex}/{pageSize}/1`;
  //   await store.dispatch(actionTypes.FilterStudent, request)
  //   // store.dispatch(actionTypes.FilterStudent, `${url}filter-students/1/10/1`)
  //   await store.getters.getStudents
  //   // console.log('active url', url)
  //   return info.value = name
  // } else if (name == 'Disabled') {
  //   const request:any = `${api_url}api/student/filter-students/{pageIndex}/{pageSize}/0`;
  //   await store.dispatch(actionTypes.FilterStudent, request)
  //   await store.getters.getStudents
  //   // console.log('disabled url', url)
  //   return info.value = name
  // }
}

const closeModal:any = () => {
  // document.getElementById('addstudent').showModal()
  console.log('close student modal')
    // localStorage.removeItem('newstudent')
    // localStorage.removeItem('editstudent')
  let doc:any = document.getElementById('addstudent')
  doc.close()  
}

const filterItems:any = ['Active', 'Disabled', 'All']

let searchText:any = ref('');

const filter:any = async () => {
  isSearching.value = true
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const request:any = `${api_url}api/outsourcing/search/{pageIndex}/{pageSize}/${search}`;
  await store.dispatch(actionTypes.FetchOutsourcing, request)
  // store.getters.getStudents

  // const status:any = document.getElementById('status');
  // console.log('status', status)
  // const rows:any = status.getElementsByTagName('ul');
  // console.log('rows', rows)
  // console.log('rows length', rows.length)

  // for (let i:any = 0; i < rows.length; i++) {
  //   const row:any = rows[i];
  //   console.log('row', rows[0])
  //   console.log('row', rows[1])
  //   console.log('row', rows[2])
  //   console.log('row', rows[0].textContent)
  //   console.log('row', rows[1].textContent)
  //   console.log('row', rows[2].textContent)
  //   if (
  //     row.textContent.toLowerCase().indexOf(search) > -1 
  //   ) {
  //     rows[i].style.display = '';
  //   } else {
  //     rows[i].style.display = 'none';
  //   }
  // }
}

const close:any = async () => {
  isSearching.value = false
  searchText.value = ''
  // const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
  await store.dispatch(actionTypes.FetchOutsourcing)
}

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px] overflow-hidden">
      <div class="top md:flex justify-between items-center">
          <h1 class="font-semibold text-2xl">Outsourcing</h1>
          <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold my-2">Add Outsourcing</p>
                <div class="relative overflow-hdden">
                    <section class="flex h-full items-start">
                        <div @click="addOutsourcing">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                              <SvgIcons name="plus" /> <!-- plus icon -->
                            </span>
                        </div>
                    </section>
                </div>
          </button>
      </div>
      <div class="filter grid gap-y-2 md:flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
        <!-- <div class="status"> -->
          <!-- <Filter>
            <template #info>
              <span class="pl-5 pr-56">{{ info }}</span>
            </template>
            <template #input>
              <input @keyup.esc="close" @keyup="filter" v-model="searchText"  class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Filter Status">
            </template>
            <template #list>
              <div id="status">
                <ul class="overflow-auto" v-for="(item, index) in filterItems" :key="index">
                  <li @click.prevent="setFilterStatus(item)" class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">{{ item }}</li>
                </ul>
              </div>
            </template>
          </Filter> -->
          <div class="w-2/3 md:w-1/3 order-last">
          <!-- {{ statusField }} -->
            <multiselect v-model="statusField" @clear="deselect" @select="cancan(statusField)" valueProp="value" :options="statusoptions" track-by="label" label="label" placeholder="Status" :searchable="true" class="multiselect-blue" />
          </div>
        <!-- </div> -->
        <div class="search">
            <Search>
              <template #input>
                <input class="rounded text-sm p-1 focus:outline-none" @keyup.esc="close" v-model="searchText" type="text" placeholder="Search">
                <span class="w-auto flex justify-end items-center text-grey p-2">
                    <SvgIcons v-if="!isSearching" name="search" @click="filter"  />
                    <SvgIcons v-else name="o-cancel" @click="close" class="transform scale-75" />
                </span>
              </template>
            </Search>
        </div>
      </div>
    </div>
</template>

<style scoped>

  dialog[open] {
    position: absolute !important;
    right: -48%;
    animation: appear .25s cubic-bezier(0.0, 0.0, 0.58, 1.0);
}

  dialog::backdrop {
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
    backdrop-filter: blur(3px);
  }
  
 
@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-40rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
} 
.multiselect-blue {
  --ms-option-bg: #DBEAFE;
  --ms-option-color: #2563EB;
  --ms-bg: #FFFFFF;
}
</style>


<style>
.dp-custom-input {
    @apply py-[8px] rounded-md;
}
.multiselect-blue {
  /* --ms-option-bg: #DBEAFE; */
  --ms-option-color: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-dropdown-bg: #FFFFFF;
  --ms-option-bg-selected: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-tag-bg: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-py: 8px;
  --ms-font-size: 12px;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>