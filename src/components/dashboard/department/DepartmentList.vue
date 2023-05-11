<script lang="ts">
 export default {
    name:'DepartmentLIst'
 }
</script>

<script setup lang="ts">
import {ref,computed} from 'vue'

const department:any = ref('')
</script>

<template>
    <div class="main grid px-10">
        <div class="title flex justify-between pr-32 xl:pr-0 items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Department List</h1>
            <p class="text-xl font-medium text-primary">Total : 0</p>
        </div>
    </div>

    <div>

    </div>

    
</template>