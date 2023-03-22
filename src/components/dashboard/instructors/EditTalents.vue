<script lang="ts">
export default {
  name: 'EditTalents',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, onBeforeUnmount } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
import multiselect from '@vueform/multiselect'
import Modal from '../../Modal.vue'
import * as actionTypes from '../../../store/module/instructors/constants/action'
import * as studentActionTypes from '../../../store/module/students/constants/action'
import { useStore } from 'vuex';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

let pdfSource:any = ref('');

// const alertState:any = computed(() => store.getters.getBatchAlertStatus.value)
// const alertText:any = computed(() => store.getters.getBatchAlertText.value)

let errors = reactive({
    firstName: false,
    firstNameText: '',
    lastName: false,
    lastNameText: '',
    role: false,
    roleText: '',
    linkedin: false,
    linkedinText: '',
    github: false,
    githubText: '',
    twitter: false,
    twitterText: '',
    gender: false,
    genderText: '',
    otherName: false,
    otherNameText: '',
    phone: false,
    phoneText: '',
    resume: false,
    resumeText: '',
    bio: false,
    bioText: '',
    image: false,
    imageText: '',
    skills: false,
    skillsText: '',
    proficiency: false,
    proficiencyText: '',
    email: false,
    emailText: '',
})

const formEl:any = ref(null)

let isChecked:any = ref(false);

let formData = new FormData()

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const newTalent:any = computed(() => {
    return store.getters.getEditTalent.value;
})

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    // let imageType:String = newTalent.value.imageFile.type;
    // console.log('imageType is', imageType)
    if (!newTalent.value.firstName) {
        errors.firstName = true;
        errors.firstNameText = 'First name is required'
    } else if (newTalent.value.firstName.length <= 3) {
        errors.firstName = true;
        errors.firstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.firstName = false;
        errors.firstNameText = ''
    }

    if (!newTalent.value.lastName) {
        errors.lastName = true;
        errors.lastNameText = 'Last name is required'
    } else if (newTalent.value.lastName.length <= 3) {
        errors.lastName = true;
        errors.lastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.lastName = false;
        errors.lastNameText = ''
    }

    if (!newTalent.value.email) {
        errors.email = true;
        errors.emailText = 'Email is required'
    } else if (!newTalent.value.email.match(email)) {
        errors.email = true;
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
    }


    if (!newTalent.value.gitHubUrl) {
        errors.github = true;
        errors.githubText = 'Github url is required'
    } else if (newTalent.value.gitHubUrl.length <= 3) {
        errors.github = true;
        errors.githubText = 'Github url needs to be more than 3 characters'
    } else {
        errors.github = false;
        errors.githubText = ''
    }

    if (!newTalent.value.linkedInUrl) {
        errors.linkedin = true;
        errors.linkedinText = 'Linkedin url is required'
    } else if (newTalent.value.linkedInUrl.length <= 3) {
        errors.linkedin = true;
        errors.linkedinText = 'Linkedin url needs to be more than 3 characters'
    } else {
        errors.linkedin = false;
        errors.linkedinText = ''
    }

    if (!newTalent.value.resumeUrl) {
        errors.resume = true;
        errors.resumeText = 'Your resume is required'
    } else {
        errors.resume = false;
        errors.resumeText = ''
    }

    if (!newTalent.value.role && newTalent.value.role != '0') {
        errors.role = true;
        errors.roleText = 'Please select a role'
    } else {
        errors.role = false;
        errors.roleText = ''
    }

    if (!newTalent.value.gender && newTalent.value.gender != '0') {
        errors.gender = true;
        errors.genderText = 'Gender is required. Please select a gender'
    } else {
        errors.gender = false;
        errors.genderText = ''
    }

    if (!newTalent.value.proficiencyLevel && newTalent.value.proficiencyLevel != '0') {
        errors.proficiency = true;
        errors.proficiencyText = 'Proficiency is required. Please select a proficiency'
    } else {
        errors.proficiency = false;
        errors.proficiencyText = ''
    }

    // if (!newTalent.value.bioId) {
    //     errors.bio = true;
    //     errors.bioText = 'Course is required. Please select a bio'
    // } else {
    //     errors.bio = false;
    // }

    if (!newTalent.value.phoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newTalent.value.phoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newTalent.value.phoneNumber.match(phone)) {
        errors.phone = true;
        errors.phoneText = 'Phone numer must start with 0'
    } else if (newTalent.value.phoneNumber.length <= 9) {
        errors.phone = true;
        errors.phoneText = 'Phone numer cannot be less than 10 digits'
    } else {
        errors.phone = false;
        errors.phoneText = ''
    }

    if (!newTalent.value.skills) {
        errors.skills = true;
        errors.skillsText = 'Skill is required'
    } else {
        errors.skills = false;
        errors.skillsText = ''
    }

    if (errors.firstName) {
        errors.firstName = true;
        isError.value = true;
    } else if (errors.lastName) {
        errors.lastName = true;
        isError.value = true;
    } else if (errors.role) {
        errors.role = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else if (errors.skills) {
        errors.skills = true;
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
    } else if (errors.bio) {
        errors.bio = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

let onResumeUpload = ref(false)

let isResumeActive:any = computed(() => {
    if (newTalent.value.resumeUrl) {
        checkError();
        return true
    } else {
        return false
    }
})

// const removeImage:any = async () => {
//     return newTalent.value.imageFile = ''
// }

const removeResume:any = async () => {
    onResumeUpload.value = false
    return newTalent.value.resumeUrl = ''
}

const gender_options = [
    {
        label: "Male",
        value: 0,
    },
    {
        label: "Female",
        value: 1,
    },
]

const proficiency_options = [
    {
        label: "Beginner",
        value: 0,
    },
    {
        label: "Intermediate",
        value: 1,
    },
    {
        label: "Advanced",
        value: 2,
    },
    {
        label: "Senior",
        value: 3,
    },
]

// const role_options = [
//     {
//         label: 'DevOps',
//         value: 'DevOps',
//     },
//     {
//         label: 'Back-end Developer',
//         value: 'Back-end Developer',
//     },
//     {
//         label: 'Front-end Developer',
//         value: 'Front-end Developer',
//     },
//     {
//         label: 'UI/UX Designer',
//         value: 'UI/UX Designer',
//     },
//     {
//         label: 'Product Designer',
//         value: 'Product Designer',
//     },
//     {
//         label: 'Product Manager',
//         value: 'Product Manager',
//     },
//     {
//         label: 'Mobile Developer',
//         value: 'Mobile Developer',
//     },
//     {
//         label: 'iOS Developer',
//         value: 'iOS Developer',
//     },
//     {
//         label: 'Android Developer',
//         value: 'Android Developer',
//     },
//     {
//         label: 'Full Stack Developer',
//         value: 'Full Stack Developer',
//     },
//     {
//         label: 'Enterprise Architect',
//         value: 'Enterprise Architect',
//     },
//     {
//         label: 'Project Manager',
//         value: 'Project Manager',
//     },
//     {
//         label: 'Business Analyst',
//         value: 'Business Analyst',
//     },
//     {
//         label: 'CTO',
//         value: 'CTO',
//     },
//     {
//         label: 'Data Scientist',
//         value: 'Data Scientist',
//     },
//     {
//         label: 'Software Developer',
//         value: 'Software Developer',
//     },
//     {
//         label: 'Operations Manager',
//         value: 'Operations Manager',
//     },
//     {
//         label: 'Human Resource Manager',
//         value: 'Human Resource Manager',
//     },
//     {
//         label: 'Quality Assurance Manager',
//         value: 'Quality Assurance Manager',
//     },
// ]
const role_options = [
    {
        label: 'DevOps',
        value: 0,
    },
    {
        label: 'Back-end Developer',
        value: 1,
    },
    {
        label: 'Front-end Developer',
        value: 2,
    },
    {
        label: 'UI/UX Designer',
        value: 3,
    },
    {
        label: 'Product Designer',
        value: 4,
    },
    {
        label: 'Product Manager',
        value: 5,
    },
    {
        label: 'Mobile Developer',
        value: 6,
    },
    {
        label: 'iOS Developer',
        value: 7,
    },
    {
        label: 'Android Developer',
        value: 8,
    },
    {
        label: 'Full Stack Developer',
        value: 9,
    },
    {
        label: 'Enterprise Architect',
        value: 10,
    },
    {
        label: 'Project Manager',
        value: 11,
    },
    {
        label: 'Business Analyst',
        value: 12,
    },
    {
        label: 'CTO',
        value: 13,
    },
    {
        label: 'Data Scientist',
        value: 14,
    },
    {
        label: 'Software Developer',
        value: 15,
    },
    {
        label: 'Operations Manager',
        value: 16,
    },
    {
        label: 'Human Resource Manager',
        value: 17,
    },
    {
        label: 'Quality Assurance Manager',
        value: 18,
    },
]

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    emits('close')
    // formEl.reset()
}

const showResume = ref(false);

const showProfilePicture = ref(false);

const skills:any = computed(() => {
    return store.getters.getSkills.value.payload;
})

let isActive:any = computed(() => {
    if (newTalent.value.imageFile) {
        return true
    } else {
        return false
    }
})

const deselect:any = async () => {
    const request:any = `${api_url}api/skill/get-skills`;
    store.dispatch(actionTypes.FetchSkills, request)
    store.getters.getSkills.value
}

const onChange:any = (event:any):any => {
    console.log('event', event.target.files[0].name)
    newTalent.value.resumeUrl = event.target.files[0]
    formData.append('file', event.target.files[0])
    // let images: any = document.getElementById('output')
    pdfSource.value = URL.createObjectURL(event.target.files[0])
    onResumeUpload.value = true
    console.log('newInstructor link', pdfSource.value)
    // let image:any = document.getElementById('displayoutput')
    // images.src = URL.createObjectURL(event.target.files[0])
    // image.src = URL.createObjectURL(event.target.files[0])
    console.log('newTalent image', newTalent.value.resumeUrl.type)
}

const editTalent:any = async () => {
    console.log('hi');
    // console.log('newstudent', newTalent.value)
    // console.log('newstudent', newTalent.value.imageFile)
    const request:any = `${api_url}api/talentpool/edit-talentPool`;

    console.log('on resume upload', onResumeUpload)
    if (onResumeUpload.value) {
        formData.append('FirstName', newTalent.value.firstName)
        formData.append('LastName', newTalent.value.lastName)
        formData.append('id', newTalent.value.id)
        formData.append('Role', newTalent.value.role)
        // formData.append('imageFile', newTalent.value.imageFile, newTalent.value.imageFile.name)
        formData.append('Email', newTalent.value.email)
        formData.append('Gender', newTalent.value.gender)
        formData.append('Skills', newTalent.value.skills)
        formData.append('PhoneNumber', newTalent.value.phoneNumber)
        formData.append('ResumeUrl', newTalent.value.resumeUrl, newTalent.value.resumeUrl.name)
        formData.append('ProficiencyLevel', newTalent.value.proficiencyLevel)
        formData.append('GitHubUrl', newTalent.value.gitHubUrl)
        formData.append('LinkedInUrl', newTalent.value.linkedInUrl)
    } else {
        formData.append('FirstName', newTalent.value.firstName)
        formData.append('LastName', newTalent.value.lastName)
        formData.append('id', newTalent.value.id)
        formData.append('Role', newTalent.value.role)
        // formData.append('imageFile', newTalent.value.imageFile, newTalent.value.imageFile.name)
        formData.append('Email', newTalent.value.email)
        formData.append('Gender', newTalent.value.gender)
        formData.append('Skills', newTalent.value.skills)
        formData.append('PhoneNumber', newTalent.value.phoneNumber)
        // formData.append('ResumeUrl', newTalent.value.resumeUrl, newTalent.value.resumeUrl.name)
        formData.append('ProficiencyLevel', newTalent.value.proficiencyLevel)
        formData.append('GitHubUrl', newTalent.value.gitHubUrl)
        formData.append('LinkedInUrl', newTalent.value.linkedInUrl)
    }

    // console.log('formData', JSON.parse(JSON.stringify(formData)))

    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newTalent.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newTalent.value.imageFile
    // }
    console.log('formData', formData)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    await store.dispatch(actionTypes.EditTalent, newData)
    const result:any = await store.getters.getTalents
    closeModal()
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editTalent() : '';
}

onMounted(async () => {
    console.log('I am now here')
    const request:any = `${api_url}api/skill/get-skills`;
    await store.dispatch(actionTypes.FetchSkills, request)
})

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';
</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">Edit Talent</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="formElem" ref="formEl" class="text-sm grid">
            <!-- {{ newTalent }} -->
            <div class="grid text-left grid-cols-2 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="firstname" class="font-semibold">
                        First name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.firstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.firstName ? errors.firstNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="lastname" class="font-semibold">
                        Last name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.lastName" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.lastName ? errors.lastNameText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="email" class="font-semibold">
                        Email
                    </label>
                    <input type="email" @focus="checkError" @keyup="checkError" v-model="newTalent.email" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="phone" class="font-semibold">
                        Phone number*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.phoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.phone ? errors.phoneText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        Gender*
                    </label>

                    <!-- <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newTalent.gender" name="gender" id="gender">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select> -->
                    <multiselect v-model="newTalent.gender" valueProp="value" :options="gender_options" track-by="label" label="label" placeholder="Select gender" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.gender ? errors.genderText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="role" class="font-semibold">
                        Role*
                    </label>

                    <!-- <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newTalent.Role" name="role" id="role">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select> -->
                    <multiselect v-model="newTalent.role" valueProp="value" :options="role_options" track-by="label" label="label" placeholder="Select role" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.role ? errors.roleText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="github" class="font-semibold">
                        Github Profile
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.gitHubUrl" name="github" id="github" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.github ? errors.githubText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="linkedin" class="font-semibold">
                        LinkedIn Profile
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.linkedInUrl" name="linkedin" id="linkedin" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.linkedin ? errors.linkedinText : '' }}
                    </p>
                </div>
                <!-- <div class="grid gap-4">
                    <label for="gender" class="font-semibold">
                        gender*
                    </label>

                    <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newTalent.gender" name="gender" id="gender">
                        <option value="">Select option</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.gender ? errors.genderText : '' }}
                    </p>
                </div> -->
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="proficiency" class="font-semibold">
                        Proficiency Level*
                    </label>
                    <!-- <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.proficiency" name="proficiency" id="proficiency" placeholder="Input proficiency" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" /> -->
                    <!-- <select @focus="checkError" @keyup="checkError" class="pl-5 pr-52 py-3 bg-transparent rounded border text-grey" v-model="newTalent.proficiencyId" name="proficiency" id="proficiency">
                        <option value="">Select option</option> -->
                        <!-- <option  v-for="item in proficiencys" :key="item.id"  :value=item.id>{{ item.title }}</option> -->
                    <!-- </select> -->
                    <multiselect v-model="newTalent.proficiencyLevel" valueProp="value" :options="proficiency_options" track-by="label" label="label" placeholder="Select proficiency level" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.proficiency ? errors.proficiencyText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="skills" class="font-semibold">
                        Skills
                    </label>
                    <!-- <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.skillss" name="skills" id="skills" placeholder="Input skills" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" /> -->
                    <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newTalent.skills" name="skills" id="skills" placeholder="Enter skills" class="p-4 border rounded-md text-xs focus:outline-none"> -->
                    <!-- <select @focus="checkError" @keyup="checkError" class="pl-5 pr-52 py-3 bg-transparent rounded border text-grey" v-model="newTalent.skills" name="skills" id="skills">
                        <option value="">Select option</option> -->
                        <!-- <option  v-for="item in proficiencys" :key="item.id"  :value=item.id>{{ item.title }}</option> -->
                    <!-- </select> -->
                    <multiselect @clear="deselect" v-model="newTalent.skills" valueProp="id" :options="skills" mode="tags" :close-on-select="false" track-by="name" label="name" placeholder="Select skills" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.skills ? errors.skillsText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="resume" class="font-semibold">
                        Resume
                    </label>
                    <div class="flex items-center justify-start w-full">
                        <label v-if="!newTalent.resumeUrl" :class="[errors.resume ? 'rounded-full text-red border-red' : '']" class="flex bg-primary-accent rounded flex-col w-full h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div class="flex flex-col items-center pt-8">
                                <SvgIcons name="upload" />
                                <p class="pt-2 text-sm tracking-wider font-semibold group-hover:text-gray-600">
                                    Upload Document</p>
                            </div>
                            <input type="file" name="imageFile" @change="onChange" class="opacity-0 absolute" accept=".pdf, .docx" />
                        </label>
                        <div v-if="newTalent.resumeUrl" class="flex justify-between w-2/5 rounded items-center p-5 bg-primary-accent" :class="[isResumeActive && !onResumeUpload ? '' : 'hidden']">
                            <div class="">
                                <p class="font-semibold py-1 w-36 truncate">
                                    {{ newTalent.firstName }}'s resume
                                </p>
                            </div>
                            <div class="flex justify-around gap-3 items-center">
                                <a :href="newTalent.resumeUrl" target="_blank">
                                <SvgIcons name="eye" /></a>
                                <SvgIcons name="delete" @click="removeResume" />
                            </div>
                        </div>
                        <div v-if="newTalent.resumeUrl" class="flex justify-between rounded items-center p-5 bg-primary-accent" :class="[isResumeActive && onResumeUpload ? '' : 'hidden']">
                            <div class="">
                                <p class="font-semibold py-1 w-36 truncate">
                                    {{ newTalent.resumeUrl.name }}
                                </p>
                                <p class="text-xs pb-1 text-gray-500">
                                    {{ newTalent.resumeUrl.size > 999999 ? (newTalent.resumeUrl.size / 1000000).toFixed(2) + ' Mb' : newTalent.resumeUrl.size > 999 ? (newTalent.resumeUrl.size / 1000).toFixed(2) + ' kb' : newTalent.resumeUrl.size + ' bytes' }}
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
                        Allowed Formats: jpg, png, mp4
                    </p>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.resume ? errors.resumeText : '' }}
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