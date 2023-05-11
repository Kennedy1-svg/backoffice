<script lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import circleprogress from 'vue3-circle-progress-bar';
import "vue3-circle-progress-bar/dist/circle-progress-bar.css";
import * as actionTypes from '../../store/module/dashboard/constants/action'

export default {
  name: 'DashboardHeader',
}
</script>

<script setup lang="ts">
import { api_url } from '../../config';
import Cards from '../Card.vue';
const store = useStore();

const courseStat:any = computed(() => {
    return store.getters.getStats.value.courseApplicantCount
})

const talentStat:any = computed(() => {
    return store.getters.getStats.value.talentPoolCount
})

const outsourcingStat:any = computed(() => {
    return store.getters.getStats.value.outsourcingCount
})

onMounted( async () => {
    // store.commit('setPageTitle', 'Course List');
    console.log('dashboard stats mounted');
    // const request:any = `${api_url}api/dashboard`;
    await store.dispatch(actionTypes.FetchStats)
});
</script>

<template>
     <div class="main grid lg:py-8 py-2">
        <h1 class="text-xl pt-5 font-semibold text-center lg:text-left">Dashboard</h1>
            <!-- {{ stats }} -->
        <div class="grid lg:grid-cols-3 py-7 gap-8 grid-cols-1">

            <Cards>
                <template #chart>
                    <circleprogress
                    :percent="courseStat"
                    :show-percent="true"
                    :viewport="true"
                    :size="80"
                    :border-width="5"
                    :unit="'%'"
                    :border-bg-width="2"
                    :is-gradient="true"
                    :gradient="{
                        startColor: '#0779bf',
                        stopColor: '#0779bf'
                    }"></circleprogress>
                </template>
                <template #stat>
                    {{ courseStat }}/100
                </template>
            </Cards>
            <Cards>
                <template #chart>
                    <!-- <VueApexCharts width="200" type="radialBar" :options="talentChartOptions" :series="talentSeries"></VueApexCharts> -->

                    <circleprogress
                    :percent="outsourcingStat"
                    :show-percent="true"
                    :viewport="true"
                    :size="80"
                    :border-width="5"
                    :unit="'%'"
                    :border-bg-width="2"
                    :is-gradient="true"
                    :gradient="{
                        startColor: '#91278e',
                        stopColor: '#91278e'
                    }"></circleprogress>
                </template>
                <template #title>
                    Talent Request
                </template>
                <template #stat>
                    {{ outsourcingStat }}/100
                </template>
            </Cards>
            <Cards>
                <template #chart>
                    <!-- <VueApexCharts width="200" type="radialBar" :options="talentpoolChartOptions" :series="talentpoolSeries"></VueApexCharts> -->
                    <circleprogress
                    :percent="talentStat"
                    :show-percent="true"
                    :viewport="true"
                    :size="80"
                    :border-width="5"
                    :unit="'%'"
                    :border-bg-width="2"
                    :is-gradient="true"
                    :gradient="{
                        startColor: '#ffc400',
                        stopColor: '#ffc400'
                    }"></circleprogress>
                </template>
                <template #title>
                    Talent Pool
                </template>
                <template #stat>
                    {{ talentStat }}/100
                </template>
            </Cards>
        </div>
    </div>
</template>