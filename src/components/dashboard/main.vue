<script lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import * as actionTypes from '../../store/module/dashboard/constants/action'
export default {
  name: 'MainDashboard',
}
</script>

<script setup lang="ts">
import ActivityCard from '../ActivityCard.vue';
const store = useStore();

const consultancy:any = computed(() => {
    return store.getters.getActivity.value.consultancyRequest
})

const courseapplicants:any = computed(() => {
    return store.getters.getActivity.value.courseApplicants
})

const outsourcing:any = computed(() => {
    return store.getters.getActivity.value.talentRequest
})

const talent:any = computed(() => {
    return store.getters.getActivity.value.freelancers
})

onMounted( async () => {
    // store.commit('setPageTitle', 'Course List');
    console.log('dashboard stats mounted');
    // const request:any = `${api_url}api/dashboard`;
    await store.dispatch(actionTypes.FetchActivity)
});
</script>

<template>
    <div class="grid py-8">
        <div class="title pb-8">
            <h1 class="text-xl font-semibold">Recent Activity</h1>
        </div>
        <!-- {{ talent }} -->
        <div class="main">
            <div class="grid lg:grid-cols-2 gap-5">
                <ActivityCard>
                    <template #activity>
                        <table class="w-full text-sm">
                            <thead class="border-b ">
                                <th class="p-5 text-left pl-0">Contact Name</th>
                                <th class="pr-7">Phone Number</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                <tr class="border-b" v-for="item in courseapplicants" :key="item.id">
                                    <td class="p-5">
                                        {{ item.fullName }}
                                    </td>
                                    <td class="p-5 pl-5 lg:pl-10">
                                        {{ item.phoneNumber }}
                                    </td>
                                    <td class="p-5 flex justify-end">
                                        <span class="text-white text-xs font-semibold rounded-md py-2 px-3" :class="[item.status == 0 ? 'bg-yellow px-4' : item.status == 1 ? 'bg-red px-4' : 'bg-green-accent']">
                                            {{ item.status == 0 ? 'Pending' : item.status == 1 ? 'Rejected' : 'Approved' }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </ActivityCard>
                <ActivityCard>
                    <template #title>
                        Talent Request
                    </template>
                    <template #button>
                        <router-link to="/dashboard/service-management/outsourcing">
                            View All
                        </router-link>
                    </template>
                    <template #activity>
                        <table class="w-full text-sm lg:text-base">
                            <thead class="border-b">
                                <th class="p-5 text-left pl-1">Company Name</th>
                                <th class="p-5 flex justify-end">Status</th>
                            </thead>
                            <tbody>
                                <tr class="border-b" v-for="item in outsourcing" :key="item.id">
                                    <td class="p-5 ">
                                        {{ item.companyName }}
                                    </td>
                                    <td class="p-5 flex justify-end">
                                        <span class="text-white text-xs font-semibold rounded-md py-2 px-2 lg:px-3" :class="[item.status == 0 ? 'bg-yellow px-4' : item.status == 1 ? 'bg-red px-4' : 'bg-green-accent']">
                                            {{ item.status == 0 ? 'Pending' : item.status == 1 ? 'Rejected' : 'Approved' }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </ActivityCard>
                <ActivityCard>
                    <template #title>
                        Consultancy Request
                    </template>
                    <template #button>
                        <router-link to="/dashboard/service-management/consultancy">
                            View All
                        </router-link>
                    </template>
                    <template #activity>
                        <table class="w-full text-sm lg:text-base">
                            <thead class="border-b ">
                                <th class="p-5 text-left pl-0">Contact Name</th>
                                <th class="pr-7">Phone Number</th>
                                <th>Status</th>
                            </thead>
                            <tbody>
                                <tr class="border-b" v-for="item in consultancy" :key="item.id">
                                    <td class="pl-3 lg:p-5">
                                        {{ item.contactPerson }}
                                    </td>
                                    <td class="p-5 pl-5 lg:pl-10">
                                        {{ item.phoneNumber }}
                                    </td>
                                    <td class="p-5 flex justify-end">
                                        <span class="text-white text-xs font-semibold rounded-md py-2 px-3" :class="[item.status == 0 ? 'bg-yellow px-4' : item.status == 1 ? 'bg-red px-4' : 'bg-green-accent']">
                                            {{ item.status == 0 ? 'Pending' : item.status == 1 ? 'Rejected' : 'Approved' }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </ActivityCard>
                <ActivityCard>
                    <template #title>
                        Freelancers
                    </template>
                    <template #button>
                        <router-link to="/dashboard/talent-management/talent-pool">
                            View All
                        </router-link>
                    </template>
                    <template #activity>
                        <table class="w-full text-sm">
                            <thead class="border-b">
                                <th class="py-5 text-left pl-0 text-xs lg:text-base">Name</th>
                                <th class="py-5 text-xs lg:text-base">Role</th>
                                <th class="py-5 text-xs lg:text-base">Proficiency</th>
                                <th class="py-5 flex justify-end text-xs lg:text-base">Status</th>
                            </thead>
                            <tbody>
                                <tr class="border-b text-sm lg:text-base" v-for="item in talent" :key="item.id">
                                    <td class="lg:py-5">
                                        {{ item.fullName }}
                                    </td>
                                    <td class="px-4 lg:py-5 lg:px-2 border">
                                        {{ item.roleName }}
                                    </td>
                                    <td class="py-5 px-2">
                                        {{ item.proficiencyLevel == 0 ? 'Beginner' : item.proficiencyLevel == 1 ? 'Intermediate' : item.proficiencyLevel == 2 ? 'Advanced' : 'Senior' }}
                                    </td>
                                    <td class="py-5 flex justify-end">
                                        <span class="text-white text-xs font-semibold rounded-md py-2 px-3" :class="[item.status == 0 ? 'bg-yellow px-4' : item.status == 1 ? 'bg-red px-4' : 'bg-green-accent']">
                                            {{ item.status == 0 ? 'Pending' : item.status == 1 ? 'Rejected' : 'Approved' }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </ActivityCard>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    overflow: hidden;
}
</style>