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

const departmentoptions:any = computed(() => {
    return store.getters.getDepartment.value.payload;
})

console.log('departmentlist', departmentoptions)

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
    return store.getters.getNewUser.value;
});

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]{1}[0-9]{10}$';

const checkError:any = () => {
    // let imageType:String = newUser.value.Image.type;
    // console.log('imageType is', imageType)
    if (!newUser.value.FirstName) {
        errors.FirstName = true;
        errors.FirstNameText = 'First name is required'
    } else if (newUser.value.FirstName.length <= 3) {
        errors.FirstName = true;
        errors.FirstNameText = 'First name needs to be more than 3 characters'
    } else {
        errors.FirstName = false;
    }

    if (!newUser.value.LastName) {
        errors.LastName = true;
        errors.LastNameText = 'Last name is required'
    } else if (newUser.value.LastName.length <= 3) {
        errors.LastName = true;
        errors.LastNameText = 'Last name needs to be more than 3 characters'
    } else {
        errors.LastName = false;
    }

    if (!newUser.value.UserName) {
        errors.username = true;
        errors.usernameText = 'User name is required'
    } else if (newUser.value.UserName.length <= 3) {
        errors.username = true;
        errors.usernameText = 'User name needs to be more than 3 characters'
    } else {
        errors.username = false;
    }

    // if (!newUser.value.Department) {
    //     errors.department = true;
    //     errors.departmentText = 'Department is required'
    // } else if (newUser.value.Department.length <= 1) {
    //     errors.department = true;
    //     errors.departmentText = 'Department needs to be more than a character'
    // } else {
    //     errors.department = false;
    // }

    if (!newUser.value.Department && newUser.value.Department != '0') {
        errors.department = true;
        errors.departmentText = 'Department is required. Please select a department'
    } else {
        errors.department = false;
    }

    if (!newUser.value.Role && newUser.value.Role != '0') {
        errors.role = true;
        errors.roleText = 'Role is required. Please select a role'
    } else {
        errors.role = false;
    }

    if (!newUser.value.Email) {
        errors.email = true;
        errors.emailText = 'email is required'
    } else if (!newUser.value.Email.match(email)) {
        errors.email = true;
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
    }

    if (!newUser.value.PhoneNumber) {
        errors.phone = true;
        errors.phoneText = 'Phone number is required'
    } else if (isNaN(newUser.value.PhoneNumber)) {
        errors.phone = true;
        errors.phoneText = 'Phone number cannot contain letters'
    } else if (!newUser.value.PhoneNumber.match(phone)) {
        errors.phone = true;
        errors.phoneText = 'Invalid phone number'
    } else if (newUser.value.PhoneNumber.length <= 9) {
        errors.phone = true;
        errors.phoneText = 'Phone number should be 11 digits long'
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

const addUser:any = async () => {
    console.log('hi');
    // console.log('newstudent', newUser.value)
    // console.log('newstudent', newUser.value.image)
    const request:any = `${api_url}api/user-management/new-userapp`;

    let requestData:any = {
        username: newUser.value.UserName,
        firstName: newUser.value.FirstName,
        lastName: newUser.value.LastName,
        email: newUser.value.Email,
        phoneNumber: newUser.value.PhoneNumber,
        roleId: newUser.value.Role,
        department: newUser.value.Department,
        password: randomChars.value,
    }

    const newData:any = {
        url: request,
        data: requestData
    }
    console.log('newData', newData)
    console.log(`I am here sha`)
    await store.dispatch(actionTypes.AddNewUser, newData)
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
    !isError.value ? addUser() : '';
}

onMounted(async () => {
    console.log('I am now here')
    console.log('rolesss',roleoptions.value)
    console.log('department',departmentoptions.value)
    // const request:any = `${api_url}api/bio/search-bios/{pageIndex}/{pageSize}`;
    await store.dispatch(actionTypes.FetchDepartmentList)
})

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';
</script>

<template>
    <div class="main relative w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <form id="formElem" ref="formEl" class="text-sm grid">
            <div class="grid text-left grid-cols-3 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="username" class="font-semibold">
                        Username
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.UserName" name="username" id="username" placeholder="Enter username" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.username ? errors.usernameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
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
                </div>
            </div>
            <div class="grid text-left grid-cols-3 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="email" class="font-semibold">
                        Email
                    </label>
                    <input type="email" @focus="checkError" @keyup="checkError" v-model="newUser.Email" name="email" id="email" placeholder="Enter email" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
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

                    <multiselect v-model="newUser.Role" @clear="checkError" @select="checkError" valueProp="id" :options="roleoptions" track-by="id" label="role" placeholder="Select role" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.role ? errors.roleText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-3 gap-12 mb-10">
                <div class="grid gap-4">
                    <label for="username" class="font-semibold">
                        Department
                    </label>
                    <!-- {{ departmentoptions }} -->
                    <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newUser.Department" name="username" id="username" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.department ? errors.departmentText : '' }}
                    </p> -->
                    <multiselect v-model="newUser.Department" @clear="checkError" @select="checkError" valueProp="name"  track-by="name" label="name" :options="departmentoptions" placeholder="Select Department" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.department ? errors.departmentText : '' }}
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