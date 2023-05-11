<script lang="ts">
export default {
  name: 'UserList',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import UserDetails from './UserDetails.vue';
import Modal from '../../Modals.vue';
import EditUser from './EditUser.vue';
import DeleteModal from '../../DeleteModal.vue';
import Switch from '../../switch.vue';
import { computed, ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/users/constants/action'
import * as mutationTypes from '../../../store/module/users/constants/mutation'
import { api_url } from '../../../config'
import pagination from '../../pagination.vue'

const store = useStore();

const users:any = computed(() => {
    return store.getters.getUsers.value.payload
})

const totalCount:any = computed(() => {
    return store.getters.getUsers.value.totalCount
})

// const totalCount:any = ref(27)

const totalPages:any = computed(() => {
    // (totalCount.value % 10 != 0) ? `Math.floor(${totalCount.value} / 10) + 1` : `${totalCount.value} / 10`;
    console.log(totalCount.value)
    let total:any
    if (totalCount.value % 10 != 0) {
        total = Math.floor(totalCount.value / 10) + 1;
    } else {
        total = totalCount.value / 10;
    }
    return total
})

const useritemtodelete:any = ref('');

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
}

const sendId:any = (id:any) => {
    console.log('user', id)
    useritemtodelete.value = id
    console.log('useritemtodelete', useritemtodelete.value)
    return useritemtodelete
}

const deleteUser:any = async (id:any) => {
    console.log('batch id', id);

    const request:any = `${api_url}api/user-management/delete-user/${id}`;

    console.log('requestData', request)
    await store.dispatch(actionTypes.RemoveUser, request)
    await store.dispatch(actionTypes.FetchUsers)
    closeModal()
}

const setId:any = async (id:any) => {
    console.log('userid', id)
    const request:any = `${api_url}api/user-management/get-user-by/${id}`;
    console.log('request forid', request)
    await store.dispatch(actionTypes.FetchEditUser, request)
}

const editUser:any = async (id:any) => {
    console.log('userid', id)
    const request:any = `${api_url}api/user-management/get-user-by/${id}`;
    console.log('request for the', request)
    await store.dispatch(actionTypes.FetchEditUser, request)
    // console.log('user', user)
    // console.log('user', user.value)

}

const showAddToBatch = ref(false);

const showEdit = ref(false);

const showDelete = ref(false);

const showDetails = ref(false);

const toggle:any = (status:any) => {
    if (status == 0) {
        return status = 1
    } else {
        return status = 0
    }
}

let pageIndex: any = ref(1);

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${api_url}api/user-management/users/${pageIndex.value}/{pageSize}`;
    console.log('url', request)
    await store.dispatch(actionTypes.FetchUsers, request)
}


onMounted(async() => {
    console.log('I started here');
    await store.dispatch(actionTypes.FetchUsers)
})

</script>

<template>
    <div class="main grid overflow-scroll">
        <!-- {{ users }} -->
        <div class="title flex justify-between pr-32 xl:pr-0 items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">User List</h1>
            <p class="text-xl font-medium text-primary">Total : {{ totalCount }}</p>
        </div>
        <div class="table">
            <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
                <table class="overflow-x-scroll border items-center w-full">
                    <thead class="bg-table-head">
                    <tr class="justify-items-center">
                        <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                        S/N
                        </th>
                        <th class="align-middle px-2 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                        Username
                        </th>
                        <th class="px-2 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Email
                        </th>
                        <th class="px-2 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">First name</th>
                        <th class="px-2 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Last name</th>
                        <th class="px-2 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Phone number</th>
                        <th class="px-2 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Role</th>
                        <th class="px-2 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                    </tr>
                    </thead>

                    <tbody id="users" class="bg-white">
                    <tr v-for="(user) in users" :key="user.id">
                        <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ pageIndex == 1 ? (users.indexOf(user) + 1) : ((pageIndex - 1) * 10) + (users.indexOf(user) + 1) }}
                        </td>
                        <td class="border-t-0 px-2 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            {{ user.username }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ user.email }}
                        </td>
                        <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ user.firstName }}
                        </td>
                        <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ user.lastName }}
                        </td>
                        <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ user.phoneNumber }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ user.roleName }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap text-left">
                            <div class="relative inline-block dropdown">
                                <button class="flex justify-around gap-8 items-center rounded" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                                    <SvgIcons name="ellipsis" />
                                </button>
                                <div class="absolute z-10 opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 w-40">
                                    <div class="absolute right-36 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                        <div class="py-3 gap-3">
                                            <button
                                            type="button"
                                            @click="showDetails = !showDetails" @click.prevent="setId(user.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="details" />
                                                Details
                                            </button>
                                            <Modal :show="showDetails" @close="showDetails = false">
                                                <UserDetails @close="showDetails = !showDetails" />
                                            </Modal>

                                            <button
                                            type="button"
                                            @click="showEdit = !showEdit" @click.prevent="editUser(user.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="edit" />
                                                Edit
                                            </button>
                                            <Modal :show="showEdit" @close="showEdit = false">
                                                <EditUser name="Edit" @close="showEdit = !showEdit" />
                                            </Modal>

                                            <button
                                            type="button"
                                            @click="showDelete = !showDelete" @click.prevent="sendId(user.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="delete" />
                                                Delete
                                            </button>
                                            <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteUser(useritemtodelete)">
                                                    <template #title>
                                                        Delete user
                                                    </template>
                                                    <template #info>
                                                        Are you sure you want to remove user?
                                                    </template>
                                                    <template #delete>
                                                        Yes, Delete User
                                                    </template>
                                            </DeleteModal>
                                            <!-- <Modal class="flex py-2 hover:bg-gray-100">
                                                <template #button>
                                                    <span class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left">
                                                        <SvgIcons name="doc-add" />
                                                        Add to batch
                                                    </span>
                                                </template>
                                                <template #content>
                                                    <AddToBatch />
                                                </template>
                                            </Modal>
                                            <Modal class="flex py-2 hover:bg-gray-100">
                                                <template #button>
                                                    <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"  role="menuitem" >
                                                        <SvgIcons name="details" />
                                                        Details
                                                    </span>
                                                </template>
                                                <template #content>
                                                    <UserDetails />
                                                </template>
                                            </Modal>
                                            <Modal class="flex py-2 hover:bg-gray-100">
                                                <template #button>
                                                    <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"  role="menuitem" >
                                                        <SvgIcons name="edit" />
                                                        Edit
                                                    </span>
                                                </template>
                                                <template #content>
                                                    <AddUser />
                                                </template>
                                            </Modal>
                                            <Modal class="flex py-2 hover:bg-gray-100">
                                                <template #button>
                                                    <span tabindex="0" class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"  role="menuitem" >
                                                        <SvgIcons name="delete" />
                                                        Delete
                                                    </span>
                                                </template>
                                                <template #content>
                                                    <div class="bg-white p-7 rounded grid">
                                                        <div class="flex justify-between mb-6">
                                                            <h1 class="text-xl mb-4 font-medium">
                                                                Delete User
                                                            </h1>
                                                            <span>
                                                                <SvgIcons name="o-cancel" />
                                                            </span>
                                                        </div>
                                                        <p class="text-lg mb-10">Are you sure you want to delete user?</p>
                                                        <div class="flex justify-between items-center mb-3">
                                                            <button class="px-10 py-4 rounded text-primary font-bold">
                                                                Cancel
                                                            </button>
                                                            <button class="bg-red px-10 py-4 rounded text-white font-bold">
                                                                Yes, Delete User
                                                            </button>
                                                        </div>
                                                    </div>
                                                </template>
                                            </Modal> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="flex items-center pt-6 px-6 mb-40 text-xs text-gray-700 justify-between">
                    <div class="">
                        Page {{ pageIndex }} of {{ totalPages }}
                    </div>
                    <div class="">
                        <pagination
                            :totalPages=totalPages
                            @pageChanged="onPageChange"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
    .dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }

  dialog[open] {
    position: absolute !important;
    right: -48%;
    animation: appear .25s cubic-bezier(0.0, 0.0, 0.58, 1.0);
}

  dialog::backdrop {
    background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
    backdrop-filter: blur(3px);
  }


@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(-40rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
