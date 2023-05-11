<script lang="ts">
export default {
    name: 'TalentDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import { api_url } from '../../../config'
import { ref, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import Modal from '../../Modal.vue'
import * as actionTypes from '../../../store/module/instructors/constants/action'

const store = useStore();

const showProfilePicture = ref(false);
const emits = defineEmits(['close'])

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close modal')
  emits('close')
}

let pdfSource:any = ref('');

const talent:any = computed(() => {
    // console.log('students', JSON.parse(JSON.stringify(store.getters.getEditStudent.value)))
    return JSON.parse(JSON.stringify(store.getters.getEditTalent.value))
})

</script>

<template>
    <div class="main grid px-[45px] h-[92vh]">
        <div class="grid mb-7">
            <div class="flex justify-between py-3 items-center ">
                <p class="text-2xl">Talent Details</p>
                <!-- {{ talent }} -->
                <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
            </div>
            <!-- <div class="image grid justify-items-center">
                <span class=" border p-1 rounded-full mb-9">
                    <img class="w-32 h-32 rounded-full" src="../../../assets/user_one.jpg" alt="user img">
                </span>
                <p class="text-2xl font-semibold">Marcus Smith</p>
                <p class="text-grey font-medium">Talent</p>
            </div> -->
        </div>
        <!-- {{ talent }} -->
        <div class="bottom">
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>First name</p>
                <p>{{ talent.firstName }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Last name</p>
                <p>{{ talent.lastName }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Other name(s)</p>
                <p>{{ talent.otherName }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Email</p>
                <p>{{ talent.email }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Mobile number</p>
                <p>{{ talent.phoneNumber }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Gender</p>
                <p>{{ talent.gender == '0' ? 'Male' : talent.gender == 1 ? 'Female' : null }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Role</p>
                <p>{{ talent.roleName }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Skills</p>
                <!-- <p>{{ talent.skillsName.map((e) => e).join(', ') }}</p> -->
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Proficiency</p>
                <p>{{ talent.proficiencyLevelName }}</p>
            </div>
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Status</p>
                <p>{{ talent.status == 0 ? 'Inactive' : 'Active' }}</p>
            </div>
            <!-- {{ talent.resumeUrl }} -->
            <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                <p>Resume</p>
                <div v-if="talent.resumeUrl" class="bg-primary-accent p-4 gap-4 justify-between items-center rounded flex">
                    <div class="text">
                        <p class="font-semibold">
                            {{ talent.firstName }}'s Resume
                        </p>
                        <p class="text-grey text-xs">
                            <!-- {{ talent.resumeUrl }} -->
                        </p>
                    </div>
                    <div class="view">
                        <a :href="talent.resumeUrl" target="_blank">
                            <SvgIcons name="eye" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
