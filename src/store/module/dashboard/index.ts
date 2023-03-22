import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import router from '../../../router'
import { fetchData } from '../../../helpers/api';

export default {
  state: () => ({
      stats: '',
      activity: '',
  }),
  getters: {
    getStats: (state: any) => {
      return computed(() => {
        return state.stats
      })
    },
    getActivity: (state: any) => {
      return computed(() => {
        return state.activity
      })
    },
  },
  mutations: {
    [mutationTypes.SetStat] (state: any, data: any) {
      state.stats = data
    },
    [mutationTypes.SetActivity] (state: any, data: any) {
      state.activity = data
    },
  },
  actions: {
    async [actionTypes.FetchStats] ({ commit }: any, data: any = `${api_url}api/dashboard`) {
      const token:any = localStorage.getItem('token')
      const stats:any = await fetchData(data, token)
      console.log('stats', stats)
      if (stats.payload) {
        await commit(mutationTypes.SetStat, stats.payload)
      } else if (stats.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchActivity] ({ commit }: any, data: any = `${api_url}api/dashboard/activities`) {
      const token:any = localStorage.getItem('token')
      console.log('data', data)
      const activities:any = await fetchData(data, token)
      console.log('activities', activities)
      if (activities.payload) {
        await commit(mutationTypes.SetActivity, activities.payload)
      } else if (activities.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
  },
}