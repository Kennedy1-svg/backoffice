<script lang="ts">
export default {
  name: 'AddStudents',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive, toRefs } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import alert from '../../alerts.vue';
import multiselect from '@vueform/multiselect'
import SvgIcons from '../../SvgIcons.vue';
import Modal from '../../Modal.vue'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import * as studentActionTypes from '../../../store/module/students/constants/action'
import * as studentMutationTypes from '../../../store/module/students/constants/mutation'
import { useStore } from 'vuex';
import { SetStudent } from '../../../store/module/students/constants/mutation'

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);

let errors = reactive({
    firstName: false,
    firstNameText: '',
    lastName: false,
    lastNameText: '',
    gender: false,
    genderText: '',
    email: false,
    emailText: '',
    phone: false,
    phoneText: '',
    course: false,
    courseText: '',
    image: false,
    imageText: '',
    address: false,
    addressText: '',
})

let isChecked:any = ref(false);

let formData = new FormData()

const newStudent:any = computed(() => {
    return store.getters.getNewStudent.value;
})

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    let imageType:String = newStudent.value.imageFile.type;
    console.log('imageType is', imageType)
    if (!newStudent.value.firstName) {
        errors.firstName = true;
        errors.firstNameText = 'First name is required'
    } else if (newStudent.value.firstName.length <= 3) {
        errors.firstName = true;
        errors.firstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.firstName = false;
        errors.firstNameText = ''
    }

    if (!newStudent.value.lastName) {
        errors.lastName = true;
        errors.lastNameText = 'Last name is required'
    } else if (newStudent.value.lastName.length <= 3) {
        errors.lastName = true;
        errors.lastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.lastName = false;
        errors.lastNameText = ''
    }

    if (!newStudent.value.gender) {
        errors.gender = true;
        errors.genderText = 'Gender is required. Please select a gender'
    } else {
        errors.gender = false;
        errors.genderText = '';
    }

    if (!newStudent.value.imageFile) {
        errors.image = true;
        errors.imageText = 'Image is required. Please upload an image'
    } else if (newStudent.value.imageFile.size > 5242880) {
        errors.image = true;
        errors.imageText = 'Image size should not be more than 5MB'
    } else {
        errors.image = false;
        errors.imageText = ''
    }

    if (!newStudent.value.courseId) {
        errors.course = true;
        errors.courseText = 'Course is required. Please select a course'
    } else {
        errors.course = false;
        errors.courseText = ''
    }

    if (!newStudent.value.email) {
        errors.email = true;
        errors.emailText = 'Email is required'
    } else if (!newStudent.value.email.match(email)) {
        errors.email = true;
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
        errors.emailText = ''
    }

    if (!newStudent.value.phoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newStudent.value.phoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newStudent.value.phoneNumber.match(phone)) {
        errors.phone = true;
        errors.phoneText = 'Phone numer must start with 0'
    } else if (newStudent.value.phoneNumber.length <= 10) {
        errors.phone = true;
        errors.phoneText = 'Phone numer cannot be less than 11 digits'
    } else {
        errors.phone = false;
        errors.phoneText = ''
    }

    if (!newStudent.value.addresss) {
        errors.address = true;
        errors.addressText = 'Address is required'
    } else if (newStudent.value.addresss.length <= 13) {
        errors.address = true;
        errors.addressText = 'Address needs to be more than 3 words'
    } else {
        errors.address = false;
        errors.addressText = ''
    }

    if (errors.firstName) {
        errors.firstName = true;
        isError.value = true;
    } else if (errors.lastName) {
        errors.lastName = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else if (errors.address) {
        errors.address = true;
        isError.value = true;
    } else if (errors.image) {
        errors.image = true;
        isError.value = true;
    } else if (errors.phone) {
        errors.phone = true;
        isError.value = true;
    } else if (errors.gender) {
        errors.gender = true;
        isError.value = true;
    } else if (errors.course) {
        errors.course = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

const removeImage:any = async () => {
    newStudent.value.image = '';
    newStudent.value.imageFile = ''
}

const courses:any = computed(() => {
    return store.getters.getCourses.value.payload;
})


const emits = defineEmits(['close'])

const closeModal:any = () => {
    store.commit(studentMutationTypes.SetNewStudent, {})
    emits('close')
}

const showProfilePicture = ref(false);

let isActive:any = computed(() => {
    if (newStudent.value.imageFile) {
        return true
    } else {
        return false
    }
})

const onChange:any = async (event:any) => {
        console.log('event', event.target.files[0].name)
        newStudent.value.imageFile = await event.target.files[0]
        formData.append('file', event.target.files[0])
        let images: any = document.getElementById('studentoutput')
        let image:any = document.getElementById('displayoutput')
        images.src = URL.createObjectURL(event.target.files[0])
        image.src = URL.createObjectURL(event.target.files[0])
        console.log('image src is', images.src, image.src)
        console.log('newStudent image', newStudent.value.imageFile.type)
}

const addStudent:any = async () => {
    console.log('hi');
    console.log('newstudent', newStudent.value)
    console.log('newstudent', newStudent.value.imageFile)
    const request:any = `${api_url}api/student/create-student`;

    const formElem = document.getElementById('formElem')
    formData.append('firstName', newStudent.value.firstName)
    formData.append('lastName', newStudent.value.lastName)
    formData.append('OtherName', newStudent.value.OtherName)
    formData.append('imageFile', newStudent.value.imageFile, newStudent.value.imageFile.name)
    formData.append('addresss', newStudent.value.addresss)
    formData.append('phoneNumber', newStudent.value.phoneNumber)
    formData.append('gender', newStudent.value.gender)
    formData.append('courseId', newStudent.value.courseId)
    formData.append('email', newStudent.value.email)

    console.log('formData', formData)

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    await store.dispatch(studentActionTypes.AddNewStudent, newData)
    const result:any = await store.getters.getStudent
    closeModal()
    store.commit(studentMutationTypes.SetNewStudent, {})
}

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addStudent() : '';
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
        <!-- {{ newStudent }} -->
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Add Student</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="formElem" ref="formEl" class="text-sm grid">
            <div class="grid justify-items-center gap-1 mb-[88px]">
                <p class="text-[10px] text-red">
                    {{ errors.image ? errors.imageText : '' }}
                </p>
                <div class="relative mb-8">
                    <div v-if="!isActive">
                        <SvgIcons v-if="!isActive" :class="[errors.image ? 'border rounded-full text-red border-red' : '']" class="text-gray-300" name="pic-avatar" />
                        <span class="absolute cursor-pointer left-3/5 bottom-0 bg-black rounded-full p-2">
                            <input type="file" name="imageFile" @change="onChange" class="opacity-0 absolute" accept=".png, .jpg, .jpeg" />
                            <SvgIcons class="text-white" name="camera" />
                        </span>
                    </div>
                    <img class="w-20 h-20 border p-1 rounded-full" :class="[isActive ? '' : 'hidden']" id="displayoutput" alt="user image">
                </div>
                <div class="buttons text-grey flex gap-[50px]">
                    <button @click.prevent="removeImage" class="py-4 px-10 hover:shadow rounded border" :class="[isActive ? activeRemove : disabledRemove]" :disabled = !isActive>
                        Remove
                    </button>

                    <Modal id="profile" :show="showProfilePicture" @close="showProfilePicture = false">
                        <template #button>
                        <button type="button" class="py-4 px-10 text-white rounded hover:shadow" :class="[isActive ? activeView : disabledView]" :disabled = !isActive>
                            View Passport
                        </button>
                        </template>
                        <template #modalContent>
                            <img id="studentoutput" alt="user img">
                        </template>
                    </Modal>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="firstname" class="font-semibold">
                        First name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newStudent.firstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.firstName ? errors.firstNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="lastname" class="font-semibold">
                        Last name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newStudent.lastName" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.lastName ? errors.lastNameText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="othername" class="font-semibold">
                        Other name
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newStudent.otherName" name="othername" id="othername" placeholder="Enter other name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-white">
                        <!-- {{ errors.phone ? errors.phoneText : '' }} -->
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="phone" class="font-semibold">
                        Phone number*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newStudent.phoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.phone ? errors.phoneText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="email" class="font-semibold">
                        Email*
                    </label>
                    <input type="email" @focus="checkError" @keyup="checkError" v-model="newStudent.email" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        Gender*
                    </label>

                    <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newStudent.gender" name="gender" id="gender">
                        <option value="">Select option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.gender ? errors.genderText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Course*
                    </label>
                    <select @focus="checkError" @keyup="checkError" class="pl-5 pr-52 py-3 bg-transparent rounded border text-grey" v-model="newStudent.courseId" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="item in courses" :key="item.id"  :value=item.id>{{ item.title }}</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.course ? errors.courseText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="address" class="font-semibold">
                        Address
                    </label>
                    <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newStudent.addresss" name="address" id="address" placeholder="Input address" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />
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

<style scoped>
.multiselect-blue {
  --ms-option-bg: #DBEAFE;
  --ms-option-color: #2563EB;
  --ms-bg: #FFFFFF;
}
</style>

<style>
.dp-custom-input {
    @apply py-[8px] rounded-md;
}
.multiselect-blue {
  /* --ms-option-bg: #DBEAFE; */
  --ms-option-color: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-dropdown-bg: #FFFFFF;
  --ms-option-bg-selected: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-tag-bg: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-py: 8px;
  --ms-font-size: 12px;
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>