<script lang="ts">
export default {
  name: 'AddCourseApplicant',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import alert from '../../alerts.vue';
import multiselect from '@vueform/multiselect'
import SvgIcons from '../../SvgIcons.vue';
import Switch from '../../switch.vue'
import Modal from '../../Modal.vue'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import * as studentActionTypes from '../../../store/module/students/constants/action'
import * as courseMutationTypes from '../../../store/module/courses/constants/mutation'
import { useStore } from 'vuex';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

// const alertState:any = computed(() => store.getters.getCourseAlertStatus.value)
// const alertText:any = computed(() => store.getters.getCourseAlertText.value)

const alertState:any = ref(false)
const alertText:any = ref(false)

let errors = reactive({
    FirstName: false,
    FirstNameText: '',
    LastName: false,
    LastNameText: '',
    OtherNames: false,
    OtherNamesText: '',
    Email: false,
    EmailText: '',
    course: false,
    courseText: '',
    PhoneNumber: false,
    PhoneNumberText: '',
    sex: false,
    sexText: '',
    address: false,
    addressText: '',
})

const sexOptions:any = ref([
    {
        label: 'Male',
        value: 0,
    },
    {
        label: 'Female',
        value: 1
    }
])

const status:any = computed(() => {
    let answer:any
    // if (alertText.value.includes('successfully')) {
    //     answer = true
    // } else {
    //     answer = false
    // }
    return answer
})

const formEl:any = ref(null)

let isChecked:any = ref(false);

let formData = new FormData()

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const newApplicant:any = computed(() => {
    return store.getters.getNewCourseApplicant.value;
})

// const newApplicant:any = {}

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    // let imageType:String = newApplicant.value.imageFile.type;
    console.log('imageType is', newApplicant.value)

    if (!newApplicant.value.FirstName) {
        errors.FirstName = true;
        errors.FirstNameText = 'First name is required'
    } else if (newApplicant.value.FirstName.length <= 3) {
        errors.FirstName = true;
        errors.FirstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.FirstName = false;
        errors.FirstNameText = ''
    }

    if (!newApplicant.value.LastName) {
        errors.LastName = true;
        errors.LastNameText = 'Last name is required'
    } else if (newApplicant.value.LastName.length <= 3) {
        errors.LastName = true;
        errors.LastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.LastName = false;
        errors.LastNameText = ''
    }

    // if (!newApplicant.value.OtherNames) {
    //     errors.OtherNames = true;
    //     errors.OtherNamesText = 'Other name is required'
    // } else if (newApplicant.value.OtherNames.length <= 3) {
    //     errors.OtherNamesText = 'Other name needs to be more than 3 characters'
    // } else {
    //     errors.OtherNames = false;
    //     errors.OtherNamesText = ''
    // }

    if (!newApplicant.value.Sex && newApplicant.value.Sex != '0') {
        errors.sex = true;
        errors.sexText = 'Gender is required'
    } else {
        errors.sex = false;
        errors.sexText = ''
    }

    if (!newApplicant.value.CourseId) {
        errors.course = true;
        errors.courseText = 'Please select a course'
    } else {
        errors.course = false;
        errors.courseText = ''
    }


    if (!newApplicant.value.Email) {
        errors.Email = true;
        errors.EmailText = 'Email is required. Please select a Email'
    } else if (!newApplicant.value.Email.match(email)) {
        errors.Email = true;
        errors.EmailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.Email = false;
        errors.EmailText = ''
    }

    if (!newApplicant.value.PhoneNumber) {
        errors.PhoneNumber = true;
        errors.PhoneNumberText = 'Phone number is required'
    } else if (isNaN(newApplicant.value.PhoneNumber)) {
        errors.PhoneNumber = true;
        errors.PhoneNumberText = 'Phone number cannot contain letters'
    } else if (!newApplicant.value.PhoneNumber.match(phone)) {
        errors.PhoneNumber = true;
        errors.PhoneNumberText = 'Phone numer must start with 0'
    } else if (newApplicant.value.PhoneNumber.length <= 10) {
        errors.PhoneNumber = true;
        errors.PhoneNumberText = 'Phone numer cannot be less than 11 digits'
    } else {
        errors.PhoneNumber = false;
        errors.PhoneNumberText = ''
    }

    if (!newApplicant.value.Addresss) {
        errors.address = true;
        errors.addressText = 'Address is required'
    } else if (newApplicant.value.Addresss.length <= 13) {
        errors.address = true;
        errors.addressText = 'Address needs to be more than 13 characters'
    } else {
        errors.address = false;
        errors.addressText = ''
    }

    if (errors.FirstName) {
        errors.FirstName = true;
        isError.value = true;
    } else if (errors.LastName) {
        errors.LastName = true;
        isError.value = true;
    } else if (errors.sex) {
        errors.sex = true;
        isError.value = true;
    } else if (errors.course) {
        errors.course = true;
        isError.value = true;
    } else if (errors.PhoneNumber) {
        errors.PhoneNumber = true;
        isError.value = true;
    } else if (errors.Email) {
        errors.Email = true;
        isError.value = true;
    } else if (errors.address) {
        errors.address = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

const courses:any = computed(() => {
    return store.getters.getCourses.value.payload;
})

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    store.commit(courseMutationTypes.SetNewCourseApplicant, {})
    emits('close')
}

const addCourseApplicant:any = async () => {
    console.log('hi');
    console.log('newstudent', newApplicant.value)
    // console.log('newstudent', newApplicant.value.imageFile)
    const request:any = `${api_url}api/courseapplicant/create-courseapplicant`;

    // const formElem = document.getElementById('formElem')
    formData.append('FirstName', newApplicant.value.FirstName)
    formData.append('LastName', newApplicant.value.LastName)
    formData.append('OtherNames', newApplicant.value.OtherNames)
    formData.append('Sex', newApplicant.value.Sex)
    formData.append('Addresss', newApplicant.value.Addresss)
    formData.append('PhoneNumber', newApplicant.value.PhoneNumber)
    formData.append('Email', newApplicant.value.Email)
    formData.append('CourseId', newApplicant.value.CourseId)
    // formData.append('course', newApplicant.value.course)

    // console.log('formData', JSON.parse(JSON.stringify(formData)))

    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newApplicant.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newApplicant.value.imageFile
    // }
    console.log('formData', formData)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    await store.dispatch(courseActionTypes.AddNewCourseApplicant, newData)
    const result:any = await store.getters.getCourseApplicants
    closeModal()
    store.commit(courseMutationTypes.SetNewCourseApplicant, {})
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addCourseApplicant() : '';
}

onMounted(async () => {
    console.log('I am now here')
    const request:any = `${api_url}api/course/get-courses`;
    await store.dispatch(courseActionTypes.FetchCourses, request)
})

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';
</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl"><slot name="title">Add New</slot> Applicant</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="forrmElem" ref="forrmEl" class="text-sm grid">
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="FirstName" class="font-semibold">
                        First name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.FirstName" name="FirstName" id="FirstName" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.FirstName ? errors.FirstNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="LastName" class="font-semibold">
                        Last name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.LastName" name="LastName" id="LastName" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.LastName ? errors.LastNameText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="OtherNames" class="font-semibold">
                        Other name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.OtherNames" name="OtherNames" id="OtherNames" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.OtherNames ? errors.OtherNamesText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="PhoneNumber" class="font-semibold">
                        Phone number*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.PhoneNumber" name="PhoneNumber" id="PhoneNumber" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.PhoneNumber ? errors.PhoneNumberText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="Email" class="font-semibold">
                        Email*
                    </label>
                    <input type="email" @focus="checkError" @keyup="checkError" v-model="newApplicant.Email" name="Email" id="Email" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.Email ? errors.EmailText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="sex" class="font-semibold">
                        Gender*
                    </label>
                    <!-- {{ newApplicant.Sex }} -->
                    <!-- <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newApplicant.sex" name="sex" id="sex">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select> -->

                    <multiselect @select="checkError" @clear="checkError"  v-model="newApplicant.Sex" valueProp="value" :options="sexOptions" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.sex ? errors.sexText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Course*
                    </label>

                    <!-- <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newApplicant.course" name="course" id="course">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select> -->

                    <multiselect @select="checkError" @clear="checkError"  v-model="newApplicant.CourseId" valueProp="id" :options="courses" track-by="title" label="title" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.course ? errors.courseText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="address" class="font-semibold">
                        Address*
                    </label>
                    <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newApplicant.Addresss" name="address" id="address" placeholder="Write something" rows="5" class="p-4 border rounded-md text-xs focus:outline-none" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.address ? errors.addressText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>
