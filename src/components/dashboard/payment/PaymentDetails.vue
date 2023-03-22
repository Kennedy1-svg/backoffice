<script lang="ts">
export default {
  name: 'PaymentDetails',
}
</script>

<script setup lang="ts">
import SvgIcons from '../../SvgIcons.vue';
import { api_url } from '../../../config'
import { ref, toRefs, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import moment from 'moment';
import * as actionTypes from '../../../store/module/payment/constants/action'

const store = useStore();

const showProfilePicture = ref(false);
const emits = defineEmits(['close'])

const closeModal:any = () => {
  // document.getElementById('myoal').showModal()
  console.log('close modal')
  emits('close')
}

const payment:any = computed(() => {
    // console.log('courses', JSON.parse(JSON.stringify(store.getters.getEditcourse.value)))
    return store.getters.getEditPayment.value
})

// onMounted(async () => {
//     console.log('I am now here')
//     const request:any = `${api_url}api/course/get-courses/{pageIndex}/{pageSize}`;
//     await store.dispatch(actionTypes.FetchEditcourse, request)
// })

</script>

<template>
    <div class="h-[92vh]">
        <div class="main grid px-[45px]">
            <div class="grid">
                <div class="flex justify-between py-10 items-center ">
                    <p class="text-2xl">Payment Details</p>
                    <SvgIcons name="cancel" @click="closeModal" class="cursor-pointer" />
                </div>
            </div>
            <!-- {{ payment }} hi -->
            <div class="bottom">
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Name</p>
                    <p>{{ payment.firstName }} {{ payment.lastName }}</p>
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Mobile</p>
                    <p>{{ payment.phoneNumber }}</p>
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Email</p>
                    <p>{{ payment.email }}</p>
                </div>
                <div class="flex border-b py-3 text-xl font-medium justify-between items-center">
                    <p>Date</p>
                    <p>{{ moment(payment.requestDate).format('MMM DD, YYYY hh:mm:ss A') }}</p>
                </div>
                <div class="flex gap-5 py-3 text-xl font-medium justify-between items-start">
                    <p>Message</p>
                    <!-- <p>{{ payment.message }}</p> -->
                    <p class="min-w-2/3 text-base">
                    {{ payment.message }}
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>
