<script lang="ts">
export default {
  name: 'OutsourcingList',
}
</script>

<script setup lang="ts">
import moment from 'moment'
import SvgIcons from '../../SvgIcons.vue';
import EditOutsourcing from './EditOutsourcingForm.vue';
// import ProjectDetails from './ProjectDetails.vue';
import UpdateOutsourcingStatus from './UpdateOutsourcingStatus.vue';
import Modal from '../../Modals.vue';
import DeleteModal from '../../DeleteModal.vue';
import { computed, ref, onMounted, reactive } from 'vue';
import { useStore } from 'vuex'
import * as actionTypes from '../../../store/module/services/constants/action'
import * as mutationTypes from '../../../store/module/services/constants/mutation'
import { api_url } from '../../../config'
import pagination from '../../pagination.vue'
import Delete from '../../delete.vue'
import { useRouter } from 'vue-router';

const route = useRouter();

const store = useStore();

const outsourcing:any = computed(() => {
    return store.getters.getOutsourcing.value.payload
})

const totalCount:any = computed(() => {
    return store.getters.getOutsourcing.value.totalCount
})

const setId:any = async (id:any) => {
    console.log('outsourcingid', id)
    const request:any = `${api_url}api/outsourcing/get/${id}`;
    console.log('request forid', request)
    await store.dispatch(actionTypes.FetchEditOutsourcing, request)
}

// const today:any = '2023-11-15T13:45:30'

const showEdit = ref(false);

const showDelete = ref(false);

const showStudents = ref(false);

const outsourcingitemtodelete:any = ref('');

const setDetailId:any = async (id:any) => {
    console.log('outsourcingid', id)
    route.push({
        name: 'OutsourcingDetails',
        params: {
            id: id
        }
    })
}

const setEditId:any = async (id:any) => {
    console.log('outsourcingid', id)
    route.push({
        name: 'EditOutsourcing',
        params: {
            id: id
        }
    })    
}

const sendId:any = (id:any) => {
    console.log('outsourcingid', id)
    outsourcingitemtodelete.value = id
    console.log('outsourcingitemtodelete', outsourcingitemtodelete.value)
    return outsourcingitemtodelete
}

const deleteOutsourcing:any = async (id:any) => {
    console.log('batch id', id);

    const request:any = `${api_url}api/outsourcing/delete/${id}`;

    console.log('requestData', request)
    await store.dispatch(actionTypes.RemoveOutsourcing, request)
    // const fetchrequest:any = `${api_url}api/project/get-projects/{pageIndex}/{pageSize}`;
    // console.log('url', fetchrequest)
    // del.value = false
    await store.dispatch(actionTypes.FetchOutsourcing)
    closeModal()
}

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

const showUpdateStatus = ref(false);

const showDetails = ref(false);


let pageIndex: any = ref(1);

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
}

const editProject:any = async (id:any) => {
    console.log('studentid', id)
    const request:any = `${api_url}api/project/${id}`;
    console.log('request for the', request)
    await store.dispatch(actionTypes.FetchEditProject, request)
    // console.log('student', student)
    // console.log('student', student.value)

}

// const deleteOutsourcing:any = async (id:any) => {
//     console.log('project id', id);

//     const request:any = `${api_url}api/project/delete/${id}`;

//     console.log('requestData', request)
//     store.dispatch(actionTypes.RemoveProject, request)
//     // closeModal()
//     const fetchrequest:any = `${api_url}api/project/get-projects`;
//     console.log('url', fetchrequest)
//     await store.dispatch(actionTypes.FetchProject, fetchrequest)
// }

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${api_url}api/outsourcing/get/${pageIndex.value}/{pageSize}`;
    // console.log('url', request)
    await store.dispatch(actionTypes.FetchOutsourcing, request)
}

onMounted(async() => {
    console.log('I started here');
    // const request:any = 'https://walurebackofficev1.azurewebsites.net/api/student/get-students/{pageIndex}/{pageSize}';
    const request:any = `${api_url}api/outsourcing/get/{pageIndex}/{pageSize}`;
    console.log('url', request)
    await store.dispatch(actionTypes.FetchOutsourcing, request)
})

</script>

<template>
    <div class="main grid overflow-scroll">
        <div class="title flex justify-between pr-32 xl:pr-0 items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Outsourcing List</h1>
            <p class="text-xl font-medium text-primary">Total : {{ totalCount }}</p>
        </div>
        <div class="table">
            <!-- {{ outsourcing }} -->
            <div class="block w-full oveflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
                <table class="overflow-x-scroll border items-center w-full -mr-16">
                    <thead class="bg-table-head">
                    <tr class="justify-items-center">
                        <th class="pl-4 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                        S/N
                        </th>
                        <th class="align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Contact name
                        </th>
                        <th class="px-4 align-middle py-2 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                        Company email
                        </th>
                        <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Contact phone</th>
                        <th class="px-4 align-middle py-2 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Company name</th>
                        <th class="px-4 align-middle py-2 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Status</th>
                        <th class="px-3 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody id="outsourcinglist" class="bg-white">
                    <tr v-for="(outsourcingitem) in outsourcing" :key="outsourcingitem.id">
                    <!-- {{ outsourcingitem }} -->
                        <td class="border-t-0 pl-4 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                            {{ pageIndex == 1 ? (outsourcing.indexOf(outsourcingitem) + 1) : ((pageIndex - 1) * 10) + (outsourcing.indexOf(outsourcingitem) + 1) }}
                        </td>
                        <td class="border-t-0 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                            {{ outsourcingitem.contactPerson }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {{ outsourcingitem.email }}
                        </td>
                        <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {{ outsourcingitem.phoneNumber }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {{ outsourcingitem.companyName }}
                        </td>
                        <td class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {{ outsourcingitem.status == '0' ? 'Pending' : outsourcingitem.status == 1 ? 'Rejected' : 'Approved' }}
                        </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          
                            <div class="relative inline-block dropdown">
                                <button class="flex justify-around gap-8 items-center rounded" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                                    <SvgIcons name="ellipsis" />
                                </button>
                                <div class="absolute z-10 opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 w-44">
                                    <div class="absolute right-36 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                                        <div class="py-3 gap-3">
                                            <button
                                            type="button"
                                            @click="showDetails = !showDetails" @click.prevent="setDetailId(outsourcingitem.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="details" />
                                                Details
                                            </button>
                                            <!-- <Modal :show="showDetails" @close="showDetails = false">
                                                <ProjectDetails @close="showDetails = !showDetails" />
                                            </Modal> -->

                                            <button
                                            type="button"
                                            @click="showUpdateStatus = !showUpdateStatus"
                                            @click.prevent="setId(outsourcingitem.id)"    
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="update" />
                                                Update Status
                                            </button>
                                            <Modal :show="showUpdateStatus" @close="showUpdateStatus = !showUpdateStatus">
                                                <UpdateOutsourcingStatus @close="showUpdateStatus = !showUpdateStatus" />
                                            </Modal>

                                            <button
                                            type="button"
                                            @click="showEdit = !showEdit" @click.prevent="setEditId(outsourcingitem.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="edit" />
                                                Edit
                                            </button>
                                            <!-- <Modal :show="showEdit" @close="showEdit = !showEdit">
                                                <EditOutsourcing name="Edit" @close="showEdit = !showEdit" />
                                            </Modal> -->

                                            <button
                                            type="button"
                                            @click="showDelete = !showDelete" @click.prevent="sendId(outsourcingitem.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="delete" />
                                                Delete
                                            </button>
                                            <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteOutsourcing(outsourcingitemtodelete)">
                                                    <template #title>
                                                        Delete outsourcing
                                                    </template>
                                                    <template #info>
                                                        Are you sure you want to remove outsourcing?
                                                    </template>
                                                    <template #delete>
                                                        Yes, Delete Outsourcing
                                                    </template>
                                            </DeleteModal>
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

</style>
