<script lang="ts">
export default {
    name: 'CreateDepartment'
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue'

const emits = defineEmits(['close'])

const closeModal:any = () => {
    emits('close')
}

</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <h1 class="text-2xl">Create Department</h1>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>

        <form class="text-sm grid">
            <label for="department" class="font-bold">
                Department Name*
            </label>
            <input type="text" class="p-4 border rounded-md text-xs focus:outline-none block my-3" placeholder="Enter Department" />

            <label for="department" class="font-bold">
                Role*
            </label>
            <input type="text" class="p-4 border rounded-md text-xs focus:outline-none block my-3" placeholder="Enter Role" />
        </form>

    </div>
    
</template>