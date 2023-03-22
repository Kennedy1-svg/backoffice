<script lang="ts">
export default {
  name: 'EditStudent',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUpdate, reactive, toRefs } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import alert from '../../alerts.vue';
import SvgIcons from '../../SvgIcons.vue';
import Modal from '../../Modal.vue'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import * as studentActionTypes from '../../../store/module/students/constants/action'
import * as studentMutationTypes from '../../../store/module/students/constants/mutation'
import { useStore } from 'vuex';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let isImageRemoved:any = ref(false);

// const alertState:any = computed(() => store.getters.getBatchAlertStatus.value)
// const alertText:any = computed(() => store.getters.getBatchAlertText.value)

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);

let errors = reactive({
    firstName: false,
    firstNameText: '',
    lastName: false,
    lastNameText: '',
    OtherName: false,
    OtherNameText: '',
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

// const formEl:any = ref(null)

let isChecked:any = ref(false);

let formData = new FormData()

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const newStudent:any = computed(() => {
    return store.getters.getNewStudent.value;
})

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

// const isImageRemoved:any = ref(false)

const checkEditError:any = () => {
    // let imageType:String = newStudent.imageFile.type;
    // console.log('imageType is', imageType)
    if (!newStudent.value.firstName) {
        errors.firstName = true;
        errors.firstNameText = 'First name is required'
    } else if (newStudent.value.firstName.length <= 3) {
        errors.firstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.firstName = false;
        errors.firstNameText = ''
    }

    if (!newStudent.value.lastName) {
        errors.lastName = true;
        errors.lastNameText = 'Last name is required'
    } else if (newStudent.value.lastName.length <= 3) {
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

    if (!newStudent.value.courseId) {
        errors.course = true;
        errors.courseText = 'Course is required. Please select a course'
    } else {
        errors.course = false;
        errors.courseText = '';
    }

    if (!newStudent.value.email) {
        errors.email = true;
        errors.emailText = 'email is required'
    } else if (!newStudent.value.email.match(email)) {
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
        errors.emailText = '';
    }

    if (!newStudent.value.phoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newStudent.value.phoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newStudent.value.phoneNumber.match(phone)) {
        errors.phoneText = 'Phone numer must start with 0'
    } else if (newStudent.value.phoneNumber.length <= 10) {
        errors.phoneText = 'Phone numer cannot be less than 11 digits'
    } else {
        errors.phone = false;
        errors.phoneText = '';
    }

    if (!newStudent.value.addresss) {
        errors.address = true;
        errors.addressText = 'Address is required'
    } else if (newStudent.value.addresss.length <= 13) {
        errors.addressText = 'Address needs to be more than 13 characters'
    } else {
        errors.address = false;
        errors.addressText = '';
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
    } else if (errors.image) {
        errors.image = true;
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
    // newStudent.value.image = '';
    newStudent.value.imageFile = '';
    // isActive.value = false;
    isImageRemoved.value = true;
    // console.log('image removed', newStudent.value)
    // return {
    //     newStudent,
    //     isActive,
    //     // isImageRemoved
    // }
}

const courses:any = computed(() => {
    return store.getters.getCourses.value.payload;
})


const emits = defineEmits(['close'])

const closeModal:any = () => {
    emits('close')
    store.commit(studentMutationTypes.SetNewStudent, {})
}

const showProfilePicture = ref(false);

let isActive:any = computed(() => {
    // let answer:any = ref(false);
    // if (props.name == 'Edit') {
    //     console.log('omo i go edit o')
    // }

    if (newStudent.value.imageFile) {
        return true
    } else {
        return false
    }
    // console.log('answer here is', answer)
    // return answer
})

// const newchange:any = async () => {
//     let image:any = document.getElementById('editdisplayoutput')
//     console.log('image is', newStudent.value.image)
//     console.log('image itslef is', image)
//     image.src = newStudent.value.image
//     console.log('image source is', image.src)
// }

// const imageToBlob:any = async () => {
//     console.log('e be laisay I gas convert')
//     console.log('newStudent.value.imageFile is', newStudent.value.imageFile)
//     fetch(newStudent.value.imageFile)
//     .then(res => res.blob())
//     .then(blob => {
//         console.log('blob is', blob)
//         // newStudent.value.imageFile = blob
//         // let objectURL = URL.createObjectURL(blob);
//         let myImage:any = document.getElementById('editdisplayoutput')
//         console.log('myImage is', myImage)
//         newStudent.value.imageFile = blob
//         // let myImage = new Image();
//         // myImage.src = objectURL;
//         // const editimage:any = document.getElementById('myImg')
//         // editimage.appendChild(myImage)
//     })
// }

const onChange:any = async (event:any) => {
        console.log('event', event.target.files[0].name)
        newStudent.value.imageFile = await event.target.files[0]
        formData.append('file', event.target.files[0])
        let images: any = document.getElementById('outputedit')
        let image:any = document.getElementById('editdisplayoutput')
        console.log('imageFile should be here', image)
        images.src = URL.createObjectURL(event.target.files[0])
        image.src = URL.createObjectURL(event.target.files[0])
        console.log('image src is', images.src, image.src)
        console.log('newStudent image type is ', newStudent.value.imageFile.type)
}

// const resetForm:any = Object.freeze({
//         firstName: '',
//         lastName: '',
//         OtherName: '',
//         email: '',
//         phoneNumber: '',
//         addresss: '',
//         imageFile: '',
//         gender: '',
//         courseId: ''
// })

const isEditing:any = computed(() => {
    // let answer:any = ref(false)
    // if (props.name == 'Add') {
    //     return
    // } else if (props.name == 'Edit') {
    //     answer = true
    // }
    // return answer;
});

// ;(() => {
//     console.log('I am a wizard')
//     props.name == 'Edit' ? console.log('I am editing', newStudent.value) : console.log('I am adding')
// })()

const editStudent:any = async () => {
    console.log('hi');
    // console.log('newstudent image', newStudent.value)
    console.log('newstudent image', newStudent.value.imageFile)
    const request:any = `${api_url}api/student/edit-student`;
    const token:any = localStorage.getItem('token');

    console.log

    if (!isImageRemoved.value) {
        // imageToBlob()
        // await fetch(newStudent.value.imageFile, {mode: "no-cors"})
        // .then(res => res.blob())
        // .then(blob => {
        //     console.log('blob is', blob.type)
        //     // newStudent.value.imageFile = blob
        //     // let objectURL = URL.createObjectURL(blob);
        //     // let myImage:any = document.getElementById('editdisplayoutput')
        //     // console.log('myImage is', myImage)
        //     return newStudent.value.imageFile = blob
        //     // let myImage = new Image();
        //     // myImage.src = objectURL;
        //     // const editimage:any = document.getElementById('myImg')
        //     // editimage.appendChild(myImage)
        // })

        // const formElem = document.getElementById('formElem')
        formData.append('firstName', newStudent.value.firstName)
        formData.append('lastName', newStudent.value.lastName)
        formData.append('otherName', newStudent.value.otherName)
        // formData.append('imageFile', newStudent.value.imageFile, newStudent.value.imageFile.name)
        formData.append('addresss', newStudent.value.addresss)
        formData.append('phoneNumber', newStudent.value.phoneNumber)
        formData.append('gender', newStudent.value.gender)
        formData.append('courseId', newStudent.value.courseId)
        formData.append('email', newStudent.value.email)
        formData.append('Id', newStudent.value.id)
    } else {
        // const formElem = document.getElementById('formElem')
        formData.append('firstName', newStudent.value.firstName)
        formData.append('lastName', newStudent.value.lastName)
        formData.append('otherName', newStudent.value.otherName)
        formData.append('imageFile', newStudent.value.imageFile, newStudent.value.imageFile.name)
        formData.append('addresss', newStudent.value.addresss)
        formData.append('phoneNumber', newStudent.value.phoneNumber)
        formData.append('gender', newStudent.value.gender)
        formData.append('courseId', newStudent.value.courseId)
        formData.append('email', newStudent.value.email)
        formData.append('Id', newStudent.value.id)
    }

    // console.log('formData', JSON.parse(JSON.stringify(formData)))

    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newStudent.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newStudent.value.imageFile
    // }
    console.log('formData', formData)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    await store.dispatch(studentActionTypes.EditStudent, newData)
    const result:any = await store.getters.getStudent
    closeModal()
    store.commit(studentMutationTypes.SetNewStudent, {})
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submitEdit:any = () => {
    console.log('hello editor');
    checkEditError();
    console.log('iserror value', isError.value)
    !isError.value ? editStudent() : '';
}

// onBeforeUpdate(() => {
//     console.log('onBeforeUpdate')
//     console.log('on before newStudent', newStudent.value)
//     imageToBlob()
// })
// watch(
//   () => isActive,
//   show => {
//     console.log('show isActive', show)
//   },
// );

onMounted(async () => {
    console.log('I am now here')
    // console.log('I am the image from backend', newStudent.value.image)
    const request:any = `${api_url}api/course/get-courses`;
    await store.dispatch(courseActionTypes.FetchCourses, request)
    // imageToBlob()
    // ;(() => {
    //     console.log('----')
    // })()
    // if (props.name == 'Edit') {
    //     let image:any = document.getElementById('editdisplayoutput')
    //     image.src = await newStudent.value.image
    // }
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
            <p class="text-2xl">Edit Student</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="formElem" ref="formEl" class="text-sm grid">
            <div class="grid justify-items-center gap-1 mb-[88px]">
                <p class="text-[10px] text-red">
                    {{ errors.image ? errors.imageText : '' }}
                </p>
                <div class="relative mb-8">
                    <!-- <div v-if="!isActive && props.name == 'Add'">
                        <SvgIcons v-if="!isActive" :class="[errors.image ? 'border rounded-full text-red border-red' : '']" class="text-gray-300" name="pic-avatar" />
                        <span class="absolute cursor-pointer left-3/5 bottom-0 bg-black rounded-full p-2">
                            <input type="file" name="imageFile" @change="onChange" class="opacity-0 absolute" accept=".png, .jpg, .jpeg" />
                            <SvgIcons class="text-white" name="camera" />
                        </span>
                    </div> -->
                    <!-- {{ isImageRemoved }} -->
                    <div v-if="!isActive">
                        <SvgIcons v-if="!isActive" :class="[errors.image ? 'border rounded-full text-red border-red' : '']" class="text-gray-300" name="pic-avatar" />
                        <span class="absolute cursor-pointer left-3/5 bottom-0 bg-black rounded-full p-2">
                            <input type="file" name="imageFile" @change="onChange" class="opacity-0 absolute" accept=".png, .jpg, .jpeg" />
                            <SvgIcons class="text-white" name="camera" />
                        </span>
                    </div>
                    <!-- {{ isImageRemoved }} -->
                    <img class="w-20 h-20 border p-1 rounded-full" :class="[isActive && isImageRemoved ? '' : 'hidden']" id="editdisplayoutput" alt="user image">
                    <!-- <img class="w-20 h-20 border p-1 rounded-full" :class="[ isActive && props.name == 'Edit' ? '' : 'hidden' ]" id="imagechange" alt="user img"> -->
                    <img class="w-20 h-20 border p-1 rounded-full" :class="[isActive && !isImageRemoved ?  '' : 'hidden' ]" :src="newStudent.imageFile" alt="user ni">
                    <!-- <div :class="[ isActive ? '' : props.name == 'Edit' ? '' : 'hidden' ]" id="myImg"></div> -->
                </div>
                <!-- {{ newStudent }} hi -->
                <div class="buttons text-grey flex gap-[50px]">
                    <button @click.prevent="removeImage" class="py-4 px-10 hover:shadow rounded border" :class="[isActive ? activeRemove : disabledRemove]" :disabled = !isActive>
                        Remove
                    </button>

                    <Modal id="editprofile" :show="showProfilePicture" @close="showProfilePicture = false">
                        <template #button>
                        <button type="button" class="py-4 px-10 text-white rounded hover:shadow" :class="[isActive ? activeView : disabledView]" :disabled = !isActive>
                            View Passport
                        </button>
                        </template>
                        <template #modalContent>
                            <img :class="[!isImageRemoved ? '' : 'hidden']" :src="newStudent.imageFile" alt="user img">
                            <!-- {{ newStudent.image }} -->
                            <img :class="[isImageRemoved ? '' : 'hidden']" id="outputedit" alt="view dp">
                        </template>
                    </Modal>

                <!-- <button @click="showProfilePicture = !showProfilePicture" type="button" class="py-4 px-10 text-white rounded hover:shadow" :class="[isActive ? activeView : disabledView]" :disabled = !isActive>
                    View Passport
                </button>
                <Modal :show="showProfilePicture" @close="showProfilePicture = false">
                    <img id="output" alt="user img">
                </Modal> -->
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="firstname" class="font-semibold">
                        First name
                    </label>
                    <input type="text" @focus="checkEditError" @keyup="checkEditError" v-model="newStudent.firstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.firstName ? errors.firstNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="lastname" class="font-semibold">
                        Last name
                    </label>
                    <input type="text" @focus="checkEditError" @keyup="checkEditError" v-model="newStudent.lastName" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
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
                    <input type="text" @focus="checkEditError" @keyup="checkEditError" v-model="newStudent.otherName" name="othername" id="othername" placeholder="Enter other name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.OtherName ? errors.OtherNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="phone" class="font-semibold">
                        Phone number*
                    </label>
                    <input type="text" @focus="checkEditError" @keyup="checkEditError" v-model="newStudent.phoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
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
                    <input type="email" @focus="checkEditError" @keyup="checkEditError" v-model="newStudent.email" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        Gender*
                    </label>

                    <select @focus="checkEditError" @keyup="checkEditError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newStudent.gender" name="gender" id="gender">
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
                    <select @focus="checkEditError" @keyup="checkEditError" class="pl-5 pr-52 py-3 bg-transparent rounded border text-grey" v-model="newStudent.courseId" name="course" id="course">
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
                    <textarea type="text" @focus="checkEditError" @keyup="checkEditError" v-model="newStudent.addresss" name="address" id="address" placeholder="Input address" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.address ? errors.addressText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="submitEdit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>
