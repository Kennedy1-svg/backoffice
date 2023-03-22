import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import router from '../../../router'
import { addData, fetchData, editData, removeData, addEmptyData, addDataFile } from '../../../helpers/api';

export default {
  state: () => ({
      payments: '',
      payment: {
        name: '',
        email: '',
        date: '',
        PhoneNumber: '',
        message: '',
      },
      editpayment: '',
      alert_status: false,
      alert_text: '',
  }),
  getters: {
    getPayments: (state: any) => {
      return computed(() => {
        return state.payments
      })
    },
    getEditPayment: (state: any) => {
      return computed(() => {
        return state.editpayment
      })
    },
    getPaymentAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },
    getPaymentAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
  },
  mutations: {
    [mutationTypes.SetPayments] (state: any, data: any) {
      state.payments = data
    },
    [mutationTypes.SetEditPayment] (state: any, data: any) {
      console.log('i don reach to update')
      state.editpayment = data
      // console.log('this is data in edit payment', state.editpayment)
    },
    [mutationTypes.SetPaymentAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetPaymentAlertText] (state: any, data: any) {
      state.alert_text = data
    },
  },
  actions: {
    async [actionTypes.FetchPayments] ({ commit }: any, data: any = `${api_url}api/payment/allpagerecords/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const payments:any = await fetchData(data, token)
      console.log('payments', payments)
      if (payments.payload) {
        await commit(mutationTypes.SetPayments, payments.payload)
      } else if (payments.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditPayment] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const payment:any = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Ipayments', payment.payload)
    //   console.log('Ipayments', payments.value)
    //   console.log('Ipayments', JSON.parse(JSON.stringify(payments)))
    //   console.log('Ipayments', JSON.parse(JSON.stringify(payments.value)))
    //   console.log('Ipayments', payments.value)
      if (payment.payload) {
        await commit(mutationTypes.SetEditPayment, payment.payload)
      } else if (payment.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // await commit(mutationTypes.SetNewPayment, payment.payload)
    },
    async [actionTypes.RemovePayment] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const payment:any = await removeData(data, token)
      if (!payment.hasErrors) {
        await commit(mutationTypes.SetPaymentAlertText, 'Payment removed successfully')
        await commit(mutationTypes.SetPaymentAlertStatus, true)
        await dispatch(actionTypes.FetchPayments)
      } else if (payment.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (payment.message.includes('400')) {
        await commit(mutationTypes.SetPaymentAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetPaymentAlertStatus, true)
      } else {
        await commit(mutationTypes.SetPaymentAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetPaymentAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetPaymentAlertStatus, false)
        commit(mutationTypes.SetPaymentAlertText, '')
      }, 2000)
    }
  },
}