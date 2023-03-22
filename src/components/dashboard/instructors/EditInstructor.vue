<script lang="ts">
export default {
  name: 'AddInstructors',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
// import { startCase, toLower } from 'lodash'
import alert from '../../alerts.vue';
import SvgIcons from '../../SvgIcons.vue';
import multiselect from '@vueform/multiselect'
import Modl from '../../Modals.vue'
import Modal from '../../Modal.vue'
// import WebViewer from '../../WebViewer.vue'
import * as actionTypes from '../../../store/module/instructors/constants/action'
import * as mutationTypes from '../../../store/module/instructors/constants/mutation'
// import * as studentActionTypes from '../../../store/module/students/constants/action'
import { useStore } from 'vuex';
// import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';
// import { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'; // Prop type definitions can also be imported
// import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

// import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';
// import { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'; // Prop type definitions can also be imported
// import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
// let isResumeActive:any = ref(false);
let isImageRemoved:any = ref(false);
// let isLoading:any = ref(false);


// const pdfSrc = ref<VuePdfPropsType['src']>('https://walure.blob.core.windows.net/assets/blobs/instructor/795427139f594572a0b6201ef4de1136.pdf')

// const numOfPages = ref(0)

// const loadingTask = createLoadingTask(pdfSrc.value)
// loadingTask.promise.then((pdf: PDFDocumentProxy) => {
//     numOfPages.value = pdf.numPages
// })

// const alertState:any = computed(() => store.getters.getInstructorAlertStatus.value)
// const alertText:any = computed(() => store.getters.getInstructorAlertText.value)

let errors = reactive({
    firstName: false,
    firstNameText: '',
    lastName: false,
    lastNameText: '',
    github: false,
    githubText: '',
    linkedin: false,
    linkedinText: '',
    facebook: false,
    facebookText: '',
    twitter: false,
    twitterText: '',
    gender: false,
    genderText: '',
    email: false,
    emailText: '',
    phone: false,
    phoneText: '',
    resume: false,
    resumeText: '',
    bio: false,
    bioText: '',
    image: false,
    imageText: '',
    address: false,
    addressText: '',
    experience: false,
    experienceText: '',
})

// const status:any = computed(() => {
//     let answer:any
//     if (alertText.value.includes('successfully')) {
//         answer = true
//     } else {
//         answer = false
//     }
//     return answer
// });

const genderoptions:any = [
  {
    label: 'Male',
    value: 0
  },
  {
    label: 'Female',
    value: 1
  },
]

// let loadingTask = pdf.createLoadingTask('https://cdn.mozilla.net/pdfjs/tracemonkey.pdf');

const genderField:any = ref('')

const experience_leveloptions:any = [
  {
    label: 'Beginner',
    value: 0
  },
  {
    label: 'Intermediate',
    value: 1
  },
  {
    label: 'Experienced',
    value: 2
  },
]

const newInstructor:any = computed(() => {
    return store.getters.getEditInstructor.value;
});

let onResumeUpload = ref(false)

const cancan:any = async () => {
  console.log('i can can')
}

const deselect:any = async () => {
    console.log('on deselect')
    // filterClicked.value = false;
    // const batchrequest:any = `${api_url}api/batch/get-batches`;
    // await store.dispatch(batchActionTypes.FetchInstructor)
}

const pdfSrc = ref('https://walure.blob.core.windows.net/assets/blobs/instructor/368d52792a9f4333950569774210a25f.pdf')
const numOfPages = ref(0)

// const loadingTask = createLoadingTask(pdfSrc.value)
// loadingTask.promise.then((pdf: PDFDocumentProxy) => {
//     numOfPages.value = pdf.numPages
// })

const pdfSource:any = ref('');
// const pdfSource:any = computed(async () => {
//     const url = await fetch(newInstructor.value.resume, { mode: 'no-cors'})
//         .then(res => res.blob())
//         .then(blob => {
//             return URL.createObjectURL(blob)
//         })
//     console.log(url)
//     return url
// })


const experience_levelField:any = ref('')

const formEl:any = ref(null)

let isChecked:any = ref(false);

let formData = new FormData();

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    // let imageType:String = newInstructor.value.picture.type;
    // console.log('imageType is', imageType)
    if (!newInstructor.value.firstName) {
        errors.firstName = true;
        errors.firstNameText = 'First name is required'
    } else if (newInstructor.value.firstName.length <= 3) {
        errors.firstName = true;
        errors.firstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.firstName = false;
    }

    if (!newInstructor.value.lastName) {
        errors.lastName = true;
        errors.lastNameText = 'Last name is required'
    } else if (newInstructor.value.lastName.length <= 3) {
        errors.lastName = true;
        errors.lastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.lastName = false;
    }

    if (!newInstructor.value.githubUrl) {
        errors.github = true;
        errors.githubText = 'Github url is required'
    } else if (newInstructor.value.githubUrl.length <= 3) {
        errors.github = true;
        errors.githubText = 'Github url needs to be more than 3 characters'
    } else {
        errors.github = false;
    }

    if (!newInstructor.value.twitterUrl) {
        errors.twitter = true;
        errors.twitterText = 'Twitter url is required'
    } else if (newInstructor.value.twitterUrl.length <= 3) {
        errors.twitter = true;
        errors.twitterText = 'Twitter url needs to be more than 3 characters'
    } else {
        errors.twitter = false;
    }

    if (!newInstructor.value.linkedInUrl) {
        errors.linkedin = true;
        errors.linkedinText = 'LinkedIn url is required'
    } else if (newInstructor.value.linkedInUrl.length <= 3) {
        errors.linkedin = true;
        errors.linkedinText = 'LinkedIn url needs to be more than 3 characters'
    } else {
        errors.linkedin = false;
    }

    if (!newInstructor.value.facebookUrl) {
        errors.facebook = true;
        errors.facebookText = 'Facebook url is required'
    } else if (newInstructor.value.facebookUrl.length <= 3) {
        errors.facebook = true;
        errors.facebookText = 'Facebook url needs to be more than 3 characters'
    } else {
        errors.facebook = false;
    }

    if (!newInstructor.value.gender && newInstructor.value.gender != '0') {
        errors.gender = true;
        errors.genderText = 'Gender is required. Please select a gender'
    } else {
        errors.gender = false;
    }

    if (!newInstructor.value.experienceLevel && newInstructor.value.experienceLevel != '0') {
        errors.experience = true;
        errors.experienceText = 'Experience Level is required. Please select the best fit'
    } else {
        errors.experience = false;
    }

    if (!newInstructor.value.image) {
        errors.image = true;
        errors.imageText = 'Image is required. Please upload an image'
    } else if (newInstructor.value.image.size > 5242880) {
        errors.image = true;
        errors.imageText = 'Image size should not be more than 5MB'
    } else {
        errors.image = false;
    }

    if (!newInstructor.value.resume) {
        errors.resume = true;
        errors.resumeText = 'Resume is required. Please upload your resume'
    } else if (newInstructor.value.resume.size > 5242880) {
        errors.resume = true;
        errors.resumeText = 'Resume size should not be more than 5MB'
    } else {
        errors.resume = false;
    }

    if (!newInstructor.value.bio) {
        errors.bio = true;
        errors.bioText = 'bio is required'
    } else if (newInstructor.value.bio.length <= 3) {
        errors.bio = true;
        errors.githubText = 'biography needs to be more than 3 characters'
    } else {
        errors.bio = false;
    }

    if (!newInstructor.value.email) {
        errors.email = true;
        errors.emailText = 'email is required'
    } else if (!newInstructor.value.email.match(email)) {
        errors.email = true;
        errors.emailText = `email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
    }

    if (!newInstructor.value.phoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newInstructor.value.phoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newInstructor.value.phoneNumber.match(phone)) {
        errors.phone = true;
        errors.phoneText = 'Phone numer must start with 0'
    } else if (newInstructor.value.phoneNumber.length <= 9) {
        errors.phone = true;
        errors.phoneText = 'Phone numer cannot be less than 10 digits'
    } else {
        errors.phone = false;
    }

    if (!newInstructor.value.address) {
        errors.address = true;
        errors.addressText = 'address is required'
    } else if (newInstructor.value.address.length <= 13) {
        errors.address = true;
        errors.addressText = 'address needs to be more than 3 words'
    } else {
        errors.address = false;
    }

    if (errors.firstName) {
        errors.firstName = true;
        isError.value = true;
    } else if (errors.lastName) {
        errors.lastName = true;
        isError.value = true;
    } else if (errors.github) {
        errors.github = true;
        isError.value = true;
    } else if (errors.linkedin) {
        errors.linkedin = true;
        isError.value = true;
    } else if (errors.facebook) {
        errors.facebook = true;
        isError.value = true;
    } else if (errors.twitter) {
        errors.twitter = true;
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
    } else if (errors.experience) {
        errors.experience = true;
        isError.value = true;
    } else if (errors.resume) {
        errors.resume = true;
        isError.value = true;
    } else if (errors.phone) {
        errors.phone = true;
        isError.value = true;
    } else if (errors.gender) {
        errors.gender = true;
        isError.value = true;
    } else if (errors.bio) {
        errors.bio = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

const removeImage:any = async () => {
    isImageRemoved.value = true;
    // URL.revokeObjectURL(newInstructor.value.image);
    return newInstructor.value.image = ''
}

const removeResume:any = async () => {
    isResumeActive.value = false
    onResumeUpload.value = false
    // URL.revokeObjectURL(newInstructor.value.resume);
    return newInstructor.value.resume = ''
}

// const bios:any = computed(() => {
//     return store.getters.getCourses.value.payload;
// })

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    emits('close')
    // formEl.reset()
}

const showProfilePicture = ref(false);

const showResume = ref(false)

const testing:any = () => {
    console.log(showResume.value)
    console.log(newInstructor.value)
}

let isActive:any = computed(() => {
    if (newInstructor.value.image) {
        return true
    } else {
        return false
    }
})

let isResumeActive:any = computed(() => {
    if (newInstructor.value.resume) {
        checkError();
        return true
    } else {
        return false
    }
})

const onChange:any = (event:any):any => {
    console.log('event', event.target.files[0].name)
    newInstructor.value.image = event.target.files[0]
    // formData.append('file', event.target.files[0])
    let images: any = document.getElementById('instructoroutput')
    let image:any = document.getElementById('displayinstructoroutput')
    images.src = URL.createObjectURL(event.target.files[0])
    image.src = URL.createObjectURL(event.target.files[0])
    console.log('newInstructor image', newInstructor.value.image.type)
}

const onChangeResume:any = (event:any):any => {
    console.log('event', event.target.files[0].name)
    newInstructor.value.resume = event.target.files[0]
    formData.append('file', event.target.files[0])
    // isResumeActive.value = false
    onResumeUpload.value = true
    // let images: any = document.getElementById('instructoroutput')
    // let image:any = document.getElementById('displayinstructoroutput')
    pdfSource.value = URL.createObjectURL(event.target.files[0])
    // image.src = URL.createObjectURL(event.target.files[0])
    console.log('newInstructor resume', newInstructor.value.resume.type)
    // console.log('newInstructor link', pdfSource.value)
}

const editInstructor:any = async () => {
    console.log('image has been changed?', isImageRemoved.value)
    console.log('hi');
    console.log('newstudent', newInstructor.value)
    console.log('newstudent', newInstructor.value.picture)
    const request:any = `${api_url}api/instructor/edit-instructor`;

    if (!isImageRemoved.value && !onResumeUpload.value) {
        formData.append('FirstName', newInstructor.value.firstName)
        formData.append('LastName', newInstructor.value.lastName)
        formData.append('GithubUrl', newInstructor.value.githubUrl)
        formData.append('TwitterUrl', newInstructor.value.twitterUrl)
        formData.append('LinkedInUrl', newInstructor.value.linkedInUrl)
        formData.append('FacebookUrl', newInstructor.value.facebookUrl)
        formData.append('Address', newInstructor.value.address)
        formData.append('PhoneNumber', newInstructor.value.phoneNumber)
        formData.append('Gender', newInstructor.value.gender)
        formData.append('Bio', newInstructor.value.bio)
        formData.append('id', newInstructor.value.id)
        formData.append('Email', newInstructor.value.email)
        formData.append('ExperienceLevel', newInstructor.value.experienceLevel)
    } else if (!isImageRemoved.value && onResumeUpload.value) {
        formData.append('FirstName', newInstructor.value.firstName)
        formData.append('LastName', newInstructor.value.lastName)
        formData.append('GithubUrl', newInstructor.value.githubUrl)
        formData.append('twitterUrl', newInstructor.value.twitterUrl)
        formData.append('Resume', newInstructor.value.resume, newInstructor.value.resume.name)
        formData.append('LinkedInUrl', newInstructor.value.linkedInUrl)
        formData.append('FacebookUrl', newInstructor.value.facebookUrl)
        formData.append('Address', newInstructor.value.address)
        formData.append('PhoneNumber', newInstructor.value.phoneNumber)
        formData.append('Gender', newInstructor.value.gender)
        formData.append('Bio', newInstructor.value.bio)
        formData.append('id', newInstructor.value.id)
        formData.append('Email', newInstructor.value.email)
        formData.append('ExperienceLevel', newInstructor.value.experienceLevel)
    } else if (!onResumeUpload.value && isImageRemoved.value) {
        formData.append('FirstName', newInstructor.value.firstName)
        formData.append('LastName', newInstructor.value.lastName)
        formData.append('GithubUrl', newInstructor.value.githubUrl)
        formData.append('Image', newInstructor.value.image, newInstructor.value.image.name)
        formData.append('TwitterUrl', newInstructor.value.twitterUrl)
        formData.append('LinkedInUrl', newInstructor.value.linkedInUrl)
        formData.append('FacebookUrl', newInstructor.value.facebookUrl)
        formData.append('Address', newInstructor.value.address)
        formData.append('PhoneNumber', newInstructor.value.phoneNumber)
        formData.append('Gender', newInstructor.value.gender)
        formData.append('Bio', newInstructor.value.bio)
        formData.append('id', newInstructor.value.id)
        formData.append('Email', newInstructor.value.email)
        formData.append('ExperienceLevel', newInstructor.value.experienceLevel)
    } else {
        formData.append('FirstName', newInstructor.value.firstName)
        formData.append('LastName', newInstructor.value.lastName)
        formData.append('GithubUrl', newInstructor.value.githubUrl)
        formData.append('TwitterUrl', newInstructor.value.twitterUrl)
        formData.append('LinkedInUrl', newInstructor.value.linkedInUrl)
        formData.append('FacebookUrl', newInstructor.value.facebookUrl)
        formData.append('Image', newInstructor.value.image, newInstructor.value.image.name)
        formData.append('Resume', newInstructor.value.resume, newInstructor.value.resume.name)
        formData.append('Address', newInstructor.value.address)
        formData.append('PhoneNumber', newInstructor.value.phoneNumber)
        formData.append('Gender', newInstructor.value.gender)
        formData.append('Bio', newInstructor.value.bio)
        formData.append('id', newInstructor.value.id)
        formData.append('Email', newInstructor.value.email)
        formData.append('ExperienceLevel', newInstructor.value.experienceLevel)
    }

    // const formElem = document.getElementById('formElem')
    // formData.append('firstName', newInstructor.value.firstName)
    // formData.append('lastName', newInstructor.value.lastName)
    // formData.append('OtherName', newInstructor.value.OtherName)
    // formData.append('GithubUrl', newInstructor.value.GithubUrl)
    // formData.append('twitterUrl', newInstructor.value.twitterUrl)
    // formData.append('linkedInUrl', newInstructor.value.linkedInUrl)
    // formData.append('facebookUrl', newInstructor.value.facebookUrl)
    // formData.append('image', newInstructor.value.image, newInstructor.value.image.name)
    // formData.append('resume', newInstructor.value.resume, newInstructor.value.resume.name)
    // formData.append('address', newInstructor.value.address)
    // formData.append('phoneNumber', newInstructor.value.phoneNumber)
    // formData.append('gender', newInstructor.value.gender)
    // formData.append('bio', newInstructor.value.bio)
    // formData.append('id', newInstructor.value.id)
    // formData.append('email', newInstructor.value.email)
    // formData.append('experienceLevel', newInstructor.value.experienceLevel)

    // console.log('formData', JSON.parse(JSON.stringify(formData)))

    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newInstructor.value))

    // const submitdata = {
    //     ...formData,
    //     image: newInstructor.value.image
    // }
    console.log('formData', formData)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    await store.dispatch(actionTypes.EditInstructor, newData)
    const result:any = await store.dispatch(actionTypes.FetchInstructors)
    closeModal()
    store.commit(mutationTypes.SetEditInstructor, {})
    // formEl.reset()
    formData.delete('FirstName')
    formData.delete('LastName')
    formData.delete('GithubUrl')
    formData.delete('TwitterUrl')
    formData.delete('LinkedInUrl')
    formData.delete('FacebookUrl')
    formData.delete('Image')
    formData.delete('Resume')
    formData.delete('Address')
    formData.delete('PhoneNumber')
    formData.delete('Gender')
    formData.delete('Bio')
    formData.delete('id')
    formData.delete('Email')
    formData.delete('ExperienceLevel')
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editInstructor() : '';
}

onMounted(async () => {
    console.log('I am now here')
    // const request:any = `${api_url}api/bio/search-bios/{pageIndex}/{pageSize}`;
    // await store.dispatch(courseActionTypes.FetchCourses, request)
})

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';

// watch(
//   () => isResumeActive,
//   pdfSource => {
//     console.log('pdfSource', pdfSource.value)
//     // showModal.value = show;
//   },
// );
</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Edit Instructor</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>

        <div :class="[showResume ? '' : 'hidden']" class="close-resume flex items-center justify-nd mb-3">
            <p @click="showResume = !showResume" class="text-xl">Close File </p>
            <SvgIcons @click="showResume = !showResume" name="cancel" class="cursor-pointer" />
        </div>
        <!-- <WebViewer :class="[showResume ? '' : 'hidden']" class="absolute z-20 w-full" :initialDoc="newInstructor.Resume" />    -->

        <VuePdf v-for="page in numOfPages" :key="page" :src="pdfSource" :page="page" />

        <form id="formElem" ref="formEl" class="text-sm grid">
            <!-- {{ newInstructor }} -->
            <div class="grid justify-items-center gap-1 mb-[88px]">
                    <p class="text-[10px] text-red">
                        {{ errors.image ? errors.imageText : '' }}
                    </p>
                <div class="relative mb-8">
                    <div v-if="!isActive">
                        <SvgIcons v-if="!isActive" :class="[errors.image ? 'border rounded-full text-red border-red' : '']" class="text-gray-300" name="pic-avatar" />
                        <span class="absolute cursor-pointer left-3/5 bottom-0 bg-black rounded-full p-2">
                            <input type="file" name="image" @change="onChange" class="opacity-0 absolute" accept=".png, .jpg, .jpeg" />
                            <SvgIcons class="text-white" name="camera" />
                        </span>
                    </div>
                    <img class="w-20 h-20 border p-1 rounded-full" :class="[ isActive && isImageRemoved ? '' : 'hidden' ]" id="displayinstructoroutput" alt="user img">
                    <img class="w-20 h-20 border p-1 rounded-full" :class="[ isActive && !isImageRemoved ? '' : 'hidden' ]" :src="newInstructor.image" alt="user img">
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
                        <img id="instructoroutput" alt="user img">
                    </template>
                </Modal>

                <!-- <button @click="showProfilePicture = !showProfilePicture" type="button" class="py-4 px-10 text-white rounded hover:shadow" :class="[isActive ? activeView : disabledView]" :disabled = !isActive>
                    View Passport
                </button>
                <Modal :show="showProfilePicture" @close="showProfilePicture = false">
                    <img id="instructoroutput" alt="user img">
                </Modal> -->
                </div>
            </div>
            <div class="grid text-left grid-cols-3 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="firstname" class="font-semibold">
                        First name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.firstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.firstName ? errors.firstNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="lastname" class="font-semibold">
                        Last name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.lastName" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.lastName ? errors.lastNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="phone" class="font-semibold">
                        Phone number*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.phoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.phone ? errors.phoneText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-3 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="email" class="font-semibold">
                        Email*
                    </label>
                    <input type="email" @focus="checkError" @keyup="checkError" v-model="newInstructor.email" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        Gender*
                    </label>

                    <multiselect v-model="newInstructor.gender" @clear="deselect" @select="cancan" valueProp="value" :options="genderoptions" track-by="label" label="label" placeholder="Select gender" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.gender ? errors.genderText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="github" class="font-semibold">
                        Github Profile
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.githubUrl" name="github" id="github" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.github ? errors.githubText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-3 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="linkedin" class="font-semibold">
                        LinkedIn Profile
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.linkedInUrl" name="linkedin" id="linkedin" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.linkedin ? errors.linkedinText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="facebook" class="font-semibold">
                        Facebook Profile
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.facebookUrl" name="facebook" id="facebook" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.facebook ? errors.facebookText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="twitter" class="font-semibold">
                        Twitter Profile
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.twitterUrl" name="twitter" id="twitter" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.twitter ? errors.twitterText : '' }}
                    </p>
                </div>
                <!-- <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        gender*
                    </label>

                    <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newInstructor.gender" name="gender" id="gender">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.gender ? errors.genderText : '' }}
                    </p>
                </div> -->
            </div>
            <div class="grid text-left grid-cols-3 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="experience" class="font-semibold">
                        Experience Level*
                    </label>
                    <!-- <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.experience" name="experience" id="experience" placeholder="Input experience" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" /> -->
                    <multiselect v-model="newInstructor.experienceLevel" @clear="deselect" @select="cancan" valueProp="value" :options="experience_leveloptions" track-by="label" label="label" placeholder="Select experience" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.experience ? errors.experienceText : '' }}
                    </p>
                </div>
                <div class="grid col-span-2 gap-4">
                    <label for="address" class="font-semibold">
                        Address
                    </label>
                    <!-- <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.addresss" name="address" id="address" placeholder="Input address" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" /> -->
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.address" name="address" id="address" placeholder="Enter address" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.address ? errors.addressText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="resume" class="font-semibold">
                        Resume
                    </label>
                    <!-- {{ pdfSource }} -->
                    <!-- {{ newInstructor.resume }} -->
                    <div class="flex items-center gap-4 justify-between w-full">
                        <label v-if="!newInstructor.resume" :class="[errors.resume ? 'text-red border-red' : '']" class="flex bg-primary-accent rounded flex-col w-2/3 h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div class="flex flex-col items-center pt-8">
                                <SvgIcons name="upload" />
                                <p class="pt-2 text-sm tracking-wider font-semibold group-hover:text-gray-600">
                                    Upload Document</p>
                            </div>
                            <!-- {{ isResumeActive && !onResumeUpload }} -->
                            <input type="file" name="resume" @change="onChangeResume" class="opacity-0 absolute" accept=".pdf, .docx" />
                        </label>
                        <div v-if="newInstructor.resume" class="flex justify-between w-1/2 rounded items-center p-5 bg-primary-accent" :class="[isResumeActive && !onResumeUpload ? '' : 'hidden']">
                            <div class="">
                                <p class="font-semibold py-1 w-36 truncate">
                                    {{ newInstructor.firstName }}'s resume
                                </p>
                            </div>
                            <div class="flex justify-center gap-3 items-center">
                                <a :href="newInstructor.resume" target="_blank">
                                    <SvgIcons name="eye" />
                                </a>
                                <SvgIcons name="delete" @click="removeResume" />
                            </div>
                        </div>
                        <div v-if="newInstructor.resume" class="flex justify-between rounded items-center p-5 bg-primary-accent" :class="[isResumeActive && onResumeUpload ? '' : 'hidden']">
                            <div class="">
                                <p class="font-semibold py-1 w-36 truncate">
                                    {{ newInstructor.resume.name }}
                                </p>
                                <p class="text-xs pb-1 text-gray-500">
                                    {{ newInstructor.resume.size > 999999 ? (newInstructor.resume.size / 1000000).toFixed(2) + ' Mb' : newInstructor.resume.size > 999 ? (newInstructor.resume.size / 1000).toFixed(2) + ' kb' : newInstructor.resume.size + ' bytes' }}
                                </p>
                            </div>
                            <div class="flex justify-center gap-3 items-center">
                                <a :href="pdfSource" target="_blank">
                                    <SvgIcons name="eye" />
                                </a>
                                <SvgIcons name="delete" @click="removeResume" />
                            </div>
                        </div>
                    </div>
                    <p class="text-xs font-medium">
                        Allowed Formats: pdf, docx
                    </p>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.resume ? errors.resumeText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="bio" class="font-semibold">
                        Bio
                    </label>
                    <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newInstructor.bio" name="bio" id="bio" placeholder="Input bio" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />
                    <!-- <select @focus="checkError" @keyup="checkError" class="pl-5 pr-52 py-3 bg-transparent rounded border text-grey" v-model="newInstructor.bioId" name="bio" id="bio">
                        <option value="">Select option</option>
                        <option  v-for="item in bios" :key="item.id"  :value=item.id>{{ item.title }}</option>
                    </select> -->
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.bio ? errors.bioText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save changes</button>
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