<script lang="ts">
export default {
  name: 'JobDetails',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SvgIcons from '../../SvgIcons.vue';
import { useRoute } from 'vue-router';
import DeleteModal from '../../DeleteModal.vue';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/services/constants/action'
import { api_url } from '../../../config';
import JobDetailCard from './JobDetailCard.vue'

const store = useStore();
const route = useRoute();

const jobDetails:any = computed(():any => {
  return store.getters.getOutsourcingJobDetails.value.payload
})

onMounted( async () => {
    console.log('job details', jobDetails.value)
    const request:any = `${api_url}api/outsourcing/get-jobdetails/${route.params.id}`
    await store.dispatch(actionTypes.FetchJobDetails, request)
})
</script>

<template>
    <div class="main grid bg-white mx-5">
        <div class="title flex justify-between items-center p-7 px-10">
            <h1 class="text-4xl font-semibold text-black">
                Job Details
            </h1>
        </div>
        {{ jobDetails.jobDetails }}
        <div class="details p-7 px-10 grid grid-cols-3 gap-5">
            <!-- <JobDetailCard v-for="detail in jobDetails" :key="detail.id" :job="detail" class="shadow-md"/> -->
        </div>
    </div>
</template>