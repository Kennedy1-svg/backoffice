<script lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'IPODemoList',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import IPODetails from './IPODemoDetails.vue';
import pagination from '../../pagination.vue'
import Modal from '../../Modals.vue';
import DeleteModal from '../../DeleteModal.vue';
import * as actionTypes from '../../../store/module/ipos/constants/action';
import { api_url } from '../../../config/index'

const contacts:any = computed(() => {
    return store.getters.getIPODemos.value.payload;
})

const total_count:any = computed(() => {
    return store.getters.getIPODemos.value.totalCount;
})

let pageIndex: any = ref(1);

const onPageChange:any = async (page:any) => {
    console.log('page suppose don change')
    console.log('page na', page)
    pageIndex.value = page;
    console.log('pageIndex is', pageIndex.value)
    const request:any = `${api_url}api/iposrequestdemo/get-iposdemo/${pageIndex.value}/{pageSize}`;
    console.log('url', request)
    await store.dispatch(actionTypes.FetchIPODemos, request)
}

let contactitemtodelete:any = ref('')

const sendId:any = (id:any) => {
    console.log('batchid', id)
    contactitemtodelete.value = id
    console.log('contactitemtodelete', contactitemtodelete.value)
    return contactitemtodelete
}

const deleteIPO:any = async (id:any) => {
    console.log('category category', id);

    const request:any = `${api_url}api/iposrequestdemo/delete/${id}`;

    console.log('requestData', request)
    await store.dispatch(actionTypes.RemoveIPODemo, request)
    closeModal()
    // const fetchrequest:any = `${api_url}api/iposquoterequest/get-iposquote/{pageNumber}/{pageSize}`;
    // console.log('url', fetchrequest)
    await store.dispatch(actionTypes.FetchIPODemos)
}

const emits = defineEmits(['close']);

const closeModal:any = async () => {
  emits('close')
  setTimeout(() => {
    showDelete.value = false;
  }, 500);
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

const setId:any = (id:any) => {
    console.log('contact', id)
    const request:any = `${api_url}api/iposrequestdemo/${id}`;
    console.log('request forid', request)
    store.dispatch(actionTypes.FetchEditIPODemo, request)
}

const toggle:any = (status:any) => {
    if (status == 0) {
        return status = 1
    } else {
        return status = 0
    }
}

const showAddToBatch = ref(false);

const showEdit = ref(false);

const showDelete = ref(false);

const showDetails = ref(false);

const store = useStore();

onMounted( async () => {
    // store.commit('setPageTitle', 'Course List');
    console.log('TalentList mounted');
    const request:any = `${api_url}api/iposrequestdemo/get-iposdemo/{pageIndex}/{pageSize}`;
    await store.dispatch(actionTypes.FetchIPODemos, request)
});
</script>

<template>
    <div class="main grid overflow-scroll">
        <div class="title flex justify-between items-center mb-10">
            <h1 class="text-2xl font-semibold text-black">Demo Request List</h1>
            <p class="text-xl font-medium text-primary">Total : {{ total_count }}</p>
        </div>
        <div class="table">
            <!-- {{ contacts }} -->
        <div class="block w-full overflow-x-scroll xl:overflow-hidden overflow-y-hidden rounded-lg">
            <table class="overflow-x-scroll border items-center w-full">
                <thead class="bg-table-head">
                <tr class="justify-items-center">
                    <th class="pl-6 pr-3 align-middle py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-medium text-gray-500 text-left">
                    S/N
                    </th>
                    <th class="align-middle px-4 py-3 text-xs flex items-center whitespace-nowrap font-medium text-gray-500 text-left">
                    Name
                    </th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">
                    IPO Email
                    </th>
                    <th class="px-6 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">IPO Phone</th>
                    <th class="px-4 align-middle py-3 text-xs whitespace-nowrap font-medium text-gray-500 text-left">Action</th>
                </tr>
                </thead>

                <tbody id="students" class="bg-white">
                  <tr v-for="(contact) in contacts" :key="contact.id">
                      <td class="border-t-0 pl-6 pr-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4">
                          {{ pageIndex == 1 ? (contacts.indexOf(contact) + 1) : ((pageIndex - 1) * 10) + (contacts.indexOf(contact) + 1) }}
                      </td>
                      <td class="border-t-0 px-4 font-normal align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-4 text-left">
                          {{ contact.contactName }}
                      </td>
                      <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ contact.email }}
                      </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {{ contact.phoneNumber }}
                      </td>
                      <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div class="flex w-2/5 items-center">
                            <button
                            type="button"
                            @click="showDetails = !showDetails" @click.prevent="setId(contact.id)"
                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full py-2 text-sm text-left"
                            >
                                <SvgIcons name="eye" />
                            </button>
                            <Modal :show="showDetails" @close="showDetails = !showDetails">
                                <IPODetails @close="showDetails = !showDetails"  />
                            </Modal>

                            <button
                            type="button"
                            @click="showDelete = !showDelete" @click.prevent="sendId(contact.id)" 
                            class="text-gray-600 cursor-pointer hover:text-primary flex items-center gap-2 w-full px-4 py-2 text-sm text-left"
                            >
                                <SvgIcons name="delete" />
                            </button>
                            <DeleteModal :show="showDelete" @close="showDelete = !showDelete" @delete="deleteIPO(contactitemtodelete)">
                                    <template #title>
                                        Delete IPO
                                    </template>
                                    <template #info>
                                        Are you sure you want to remove demo request?
                                    </template>
                                    <template #delete>
                                        Yes, Delete IPO
                                    </template>
                            </DeleteModal>
                        </div>
                      </td>
                  </tr>
                    </tbody>
                </table>
                <div class="flex items-center pt-6 px-6 mb-20 text-xs text-gray-700 justify-between">
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
