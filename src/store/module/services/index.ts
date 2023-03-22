import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import router from '../../../router'
import { api_url } from '../../../config/index'
import { addData, fetchData, editData, addEmptyData, removeData } from '../../../helpers/api'

export default {
    state: () => ({
        projects: '',
        // outsourcingTalent: localStorage.getItem('outsourcingTalent'),
        outsourcingTalent: [],
        newOutsourcingTalent: {
          jobEngagementType: '',
          noOfResource: '',
          description: '',
          experienceLevel: '',
          role: '',
        },
        outsourcingList: '',
        newOutsourcing: {
          contactName: '',
          companyName: '',
          email: '',
          phoneNumber: '',
          location: '',
          companyType: '',
          jobDetails: [],
        },
        outsourcing: '',
        project: {
          name: '',
          courseId: '',
          startDate: '',
          endDate: '',
          instructor: [],
          projectCapacity: '',
          trainingType: '',
          course: ''
        },
        total_count: '',
        alert_status: false,
        alert_text: '',
        editing: false,
        isEditing: false,
        consultancies: '',
        editconsultancy: '',
        studentsInProject: '',
        title: '',
        outsourcingjobdetails: '',
    }),
    getters: {
        getProject: (state: any) => {
          return computed(() => {
              return state.projects
          })
        },
        getOutsourcingTalent: (state: any) => {
          return computed(() => {
              return state.outsourcingTalent
          })
        },
        getNewOutsourcingTalent: (state: any) => {
          return computed(() => {
              return state.newOutsourcingTalent
          })
        },
        getOutsourcingJobDetails: (state: any) => {
          return computed(() => {
              return state.outsourcingjobdetails
          })
        },
        getNewProject: (state: any) => {
          return computed(() => {
              return state.project
          })
        },
        getTotalProjectCount: (state: any) => {
          return computed(() => {
              return state.total_count
          })
        },
        getOutsourcing: (state: any) => {
          return computed(() => {
              return state.outsourcing
          })
        },
        getNewOutsourcing: (state: any) => {
          return computed(() => {
              return state.newOutsourcing
          })
        },
        getOutsourcingList: (state: any) => {
          return computed(() => {
              return state.outsourcingList
          })
        },
        getConsultancy: (state: any) => {
          return computed(() => {
              return state.consultancies
          })
        },
        getEditConsultancy: (state: any) => {
          return computed(() => {
              return state.editconsultancy
          })
        },
        getProjectAlertStatus: (state: any) => {
          return computed(() => {
            return state.alert_status
          })
        },
        getProjectAlertText: (state: any) => {
          return computed(() => {
            return state.alert_text
          })
        },
        getEditProjectStatus: (state: any) => {
          return computed(() => {
              return state.isEditing
          })
        },
        getProjectTitle: (state: any) => {
          return computed(() => {
              return state.title
          })
        },
        getStudentsInProject: (state: any) => {
          console.log(state.studentsInProject)
          return computed(() => {
            return state.studentsInProject
          })
        }
    },
    mutations: {
      [mutationTypes.SetProject] (state: any, data: any) {
        state.projects = data
      },
      [mutationTypes.SetNewProject] (state: any, data: any) {
        state.project = data
      },
      [mutationTypes.SetTotalProjectCount] (state: any, data: any) {
        state.total_count = data
      },
      [mutationTypes.SetOutsourcing] (state: any, data: any) {
        state.outsourcing = data
      },
      [mutationTypes.SetJobDetail] (state: any, data: any) {
        state.outsourcingjobdetails = data
      },
      [mutationTypes.SetNewOutsourcing] (state: any, data: any) {
        state.newOutsourcing = data
      },
      [mutationTypes.SetEditOutsourcing] (state: any, data: any) {
        state.newOutsourcing = data
      },
      [mutationTypes.SetOutsourcingList] (state: any, data: any) {
        state.outsourcingList = data
      },
      [mutationTypes.SetConsultancy] (state: any, data: any) {
        state.consultancies = data
      },
      // [mutationTypes.SetOutsourcingTalent] (state: any, data: any) {
      //   localStorage.setItem('outsourcingTalent', state.outsourcingTalent = data)
      // },
      [mutationTypes.SetOutsourcingTalent] (state: any, data: any) {
        state.outsourcingTalent = data
      },
      [mutationTypes.SetNewOutsourcingTalent] (state: any, data: any) {
        state.newOutsourcingTalent = data
      },
      [mutationTypes.SetEditConsultancy] (state: any, data: any) {
        state.editconsultancy = data
      },
      [mutationTypes.SetEditStatus] (state: any, data: any) {
        state.isEditing = data
      },
      [mutationTypes.SetEditProject] (state: any, data: any) {
        state.project = data
      },
      [mutationTypes.SetTitle] (state: any, data: any) {
        state.title = data
      },
      [mutationTypes.SetProjectAlertStatus] (state: any, data: any) {
        state.alert_status = data
      },
      [mutationTypes.SetProjectAlertText] (state: any, data: any) {
        state.alert_text = data
      },
      [mutationTypes.SetStudentsInProject] (state: any, data: any) {
        console.log('studentsInaProject', data)
        state.studentsInProject = data
      },
    },
    actions: {
        async [actionTypes.FetchProject] ({ commit }: any, data: any = `${api_url}api/project/get-projects/{page}/{limit}`) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const project:any = await fetchData(data, token)
        //   console.log('data', data)
        //   console.log('Iprojects', projects.payload)
        //   console.log('Iprojects', projects.value)
        //   console.log('Iprojects', JSON.parse(JSON.stringify(projects)))
        //   console.log('Iprojects', JSON.parse(JSON.stringify(projects.value)))
        //   console.log('Iprojects', projects.value)
          if (project.payload) {
            await commit(mutationTypes.SetProject, project)
          } else if (project.response.status === 401) {
            router.push({ name: 'Login' });
          }
          // commit(mutationTypes.SetProject, project)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.FetchOutsourcing] ({ commit }: any, data: any = `${api_url}api/outsourcing/get/{page}/{limit}`) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const outsourcing:any = await fetchData(data, token)
        //   console.log('data', data)
        //   console.log('Ioutsourcings', outsourcings.payload)
        //   console.log('Ioutsourcings', outsourcings.value)
        //   console.log('Ioutsourcings', JSON.parse(JSON.stringify(outsourcings)))
        //   console.log('Ioutsourcings', JSON.parse(JSON.stringify(outsourcings.value)))
        //   console.log('Ioutsourcings', outsourcings.value)
          if (outsourcing.payload) {
            await commit(mutationTypes.SetOutsourcing, outsourcing)
          } else if (outsourcing.response.status === 401) {
            router.push({ name: 'Login' });
          }
          // commit(mutationTypes.SetProject, project)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.FetchConsultancy] ({ commit }: any, data: any = `${api_url}api/consultancy/get-consultancy/{page}/{limit}`) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const consultancy:any = await fetchData(data, token)
        //   console.log('data', data)
        //   console.log('Iconsultancys', consultancys.payload)
        //   console.log('Iconsultancys', consultancys.value)
        //   console.log('Iconsultancys', JSON.parse(JSON.stringify(consultancys)))
        //   console.log('Iconsultancys', JSON.parse(JSON.stringify(consultancys.value)))
        //   console.log('Iconsultancys', consultancys.value)
          if (consultancy.payload) {
            await commit(mutationTypes.SetConsultancy, consultancy)
          } else if (consultancy.response.status === 401) {
            router.push({ name: 'Login' });
          }
          // commit(mutationTypes.SetProject, project)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.FetchJobDetails] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const jobdetail:any = await fetchData(data, token)
        //   console.log('data', data)
          console.log('Ijobdetails', jobdetail.payload)
          console.log('Ijobdetails normal', jobdetail)
        //   console.log('Ijobdetails', jobdetails.value)
        //   console.log('Ijobdetails', JSON.parse(JSON.stringify(jobdetails)))
        //   console.log('Ijobdetails', JSON.parse(JSON.stringify(jobdetails.value)))
        //   console.log('Ijobdetails', jobdetails.value)
          if (jobdetail.payload) {
            await commit(mutationTypes.SetJobDetail, jobdetail)
          } else if (jobdetail.response.status === 401) {
            router.push({ name: 'Login' });
          }
          // commit(mutationTypes.SetProject, project)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.FetchOutsourcingTalents] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const talents:any = await fetchData(data, token)
        //   console.log('data', data)
          console.log('Italentss', talents.payload)
          // console.log('Italentss', talents.value)
        //   console.log('Italentss', JSON.parse(JSON.stringify(talentss)))
        //   console.log('Italentss', JSON.parse(JSON.stringify(talentss.value)))
        //   console.log('Italentss', talentss.value)
          if (talents.payload) {
            await commit(mutationTypes.SetOutsourcingTalent, talents.payload.jobDetails)
          } else if (talents.response.status === 401) {
            router.push({ name: 'Login' });
          }
          // commit(mutationTypes.SetProject, project)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.AddOutsourcingTalent] ({ commit, state }:any, data:any) {
          const outsourcingTalent:any = await JSON.parse(JSON.stringify(state.outsourcingTalent))
          console.log('outsourcing talent here', outsourcingTalent)
          console.log('data', data)
          const newData = [...outsourcingTalent, data]
          console.log('new added outsourcing talent data', newData)
          await commit(mutationTypes.SetOutsourcingTalent, newData)
        },
        async [actionTypes.EditOutsourcing] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          const outsourcing:any = await editData(data.url, data.data, token)
          if (outsourcing.payload) {
            // commit(mutationTypes.SetNewProjectCategory, outsourcing.payload)
            await commit(mutationTypes.SetProjectAlertText, 'Outsourcing updated successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchOutsourcing)
          } else if (outsourcing.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (outsourcing.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.EditOutsourcingTalent] ({ commit, state }:any, data:any) {
          const outsourcingTalent:any = await JSON.parse(JSON.stringify(state.outsourcingTalent))
          console.log('outsourcing talent here', outsourcingTalent)
          console.log('data', data)
          const newData = [...outsourcingTalent, data]
          console.log('new added outsourcing talent data', newData)
          await commit(mutationTypes.SetOutsourcingTalent, newData)
        },
        async [actionTypes.AddOutsourcing] ({ commit, dispatch }:any, data:any) {
          // const outsourcingTalent:any = await JSON.parse(JSON.stringify(state.outsourcingTalent))
          const token:any = localStorage.getItem('token')
          // console.log('outsourcing talent here', outsourcingTalent)
          console.log('data', data)
          // const newData = [...outsourcingTalent, data]
          // console.log('new added outsourcing talent data', newData)
          // await commit(mutationTypes.SetOutsourcingTalent, newData)
          const addOutsourcing:any = await addData(data.url, data.data, token)
          if (!addOutsourcing.hasErrors) {
            // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
            await commit(mutationTypes.SetProjectAlertText, 'Outsourcing added successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchOutsourcing)
          } else if (addOutsourcing.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (addOutsourcing.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveOutsourcingTalent] ({ state, commit }:any, data:any) {
          const outsourcingTalent:any = await JSON.parse(JSON.stringify(state.outsourcingTalent))
          console.log('outsourcing talent here', outsourcingTalent)
          console.log('data', data)
          const itemIndex:any = await outsourcingTalent.findIndex((item:any) => outsourcingTalent.indexOf(item) === data)
          console.log('item index', itemIndex)
          outsourcingTalent.splice(itemIndex, 1)
          console.log('new daleted outsourcing talent data', outsourcingTalent)
          await commit(mutationTypes.SetOutsourcingTalent, outsourcingTalent)
        },
        async [actionTypes.AddStudentToProject] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
            console.log('token here', token)
            console.log('data is', data)
          const addToProject:any = await addData(data.url, data.data, token)
          console.log('addToProject', addToProject)
          if (addToProject.payload) {
            commit(mutationTypes.SetProjectAlertText, 'Student added to project successfully')
            commit(mutationTypes.SetProjectAlertStatus, true)
            dispatch(actionTypes.FetchProject)
          } else if (addToProject.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (addToProject.message.includes('400')) {
            commit(mutationTypes.SetProjectAlertText, 'Student already added to project')
            commit(mutationTypes.SetProjectAlertStatus, true)
          } else if (addToProject.message.includes('404')) {
            commit(mutationTypes.SetProjectAlertText, 'Project not found')
            commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            commit(mutationTypes.SetProjectAlertText, 'Something went wrong')
            commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
          // commit(mutationTypes.SetProject, project.payload)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.FetchStudentsInProject] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here')
          const studentsinproject:any = await fetchData(data, token)
        //   console.log('data', data)
          console.log('Iprojects', studentsinproject.payload)
        //   console.log('Iprojects', projects.value)
        //   console.log('Iprojects', JSON.parse(JSON.stringify(projects)))
        //   console.log('Iprojects', JSON.parse(JSON.stringify(projects.value)))
        //   console.log('Iprojects', projects.value)
          commit(mutationTypes.SetStudentsInProject, studentsinproject)
          commit(mutationTypes.SetTotalProjectCount, studentsinproject.totalCount)
        },
        async [actionTypes.AddProject] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data.url, data.data)
          const newproject:any = await addData(data.url, data.data, token)
          if (newproject.payload) {
            await commit(mutationTypes.SetProjectAlertText, 'Project added successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (newproject.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else if (newproject.response.status === 401) {
            router.push({ name: 'Login' });
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.EditProject] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          const project:any = await editData(data.url, data.data, token)
          if (!project.hasErrors) {
            // commit(mutationTypes.SetNewProjectCategory, project.payload)
            await commit(mutationTypes.SetProjectAlertText, 'Project updated successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (project.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (project.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveProject] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const newproject:any = await removeData(data, token)
          console.log('newproject', newproject)
          if (!newproject.hasErrors) {
            await commit(mutationTypes.SetProjectAlertText, 'Project removed successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (newproject.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (newproject.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveConsultancy] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const newproject:any = await removeData(data, token)
          console.log('newproject', newproject)
          if (!newproject.hasErrors) {
            await commit(mutationTypes.SetProjectAlertText, 'Consultancy removed successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (newproject.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (newproject.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveOutsourcing] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const outsourcing:any = await removeData(data, token)
          console.log('outsourcing', outsourcing)
          if (!outsourcing.hasErrors) {
            await commit(mutationTypes.SetProjectAlertText, 'Outsourcing removed successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchOutsourcing)
          } else if (outsourcing.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (outsourcing.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveStudentFromProject] ({ commit, dispatch }: any, data: any) {
          console.log('i am here')
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const newproject:any = await addData(data.url, data.data, token)
          console.log('newproject', newproject)
          if (!newproject.hasErrors) {
            await commit(mutationTypes.SetProjectAlertText, 'Student removed successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (newproject.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.FetchEditProject] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const project:any = await fetchData(data, token)
          console.log('project', project)
          if (project.payload) {
            commit(mutationTypes.SetEditProject, project.payload)
          } else if (project.response.status === 401) {
            router.push({ name: 'Login' });
          }
        },
        async [actionTypes.FetchEditOutsourcing] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const outsourcing:any = await fetchData(data, token)
          console.log('outsourcing', outsourcing)
          if (outsourcing.payload) {
            commit(mutationTypes.SetEditOutsourcing, outsourcing.payload)
          } else if (outsourcing.response.status === 401) {
            router.push({ name: 'Login' });
          }
        },
        async [actionTypes.FetchEditConsultancy] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const consultancy:any = await fetchData(data, token)
          console.log('consultancy', consultancy)
          if (consultancy.payload) {
            commit(mutationTypes.SetEditConsultancy, consultancy.payload)
          } else if (consultancy.response.status === 401) {
            router.push({ name: 'Login' });
          }
        },
        async [actionTypes.UpdateProjectStatus] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token in update')
          console.log('update data is', data)
          const UpdateProjectStatus:any = await addEmptyData(data, token)
          console.log('UpdateProjectStatus', UpdateProjectStatus)
          if (UpdateProjectStatus.payload) {
            await commit(mutationTypes.SetProjectAlertText, 'Project status updated successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchConsultancy)
          } else if (UpdateProjectStatus.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (UpdateProjectStatus.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Bad request received')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else if (UpdateProjectStatus.message.includes('404')) {
            await commit(mutationTypes.SetProjectAlertText, 'Applicant not found')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Something went wrong')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.UpdateOutsourcingStatus] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token in update', token)
          console.log('update data is', data)
          const UpdateOutsourcingStatus:any = await addEmptyData(data, token)
          console.log('UpdateOutsourcingStatus', UpdateOutsourcingStatus)
          if (UpdateOutsourcingStatus.payload) {
            await commit(mutationTypes.SetProjectAlertText, 'Outsourcing status updated successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchOutsourcing)
          } else if (UpdateOutsourcingStatus.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (UpdateOutsourcingStatus.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Bad request received')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else if (UpdateOutsourcingStatus.message.includes('404')) {
            await commit(mutationTypes.SetProjectAlertText, 'Outsourcing not found')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Something went wrong')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.UpdateConsultancyStatus] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token in update')
          console.log('update data is', data)
          const UpdateConsultancyStatus:any = await addEmptyData(data, token)
          console.log('UpdateConsultancyStatus', UpdateConsultancyStatus)
          if (UpdateConsultancyStatus.payload) {
            await commit(mutationTypes.SetProjectAlertText, 'Consultancy status updated successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchConsultancy)
          } else if (UpdateConsultancyStatus.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (UpdateConsultancyStatus.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Bad request received')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else if (UpdateConsultancyStatus.message.includes('404')) {
            await commit(mutationTypes.SetProjectAlertText, 'Applicant not found')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Something went wrong')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
    },
}