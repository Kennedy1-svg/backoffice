import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config/index'
import router from '../../../router'
import { addData, addEmptyData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
  state: () => ({
    file: '',
    instructors: [],
    instructor: {
      FirstName: '',
      LastName: '',
      Email: '',
      PhoneNumber: '',
      Address: '',
      Image: '',
      OtherName: '',
      Gender: '',
      Course: '',
      Resume: '',
      ExperienceLevel: '',
      Bio: '',
      FacebookUrl: '',
      TwitterUrl: '',
      GithubUrl: '',
      LinkedInUrl: '',
    },
    alert_status: false,
    alert_text: '',
    skills: '',
    skill: {
      name: '',
    },
    editskill: '',
    talents: '',
    talent: {
      FirstName: '',
      LastName: '',
      Email: '',
      PhoneNumber: '',
      Skills: [],
      Role: '',
      ProficiencyLevel: '',
      Gender: '',
      ResumeFile: '',
      GitHubUrl: '',
      LinkedInUrl: '',
    },
    edittalent: '',
    editinstructor: '',
    total_count: '',
    isEditing: false,
    title: ''
  }),
  getters: {
    getInstructor: (state: any) => {
      return computed(() => {
        return state.instructors
      })
    },
    getSkills: (state: any) => {
      return computed(() => {
        return state.skills
      })
    },
    getFile: (state: any) => {
      return computed(() => {
        return state.file
      })
    },
    getTalents: (state: any) => {
      return computed(() => {
        return state.talents
      })
    },
    getEditTalent: (state: any) => {
      return computed(() => {
        return state.edittalent
      })
    },
    getNewTalent: (state: any) => {
      return computed(() => {
        return state.talent
      })
    },
    getEditSkill: (state: any) => {
      return computed(() => {
        return state.editskill
      })
    },
    getNewSkill: (state: any) => {
      return computed(() => {
        return state.skill
      })
    },
    getEditInstructor: (state: any) => {
      return computed(() => {
        return state.editinstructor
      })
    },
    getNewInstructor: (state: any) => {
      return computed(() => {
        return state.instructor
      })
    },
    getInstructorTotalCount: (state: any) => {
      return computed(() => {
        console.log('total_count here', state.total_count)
        return state.total_count
      })
    },
    getEditInstructorStatus: (state: any) => {
      return computed(() => {
        return state.isEditing
      })
    },
    getInstructorTitle: (state: any) => {
      return computed(() => {
        return state.title
      })
    },
    getInstructorAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },
    getInstructorAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
  },
  mutations: {
    [mutationTypes.SetInstructor] (state: any, data: any) {
      state.instructors = data
    },
    [mutationTypes.SetEditInstructor] (state: any, data: any) {
      state.editinstructor = data
    },
    [mutationTypes.SetNewInstructor] (state: any, data: any) {
      state.instructor = data
    },
    [mutationTypes.SetFile] (state: any, data: any) {
      state.file = data
    },
    [mutationTypes.SetSkill] (state: any, data: any) {
      state.skills = data
    },
    [mutationTypes.SetEditSkill] (state: any, data: any) {
      state.editskill = data
    },
    [mutationTypes.SetNewSkill] (state: any, data: any) {
      state.skill = data
    },
    [mutationTypes.SetTalent] (state: any, data: any) {
      state.talents = data
    },
    [mutationTypes.SetEditTalent] (state: any, data: any) {
      state.edittalent = data
    },
    [mutationTypes.SetNewTalent] (state: any, data: any) {
      state.talent = data
    },
    [mutationTypes.SetInstructorAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetInstructorAlertText] (state: any, data: any) {
      state.alert_text = data
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
  },
  actions: {
    async [actionTypes.FetchInstructors] ({ commit }: any, data: any = `${api_url}api/instructor/get-instructors/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const instructors:any = await fetchData(data, token)
      console.log('data fe', data)
      console.log('Iinstructors', instructors.payload)
    //   console.log('Iinstructors', instructors.value)
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors)))
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors.value)))
    //   console.log('Iinstructors', instructors.value)
      if (instructors.payload) {
        await commit(mutationTypes.SetInstructor, instructors)
        await commit(mutationTypes.SetTotalCount, instructors.totalCount)
      } else if (instructors.message.includes('400')) {
        await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (instructors.message.includes('404')) {
        await commit(mutationTypes.SetInstructorAlertText, 'Instructor not found')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (instructors.response.status === 401) {
        router.push({ name: 'Login' });
      } else {
        await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetInstructorAlertStatus, false)
        commit(mutationTypes.SetInstructorAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchTalents] ({ commit }: any, data: any = `${api_url}api/talentpool/get-talents/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const talents:any = await fetchData(data, token)
      console.log('data fe', data)
      console.log('Italents', talents.payload)
    //   console.log('Italents', talents.value)
    //   console.log('Italents', JSON.parse(JSON.stringify(talents)))
    //   console.log('Italents', JSON.parse(JSON.stringify(talents.value)))
    //   console.log('Italents', talents.value)
      // await commit(mutationTypes.SetTotalCount, talents.totalCount)
      if (talents.payload) {
      await commit(mutationTypes.SetTalent, talents)
      } else if (talents.message.includes('400')) {
        await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (talents.message.includes('404')) {
        await commit(mutationTypes.SetInstructorAlertText, 'Talents not found')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (talents.response.status === 401) {
        router.push({ name: 'Login' });
      } else {
        await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetInstructorAlertStatus, false)
        commit(mutationTypes.SetInstructorAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchSkills] ({ commit }: any, data: any = `${api_url}api/skill/get-skills/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const skill:any = await fetchData(data, token)
      console.log('data fe', data)
      console.log('Iskill', skill.payload)
    //   console.log('Iskill', skill.value)
    //   console.log('Iskill', JSON.parse(JSON.stringify(skill)))
    //   console.log('Iskill', JSON.parse(JSON.stringify(skill.value)))
    //   console.log('Iskill', skill.value)
      // await commit(mutationTypes.SetSkill, skill)
      // await commit(mutationTypes.SetTotalCount, skill.totalCount)
      if (skill.payload) {
          await commit(mutationTypes.SetSkill, skill)
        } else if (skill.message.includes('400')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (skill.message.includes('404')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Skills not found')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (skill.response.status === 401) {
          router.push({ name: 'Login' });
        } else {
          await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        }

        setTimeout(() => {
          commit(mutationTypes.SetInstructorAlertStatus, false)
          commit(mutationTypes.SetInstructorAlertText, '')
        }, 2000)
    },
    async [actionTypes.FetchFile] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const file:any = await fetchData(data, token)
      console.log('data fe', data)
      console.log('Ifile', file.response.status)
    //   console.log('Ifile', file.value)
    //   console.log('Ifile', JSON.parse(JSON.stringify(file)))
    //   console.log('Ifile', JSON.parse(JSON.stringify(file.value)))
    //   console.log('Ifile', file.value)
      // await commit(mutationTypes.SetSkill, file)
      // await commit(mutationTypes.SetTotalCount, file.totalCount)
      if (file.payload) {
          await commit(mutationTypes.SetFile, file)
        } else if (file.response.status === 401) {
          router.push({ name: 'Login' });
        }

        setTimeout(() => {
          commit(mutationTypes.SetInstructorAlertStatus, false)
          commit(mutationTypes.SetInstructorAlertText, '')
        }, 2000)
    },
    async [actionTypes.FetchEditSkill] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      // const skill:any = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Iskills', skill.payload)
    //   console.log('Iskills', skills.value)
    //   console.log('Iskills', JSON.parse(JSON.stringify(skills)))
    //   console.log('Iskills', JSON.parse(JSON.stringify(skills.value)))
    //   console.log('Iskills', skills.value)
      await commit(mutationTypes.SetEditSkill, data)
      await commit(mutationTypes.SetNewSkill, data)
      // commit(mutationTypes.SetTotalCount, skills.totalCount)
    },
    async [actionTypes.FetchEditTalent] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const talent:any = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Italents', talent.payload)
    //   console.log('Italents', talents.value)
    //   console.log('Italents', JSON.parse(JSON.stringify(talents)))
    //   console.log('Italents', JSON.parse(JSON.stringify(talents.value)))
    //   console.log('Italents', talents.value)
      await commit(mutationTypes.SetEditTalent, talent.payload)
      await commit(mutationTypes.SetNewTalent, talent.payload)
      // commit(mutationTypes.SetTotalCount, skills.totalCount)
    },
    async [actionTypes.FetchEditInstructor] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const instructor:any = await fetchData(data, token)
      console.log('data tch', data)
      console.log('Iinstructors', instructor.payload)
    //   console.log('Iinstructors', instructors.value)
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors)))
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors.value)))
    //   console.log('Iinstructors', instructors.value)
      await commit(mutationTypes.SetEditInstructor, instructor.payload)
      // commit(mutationTypes.SetTotalCount, instructors.totalCount)
    },
    async [actionTypes.RemoveSkill] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const skill:any = await removeData(data, token)
      console.log('data tch', data)
      if (!skill.hasErrors) {
        await commit(mutationTypes.SetInstructorAlertText, 'Skill removed successfully')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
        await dispatch(actionTypes.FetchSkills)
      } else if (skill.response.status === 400) {
        await commit(mutationTypes.SetInstructorAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (skill.response.status === 401) {
        router.push({ name: 'Login' });
      } else {
        await commit(mutationTypes.SetInstructorAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetInstructorAlertStatus, false)
        commit(mutationTypes.SetInstructorAlertText, '')
      }, 2000)
      // console.log('Iinstructors', instructor.payload)
    //   console.log('Iinstructors', instructors.value)
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors)))
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors.value)))
    //   console.log('Iinstructors', instructors.value)
      await dispatch(actionTypes.FetchSkills)
      // commit(mutationTypes.SetTotalCount, instructors.totalCount)
    },
    async [actionTypes.RemoveTalent] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const skill:any = await removeData(data, token)
      console.log('data tch', data)
      if (!skill.hasErrors) {
        await commit(mutationTypes.SetInstructorAlertText, 'Talent removed successfully')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
        await dispatch(actionTypes.FetchTalents)
      } else if (skill.message.includes('400')) {
        await commit(mutationTypes.SetInstructorAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (skill.response.status === 401) {
        router.push({ name: 'Login' });
      } else {
        await commit(mutationTypes.SetInstructorAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetInstructorAlertStatus, false)
        commit(mutationTypes.SetInstructorAlertText, '')
      }, 2000)
      // console.log('Iinstructors', instructor.payload)
    //   console.log('Iinstructors', instructors.value)
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors)))
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors.value)))
    //   console.log('Iinstructors', instructors.value)
      // await dispatch(actionTypes.FetchSkills)
      // commit(mutationTypes.SetTotalCount, instructors.totalCount)
    },
    async [actionTypes.RemoveInstructor] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const instructor:any = await removeData(data, token)
      console.log('data tch', data)
      if (!instructor.hasErrors) {
        await commit(mutationTypes.SetInstructorAlertText, 'Instructor removed successfully')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
        await dispatch(actionTypes.FetchInstructors)
      } else if (instructor.message.includes('400')) {
        await commit(mutationTypes.SetInstructorAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (instructor.response.status === 401) {
        router.push({ name: 'Login' });
      } else {
        await commit(mutationTypes.SetInstructorAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetInstructorAlertStatus, false)
        commit(mutationTypes.SetInstructorAlertText, '')
      }, 2000)
      // console.log('Iinstructors', instructor.payload)
    //   console.log('Iinstructors', instructors.value)
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors)))
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors.value)))
    //   console.log('Iinstructors', instructors.value)
      await dispatch(actionTypes.FetchInstructors)
      // commit(mutationTypes.SetTotalCount, instructors.totalCount)
    },
    async [actionTypes.FilterInstructor] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const instructor:any = await fetchData(data, token)
      console.log('data', data)
      console.log('Iinstructors', instructor.payload)
    //   console.log('Iinstructors', instructors.value)
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors)))
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors.value)))
    //   console.log('Iinstructors', instructors.value)
      // commit(mutationTypes.SetTotalCount, instructors.totalCount)
      if (instructor.payload) {
        await commit(mutationTypes.SetInstructor, instructor.payload)
        } else if (instructor.message.includes('400')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (instructor.message.includes('404')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Instructor not found')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (instructor.response.status === 401) {
          router.push({ name: 'Login' });
        } else {
          await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        }

        setTimeout(() => {
          commit(mutationTypes.SetInstructorAlertStatus, false)
          commit(mutationTypes.SetInstructorAlertText, '')
        }, 2000)
    },
    async [actionTypes.AddNewInstructor] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('data is', data)
      const instructor:any = await addData(data.url, data.data, token)
      if (instructor.payload) {
          await dispatch(actionTypes.FetchInstructors)
        } else if (instructor.message.includes('400')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (instructor.message.includes('404')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Instructor not found')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (instructor.response.status === 401) {
          router.push({ name: 'Login' });
        } else {
          await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        }

        setTimeout(() => {
          commit(mutationTypes.SetInstructorAlertStatus, false)
          commit(mutationTypes.SetInstructorAlertText, '')
        }, 2000)
    },
    async [actionTypes.AddNewSkill] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('data is', data)
      const skill:any = await addData(data.url, data.data, token)
      if (skill.payload) {
          await dispatch(actionTypes.FetchSkills)
        } else if (skill.message.includes('400')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (skill.message.includes('404')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Instructor not found')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (skill.response.status === 401) {
          router.push({ name: 'Login' });
        } else {
          await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        }

        setTimeout(() => {
          commit(mutationTypes.SetInstructorAlertStatus, false)
          commit(mutationTypes.SetInstructorAlertText, '')
        }, 2000)
    },
    async [actionTypes.AddNewTalent] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('data is', data)
      const talent:any = await addData(data.url, data.data, token)
      if (talent.payload) {
          await dispatch(actionTypes.FetchTalents)
        } else if (talent.message.includes('400')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (talent.message.includes('404')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Talent not found')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (talent.response.status === 401) {
          router.push({ name: 'Login' });
        } else {
          await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        }

        setTimeout(() => {
          commit(mutationTypes.SetInstructorAlertStatus, false)
          commit(mutationTypes.SetInstructorAlertText, '')
        }, 2000)
    },
    async [actionTypes.UpdateSkill] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('data is', data)
      const skill:any = await editData(data.url, data.data, token)
      if (skill.payload) {
          await dispatch(actionTypes.FetchSkills)
          await commit(mutationTypes.SetInstructorAlertText, 'Skill updated successfully')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (skill.message.includes('400')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (skill.message.includes('404')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Skill not found')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (skill.response.status === 401) {
          router.push({ name: 'Login' });
        } else {
          await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        }

        setTimeout(() => {
          commit(mutationTypes.SetInstructorAlertStatus, false)
          commit(mutationTypes.SetInstructorAlertText, '')
        }, 2000)
    },
    async [actionTypes.EditInstructor] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('data is', data)
      const instructor:any = await editData(data.url, data.data, token)
      if (instructor.payload) {
          await dispatch(actionTypes.FetchInstructors)
          await commit(mutationTypes.SetInstructorAlertText, 'Instructor updated successfully')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (instructor.message.includes('400')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (instructor.message.includes('404')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Instructor not found')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (instructor.response.status === 401) {
          router.push({ name: 'Login' });
        } else {
          await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        }

        setTimeout(() => {
          commit(mutationTypes.SetInstructorAlertStatus, false)
          commit(mutationTypes.SetInstructorAlertText, '')
        }, 2000)
    },
    async [actionTypes.EditTalent] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('data is', data)
      const talent:any = await editData(data.url, data.data, token)
      if (talent.payload) {
          await dispatch(actionTypes.FetchTalents)
          await commit(mutationTypes.SetInstructorAlertText, 'Talent updated successfully')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (talent.message.includes('400')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (talent.message.includes('404')) {
          await commit(mutationTypes.SetInstructorAlertText, 'Talent not found')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        } else if (talent.response.status === 401) {
          router.push({ name: 'Login' });
        } else {
          await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
          await commit(mutationTypes.SetInstructorAlertStatus, true)
        }

        setTimeout(() => {
          commit(mutationTypes.SetInstructorAlertStatus, false)
          commit(mutationTypes.SetInstructorAlertText, '')
        }, 2000)
    },
    async [actionTypes.UpdateInstructorStatus] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('update data is', data)
      const updateInstructorStatus:any = await addEmptyData(data, token)
      console.log('updateInstructorStatus', updateInstructorStatus)
      if (updateInstructorStatus.payload) {
        await commit(mutationTypes.SetInstructorAlertText, 'Instructor status updated successfully')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
        await dispatch(actionTypes.FetchInstructors)
      } else if (updateInstructorStatus.message.includes('400')) {
        await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (updateInstructorStatus.message.includes('404')) {
        await commit(mutationTypes.SetInstructorAlertText, 'Instructor not found')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (updateInstructorStatus.response.status === 401) {
        router.push({ name: 'Login' });
      } else {
        await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetInstructorAlertStatus, false)
        commit(mutationTypes.SetInstructorAlertText, '')
      }, 2000)
    },
    async [actionTypes.UpdateTalentStatus] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('update data is', data)
      const updateTalentStatus:any = await addEmptyData(data, token)
      console.log('updateTalentStatus', updateTalentStatus)
      if (updateTalentStatus.payload) {
        await commit(mutationTypes.SetInstructorAlertText, 'Talent status updated successfully')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
        await dispatch(actionTypes.FetchTalents)
      } else if (updateTalentStatus.message.includes('400')) {
        await commit(mutationTypes.SetInstructorAlertText, 'Bad request received')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (updateTalentStatus.message.includes('404')) {
        await commit(mutationTypes.SetInstructorAlertText, 'Talent not found')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      } else if (updateTalentStatus.response.status === 401) {
        router.push({ name: 'Login' });
      } else {
        await commit(mutationTypes.SetInstructorAlertText, 'Something went wrong')
        await commit(mutationTypes.SetInstructorAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetInstructorAlertStatus, false)
        commit(mutationTypes.SetInstructorAlertText, '')
      }, 2000)
    }
  }
}
