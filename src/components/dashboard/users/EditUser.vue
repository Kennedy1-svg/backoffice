<script lang="ts">
export default {
  name: 'AddUser',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
import multiselect from '@vueform/multiselect'
import Modl from '../../Modals.vue'
import Modal from '../../Modal.vue'
import * as actionTypes from '../../../store/module/users/constants/action'
import * as mutationTypes from '../../../store/module/users/constants/mutation'
import { useStore } from 'vuex';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let showTooltip = ref(false)

let errors = reactive({
    FirstName: false,
    FirstNameText: '',
    LastName: false,
    LastNameText: '',
    username: false,
    usernameText: '',
    department: false,
    departmentText: '',
    role: false,
    roleText: '',
    email: false,
    emailText: '',
    phone: false,
    phoneText: '',
    Password: false,
    PasswordText: '',
    ConfirmPwd: false,
    ConfirmPwdText: '',
})

const deselectCategory:any = async () => {
    console.log('on deselect')
    await store.dispatch(actionTypes.FetchRole)
}

const deselect:any = async () => {
    console.log('on deselect')
    await store.dispatch(actionTypes.FetchRole)
}

const roleoptions:any = computed(() => {
    return store.getters.getRole.value.payload;
})

const anotherrole:any = [
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

const newUser:any = computed(() => {
    return store.getters.getEditUser.value;
});

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';
const password_pattern = '^(?=.*\\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$';

const checkError:any = () => {
    // let imageType:String = newUser.value.Image.type;
    // console.log('imageType is', imageType)
    if (!newUser.value.firstName) {
        errors.FirstName = true;
        errors.FirstNameText = 'First name is required'
    } else if (newUser.value.firstName.length <= 3) {
        errors.FirstName = true;
        errors.FirstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.FirstName = false;
    }

    if (!newUser.value.lastName) {
        errors.LastName = true;
        errors.LastNameText = 'Last name is required'
    } else if (newUser.value.lastName.length <= 3) {
        errors.LastName = true;
        errors.LastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.LastName = false;
    }

    if (!newUser.value.username) {
        errors.username = true;
        errors.usernameText = 'User name is required'
    } else if (newUser.value.username.length <= 3) {
        errors.username = true;
        errors.usernameText = 'User name needs to be more than 3 characters'
    } else {
        errors.username = false;
    }

    if (!newUser.value.department) {
        errors.department = true;
        errors.departmentText = 'Department is required'
    } else if (newUser.value.department.length <= 1) {
        errors.department = true;
        errors.departmentText = 'Department needs to be more than a character'
    } else {
        errors.department = false;
    }

    if (!newUser.value.role && newUser.value.role != '0') {
        errors.role = true;
        errors.roleText = 'Role is required. Please select a role'
    } else {
        errors.role = false;
    }

    if (!newUser.value.email) {
        errors.email = true;
        errors.emailText = 'email is required'
    } else if (!newUser.value.email.match(email)) {
        errors.email = true;
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
    }

    // if (!newUser.value.Password) {
    //     errors.Password = true;
    //     errors.PasswordText = 'Password is required'
    // } else if (!newUser.value.Password.match(password_pattern)) {
    //     errors.Password = true;
    //     errors.PasswordText = `Password must have correct format.`
    // } else {
    //     errors.Password = false;
    // }

    // if (!newUser.value.ConfirmPwd) {
    //     errors.ConfirmPwd = true;
    //     errors.ConfirmPwdText = 'Confirm Password field is required'
    // } else if (!newUser.value.ConfirmPwd.match(newUser.value.Password)) {
    //     errors.ConfirmPwd = true;
    //     errors.ConfirmPwdText = `Passwords don't match.`
    // } else {
    //     errors.ConfirmPwd = false;
    // }

    if (!newUser.value.phoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newUser.value.phoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newUser.value.phoneNumber.match(phone)) {
        errors.phone = true;
        errors.phoneText = 'Phone numer must start with 0'
    } else if (newUser.value.phoneNumber.length <= 9) {
        errors.phone = true;
        errors.phoneText = 'Phone numer cannot be less than 10 digits'
    } else {
        errors.phone = false;
    }

    if (errors.FirstName) {
        errors.FirstName = true;
        isError.value = true;
    } else if (errors.LastName) {
        errors.LastName = true;
        isError.value = true;
    } else if (errors.username) {
        errors.username = true;
        isError.value = true;
    // } else if (errors.Password) {
    //     errors.Password = true;
    //     isError.value = true;
    // } else if (errors.ConfirmPwd) {
    //     errors.ConfirmPwd = true;
    //     isError.value = true;
    } else if (errors.department) {
        errors.department = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else if (errors.phone) {
        errors.phone = true;
        isError.value = true;
    } else if (errors.role) {
        errors.role = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    console.log(`But I entered here sha`)
    let user:any = {}
    store.commit(mutationTypes.SetNewUser, user)
    console.log(`Waited here small sha`)
    emits('close')
    console.log(`I now jumped here sha`)
}

const chars = ["A", "B", "C", "D", "E", "F", 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const randomChars = computed(() => {
    let quote:any;
    for (let i = 0; i < 10; i++) {
        const randomNumber = getRandomNumber();
        quote += chars[randomNumber];
    }
    return quote;
})

// const testPwd:any = '02jsdh0aw'

const getRandomNumber = () => {
    return Math.floor(Math.random() * chars.length)
}

const editUser:any = async () => {
    console.log('hi');
    // console.log('newstudent', newUser.value)
    // console.log('newstudent', newUser.value.image)
    const request:any = `${api_url}api/user-management/edit-users`;

    let requestData:any = {
        id: newUser.value.id,
        username: newUser.value.username,
        firstName: newUser.value.firstName,
        lastName: newUser.value.lastName,
        email: newUser.value.email,
        phoneNumber: newUser.value.phoneNumber,
        role: newUser.value.role,
        department: newUser.value.department,
        // password: randomChars.value,
    }

    const newData:any = {
        url: request,
        data: requestData
    }
    console.log('newData', newData)
    console.log(`I am here sha`)
    await store.dispatch(actionTypes.EditUser, newData)
    console.log(`I am now here sha`)
    const result:any = await store.getters.getUsers
    console.log(`I then came here sha`)
    store.commit(mutationTypes.SetNewUser, {})
    console.log(`So I am now here sha`)
    closeModal()
    console.log(`Till I came here sha`)
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editUser() : '';
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
</script>

<template>
    <div class="h[92vh]">
        <div class="main relative w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
            <div class="flex justify-between py-[53px] items-center ">
                <p class="text-2xl">Edit User</p>
                <SvgIcons @click.prevent="closeModal" name="cancel" class="cursor-pointer" />
                <!-- {{ newUser }} -->
            </div>
            <form id="formElem" ref="formEl" class="text-sm grid">
                <div class="grid text-left grid-cols-2 gap-12 mb-10">
                    <div class="grid gap-4">
                        <label for="username" class="font-semibold">
                            Username
                        </label>
                        <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.username" name="username" id="username" placeholder="Enter username" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.username ? errors.usernameText : '' }}
                        </p>
                    </div>
                    <!-- <div class="grid gap-4">
                        <label for="password" class="font-semibold">
                            Password
                        </label>
                        <input type="password" @focus="checkError" @keyup="checkError" v-model="newUser.Password" name="password" id="password" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.Password ? errors.PasswordText : '' }}
                        </p>
                    </div>
                    <div class="grid gap-4">
                        <label for="confirmpassword" class="font-semibold">
                            Confirm Paswword
                        </label>
                        <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.ConfirmPwd" name="confirmpassword" id="confirmpassword" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.ConfirmPwd ? errors.ConfirmPwdText : '' }}
                        </p>
                    </div> -->
                    <div class="grid gap-4">
                        <label for="firstname" class="font-semibold">
                            First name
                        </label>
                        <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.firstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.FirstName ? errors.FirstNameText : '' }}
                        </p>
                    </div>
                    <div class="grid gap-4">
                        <label for="lastname" class="font-semibold">
                            Last name
                        </label>
                        <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.lastName" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.LastName ? errors.LastNameText : '' }}
                        </p>
                    </div>
                <!-- </div>
                <div class="grid text-left grid-cols-3 gap-12 mb-10"> -->
                    <!-- <div class="grid gap-4">
                        <label for="firstname" class="font-semibold">
                            First name
                        </label>
                        <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.FirstName" name="firstname" id="firstname" placeholder="Enter first name" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.FirstName ? errors.FirstNameText : '' }}
                        </p>
                    </div>
                    <div class="grid gap-4">
                        <label for="lastname" class="font-semibold">
                            Last name
                        </label>
                        <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.LastName" name="lastname" id="lastname" placeholder="Enter last name" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.LastName ? errors.LastNameText : '' }}
                        </p>
                    </div> -->
                    <div class="grid gap-4">
                        <label for="email" class="font-semibold">
                            Email
                        </label>
                        <input type="email" @focus="checkError" @keyup="checkError" v-model="newUser.email" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.email ? errors.emailText : '' }}
                        </p>
                    </div><div class="grid gap-4">
                        <label for="phone" class="font-semibold">
                            Phone number
                        </label>
                        <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.phoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.phone ? errors.phoneText : '' }}
                        </p>
                    </div>
                    <div class="grid gap-4">
                        <label for="role" class="font-semibold">
                            Role
                        </label>

                        <multiselect v-model="newUser.role" @clear="checkError" @select="checkError" valueProp="role" :options="roleoptions" track-by="role" label="role" placeholder="Select role" :searchable="true" class="multiselect-blue" />
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.role ? errors.roleText : '' }}
                        </p>
                    </div>
                <!-- </div>
                <div class="grid text-left grid-cols-3 gap-12 mb-10"> -->
                    <!-- <div class="grid gap-4">
                        <label for="phone" class="font-semibold">
                            Phone number
                        </label>
                        <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.PhoneNumber" name="phone" id="phone" placeholder="Enter phone number" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.phone ? errors.phoneText : '' }}
                        </p>
                    </div>
                    <div class="grid gap-4">
                        <label for="role" class="font-semibold">
                            Role
                        </label>

                        <multiselect v-model="newUser.Role" @clear="checkError" @select="checkError" valueProp="role" :options="roleoptions" track-by="role" label="role" placeholder="Select role" :searchable="true" class="multiselect-blue" />
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.role ? errors.roleText : '' }}
                        </p>
                    </div> -->
                    <div class="grid gap-4">
                        <label for="username" class="font-semibold">
                            Department
                        </label>
                        <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.department" name="username" id="username" class="p-4 border rounded-md text-xs focus:outline-none">
                        <p class="text-[10px] -mt-2 text-red">
                            {{ errors.department ? errors.departmentText : '' }}
                        </p>
                    </div>
                </div>
                <div class="flex justify-end pb-10">
                    <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save</button>
                </div>
            </form>
        </div>
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