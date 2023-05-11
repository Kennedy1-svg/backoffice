<script lang="ts">
import { onMounted, ref, computed } from 'vue'
import { api_url } from '../../../config'
import { useStore } from 'vuex'

export default {
    name: 'UserHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import multiselect from '@vueform/multiselect'
import AddUserTabs from './AddUserTabs.vue';
import * as actionTypes from '../../../store/module/users/constants/action';

const store = useStore();

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close course modal')
//   store.commit(mutationTypes.SetNewUser, {})
  let doc:any = document.getElementById('adduser')
  doc.close()
}

let isSearching:any = ref(false)

const deselect:any = async () => {
    // const request:any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`;
    await store.dispatch(actionTypes.FetchUsers)
    // await store.getters.getUsers
}

let searchText:any = ref('');

const filter:any = async () => {
  isSearching.value = true
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const request:any = `${api_url}api/user-management/users/{pageIndex}/{pageSize}?keyword=${search}`;
  await store.dispatch(actionTypes.FetchUsers, request)
}

const cancan:any = async (name:any) => {
    console.log('i can can')
    console.log('name', name)
    const request:any = `${api_url}api/user-management/search-Userbyrole/${name}/{pageNumber}/{pageSize}`;
    await store.dispatch(actionTypes.FetchUsers, request)
}

const roles:any = computed(() => {
  return store.getters.getRole.value.payload;
});

const statusField:any = ref('')

const close:any = async () => {
    isSearching.value = false
  searchText.value = ''
  // const request:any = `${api_url}api/user/get-user/{pageIndex}/{pageSize}`;
  await store.dispatch(actionTypes.FetchUsers)
}

onMounted( async() => {
    // store.commit('setPageTitle', 'Course List');
    await store.dispatch(actionTypes.FetchRole)
    console.log('CourseHeader mounted');
});

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px] overflow-hidden">
        <div class="top md:flex justify-between items-center">
            <h1 class="font-semibold text-2xl">User Management</h1>
            <!-- {{ roles }} -->
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold my-2">Add User</p>
                <!-- <Modal>
                    <template #button>
                        <span class="bg-blue p-1 flex justify-center text-white rounded-md"> -->
                            <!-- <SvgIcons name="plus" /> plus icon -->
                        <!-- </span>
                    </template>
                    <template #content>
                        <AddUserTabs />
                    </template>
                </Modal> -->

                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('adduser').showModal()" id="btn">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                                <SvgIcons name="plus" /> <!-- plus icon -->
                            </span>
                        </div>
                    </section>

                    <dialog id="adduser" class="h-auto w-11/12 md:w-4/5 p-5 bg-white rounded-md ">
                        <div class="w-full h-auto">
                            <!-- Modal Content-->
                                <AddUserTabs @close="closeModal" />
                            <!-- End of Modal Content-->
                        </div>
                    </dialog>
                </div>
            </button>
        </div>
        <div class="filter grid gap-y-2  md:flex bg-white rounded-t-lg justify-between items-center px-3 md:px-11 py-5">
            <div class="status order-last md:w-1/3">
                <!-- <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">Status</span>
                    </template>
                    <template #input>
                        <input class="border-2 text-sm p-3 rounded h-10 w-full mx-auto" placeholder="Add Status">
                    </template>
                    <template #list>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                            Active
                        </p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Disabled</p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">None</p></li>
                    </template>
                </Filter> -->
                <!-- {{ roles }} -->
                <multiselect v-model="statusField" @clear="deselect" @select="cancan(statusField)" valueProp="role" :options="roles" track-by="role" label="role" placeholder="Filter role" :searchable="true" class="multiselect-blue" />
            </div>
            <div class="search">
                <Search>
                    <template #input>
                        <input class="rounded text-sm p-1 focus:outline-none" @keyup.esc="close" v-model="searchText" type="text" placeholder="Search">
                        <span class="w-auto flex justify-end items-center text-grey p-2">
                            <SvgIcons v-if="!isSearching" name="search" @click="filter"  />
                            <SvgIcons v-else name="o-cancel" @click="close" class="transform scale-75" />
                        </span>
                    </template>
                </Search>
            </div>
        </div>
    </div>
</template>

<style scoped>

  dialog[open] {
    position: absolute !important;
    right: -19%;
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