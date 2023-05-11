<script setup lang="ts">
import Navigation from '../../components/SideNavigation.vue';
import TopNavigation from '../../components/TopNavigation.vue';
import {ref} from 'vue'

let showSideNavigation:any = ref(false)
console.log('first log',showSideNavigation)

const showNavigation = () =>{
    console.log('hello')
    showSideNavigation.value = true 
}

const closeNavigation = () =>{
    console.log('hello')
    showSideNavigation.value = false 
}


</script>

<template>
    <div class="flex" >
        
        <div @click="showNavigation" class="lg:hidden absolute bg-primary left-2 top-2 rounded-xl shadow-md shadow-primary cursor-pointer  flex items-center justify-center p-3">
           <img class="w-10" src="../assets/walure-logo.jpg">
       </div>
        <!-- Mobile Screens Side navigation -->
       <div v-if="showSideNavigation"  class="lg:w-1/5 border-r lg:hidden absolute top-0 left-0 w-full z-10 opacity-1">            
           <Navigation class="absolute left-0 bg-white z-10"  />
           <!-- overlay for side-nav mobile:absolute left-0 mobile:bg-white mobile:z-10 -->
       </div>
      
     <!-- Big Screens side navigation -->
       <div class="w-1/5 border-r hidden lg:contents  ">
           <Navigation class="" />  
       </div>

       <div class="main lg:w-4/5 tablet:overflow-x-hidden w-full ml-0 ">
           <TopNavigation class="lg:fixed z-10 lg:mx-auto" />
           <router-view @click="closeNavigation" class="mt-12" />
       </div>
       
   </div>
</template>
