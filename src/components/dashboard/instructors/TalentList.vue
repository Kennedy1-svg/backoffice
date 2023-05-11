<script lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'InstructorList',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import TalentDetails from './TalentDetails.vue';
import UpdateTalent from './UpdateTalentStatus.vue';
import Switch from '../../switch.vue';
import pagination from '../../pagination.vue'
import DeleteModal from '../../DeleteModal.vue';
import Modal from '../../Modals.vue';
import * as instructorActionTypes from '../../../store/module/instructors/constants/action';
import { api_url } from '../../../config/index'
import EditTalents from './EditTalents.vue';

const store = useStore();

const talents:any = computed(() => {
    return store.getters.getTalents.value.payload;
})

const total_count:any = computed(() => {
    return store.getters.getTalents.value.totalCount;
})

let pageIndex: any = ref(1);

let itemtodelete:any = ref('')

const setId:any = (id:any) => {
    console.log('batchid', id)
    // route.push(`/dashboard/batch/view-student/${id}`)
    // route.push({
    //     name: 'StudentInBatch',
    //     params: {
    //         id: id
    //     }
    // })
    const request:any = `${api_url}api/talentpool/${id}`;
    console.log('request forid', request)
    store.dispatch(instructorActionTypes.FetchEditTalent, request)
}

const sendId:any = (id:any) => {
    console.log('batchid', id)
    itemtodelete.value = id
    console.log('itemtodelete', itemtodelete.value)
    return itemtodelete
}

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${api_url}api/talentpool/get-talents/${pageIndex.value}/{pageSize}`;
    console.log('url', request)
    await store.dispatch(instructorActionTypes.FetchTalents, request)
}

const totalPages:any = computed(() => {
    // (totalCount.value % 10 != 0) ? `Math.floor(${totalCount.value} / 10) + 1` : `${totalCount.value} / 10`;
    console.log(total_count.value)
    let total:any
    if (total_count.value % 10 != 0) {
        total = Math.floor(total_count.value / 10) + 1;
    } else {
        total = total_count.value / 10;
    }
    return total
})

// const setId:any = (id:any) => {
//     console.log('studentid', id)
//     const request:any = `${api_url}api/student/${id}`;
//     console.log('request forid', request)
//     // store.dispatch(actionTypes.FetchEditStudent, request)
// }

const toggle:any = (status:any) => {
    if (status == 0) {
        return status = 1
    } else {
        return status = 0
    }
}

const emits = defineEmits(['close', 'deletebatch']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
}

const deleteTalent:any = async (id:any) => {
    console.log('batch id', id);

    const request:any = `${api_url}api/talentpool/delete/${id}`;

    console.log('requestData', request)
    await store.dispatch(instructorActionTypes.RemoveTalent, request)
    await closeModal()
    // const fetchrequest:any = `${api_url}api/batch/get-batches`;
    // console.log('url', fetchrequest)
    // del.value = false
    await store.dispatch(instructorActionTypes.FetchTalents)
}

const showUpdateStatus = ref(false);

const showEdit = ref(false);

const showDelete = ref(false);

const showDetails = ref(false);

onMounted( async () => {
    // store.commit('setPageTitle', 'Talent List');
    console.log('TalentList mounted');
    // const request:any = `${api_url}api/talentpool/get-talents/{pageNumber}/{pageSize}`;
    await store.dispatch(instructorActionTypes.FetchTalents)
});
</script>

<template>
    <div class="main grid overflow-scroll">
        <div class="title flex justify-between items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Talent List</h1>
            <p class="text-xl font-medium text-primary">Total : {{ total_count }}</p>
        </div>
        <div class="table">
            <!-- {{ talents }} -->
        <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
            <table class="overflow-x-scroll border items-center w-full">
                <thead class="bg-table-head">
                <tr class="justify-items-center">
                    <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                    S/N
                    </th>
                    <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                    Applicant name
                    </th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                    Contact Email
                    </th>
                    <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Contact Phone</th>
                    <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Role</th>
                    <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Status</th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                </tr>
                </thead>

                <tbody id="students" class="bg-white">
                    <!-- {{ talents }} -->
                  <tr v-for="(talent) in talents" :key="talent.id">
                      <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                          {{ pageIndex == 1 ? (talents.indexOf(talent) + 1) : ((pageIndex - 1) * 10) + (talents.indexOf(talent) + 1) }}
                      </td>
                      <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                          {{ talent.firstName }} {{ talent.lastName }}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ talent.email }}
                      </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ talent.phoneNumber }}
                      </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ talent.roleName }}
                      </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ talent.status == '0' ? 'Pending' : talent.status == 1 ? 'Approved' : 'Rejected' }}
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
                                            @click="showDetails = !showDetails" @click.prevent="setId(talent.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="details" />
                                                Details
                                            </button>
                                            <Modal :show="showDetails" @close="showDetails = false">
                                                <TalentDetails @close="showDetails = !showDetails" />
                                            </Modal>

                                            <button
                                            type="button"
                                            @click="showEdit = !showEdit" @click.prevent="setId(talent.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="edit" />
                                                Edit
                                            </button>
                                            <Modal :show="showEdit" @close="showEdit = !showEdit">
                                                <EditTalents @close="showEdit = !showEdit" />
                                            </Modal>

                                            <button
                                            type="button"
                                            @click="showUpdateStatus = !showUpdateStatus" @click.prevent="setId(talent.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="doc-add" />
                                                Update Status
                                            </button>
                                            <Modal :show="showUpdateStatus" @close="showUpdateStatus = !showUpdateStatus">
                                                <UpdateTalent @close="showUpdateStatus = !showUpdateStatus" />
                                            </Modal>

                                            <button
                                            type="button"
                                            @click="showDelete = !showDelete" @click.prevent="sendId(talent.id)"
                                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                                            >
                                                <SvgIcons name="delete" />
                                                Delete
                                            </button>
                                            <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteTalent(itemtodelete)">
                                                <template #title>
                                                    Delete talent
                                                </template>
                                                <template #info>
                                                    Are you sure you want to remove talent?
                                                </template>
                                                <template #delete>
                                                    Yes, Delete Talent
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
    input {
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
        @apply absolute w-5 h-5 -left-[4px] -bottom-[4px] bg-primary;
        content: '';
    }

    input:checked + .toggler {
        @apply bg-primary bg-opacity-[38%];
    }

    input:checked + .toggler:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }

    .toggler.round {
        border-radius: 34px;
    }

    .toggler.round:before {
        border-radius: 50%;
    }

    .dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }

</style>
