<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive, toRefs } from 'vue'
import { api_url } from '../../../config'
import { useStore } from 'vuex'

export default {
    name: 'EditRoleForm',
}
</script>

<script setup lang="ts">
import Switch from '../../userswitch.vue'
import Search from '../../Search.vue'
import { useRouter, useRoute } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
// import switcher from '../../switcher.vue';
import * as actionTypes from '../../../store/module/users/constants/action'
import * as mutationTypes from '../../../store/module/users/constants/mutation'

const store = useStore();

const route = useRouter();

const router = useRoute()

let isDisabled = ref(true);
let isError:any = ref(false);

let errors = reactive({
    RoleName: false,
    RoleNameText: '',
    Permission: false,
    PermissionText: '',
})

const newRole:any = computed(() => {
    return store.getters.getEditRole.value;
});

const allPermissions:any = computed(() => {
    return store.getters.getPermissions.value.payload;
});

const checkError:any = () => {
    console.log(`this is permission check ${newRole.value}`)
    if (!newRole.value.role) {
        errors.RoleName = true;
        errors.RoleNameText = 'New role name is required'
    } else if (newRole.value.role.length <= 3) {
        errors.RoleName = true;
        errors.RoleNameText = 'Role name needs to be more than 3 characters'
    } else {
        errors.RoleName = false;
    }

    if (!newRole.value.permissionList) {
        errors.Permission = true;
        errors.PermissionText = 'Add a permission'
    } else {
        errors.Permission = false;
    }


    if (errors.RoleName) {
        errors.RoleName = true;
        // isError.value = true;
    } else if (errors.Permission) {
        errors.Permission = true;
        isError.value = true;
    }
}

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    let user:any = {}
    store.commit(mutationTypes.SetNewUser, user)
    emits('close')
}

const updateRole:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/role-management/edit-role`;

    let requestData:any = {
        id: newRole.value.id,
        role: newRole.value.role,
        permissions: newRole.value.permissionList
    }

    console.log(`request data is ${requestData}`)

    const newData:any = {
        url: request,
        data: requestData
    }
    const newrole:any = {
        role: '',
        permissions: []
    }
    console.log('newData', newData)
    await store.dispatch(actionTypes.EditRole, newData)
    const result:any = await store.getters.getRoles
    store.commit(mutationTypes.SetNewRole, newrole)
    closeModal()
}

let clicked:any = ref(false)

let allMarked:any = ref()

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? updateRole() : '';
    route.push({
        name: 'Roles'
    })
}

const courseMgmt:any = {
    name: 'COURSE_MANAGEMENT'
}

const courseCreateCategory:any = {
    name: 'COURSE_CREATE_CATEGORY'
}

const courseDeleteCategory:any = {
    name: 'COURSE_DELETE_CATEGORY'
}

const courseCreate:any = {
    name: 'COURSE_CREATE'
}

const courseViewDetails:any = {
    name: 'COURSE_VIEW_DETAILS'
}

const courseCategory:any = {
    name: 'COURSE_CATEGORY'
}

const courseEditCategory:any = {
    name: 'COURSE_EDIT_CATEGORY'
}

const courseAccess:any = {
    name: 'COURSE_ACCESS'
}

const courseEdit:any = {
    name: 'COURSE_EDIT'
}

const courseUpdateCurriculum:any = {
    name: 'COURSE_UPDATE_CURRICULUM'
}

const courseDelete:any = {
    name: 'COURSE_DELETE'
}

const courseReviewRate:any = {
    name: 'COURSE_REVEIW_RATE'
}

const courseApplicant:any = {
    name: 'COURSE_APPLICANT'
}

const courseAddNewApplicant:any = {
    name: 'COURSE_ADD_NEW_APPLICANT'
}

const courseUpdateApplicantStatus:any = {
    name: 'COURSE_UPDATE_APPLICANT_STATUS'
}

const courseViewApplicantDetails:any = {
    name: 'COURSE_VIEW_APPLICANT_DETAILS'
}

const courseDeleteApplicant:any = {
    name: 'COURSE_DELETE_APPLICANT'
}

const studentMgmt:any = {
    name: 'STUDENT_MANAGEMENT'
}

const studentPage:any = {
    name: 'STUDENT_PAGE'
}

const studentAddNew:any = {
    name: 'STUDENT_ADD_NEW'
}

let isSearching:any = ref(false)

let searchText:any = ref('');

const filter:any = async () => {
    isSearching.value = true
    const search:any = searchText.value.toLowerCase();
    const request:any = `${api_url}api/role/search-role/{pageIndex}/{pageSize}/${search}`;
    await store.dispatch(actionTypes.FetchRole, request)
}

const close:any = async () => {
    isSearching.value = false
    searchText.value = ''
    await store.dispatch(actionTypes.FetchRole)
}

const toggleCourseMgmt:any = async () => {
    if (!checked.courseMgmt) {
        newRole.value.permissionList.push(courseMgmt)
        checked.courseMgmt = !checked.courseMgmt
    } else {
        remove(courseMgmt)
        checked.courseMgmt = !checked.courseMgmt
    }
}

const toggleCourseUpdateCurriculum:any = async () => {
    if (!checked.courseMgmt) {
        newRole.value.permissionList.push(courseMgmt)
        checked.courseMgmt = !checked.courseMgmt
    } else {
        remove(courseMgmt)
        checked.courseMgmt = !checked.courseMgmt
    }
}

const toggleCourseCategory:any = async () => {
    if (!checked.courseCategory) {
        newRole.value.permissionList.push(courseCategory)
        checked.courseCategory = !checked.courseCategory
    } else {
        remove(courseCategory)
        checked.courseCategory = !checked.courseCategory
    }
}

const toggleCourseCreateCategory:any = async () => {
    if (!checked.courseCreateCategory) {
        newRole.value.permissionList.push(courseCreateCategory)
        checked.courseCreateCategory = !checked.courseCreateCategory
    } else {
        remove(courseCreateCategory)
        checked.courseCreateCategory = !checked.courseCreateCategory
    }
}

const toggleCourseEditCategory:any = async () => {
    if (!checked.courseEditCategory) {
        newRole.value.permissionList.push(courseEditCategory)
        checked.courseEditCategory = !checked.courseEditCategory
    } else {
        remove(courseEditCategory)
        checked.courseEditCategory = !checked.courseEditCategory
    }
}

const togglecourseDeleteCategory:any = async () => {
    if (!checked.courseDeleteCategory) {
        newRole.value.permissionList.push(courseDeleteCategory)
        checked.courseDeleteCategory = !checked.courseDeleteCategory
    } else {
        remove(courseDeleteCategory)
        checked.courseDeleteCategory = !checked.courseDeleteCategory
    }
}

const togglecourseAccess:any = async () => {
    if (!checked.courseAccess) {
        newRole.value.permissionList.push(courseAccess)
        checked.courseAccess = !checked.courseAccess
    } else {
        remove(courseAccess)
        checked.courseAccess = !checked.courseAccess
    }
}

const togglecourseEdit:any = async () => {
    if (!checked.courseEdit) {
        newRole.value.permissionList.push(courseEdit)
        checked.courseEdit = !checked.courseEdit
    } else {
        remove(courseEdit)
        checked.courseEdit = !checked.courseEdit
    }
}

const togglecourseUpdateCurriculum:any = async () => {
    if (!checked.courseUpdateCurriculum) {
        newRole.value.permissionList.push(courseUpdateCurriculum)
        checked.courseUpdateCurriculum = !checked.courseUpdateCurriculum
    } else {
        remove(courseUpdateCurriculum)
        checked.courseUpdateCurriculum = !checked.courseUpdateCurriculum
    }
}

const togglecourseDelete:any = async () => {
    if (!checked.courseDelete) {
        newRole.value.permissionList.push(courseDelete)
        checked.courseDelete = !checked.courseDelete
    } else {
        remove(courseDelete)
        checked.courseDelete = !checked.courseDelete
    }
}

const togglecourseReviewRate:any = async () => {
    if (!checked.courseReviewRate) {
        newRole.value.permissionList.push(courseReviewRate)
        checked.courseReviewRate = !checked.courseReviewRate
    } else {
        remove(courseReviewRate)
        checked.courseReviewRate = !checked.courseReviewRate
    }
}

const togglecourseApplicant:any = async () => {
    if (!checked.courseApplicant) {
        newRole.value.permissionList.push(courseApplicant)
        checked.courseApplicant = !checked.courseApplicant
    } else {
        remove(courseApplicant)
        checked.courseApplicant = !checked.courseApplicant
    }
}

const togglecourseAddNewApplicant:any = async () => {
    if (!checked.courseAddNewApplicant) {
        newRole.value.permissionList.push(courseAddNewApplicant)
        checked.courseAddNewApplicant = !checked.courseAddNewApplicant
    } else {
        remove(courseAddNewApplicant)
        checked.courseAddNewApplicant = !checked.courseAddNewApplicant
    }
}

const toggleCourseCreate:any = async () => {
    if (!checked.courseCreate) {
        newRole.value.permissionList.push(courseCreate)
        checked.courseCreate = !checked.courseCreate
    } else {
        remove(courseCreate)
        checked.courseCreate = !checked.courseCreate
    }
}

const toggleCourseEdit:any = async () => {
    if (!checked.courseEdit) {
        newRole.value.permissionList.push(courseEdit)
        checked.courseEdit = !checked.courseEdit
    } else {
        remove(courseEdit)
        checked.courseEdit = !checked.courseEdit
    }
}

const togglecourseViewDetails:any = async () => {
    if (!checked.courseViewDetails) {
        newRole.value.permissionList.push(courseViewDetails)
        checked.courseViewDetails = !checked.courseViewDetails
    } else {
        remove(courseViewDetails)
        checked.courseViewDetails = !checked.courseViewDetails
    }
}

const togglecourseUpdateApplicantStatus:any = async () => {
    if (!checked.courseUpdateApplicantStatus) {
        newRole.value.permissionList.push(courseUpdateApplicantStatus)
        checked.courseUpdateApplicantStatus = !checked.courseUpdateApplicantStatus
    } else {
        remove(courseUpdateApplicantStatus)
        checked.courseUpdateApplicantStatus = !checked.courseUpdateApplicantStatus
    }
}

const togglecourseViewApplicantDetails:any = async () => {
    if (!checked.courseViewApplicantDetails) {
        newRole.value.permissionList.push(courseViewApplicantDetails)
        checked.courseViewApplicantDetails = !checked.courseViewApplicantDetails
    } else {
        remove(courseViewApplicantDetails)
        checked.courseViewApplicantDetails = !checked.courseViewApplicantDetails
    }
}

const togglecourseDeleteApplicant:any = async () => {
    if (!checked.courseDeleteApplicant) {
        newRole.value.permissionList.push(courseDeleteApplicant)
        checked.courseDeleteApplicant = !checked.courseDeleteApplicant
    } else {
        remove(courseDeleteApplicant)
        checked.courseDeleteApplicant = !checked.courseDeleteApplicant
    }
}

const togglestudentMgmt:any = async () => {
    if (!checked.studentMgmt) {
        newRole.value.permissionList.push(studentMgmt)
        checked.studentMgmt = !checked.studentMgmt
    } else {
        remove(studentMgmt)
        checked.studentMgmt = !checked.studentMgmt
    }
}

const toggle:any = (permission:any) => {}

let checked:any = reactive({
    courseMgmt: false,
    courseCategory: false,
    courseCreateCategory: false,
    courseEditCategory: false,
    courseDeleteCategory: false,
    courseAccess: false,
    courseCreate: false,
    courseEdit: false,
    courseViewDetails: false,
    courseUpdateCurriculum: false,
    courseDelete: false,
    courseReviewRate: false,
    courseApplicant: false,
    courseAddNewApplicant: false,
    courseUpdateApplicantStatus: false,
    courseViewApplicantDetails: false,
    courseDeleteApplicant: false,
    studentMgmt: false,
    studentPage: false,
    studentAddNew: false,
})

const selectAll = () => {
    checked.courseMgmt = true
    checked.courseCategory = true
    checked.courseCreateCategory = true
    checked.courseEditCategory = true
    checked.courseDeleteCategory = true
    checked.courseAccess = true
    checked.courseCreate = true
    checked.courseEdit = true
    checked.courseViewDetails = true
    checked.courseUpdateCurriculum = true
    checked.courseDelete = true
    checked.courseReviewRate = true
    checked.courseApplicant = true
    checked.courseAddNewApplicant = true
    checked.courseUpdateApplicantStatus = true
    checked.courseViewApplicantDetails = true
    checked.courseDeleteApplicant = true
    checked.studentMgmt = true
    checked.studentPage = true
    checked.studentAddNew = true
}

const unselectAll = () => {
    clicked.value = false
    newRole.value.permissionList = []
    checked.courseMgmt = false
    checked.courseCategory = false
    checked.courseCreateCategory = false
    checked.courseEditCategory = false
    checked.courseDeleteCategory = false
    checked.courseAccess = false
    checked.courseCreate = false
    checked.courseEdit = false
    checked.courseViewDetails = false
    checked.courseUpdateCurriculum = false
    checked.courseDelete = false
    checked.courseReviewRate = false
    checked.courseApplicant = false
    checked.courseAddNewApplicant = false
    checked.courseUpdateApplicantStatus = false
    checked.courseViewApplicantDetails = false
    checked.courseDeleteApplicant = false
    checked.studentMgmt = false
    checked.studentPage = false
    checked.studentAddNew = false
}

const remove:any = (permission:any) => {
    newRole.value.permissionList = newRole.value.permissionList.filter((result:any) => {
        console.log(`result is ${result.name}`)
        return result.name !== permission.name
    })
}

const markAll:any = () => {
    if (clicked.value) {
        clicked.value = false
        unselectAll()
    } else {
        newRole.value.permissionList = [courseMgmt, courseCreateCategory, courseDeleteCategory, courseCreate, courseViewDetails, courseCategory, courseEditCategory, courseAccess, courseEdit, courseUpdateCurriculum]
        clicked.value=true
        selectAll()
    }
}

onMounted(async () => {
    await store.dispatch(actionTypes.FetchPermissions)
	const id:any = router.params.id;
	const request:any = `${api_url}api/role-management/get-role-details/${id}`
	await store.dispatch(actionTypes.FetchEditRole, request)
})
</script>

<template>
    <div class="main grid pt-[50px] h-full bg-white px-10 pb-[10px] gap-5">
        <!-- {{ newRole }} -->
        <div class="flex justify-between items-center">
            <div class="grid gap-3">
                <label for="rolename" class="font-semibold">
                    Role name
                </label>
                <input type="text" placeholder="Role name" @focus="checkError" @keyup="checkError" v-model="newRole.role" name="rolename" id="rolename" class="px-4 py-[10px] w-[400px] border rounded-md text-xs focus:outline-none">

                <p class="text-[10px] text-red">
                    {{ errors.RoleName ? errors.RoleNameText : '' }}
                </p>
            </div>
            <div class="grid gap-3 pt-4">
                <Search>
                    <template #input>
                        <input class="rounded text-sm w-[250px] p-1 focus:outline-none" @keyup.esc="close" v-model="searchText" type="text" placeholder="Search permission">
                        <span class="w-auto flex justify-end items-center text-grey">
                            <SvgIcons v-if="!isSearching" name="search" @click="filter"  />
                            <SvgIcons v-else name="o-cancel" @click="close" class="transform scale-75" />
                        </span>
                    </template>
                </Search>
            </div>
        </div>
        <div class="flex justify-end my-3">
            <p class="flex items-center gap-3">Mark all permission <span>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        id="checkbox"
                        :checked="clicked"
                        @click="markAll()">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </span> </p>
        </div>
        <div class="grid grid-cols-2 gap-x-44 gap-y-2">
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE MANAGEMENT</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseMgmt"
                        @click="toggleCourseMgmt()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE CATEGORY</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseCategory"
                        @click="toggleCourseCategory()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">Course Create Category</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseCreateCategory"
                        @click="toggleCourseCreateCategory()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE EDIT CATEGORY</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseEditCategory"
                        @click="toggleCourseEditCategory()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE DELETE CATEGORY</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseDeleteCategory"
                        @click="togglecourseDeleteCategory()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE ACCESS</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseAccess"
                        @click="togglecourseAccess()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">course create</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseCreate"
                        @click="toggleCourseCreate()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">course edit</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseEdit"
                        @click="toggleCourseEdit()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE VIEW DETAILS</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseViewDetails"
                        @click="togglecourseViewDetails()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE UPDATE CURRICULUM</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseUpdateCurriculum"
                        @click="toggleCourseUpdateCurriculum()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE delete</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseDelete"
                        @click="togglecourseDelete()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE review rate</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseReviewRate"                        @click="togglecourseReviewRate()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">Course applicant</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseApplicant"
                        @click="togglecourseApplicant()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE Add new applicant</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseAddNewApplicant"
                        @click="togglecourseAddNewApplicant()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE UPDATE APPLICANT STATUS</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseUpdateApplicantStatus"
                        @click="togglecourseUpdateApplicantStatus()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE VIEW APPLICANT DETAILS</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseViewApplicantDetails"
                        @click="togglecourseViewApplicantDetails()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">COURSE DELETE APPLICANT</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.courseDeleteApplicant"
                        @click="toggleCourseCreate()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="uppercase">student management</p>
                <div class="my-2 flex items-center">
                    <label class="relative inline-block h-6 w-12 border rounded-full border-gray-300">
                        <input
                        type="checkbox"
                        class="perms"
                        :checked="checked.studentMgmt"
                        @click="togglestudentMgmt()"
                        id="checkbox">
                        <span class="toggler round"></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="flex justify-between items-center py-10">
            <div class="grid gap-3">
            </div>
            <div class="grid gap-3">
                <div class="flex justify-center items-center gap-20 pr-10">
                    <button @click.prevent="unselectAll" class="py-4 px-8 bg-opacity-80 font-bold text-primary flex justify-center border border-primary hover:bg-primary hover:text-white rounded-md">
                        Remove all
                    </button>
                    <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">
                        Update role
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    input:checked {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .toggler {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgb(227, 227, 227);
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    .toggler::before {
        @apply absolute w-6 h-6 -left-[1px] -bottom-[1px] bg-green-accent;
        content: '';
    }
    input:checked + .toggler {
        @apply bg-green-accent bg-opacity-[48%];
    }
    input:checked + .toggler:before {
        -webkit-transform: translateX(22px);
        -ms-transform: translateX(22px);
        transform: translateX(22px);
    }
    .toggler.round {
        border-radius: 34px;
    }
    .toggler.round:before {
        border-radius: 50%;
    }
</style>