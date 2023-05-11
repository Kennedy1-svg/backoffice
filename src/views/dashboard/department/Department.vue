<script lang="ts">
export default {
    name: 'Department'
}
</script>

<script setup lang="ts">
import DepartmentHeader from '../../../components/dashboard/department/DepartmentHeader.vue'
import DepartmentList from '../../../components/dashboard/department/DepartmentList.vue'


</script>

<template>
    <div>
        <DepartmentHeader />
        <DepartmentList />
    </div>
    
</template>