import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import { addData, addDataFile, fetchData, editData, removeData } from '../../../helpers/api'
import router from '../../../router'

export default {
  state: () => ({
    students: [],
    student: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      addresss: '',
      imageFile: '',
      otherName: '',
      gender: '',
      courseId: '',
    },
    editstudent: '',
    alert_status: false,
    alert_text: '',
    editing: false,
    isEditing: false,
    title: ''
  }),
  getters: {
    getStudent: (state: any) => {
      return computed(() => {
        return state.students
      })
    },
    getEditStudent: (state: any) => {
      return computed(() => {
        return state.editstudent
      })
    },
    getNewStudent: (state: any) => {
      return computed(() => {
        return state.student
      })
    },
    getStudentAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },
    getStudentAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
    getStudentTotalCount: (state: any) => {
      return computed(() => {
        console.log('total_count here', state.total_count)
        return state.total_count
      })
    },
    getEditStatus: (state: any) => {
      return computed(() => {
        return state.isEditing
      })
    },
    getTitle: (state: any) => {
      return computed(() => {
        return state.title
      })
    },
  },
  mutations: {
    [mutationTypes.SetStudent] (state: any, data: any) {
      state.students = data
    },
    [mutationTypes.SetEditStudent] (state: any, data: any) {
      state.editstudent = data
    },
    [mutationTypes.SetNewStudent] (state: any, data: any) {
      state.student = data
    },
    [mutationTypes.SetTotalCount] (state: any, data: any) {
      state.total_count = data
    },
    [mutationTypes.SetEditStatus] (state: any, data: any) {
      state.isEditing = data
    },
    [mutationTypes.SetTitle] (state: any, data: any) {
      state.title = data
    },
    [mutationTypes.SetStudentAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetStudentAlertText] (state: any, data: any) {
      state.alert_text = data
    },
  },
  actions: {
    async [actionTypes.FetchStudents] ({ commit }: any, data: any = `${api_url}api/student/get-students/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const students:any = await fetchData(data, token)
      console.log('data fe', data)
      console.log('Istudents', students)
      // console.log('Istudents', students.response.status)
    //   console.log('Istudents', JSON.parse(JSON.stringify(students)))
    //   console.log('Istudents', JSON.parse(JSON.stringify(students.value)))
    //   console.log('Istudents', students.value)
      if (students.payload) {
        await commit(mutationTypes.SetStudent, students.payload)
        await commit(mutationTypes.SetTotalCount, students.totalCount)
      } else if (students.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditStudent] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const student:any = await fetchData(data, token)
      // console.log('data tch', data)
      // console.log('Istudents', student.payload)
    //   console.log('Istudents', students.value)
    //   console.log('Istudents', JSON.parse(JSON.stringify(students)))
    //   console.log('Istudents', JSON.parse(JSON.stringify(students.value)))
    //   console.log('Istudents', students.value)
      if (student.payload) {
        await commit(mutationTypes.SetEditStudent, student.payload)
        await commit(mutationTypes.SetNewStudent, student.payload)
      } else if (student.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetTotalCount, students.totalCount)
    },
    async [actionTypes.FilterStudent] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const student:any = await fetchData(data, token)
      console.log('data', data)
      console.log('Istudents', student.payload)
    //   console.log('Istudents', students.value)
    //   console.log('Istudents', JSON.parse(JSON.stringify(students)))
    //   console.log('Istudents', JSON.parse(JSON.stringify(students.value)))
    //   console.log('Istudents', students.value)
      if (student.payload) {
        commit(mutationTypes.SetStudent, student.payload)
      } else if (student.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetTotalCount, students.totalCount)
    },
    async [actionTypes.SearchStudent] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const student:any = await fetchData(data, token)
      console.log('data', data)
      console.log('Istudents', student.payload)
    //   console.log('Istudents', students.value)
    //   console.log('Istudents', JSON.parse(JSON.stringify(students)))
    //   console.log('Istudents', JSON.parse(JSON.stringify(students.value)))
    //   console.log('Istudents', students.value)
      if (student.payload) {
        commit(mutationTypes.SetStudent, student.payload)
      } else if (student.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetTotalCount, students.totalCount)
    },
    async [actionTypes.AddNewStudent] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('data is', data)
      const student:any = await addDataFile(data.url, data.data, token)
      if (student.payload) {
        await commit(mutationTypes.SetStudentAlertText, 'Student added successfully')
        await commit(mutationTypes.SetStudentAlertStatus, true)
        await dispatch(actionTypes.FetchStudents)
      } else if (student.message.includes('400')) {
        await commit(mutationTypes.SetStudentAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetStudentAlertStatus, true)
      } else if (student.response.status === 401) {
        router.push({ name: 'Login' });
      } else {
        await commit(mutationTypes.SetStudentAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetStudentAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetStudentAlertStatus, false)
        commit(mutationTypes.SetStudentAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditStudent] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('data is', data)
      const student:any = await editData(data.url, data.data, token)
      if (student.payload) {
        await commit(mutationTypes.SetStudentAlertText, 'Student updated successfully')
        await commit(mutationTypes.SetStudentAlertStatus, true)
        await dispatch(actionTypes.FetchStudents)
      } else if (student.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (student.message.includes('400')) {
        await commit(mutationTypes.SetStudentAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetStudentAlertStatus, true)
      } else {
        await commit(mutationTypes.SetStudentAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetStudentAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetStudentAlertStatus, false)
        commit(mutationTypes.SetStudentAlertText, '')
      }, 2000)
    }
  }
}
