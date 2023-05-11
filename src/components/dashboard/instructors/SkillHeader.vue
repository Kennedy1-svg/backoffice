<script lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'SkillHeader',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import Search from '../../Search.vue';
import AddSkill from './AddSkill.vue'
import Filter from '../../Filter.vue';
import { api_url } from '../../../config'
import Modal from '../../Modal.vue';
import * as actionTypes from '../../../store/module/instructors/constants/action';

const store = useStore();

let isSearching:any = ref(false)
let searchText:any = ref('');

const filter:any = async () => {
    isSearching.value = true
  const search:any = searchText.value.toLowerCase();
  console.log('search', search)
  const request:any = `${api_url}api/skill/search-skill/{pageIndex}/{pageSize}/${search}`;
  store.dispatch(actionTypes.FetchSkills, request)
//   // store.getters.getStudents

//   // const status:any = document.getElementById('status');
//   // console.log('status', status)
//   // const rows:any = status.getElementsByTagName('ul');
//   // console.log('rows', rows)
//   // console.log('rows length', rows.length)

//   // for (let i:any = 0; i < rows.length; i++) {
//   //   const row:any = rows[i];
//   //   console.log('row', rows[0])
//   //   console.log('row', rows[1])
//   //   console.log('row', rows[2])
//   //   console.log('row', rows[0].textContent)
//   //   console.log('row', rows[1].textContent)
//   //   console.log('row', rows[2].textContent)
//   //   if (
//   //     row.textContent.toLowerCase().indexOf(search) > -1 
//   //   ) {
//   //     rows[i].style.display = '';
//   //   } else {
//   //     rows[i].style.display = 'none';
//   //   }
//   // }
}

const close:any = async () => {
    isSearching.value = false
  searchText.value = ''
  const request:any = `${api_url}api/skill/get-skills/{pageIndex}/{pageSize}`;
  await store.dispatch(actionTypes.FetchSkills, request)
}

const closeModal:any = () => {
  // document.getElementById('addinstructor').showModal()
  console.log('close student modal')
  let doc:any = document.getElementById('addskill')
  doc.close()  
}

onMounted(() => {
    // store.commit('setPageTitle', 'Skill List');
    console.log('SkillHeader mounted');
});

</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px] overflow-hidden">
        <div class="top md:flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Skill</h1>
            <div class="buttons flex gap-10">
                <button class="focus:outline-none flex items-center gap-3 text-sm">
                    <p class="text-grey font-semibold my-2">Add Skill</p>
                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('addskill').showModal()" id="btn">
                            <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                                <SvgIcons name="plus" /> <!-- plus icon -->
                            </span>
                        </div>
                    </section>

                    <dialog id="addskill" class="h-auto w-11/12 md:w-1/2 p-5 bg-white rounded-md ">            
                        <div class="w-full h-auto">
                            <!-- Modal Content-->
                                <AddSkill name="Add" @close="closeModal" />
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
