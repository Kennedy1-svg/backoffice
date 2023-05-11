<script lang="ts">
export default {
    name: 'DepartmentHeader'
}
</script>

<script setup lang="ts">
import Search from '../../Search.vue'
import SvgIcons from '../../SvgIcons.vue'
import CreateDepartment from './CreateDepartment.vue';

const closeModal:any = () => {
  // document.getElementById('addstudent').showModal()
  console.log('close dept modal')
    // localStorage.removeItem('newstudent')
    // localStorage.removeItem('editstudent')
  let doc:any = document.getElementById('createdepartment')
  doc.close()  
}




</script>

<template>
    <div class="main pt-[50px] grid gap-5 pb-[90px] px-10">
        <div class="top flex justify-between items-center">
            <h1 class="font-semibold text-2xl">Department</h1>
            <button class="focus:outline-none flex items-center gap-3 text-sm">
                <p class="text-grey font-semibold">Create Department</p>
                <div class="relative overflow-hdden">
                    <section class="flex h-full justify-ceter items-start">
                        <div onclick="document.getElementById('createdepartment').showModal()" id="btn">
                          <span class="bg-blue p-1 flex justify-center text-white rounded-md">
                              <SvgIcons name="plus" /> <!-- plus icon -->
                          </span>
                      </div>
                    </section>      
                </div>
            </button>

            <dialog id="createdepartment" class="h-auto w-1/2 md:w-1/2 p-5 bg-white rounded-md">            
                      <div class="w-full h-auto ">
                          <!-- Modal Content-->
                              <CreateDepartment @close="closeModal" />
                          <!-- End of Modal Content-->
                      </div>
            </dialog>

        </div>  
        
        <div class="bg-white p-10 flex items-center justify-center rounded-sm">
            <div class="search w-4/5">
                <Search>
                    <template #input>
                        <input class="rounded text-sm p-1 focus:outline-none w-[700px]"  type="text" placeholder="Search Department">
                        <span class="w-auto flex justify-end items-center text-grey p-2">
                       <SvgIcons name = "search" />
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