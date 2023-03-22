<script lang="ts">
export default {
  name: 'CourseDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import { api_url } from '../../../config'
import { ref, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import Modal from '../../Modal.vue'
import * as actionTypes from '../../../store/module/courses/constants/action'
import multiselect from '@vueform/multiselect'

const store = useStore();

const showProfilePicture = ref(false);
const emits = defineEmits(['close'])

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close modal')
  emits('close')
}

const courseDetails:any = computed(() => {
  return store.getters.getEditCourse.value
})

const course:any = computed(() => {
    console.log('courses', JSON.parse(JSON.stringify(store.getters.getEditCourse.value)))
    // return JSON.parse(JSON.stringify(store.getters.getEditcourse.value))
})

// onMounted(async () => {
//     console.log('I am now here')
//     const request:any = `${api_url}api/course/get-courses/{pageIndex}/{pageSize}`;
//     await store.dispatch(actionTypes.FetchEditcourse, request)
// })

</script>

<template>
    <div class="main grid px-[45px]">
        <div class="grid">
            <div class="flex justify-between py-[53px] items-center ">
                <p class="text-2xl">Course Details</p>
                <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
            </div>
        </div>
        <div class="bottom">
            <!-- {{ courseDetails }} -->
            <!-- {{ courseDetails.title }} -->
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Title</p>
                <p>{{ courseDetails.title }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Course Code</p>
                <p>{{ courseDetails.courseCode }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Sub-Title</p>
                <p class="text-justify flex justify-end w-2/3">{{ courseDetails.subTitle }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Description</p>
                <p class="text-justify flex justify-end w-2/3">{{ courseDetails.description }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Resource Materials</p>
                <p>{{ courseDetails.resourceUrl }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Course Includes (1)</p>
                <p>{{ courseDetails.courseLine1 }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Course Includes (2)</p>
                <p>{{ courseDetails.courseLine2 }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Course Includes (3)</p>
                <p>{{ courseDetails.courseLine3 }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Course Includes (4)</p>
                <p>{{ courseDetails.courseLine4 }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Course Includes (5)</p>
                <p>{{ courseDetails.courseLine5 }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Cost</p>
                <p>{{ courseDetails.cost }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Featured</p>
                <p>{{ courseDetails.isFeatured }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Active</p>
                <p>{{ courseDetails.isActive }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Level Type</p>
                <p>{{ courseDetails.levelType == '0' ? 'Beginner' : courseDetails.levelType == '1' ? 'Intermediate' : 'Advanced' }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <!-- {{ categories }} -->
                <p>Categories</p>
                <!-- <p>{{ courseDetails.categoryNames.map((item:any ):any => item).join(', ') }}</p> -->
                <!-- {{ category }} -->
                <!-- {{ courseDetails.categories }}
                {{ courseDetails.categoryNames }} -->
                <!-- {{ courseDetails.categoryNames.map((e) => e).join(', ') }} -->
                <!-- <multiselect v-model="courseDetails.categories" mode="tags" :close-on-select="false" valueProp="id" :options="categories" track-by="name" label="name" class="multiselect-blue" /> -->
            </div>
        </div>
    </div>
</template>
