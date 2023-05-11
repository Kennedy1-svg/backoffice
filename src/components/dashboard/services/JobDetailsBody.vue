<script lang="ts">
export default {
  name: "JobDetailsBody",
};
</script>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { api_url } from '../../../config';
import SvgIcons from '../../SvgIcons.vue';
import * as studentActionTypes from '../../../store/module/students/constants/action'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import JobDetails from './JobDetails.vue';
import CompanyDetailCard from './CompanyDetailCard.vue';
import { useStore } from 'vuex'

const store = useStore();

</script>

<template>
  <div class="main flex pt-[5px] pb-[90px] gap-5">
      <div class="w-3/4">
        <CompanyDetailCard />
      </div>
      <div class="tabs">
        <JobDetails />
      </div>
  </div>
</template>