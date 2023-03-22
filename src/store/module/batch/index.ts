import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config/index'
import router from '../../../router'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
    state: () => ({
        batches: '',
        batch: {
          title: '',
          courseId: '',
          startDate: '',
          endDate: '',
          instructors: [],
          batchCapacity: '',
          trainingType: '',
          course: ''
        },
        total_count: '',
        alert_status: false,
        alert_text: '',
        editing: false,
        isEditing: false,
        studentsInBatch: '',
        title: ''
    }),
    getters: {
        getBatch: (state: any) => {
        return computed(() => {
            return state.batches
        })
        },
        getNewBatch: (state: any) => {
        return computed(() => {
            return state.batch
        })
        },
        getTotalBatchCount: (state: any) => {
        return computed(() => {
            return state.total_count
        })
        },
        getBatchAlertStatus: (state: any) => {
          return computed(() => {
            return state.alert_status
          })
        },
        getBatchAlertText: (state: any) => {
          return computed(() => {
            return state.alert_text
          })
        },
        getEditBatchStatus: (state: any) => {
        return computed(() => {
            return state.isEditing
        })
        },
        getBatchTitle: (state: any) => {
        return computed(() => {
            return state.title
        })
        },
        getStudentsInBatch: (state: any) => {
          console.log(state.studentsInBatch)
          return computed(() => {
            return state.studentsInBatch
          })
        }
    },
    mutations: {
      [mutationTypes.SetBatch] (state: any, data: any) {
        state.batches = data
      },
      [mutationTypes.SetNewBatch] (state: any, data: any) {
        state.batch = data
      },
      [mutationTypes.SetTotalBatchCount] (state: any, data: any) {
        state.total_count = data
      },
      [mutationTypes.SetEditStatus] (state: any, data: any) {
        state.isEditing = data
      },
      [mutationTypes.SetEditBatch] (state: any, data: any) {
        state.batch = data
      },
      [mutationTypes.SetTitle] (state: any, data: any) {
        state.title = data
      },
      [mutationTypes.SetBatchAlertStatus] (state: any, data: any) {
        state.alert_status = data
      },
      [mutationTypes.SetBatchAlertText] (state: any, data: any) {
        state.alert_text = data
      },
      [mutationTypes.SetStudentsInBatch] (state: any, data: any) {
        console.log('studentsInaBatch', data)
        state.studentsInBatch = data
      },
    },
    actions: {
        async [actionTypes.FetchBatch] ({ commit }: any, data: any = `${api_url}api/batch/get-batches/{page}/{limit}`) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const batch:any = await fetchData(data, token)
        //   console.log('data', data)
        //   console.log('Ibatchs', batchs.payload)
        //   console.log('Ibatchs', batchs.value)
        //   console.log('Ibatchs', JSON.parse(JSON.stringify(batchs)))
        //   console.log('Ibatchs', JSON.parse(JSON.stringify(batchs.value)))
          //   console.log('Ibatchs', batchs.value)
          if (batch.payload) {
            await commit(mutationTypes.SetBatch, batch.payload)
            await commit(mutationTypes.SetTotalBatchCount, batch.totalCount)
          } else if (batch.response.status === 401) {
            router.push({ name: 'Login' });
          }
        },
        async [actionTypes.AddStudentToBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
            console.log('token here')
            console.log('data is', data)
          const addStudent:any = await addData(data.url, data.data, token)
          console.log('addStudent', addStudent)
          if (addStudent.payload) {
            commit(mutationTypes.SetBatchAlertText, 'Student added to cohort successfully')
            commit(mutationTypes.SetBatchAlertStatus, true)
            dispatch(actionTypes.FetchBatch)
          } else if (addStudent.message.includes('400')) {
            commit(mutationTypes.SetBatchAlertText, 'Student already added to cohort')
            commit(mutationTypes.SetBatchAlertStatus, true)
          } else if (addStudent.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (addStudent.message.includes('404')) {
            commit(mutationTypes.SetBatchAlertText, 'Cohort not found')
            commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            commit(mutationTypes.SetBatchAlertText, 'Something went wrong')
            commit(mutationTypes.SetBatchAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
          // commit(mutationTypes.SetBatch, batch.payload)
          // commit(mutationTypes.SetTotalBatchCount, batch.totalCount)
        },
        async [actionTypes.AddInstructorToBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
            console.log('token here')
            console.log('data is', data)
          const addInstructor:any = await addData(data.url, data.data, token)
          console.log('addInstructor', addInstructor)
          if (addInstructor.payload) {
            commit(mutationTypes.SetBatchAlertText, 'Instructor added to cohort successfully')
            commit(mutationTypes.SetBatchAlertStatus, true)
            dispatch(actionTypes.FetchBatch)
          } else if (addInstructor.message.includes('400')) {
            commit(mutationTypes.SetBatchAlertText, 'Instructor already added to cohort')
            commit(mutationTypes.SetBatchAlertStatus, true)
          } else if (addInstructor.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (addInstructor.message.includes('404')) {
            commit(mutationTypes.SetBatchAlertText, 'Cohort not found')
            commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            commit(mutationTypes.SetBatchAlertText, 'Something went wrong')
            commit(mutationTypes.SetBatchAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
          // commit(mutationTypes.SetBatch, batch.payload)
          // commit(mutationTypes.SetTotalBatchCount, batch.totalCount)
        },
        async [actionTypes.FetchStudentsInBatch] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here')
          const studentsinbatch:any = await fetchData(data, token)
        //   console.log('data', data)
          console.log('Ibatchs', studentsinbatch.payload)
        //   console.log('Ibatchs', batchs.value)
        //   console.log('Ibatchs', JSON.parse(JSON.stringify(batchs)))
        //   console.log('Ibatchs', JSON.parse(JSON.stringify(batchs.value)))
        //   console.log('Ibatchs', batchs.value)
          if (studentsinbatch.payload) {
            await commit(mutationTypes.SetStudentsInBatch, studentsinbatch)
            await commit(mutationTypes.SetTotalBatchCount, studentsinbatch.totalCount)
          } else if (studentsinbatch.response.status === 401) {
            router.push({ name: 'Login' });
          }
        },
        async [actionTypes.AddBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data.url, data.data)
          const newbatch:any = await addData(data.url, data.data, token)
          if (newbatch.payload) {
            await commit(mutationTypes.SetBatchAlertText, 'Cohort added successfully')
            await commit(mutationTypes.SetBatchAlertStatus, true)
            await dispatch(actionTypes.FetchBatch)
          } else if (newbatch.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (newbatch.message.includes('400')) {
            await commit(mutationTypes.SetBatchAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            await commit(mutationTypes.SetBatchAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const newbatch:any = await removeData(data, token)
          console.log('newbatch', newbatch)
          if (!newbatch.hasErrors) {
            await commit(mutationTypes.SetBatchAlertText, 'Cohort removed successfully')
            await commit(mutationTypes.SetBatchAlertStatus, true)
            await dispatch(actionTypes.FetchBatch)
          } else if (newbatch.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (newbatch.message.includes('400')) {
            await commit(mutationTypes.SetBatchAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            await commit(mutationTypes.SetBatchAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveStudentFromBatch] ({ commit, dispatch }: any, data: any) {
          console.log('i am here')
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const newbatch:any = await addData(data.url, data.data, token)
          console.log('newbatch', newbatch)
          if (!newbatch.hasErrors) {
            await commit(mutationTypes.SetBatchAlertText, 'Student removed successfully')
            await commit(mutationTypes.SetBatchAlertStatus, true)
            await dispatch(actionTypes.FetchBatch)
          } else if (newbatch.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (newbatch.message.includes('400')) {
            await commit(mutationTypes.SetBatchAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            await commit(mutationTypes.SetBatchAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
        },
        async [actionTypes.FetchEditBatch] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
          // console.log('token here')
          console.log('all data is', data)
          const batch:any = await fetchData(data, token)
          console.log('batch now now', batch)
          if (batch.payload) {
          //   await commit(mutationTypes.SetEditBatch, batch.payload)
          // } else if (batch.response.status === 401) {
            router.push({ name: 'Login' });
          }
          // commit(mutationTypes.SetNewBatch, batch.payload)
        },
        async [actionTypes.EditBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data.url, data.data)
          const newbatch:any = await editData(data.url, data.data, token)
          if (newbatch.payload) {
            await commit(mutationTypes.SetBatchAlertText, 'Cohort updated successfully')
            await commit(mutationTypes.SetBatchAlertStatus, true)
            await dispatch(actionTypes.FetchBatch)
          } else if (newbatch.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (newbatch.message.includes('400')) {
            await commit(mutationTypes.SetBatchAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            await commit(mutationTypes.SetBatchAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
        }
    },
}