<script lang="ts">
import { onMounted, ref } from 'vue'
import { api_url } from '../../../config'
import { useStore } from 'vuex'

export default {
    name: 'RoleHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
// import AddIPO from './AddIPOs.vue'
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import * as actionTypes from '../../../store/module/users/constants/action';
import { useRouter } from 'vue-router';

const route = useRouter();

const store = useStore();

const closeModal:any = () => {
  // document.getElementById('addinstructor').showModal()
  console.log('close student modal')
  let doc:any = document.getElementById('addinstructor')
  doc.close()
}

const addRole:any = async () => {
  route.push({
      name: 'AddRole'
  })
}

let isSearching:any = ref(false)

let searchText:any = ref('');

const filter:any = async () => {
    isSearching.value = true
    const search:any = searchText.value.toLowerCase();
    console.log('search', search)
    const request:any = `${api_url}api/role-management/get-roles/{pageIndex}/{pageSize}?keyword=${search}`;
    await store.dispatch(actionTypes.FetchRole, request)
}

const close:any = async () => {
    isSearching.value = false
    searchText.value = ''
    await store.dispatch(actionTypes.FetchRole)
}

onMounted(() => {
    // store.commit('setPageTitle', 'IPO List');
    console.log('Role Header mounted');
});

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px] overflow-hidden">
        <div class="top md:flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Roles</h1>
            <div class="buttons flex gap-10">
                <button class="focus:outline-none flex items-center gap-3 text-sm">
                    <p class="text-grey font-semibold my-2">Add Role</p>
                    <div class="relative overflow-hdden">
                        <section class="flex h-full justify-ceter items-start">
                            <div @click="addRole" id="btn">
                                <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                                    <SvgIcons name="plus" />
                                </span>
                            </div>
                        </section>

                        <dialog id="addrole" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">
                            <div class="w-full h-auto">
                                <!-- Modal Content-->
                                    <!-- <AddIPO @close="closeModal" /> -->
                                <!-- End of Modal Content-->
                            </div>
                        </dialog>
                    </div>
                </button>
            </div>
        </div>
        <div class="filter flex bg-white rounded-t-lg justify-end items-center px-11 py-5">
            <div class="search">
                <Search>
                    <template #input>
                        <input @keyup.esc="close" v-model="searchText" class="rounded text-sm p-1 focus:outline-none" type="text" placeholder="Search">
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
