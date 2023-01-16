import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { auth_creds } from '../../../config'
import { addData, getData, editData, removeData } from '../../../helpers/api'

export default {
  state: () => ({
    data: '',
    user: '',
    token: localStorage.getItem('token'),
    token_type: 'Bearer ',
    refresh_token: '',
    id_token: '',
    expires_in: '',
    alert_status: false,
    alert_text: '',
    editing: false,
    title: '',
    auth_credentials: '',
    issuer: '',
    authorization_endpoint: '',
    token_endpoint: '',
    end_session_endpoint: '',
    jwks_uri: '',
    grant_types_supported: '',
    response_types_supported: '',
    response_modes_supported: '',
    scopes_supported: '',
    claims_supported: '',
    id_token_signing_alg_values_supported: '',
    code_challenge_methods_supported: '',
    subject_types_supported: '',
    token_endpoint_auth_methods_supported: '',
    claims_parameter_supported: '',
    request_parameter_supported: '',
    request_uri_parameter_supported: '',
  }),
  getters: {
    getData: (state: any) => {
      return computed(() => {
        return state.data
      })
    },
    getUser: (state: any) => {
      return computed(() => {
        return state.user
      })
    },
    getToken: (state: any) => {
      return computed(() => {
        return state.token
      })
    },
    getLoginAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },
    getLoginAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
    getTokenType: (state: any) => {
      return computed(() => {
        return state.token_type
      })
    },
    getRefreshToken: (state: any) => {
      return computed(() => {
        return state.refresh_token
      })
    },
    getTokenId: (state: any) => {
      return computed(() => {
        return state.id_token
      })
    },
    getExpiresIn: (state: any) => {
      return computed(() => {
        return state.expires_in
      })
    }
  },
  mutations: {
    [mutationTypes.SetData] (state: any, data: any) {
      state.data = data
    },
    [mutationTypes.SetUser] (state: any, data: any) {
      state.user = data
    },
    [mutationTypes.SetToken] (state: any, data: any) {
      localStorage.setItem('token', state.token = data)
    },
    [mutationTypes.SetLoginAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetLoginAlertText] (state: any, data: any) {
      state.alert_text = data
    },
    [mutationTypes.SetTokenId] (state: any, data: any) {
      state.id_token = data
    },
    [mutationTypes.SetRefreshToken] (state: any, data: any) {
      state.refresh_token = data
    },
    [mutationTypes.SetExpiresIn] (state: any, data: any) {
      state.expires_in = data
    },
  },
  actions: {
    async [actionTypes.FetchData] ({ commit }: any, data: any) {
      const user = await addData(data.url, data.data, data.token = null)
      if (user.access_token) {
        commit(mutationTypes.SetLoginAlertText, 'Login Successful')
        commit(mutationTypes.SetLoginAlertStatus, true)
        commit(mutationTypes.SetData, user)
        commit(mutationTypes.SetToken, user.access_token)
        commit(mutationTypes.SetExpiresIn, user.expires_in)
        commit(mutationTypes.SetRefreshToken, user.refresh_token)
        commit(mutationTypes.SetTokenId, user.id_token)
      } else if (user.message.includes('400')) {
        commit(mutationTypes.SetLoginAlertText, 'Invalid Email or Password')
        commit(mutationTypes.SetLoginAlertStatus, true)
      } else if (user.message.includes('404')) {
        commit(mutationTypes.SetLoginAlertText, 'Invalid connection string!')
        commit(mutationTypes.SetLoginAlertStatus, true)
      } else {
        commit(mutationTypes.SetLoginAlertText, 'Houston we have a problem!')
        commit(mutationTypes.SetLoginAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetLoginAlertStatus, false)
      }, 2000)
    },
    async [actionTypes.FetchUser] ({ commit }: any, data: any) {
      commit(mutationTypes.SetUser, data)
    },
  }
}
