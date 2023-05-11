<script lang="ts">
export default {
  name: 'JobDetailCard',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, toRefs } from 'vue';
import SvgIcons from '../../SvgIcons.vue';
import { useRoute } from 'vue-router';
import DeleteModal from '../../DeleteModal.vue';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/courses/constants/action'
import { api_url } from '../../../config'
import { startCase, toLower } from 'lodash';

const store = useStore();
const route = useRoute();

// const courseDetail:any = computed(():any => {
// 	return store.getters.getEditCourse.value
// })

let courseitemtodelete:any = ref('')

const showDelete = ref(false);

const emits = defineEmits(['close']);

const props = defineProps({
  job: {
    type: Object,
  },
});

const  { job }  = toRefs(props);

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

    await store.dispatch(actionTypes.UpdateCurriculum, newData)

	const fetchrequest:any = `${api_url}api/curriculum/get-curriculum/${courseId}`
	await store.dispatch(actionTypes.FetchCurriculum, fetchrequest)

}

const deleteCourse:any = async (course:any) => {
    console.log('course identity 1', courseitemtodelete.value)
    const request:any = `${api_url}api/curriculum/delete/${course}`;
    console.log('request forid', request)
    await store.dispatch(actionTypes.DeleteCurriculum, request)
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
	const request:any = `${api_url}api/course/${id}`
	await store.dispatch(actionTypes.FetchEditCourse, request)
})

</script>

<template>
    <div class="main grid justify-items-enter item-center py-4 px-5 bg-white rounded w-[250px] ml-3">
        {{ props.job }}
        <!-- <div class="flex">
            <span class="border-2 border-dashed p-1 rounded-full  justify-center items-center">
                <img :src="courseDetail.thumbnail" class="rounded-full w-60" alt="course thumbnail">
                <SvgIcons class="text-gray-300" name="pic-avatar" />
            </span>
        </div> -->
        <!-- <img :src="courseDetail.thumbnail" alt="course thumbnail"> -->
        <div class="py-2">
            <!-- <p class="font-semibold py-1">Company</p> -->
            <!-- <p class="text-lg font-semibold py-1">{{ job.roleName }}</p> -->
        </div>
        <div class="bottom">
            <!-- {{ props.jobs }} -->
            <!-- {{ props.jobs.title }} -->
            <div class="py-3 font-medium justify-between items-center">
                <p>Type</p>
                <!-- <p class="text-grey">{{ startCase(toLower(props.job.typeName)) }}</p> -->
            </div>
            <div class="py-3 font-medium justify-between items-center">
                <p>Experience</p>
                <!-- <p class="text-grey">{{ startCase(toLower(props.job.experienceName)) }}</p> -->
            </div>
            <div class="py-3 font-medium justify-between items-center">
                <p>No of resources</p>
                <!-- <p class="text-grey">{{ props.job.noOfResource }}</p> -->
            </div>
        </div>
        <!-- {{ props.job.id }} -->
        <!-- <div class="btns py-9 flex gap-4 text-white">
            <button type="button" @click="showDelete = !showDelete" @click.prevent="deleteCurriculum(courseDetail.id)" class="bg-red rounded px-10 py-4">
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