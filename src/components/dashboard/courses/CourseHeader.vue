<script lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { api_url } from '../../../config'
import { useStore } from 'vuex'

export default {
    name: 'CourseHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import multiselect from '@vueform/multiselect'
import AddCourse from './AddCourse.vue';
import * as courseActionTypes from '../../../store/module/courses/constants/action';

const store = useStore();

const categoryId:any = ref('')

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close course modal')
  let doc:any = document.getElementById('addcourse')
  doc.close()  
}

const categories:any = computed(() => {
    return store.getters.getCourseCategories.value.payload
})

const batchId:any = ref('')

const deselect:any = async () => {
    const request:any = `${api_url}api/coursecategory/get-categories`;
    store.dispatch(courseActionTypes.FetchCourses)
    store.getters.getCourses
}

let isSearching:any = ref(false)
let searchText:any = ref('');

const filter:any = async () => {
    isSearching.value = true
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const request:any = `${api_url}api/course/search-course/{pageIndex}/{pageSize}/${search}`;
  await store.dispatch(courseActionTypes.FetchCourses, request)
  // store.getters.getStudents
}

const close:any = async () => {
    isSearching.value = false
  searchText.value = ''
//   const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
  await store.dispatch(courseActionTypes.FetchCourses)
}

const cancan:any = async (name:any) => {
  console.log('i can can')
  console.log('name', name)
  // if (name == 'All') {
  //   const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
  //   store.dispatch(courseActionTypes.FetchCourseCategories, request)
  //   store.getters.getCourseCategories
  //   // console.log('all url', url) 
  //   return info.value = 'Status'
  // } else if (name == 'Active') {
    const request:any = `${api_url}api/course/filter-course/{pageNumber}/{pageSize}/${name}`;
    store.dispatch(courseActionTypes.FetchCourses, request)
  //   // store.dispatch(courseActionTypes.FilterCourseCategorie, `${url}filter-students/1/10/1`)
  //   store.getters.getCourseCategories
  //   // console.log('active url', url)
  //   return info.value = name
  // } else if (name == 'Disabled') {
  //   const request:any = `${api_url}api/student/filter-students/{pageIndex}/{pageSize}/0`;
  //   store.dispatch(courseActionTypes.FilterCourseCategories, request)
  //   store.getters.getCourseCategories
  //   // console.log('disabled url', url)
  //   return info.value = name
  // }
}

// const setFilterStatus:any = (name:any) => {
//   // let status:any = ref(1)
//   // let url:any = `${api_url}api/students/`
//   // console.log('base url', url)
//   if (name == 'All') {
//     const request:any = `${api_url}api/course/get-courses/{pageIndex}/{pageSize}`;
//     store.dispatch(courseActionTypes.FetchCourses, request)
//     store.getters.getCourses
//     // console.log('all url', url) 
//   } else if (name) {
//     const request:any = `${api_url}api/course/filter-courses/{pageIndex}/{pageSize}/1`;
//     // store.dispatch(courseActionTypes.FilterCourse, request)
//     // store.dispatch(courseActionTypes.FilterCourse, `${url}filter-courses/1/10/1`)
//     store.getters.getCourses
//     // console.log('active url', url)
//   } else if (name == 'Disabled') {
//     const request:any = `${api_url}api/course/filter-courses/{pageIndex}/{pageSize}/0`;
//     // store.dispatch(courseActionTypes.FilterCourse, request)
//     store.getters.getCourses
//     // console.log('disabled url', url)
//   }
// }

onMounted( async() => {
    // store.commit('setPageTitle', 'Course List');
    console.log('CourseHeader mounted');
    const request:any = `${api_url}api/coursecategory/get-categories`;
    await store.dispatch(courseActionTypes.FetchCourseCategories, request)
});

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px] overflow-hidden">
        <div class="top lg:flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Courses</h1>
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold my-2">Add Course</p>
                <!-- <Modal>
                    <template #button>
                        <span class="bg-blue p-1 flex justify-center text-white rounded-md"> -->
                            <!-- <SvgIcons name="plus" /> plus icon -->
                        <!-- </span>
                    </template>
                    <template #content>
                        <AddCourse />
                    </template>
                </Modal> -->

                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('addcourse').showModal()" id="btn">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                                <SvgIcons name="plus" /> <!-- plus icon -->
                            </span>
                        </div>
                    </section>

                    <dialog id="addcourse" class="h-auto w-11/12 md:w-3/4 p-5 bg-white rounded-md ">            
                        <div class="w-full h-auto">
                            <!-- Modal Content-->
                                <AddCourse name="Add" @close="closeModal" />
                            <!-- End of Modal Content-->
                        </div>
                    </dialog>
                </div>
            </button>
        </div>
        <div class="filter flex bg-white rounded-t-lg justify-between items-center px-11 py-5">
            <div class="status my-2 order-last w-2/3 lg:w-1/3">
            <!-- {{ categories }} -->
                <!-- <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">{{ info }}</span>
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
                <!-- {{ categories }} -->
                <!-- {{ categoryId }} -->
            <multiselect v-model="categoryId" @clear="deselect" @select="cancan(categoryId)" valueProp="id" :options="categories" track-by="name" label="name" placeholder="Category" :searchable="true" class="multiselect-blue" />
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
    right: -24%;
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
  --ms-option-bg-selected: hsla(var(--color-primary), var(--tw-bg-opacity));
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>