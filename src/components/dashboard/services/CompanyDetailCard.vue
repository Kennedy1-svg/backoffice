<script lang="ts">
export default {
  name: 'CompanyDetailCard',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SvgIcons from '../../SvgIcons.vue';
import { startCase, toLower } from 'lodash';
import { useRoute } from 'vue-router';
import DeleteModal from '../../DeleteModal.vue';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/services/constants/action'
import { api_url } from '../../../config'

const store = useStore();
const route = useRoute();

const jobDetail:any = computed(():any => {
	return store.getters.getNewOutsourcing.value
})

let courseitemtodelete:any = ref('')

const showDelete = ref(false);

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
}

const updateCurriculum:any = async () => {
    const courseId:any = route.params.id

    const request:any = `${api_url}api/curriculum/edit-curriculum/${courseId}`

    console.log('this is the request url ', request)
    const data:any = store.state.courses.newCurriculumBatch

    console.log('data should be ', data)

    const newData:any = {
        url: request,
        data: data
    }

    // await store.dispatch(actionTypes.UpdateCurriculum, newData)

	const fetchrequest:any = `${api_url}api/curriculum/get-curriculum/${courseId}`
	// await store.dispatch(actionTypes.FetchCurriculum, fetchrequest)

}

const deleteCourse:any = async (course:any) => {
    console.log('course identity 1', courseitemtodelete.value)
    const request:any = `${api_url}api/curriculum/delete/${course}`;
    console.log('request forid', request)
    // await store.dispatch(actionTypes.DeleteCurriculum, request)
    // await store.dispatch(actionTypes.RemoveCourse, request)
    closeModal()
    // const fetchrequest:any = `${api_url}api/course/get-courses`;
    // console.log('url', fetchrequest)
    // await store.dispatch(actionTypes.FetchCourseCategories, fetchrequest)
    // store.dispatch(actionTypes.FetchEditStudent, request)
    // return coursedetails
}

const deleteCurriculum:any = async (id:any) => {
    console.log('course identity 2', id)
    // const request:any = `${api_url}api/curriculum/delete/${id}`;
    // await store.dispatch(actionTypes.DeleteCurriculum, request)
    courseitemtodelete.value = id
    console.log('courseitemtodelete', courseitemtodelete.value)
    return courseitemtodelete
}

onMounted( async() => {
	const id:any = route.params.id;
	const request:any = `${api_url}api/outsourcing/get/${id}`
	await store.dispatch(actionTypes.FetchEditOutsourcing, request)
})

</script>

<template>
    <div class="main grid justify-items-enter item-center w-full bg-white rounded p-5">
        <!-- {{ jobDetail }} -->
        <!-- <div class="flex">
            <span class="border-2 border-dashed p-1 rounded-full  justify-center items-center">
                <img :src="jobDetail.thumbnail" class="rounded-full w-60" alt="course thumbnail">
                <SvgIcons class="text-gray-300" name="pic-avatar" />
            </span>
        </div> -->
        <!-- <img :src="jobDetail.thumbnail" alt="course thumbnail"> -->
        <div class="pb-10 pl-3">
            <p class="font-semibold py-1">Company</p>
            <!-- {{ jobDetail }} -->
            <!-- <p class="text-3xl font-semibold py-1 text-grey">{{ startCase(toLower(jobDetail.companyTypeName)) }}</p> -->
            <p class="text-3xl font-semibold py-1 text-grey">{{ jobDetail.companyName }}</p>
        </div>
        <div class="bottom p-3">
            <!-- {{ jobDetails }} -->
            <!-- {{ jobDetails.title }} -->
            <div class="flex py-3 font-medium justify-between items-center">
                <p>Company Type</p>
                <p class="text-grey">{{ startCase(toLower(jobDetail.companyTypeName)) }}</p>
            </div>
            <div class="flex py-3 font-medium justify-between items-center">
                <p>Contact Person</p>
                <p class="text-grey">{{ jobDetail.contactPerson }}</p>
            </div>
            <div class="flex py-3 font-medium justify-between items-center">
                <p>Mobile</p>
                <p class="text-justify flex justify-end text-grey w-2/3">{{ jobDetail.phoneNumber }}</p>
            </div>
            <div class="flex py-3 font-medium justify-between items-center">
                <p>Email</p>
                <p class="text-justify flex justify-end text-grey w-2/3">{{ jobDetail.email }}</p>
            </div>
            <div class="flex py-3 font-medium justify-between items-center">
                <p>Location</p>
                <p class="text-grey">{{ jobDetail.location }}</p>
            </div>
            <div class="flex py-3 font-medium justify-between items-center">
                <p>Status</p>
                <p class="text-grey">{{ jobDetail.status == '0' ? 'Pending' : jobDetail.status == '1' ? 'Rejected' : 'Approved' }}</p>
            </div>
        </div>
        <!-- {{ jobDetail.id }} -->
        <!-- <div class="btns py-9 flex gap-4 text-white">
            <button type="button" @click="showDelete = !showDelete" @click.prevent="deleteCurriculum(jobDetail.id)" class="bg-red rounded px-10 py-4">
                Delete
            </button>
            <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteCourse(courseitemtodelete)">
                <template #title>
                    Delete Course Curriculum
                </template>
                <template #info>
                    Are you sure you want to remove course curriculum?
                </template>
                <template #delete>
                    Yes, Delete Curriculum
                </template>
            </DeleteModal>
            <button type="button" @click="updateCurriculum" class="bg-greenish rounded px-10 py-4">
                Update
            </button>
        </div> -->
    </div>
</template>