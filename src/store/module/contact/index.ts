import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import router from '../../../router'
import { addData, fetchData, editData, removeData, addEmptyData, addDataFile } from '../../../helpers/api';

export default {
  state: () => ({
      contacts: '',
      contact: {
        name: '',
        email: '',
        date: '',
        PhoneNumber: '',
        message: '',
      },
      editcontact: '',
      alert_status: false,
      alert_text: '',
  }),
  getters: {
    getContacts: (state: any) => {
      return computed(() => {
        return state.contacts
      })
    },
    getEditContact: (state: any) => {
      return computed(() => {
        return state.editcontact
      })
    },
    getContactAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },
    getContactAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
  },
  mutations: {
    [mutationTypes.SetContacts] (state: any, data: any) {
      state.contacts = data
    },
    [mutationTypes.SetEditContact] (state: any, data: any) {
      console.log('i don reach to update')
      state.editcontact = data
      // console.log('this is data in edit contact', state.editcontact)
    },
    [mutationTypes.SetContactAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetContactAlertText] (state: any, data: any) {
      state.alert_text = data
    },
  },
  actions: {
    async [actionTypes.FetchContacts] ({ commit }: any, data: any = `${api_url}api/contactus/get-contacts/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
    const contacts:any = await fetchData(data, token)
      console.log('contacts', contacts)
      if (contacts.payload) {
        await commit(mutationTypes.SetContacts, contacts)
      } else if (contacts.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditContact] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const contact:any = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Icontacts', contact.payload)
    //   console.log('Icontacts', contacts.value)
    //   console.log('Icontacts', JSON.parse(JSON.stringify(contacts)))
    //   console.log('Icontacts', JSON.parse(JSON.stringify(contacts.value)))
    //   console.log('Icontacts', contacts.value)
      if (contact.payload) {
        await commit(mutationTypes.SetEditContact, contact.payload)
      } else if (contact.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // await commit(mutationTypes.SetNewContact, contact.payload)
    },
    async [actionTypes.RemoveContact] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const contact:any = await removeData(data, token)
      if (!contact.hasErrors) {
        await commit(mutationTypes.SetContactAlertText, 'Contact removed successfully')
        await commit(mutationTypes.SetContactAlertStatus, true)
        await dispatch(actionTypes.FetchContacts)
      } else if (contact.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (contact.message.includes('400')) {
        await commit(mutationTypes.SetContactAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      } else {
        await commit(mutationTypes.SetContactAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetContactAlertStatus, false)
        commit(mutationTypes.SetContactAlertText, '')
      }, 2000)
    }
  },
}