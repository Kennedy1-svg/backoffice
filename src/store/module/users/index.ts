import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import { erp_api } from '../../../config'
import router from '../../../router'
import { addData, fetchData, editDataPut, deleteData, addEmptyData, addDataFile, getData } from '../../../helpers/api';

export default {
  state: () => ({
      users: '',
      permission: [],
      permissions: [],
      roles: '',
      departments: '',
      role: {
        role: '',
        permissions: []
      },
      user: {
        Email: '',
        UserName: '',
        LastName: '',
        FirstName: '',
        PhoneNumber: '',
        Password: '',
        Department: '',
        Role: '',
      },
      edituser: '',
      editrole: '',
      alert_status: false,
      alert_text: '',
  }),
  getters: {
    getUsers: (state: any) => {
      return computed(() => {
        return state.users
      })
    },
    getPermissions: (state: any) => {
      return computed(() => {
        return state.permissions
      })
    },
    getRole: (state: any) => {
      return computed(() => {
        return state.roles
      })
    },
    getDepartment: (state: any) => {
      return computed(() => {
        return state.departments
      })
    }
    ,
    getEditUser: (state: any) => {
      return computed(() => {
        return state.edituser
      })
    },
    getEditRole: (state: any) => {
      return computed(() => {
        return state.editrole
      })
    },
    getNewRole: (state: any) => {
      return computed(() => {
        return state.role
      })
    },
    getNewUser: (state: any) => {
      return computed(() => {
        return state.user
      })
    },
    getNewPermission: (state: any) => {
      return computed(() => {
        return state.permission
      })
    },
    getUserAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },
    getUserAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
  },
  mutations: {
    [mutationTypes.SetUsers] (state: any, data: any) {
      state.users = data
    },
    [mutationTypes.SetNewRole] (state: any, data: any) {
      state.role = data
    },
    [mutationTypes.SetNewUser] (state: any, data: any) {
      state.user = data
    },
    [mutationTypes.SetRole] (state: any, data: any) {
      state.roles = data
    },
    [mutationTypes.SetDepartment] (state: any, data: any) {
      state.departments = data
    },
    [mutationTypes.SetNewPermission] (state: any, data: any) {
      state.permission = data
    },
    [mutationTypes.SetPermission] (state: any, data: any) {
      state.permissions = data
    },
    [mutationTypes.SetEditUser] (state: any, data: any) {
      console.log('i don reach to update')
      state.edituser = data
      // console.log('this is data in edit user', state.edituser)
    },
    [mutationTypes.SetUserAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetUserAlertText] (state: any, data: any) {
      state.alert_text = data
    },
    [mutationTypes.SetEditRole] (state: any, data: any) {
      state.editrole = data
    },
  },
  actions: {
    async [actionTypes.FetchPermissions] ({ commit }: any, data: any = `${api_url}api/role-management/get-permission`) {
      const token:any = localStorage.getItem('token')
      const permissions:any = await fetchData(data, token)
      console.log('permissions', permissions)
      if (permissions.payload) {
        await commit(mutationTypes.SetPermission, permissions)
      } else if (permissions.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchUsers] ({ commit }: any, data: any = `${api_url}api/user-management/users/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const users:any = await fetchData(data, token)
      console.log('users', users)
      if (users.payload) {
        await commit(mutationTypes.SetUsers, users)
      } else if (users.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchRole] ({ commit }: any, data: any = `${api_url}api/role-management/get-roles/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      console.log('data', data)
      const roles:any = await fetchData(data, token)
      console.log('departmentrole from role')
      console.log("dummy data",data)
      console.log('roles', roles)
      if (roles.payload) {
        await commit(mutationTypes.SetRole, roles)
      } else if (roles.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },

    async [actionTypes.FetchDepartmentList] ({ commit }: any, data: any = `${erp_api}api/Department/backoffice/departmentlist` ) {
      // const token:any = localStorage.getItem('token')
      console.log('data', data)
      // console.log('token', token)
      const departmentlist:any = await getData(data)
      console.log('departmentlist', departmentlist)
      if (departmentlist.payload) {
        await commit(mutationTypes.SetDepartment, departmentlist)
      } 
      // else if (departmentlist.response.status === 401) {
      //   router.push({ name: 'Login' });
      // }
    },
    

    async [actionTypes.FetchEditUser] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const user:any = await fetchData(data, token)
      console.log('data tch', data)
      console.log('Iusers', user.payload)
    //   console.log('Iusers', users.value)
    //   console.log('Iusers', JSON.parse(JSON.stringify(users)))
    //   console.log('Iusers', JSON.parse(JSON.stringify(users.value)))
    //   console.log('Iusers', users.value)
      if (user.payload) {
        await commit(mutationTypes.SetEditUser, user.payload)
      } else if (user.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // await commit(mutationTypes.SetNewUser, user.payload)
    },
    async [actionTypes.AddNewRole] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const role:any = await addData(data.url, data.data, token)
      if (!role.hasErrors) {
        // commit(mutationTypes.SetNewRole, role.payload)
        await commit(mutationTypes.SetUserAlertText, 'Role added successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchRole)
      } else if (role.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (role.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    },
    async [actionTypes.AddNewUser] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const user:any = await addData(data.url, data.data, token)
      if (!user.hasErrors) {
        // commit(mutationTypes.SetNewRole, user.payload)
        await commit(mutationTypes.SetUserAlertText, 'User added successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchUsers)
      } else if (user.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (user.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditUser] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const role:any = await editDataPut(data.url, data.data, token)
      if (!role.hasErrors) {
        // commit(mutationTypes.SetNewRole, role.payload)
        await commit(mutationTypes.SetUserAlertText, 'User updated successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchUsers)
      } else if (role.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (role.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchEditRole] ({ commit }: any, data: any) {
      // await commit(mutationTypes.SetEditRole, data)
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const role:any = await fetchData(data, token)
      console.log('data tch', data)
      console.log('Iroles', role.payload)
    //   console.log('Iroles', roles.value)
    //   console.log('Iroles', JSON.parse(JSON.stringify(roles)))
    //   console.log('Iroles', JSON.parse(JSON.stringify(roles.value)))
    //   console.log('Iroles', roles.value)
      if (role.payload) {
        await commit(mutationTypes.SetEditRole, role.payload)
      } else if (role.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.EditRole] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const role:any = await editDataPut(data.url, data.data, token)
      if (!role.hasErrors) {
        // commit(mutationTypes.SetNewRole, role.payload)
        await commit(mutationTypes.SetUserAlertText, 'Role updated successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchRole)
      } else if (role.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (role.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        // commit(mutationTypes.SetNewRole, '')
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveRole] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const role:any = await deleteData(data, token)
      if (!role.hasErrors) {
        await commit(mutationTypes.SetUserAlertText, 'Role removed successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchRole)
      } else if (role.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (role.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveUser] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const user:any = await deleteData(data, token)
      if (!user.hasErrors) {
        await commit(mutationTypes.SetUserAlertText, 'User removed successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchUsers)
      } else if (user.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (user.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    }
  },
}