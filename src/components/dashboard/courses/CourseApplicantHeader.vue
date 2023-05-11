<script lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { api_url } from '../../../config'
import { useStore } from 'vuex'

export default {
    name: 'CourseApplicantHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import multiselect from '@vueform/multiselect'
import AddCourseApplicant from './AddCourseApplicant.vue';
import * as courseActionTypes from '../../../store/module/courses/constants/action';

const store = useStore();

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close course modal')
  let doc:any = document.getElementById('addcourseapplicant')
  doc.close()  
}

let isSearching:any = ref(false)

const deselect:any = async () => {
    // const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
    await store.dispatch(courseActionTypes.FetchCourseApplicants)
    // await store.getters.getCourseApplicants
}

let searchText:any = ref('');

const filter:any = async () => {
    isSearching.value = true
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const request:any = `${api_url}api/courseapplicant/search-applicants/{pageIndex}/{pageSize}/${search}`;
  await store.dispatch(courseActionTypes.FetchCourseApplicants, request)
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
    const request:any = `${api_url}api/courseapplicant/filter-courseapplicant/{pageNumber}/{pageSize}/${name}`;
    await store.dispatch(courseActionTypes.FetchCourseApplicants, request)
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
    value: 0,
  },
  {
    label: 'Approved',
    value: 1,
  },
  {
    label: 'Rejected',
    value: 2,
  },
]

const statusField:any = ref('')

const close:any = async () => {
    isSearching.value = false
  searchText.value = ''
  // const request:any = `${api_url}api/courseapplicant/get-courseapplicant/{pageIndex}/{pageSize}`;
  await store.dispatch(courseActionTypes.FetchCourseApplicants)
}

onMounted(() => {
    // store.commit('setPageTitle', 'Course List');
    console.log('CourseHeader mounted');
});

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px] overflow-hidden">
        <div class="top lg:flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Course Applicants</h1>
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold my-2">Add Applicants</p>
                <!-- <Modal>
                    <template #button>
                        <span class="bg-blue p-1 flex justify-center text-white rounded-md"> -->
                            <!-- <SvgIcons name="plus" /> plus icon -->
                        <!-- </span>
                    </template>
                    <template #content>
                        <AddCourseApplicant />
                    </template>
                </Modal> -->

                <div class="relative overflow-hidden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('addcourseapplicant').showModal()" id="btn">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                                <SvgIcons name="plus" /> <!-- plus icon -->
                            </span>
                        </div>
                    </section>

                    <dialog id="addcourseapplicant" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
                        <div class="w-full h-auto">
                            <!-- Modal Content-->
                                <AddCourseApplicant @close="closeModal" />
                            <!-- End of Modal Content-->
                        </div>
                    </dialog>
                </div>
            </button>
        </div>
        <div class="filter grid gap-y-3 lg:flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
            <div class="status my-2 order-last w-2/3 lg:w-1/3">
                <!-- <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">Status</span>
                    </template>
                    <template #input>
                        <input class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Add Status">
                    </template>
                    <template #list>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                            Active
                        </p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Disabled</p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">None</p></li>
                    </template>
                </Filter> -->
                <multiselect v-model="statusField" @clear="deselect" @select="cancan(statusField)" valueProp="value" :options="statusoptions" track-by="label" label="label" placeholder="Status" :searchable="true" class="multiselect-blue" />
            </div>
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
    transform: translateX(-10rem);
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