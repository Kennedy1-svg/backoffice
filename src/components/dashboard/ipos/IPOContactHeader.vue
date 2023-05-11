<script lang="ts">
import { onMounted, ref } from 'vue'
import { api_url } from '../../../config'
import { useStore } from 'vuex'

export default {
    name: 'IPOContactHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
// import AddIPO from './AddIPOs.vue'
import Filter from '../../Filter.vue';
import Modal from '../../Modal.vue';
import * as actionTypes from '../../../store/module/ipos/constants/action';

const store = useStore();

const closeModal:any = () => {
  // document.getElementById('addinstructor').showModal()
  console.log('close student modal')
  let doc:any = document.getElementById('addinstructor')
  doc.close()  
}

let isSearching:any = ref(false)

let searchText:any = ref('');

const filter:any = async () => {
    isSearching.value = true
    const search:any = searchText.value.toLowerCase();
    console.log('search', search)
    const request:any = `${api_url}api/iposcontactus/search-iposcontact/{pageIndex}/{pageSize}/${search}`;
    await store.dispatch(actionTypes.FetchIPOs, request)
}

const close:any = async () => {
    isSearching.value = false
    searchText.value = ''
    await store.dispatch(actionTypes.FetchIPOs)
}

onMounted(() => {
    // store.commit('setPageTitle', 'IPO List');
    console.log('IPOHeader mounted');
});

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px] overflow-hidden">
        <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Contact Us</h1>
            <!-- <div class="buttons flex gap-10">
                <button class="focus:outline-none flex items-center gap-3 text-sm">
                    <p class="text-grey font-semibold">Add IPO</p>
                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('addskill').showModal()" id="btn">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md"> -->
                                <!-- plus icon -->
                                <!-- <SvgIcons name="plus" />  -->
                            <!-- </span>
                        </div>
                    </section>

                    <dialog id="addskill" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
                        <div class="w-full h-auto"> -->
                            <!-- Modal Content-->
                                <!-- <AddIPO @close="closeModal" /> -->
                            <!-- End of Modal Content-->
                        <!-- </div>
                    </dialog>
                </div>
                </button>
            </div> -->
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
