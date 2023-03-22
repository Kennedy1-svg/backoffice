import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import router from '../../../router'
import { addData, fetchData, editData, removeData, addEmptyData, addDataFile } from '../../../helpers/api';

export default {
  state: () => ({
      courses: '',
      course_applicants: '',
      course_applicant: {
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        CourseId: '',
        Sex: '',
        Addresss: '',
        OtherNames: '',
      },
      course: {
        title: '',
        courseCode: '',
        subTitle: '',
        description: '',
        thumbnail: '',
        cost: '',
        duration: '',
        levelType: '',
        categories: [],
        banner: '',
        resourceUrl: '',
        CourseLine1: '',
        CourseLine2: '',
        CourseLine3: '',
        CourseLine4: '',
        CourseLine5: '',
        isActive: false,
        isFeatured: false,
      },
      categories: '',
      editcourse: '',
      curriculum: {
        title: '',
        subTitle: '',
        duration: ''
      },
      newCurriculumBatch: localStorage.getItem('newCurriculumBatch'),
      editcourseapplicant: '',
      allCurriculum: [],
      course_categories: '',
      course_category: {
        name: '',
        description: '',
      },
      alert_status: false,
      alert_text: '',
  }),
  getters: {
    getCourses: (state: any) => {
      return computed(() => {
        return state.courses
      })
    },
    getNumberOfCurriculum: (state:any) => {
        return computed(() => {
            return state.curriculum.length
        })
    },
    getCourseCategories: (state: any) => {
      return computed(() => {
        return state.course_categories
      })
    },
    getEditCourse: (state: any) => {
      return computed(() => {
        return state.editcourse
      })
    },
    getEditCourseApplicant: (state: any) => {
      return computed(() => {
        return state.editcourseapplicant
      })
    },
    getNewCourseCategory: (state: any) => {
      return computed(() => {
        return state.course_category
      })
    },
    getNewCourse: (state: any) => {
      return computed(() => {
        return state.course
      })
    },
    getNewCurriculum: (state: any) => {
      return computed(() => {
        return state.curriculum
      })
    },
    getCurriculum: (state: any) => {
      return computed(() => {
        return state.allCurriculum
      })
    },
    getNewCurriculumBatch: (state: any) => {
      return computed(() => {
        return state.newCurriculumBatch
      })
    },
    getCourseApplicants: (state: any) => {
      return computed(() => {
        return state.course_applicants
      })
    },
    getNewCourseApplicant: (state: any) => {
      return computed(() => {
        return state.course_applicant
      })
    },
    getCourseAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },
    getCourseAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
  },
  mutations: {
    [mutationTypes.SetCourses] (state: any, data: any) {
      state.courses = data
    },
    [mutationTypes.SetCurriculum] (state: any, data: any) {
      state.allCurriculum = data
    },
    [mutationTypes.SetNewCurriculum] (state:any, data:any) {
      state.curriculum = data
    },
    [mutationTypes.SetNewCourseCategory] (state: any, data: any) {
      state.course_category = data
    },
    [mutationTypes.SetNewCourse] (state: any, data: any) {
      state.course = data
    },
    [mutationTypes.SetCourseCategories] (state: any, data: any) {
      state.course_categories = data
    },
    [mutationTypes.setCurriculum] (state: any, data: any) {
      localStorage.setItem('newCurriculumBatch', state.newCurriculumBatch = data)
    },
    [mutationTypes.removeCurriculum] (state: any, data: any) {
      state.newCurriculumBatch = data
    },
    [mutationTypes.SetEditCourse] (state: any, data: any) {
      console.log('i don reach to update')
      state.editcourse = data
      // console.log('this is data in edit course', state.editcourse)
    },
    [mutationTypes.SetEditCourseApplicant] (state: any, data: any) {
      state.editcourseapplicant = data
    },
    [mutationTypes.SetCourseApplicants] (state: any, data: any) {
      state.course_applicants = data
    },
    [mutationTypes.SetNewCourseApplicant] (state: any, data: any) {
      state.course_applicant = data
    },
    [mutationTypes.SetCourseAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetCourseAlertText] (state: any, data: any) {
      state.alert_text = data
    },
    [mutationTypes.SetEditCourseCategory] (state: any, data: any) {
      state.course_category = data
    },
  },
  actions: {
    async [actionTypes.FetchCourses] ({ commit }: any, data: any = `${api_url}api/course/get-courses/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const courses:any = await fetchData(data, token)
      console.log('courses', courses)
      if (courses.payload) {
        await commit(mutationTypes.SetCourses, courses)
      } else if (courses.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.AddCurriculum] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      const courses:any = await fetchData(data, token)
      console.log('courses', courses)
      if (courses.payload) {
        await commit(mutationTypes.SetCourses, courses)
      } else if (courses.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchCourseCategories] ({ commit }: any, data: any = `${api_url}api/coursecategory/get-categories/{pageNumber}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      console.log('data', data)
      const categories:any = await fetchData(data, token)
      console.log('categories', categories)
      if (categories.payload) {
        await commit(mutationTypes.SetCourseCategories, categories)
      } else if (categories.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditCourse] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course:any = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Icourses', course.payload)
    //   console.log('Icourses', courses.value)
    //   console.log('Icourses', JSON.parse(JSON.stringify(courses)))
    //   console.log('Icourses', JSON.parse(JSON.stringify(courses.value)))
    //   console.log('Icourses', courses.value)
      if (course.payload) {
        await commit(mutationTypes.SetEditCourse, course.payload)
      } else if (course.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // await commit(mutationTypes.SetNewCourse, course.payload)
    },
    async [actionTypes.AddToCurriculum] ({state, commit}:any, data:any) {
      const newSet:any = await JSON.parse(JSON.stringify(state.newCurriculumBatch))
      const token:any = localStorage.getItem('token')
      console.log('state of things', newSet)
      console.log('data is al ', data)
      // console.log('data is bali ', JSON.parse(JSON.stringify(state.allCurriculum)).payload)
      const curriculum:any = [...newSet, data]
      // const curriculum:any = await newSet.value.concat(data)
      console.log('curriculum things e be something', curriculum)
      await commit(mutationTypes.setCurriculum, curriculum)
      console.log('curriculum things be', state.newCurriculumBatch)
    },
    async [actionTypes.EditTopicInCurriculum] ({state, commit}:any, data:any) {
      const oldSet:any = await JSON.parse(JSON.stringify(state.newCurriculumBatch))
      console.log('state of things', oldSet)
      console.log('data is al ', data)
      console.log('data is bali ', JSON.parse(JSON.stringify(state.allCurriculum)).payload)

      const newSet:any = oldSet.map((item:any) => {
        if (item.id == data.id) {
          return data
        }
        return item;
      });

      console.log('newdata coming is ', newSet)
      // const curriculum:any = [...newSet, data]
      // const curriculum:any = await newSet.value.concat(data)
      // console.log('curriculum things be', curriculum.value)
      // await commit(mutationTypes.setCurriculum, curriculum)
      // console.log('curriculum things be', state.newCurriculumBatch)
    },
    async [actionTypes.removeCurriculum] ({state, commit}:any, data:any) {
      console.log('data is al ', data)
      const newSet:any = await JSON.parse(JSON.stringify(state.newCurriculumBatch))
      console.log('state of things', newSet)
      const itemIndex:any = await newSet.findIndex((item: any) => newSet.indexOf(item) === data)
      console.log('item index', itemIndex)
      newSet.splice(itemIndex, 1)
      console.log('new thing', newSet)
      await commit(mutationTypes.setCurriculum, newSet)
      // console.log('curriculum things be', state.newCurriculumBatch)
    },
    async [actionTypes.editCurriculum] ({state, commit}:any, data:any) {
      console.log('data is al ', data)
      const newSet:any = await JSON.parse(JSON.stringify(state.newCurriculumBatch))
      console.log('state of things', newSet)
      const itemIndex:any = await newSet.findIndex((item: any) => item.id === data)
      console.log('item index', itemIndex)
      newSet.splice(itemIndex, 1)
      console.log('new thing', newSet)
      await commit(mutationTypes.setCurriculum, newSet)
      // console.log('curriculum things be', state.newCurriculumBatch)
    },
    async [actionTypes.fetchEditCurriculum] ({state, commit}:any, data:any) {
      console.log('data is al ', data)
      const newSet:any = await JSON.parse(JSON.stringify(state.newCurriculumBatch))
      console.log('state of things', newSet)
      const itemIndex:any = await newSet.findIndex((item: any) => item.id === data)
      console.log('item index', itemIndex)
      const newthing:any = await newSet.splice(itemIndex, 1)
      console.log('new thing', newthing)
      await commit(mutationTypes.setCurriculum, newthing)
      // console.log('curriculum things be', state.newCurriculumBatch)
    },
    async [actionTypes.AddNewCourseApplicant] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_applicant:any = await addData(data.url, data.data, token)
      if (!course_applicant.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetCourseAlertText, 'Course Applicant added successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseApplicants)
      } else if (course_applicant.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (course_applicant.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.UploadCurriculum] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token in update')
      console.log('update data is', data)
      const uploadCurriculum:any = await addDataFile(data.url, data.data, token)
      console.log('uploadCurriculum', uploadCurriculum)
      if (uploadCurriculum.payload) {
        await commit(mutationTypes.SetCourseAlertText, 'Curriculum uploaded successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCurriculum)
      } else if (uploadCurriculum.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (uploadCurriculum.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Bad request received')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else if (uploadCurriculum.message.includes('404')) {
        await commit(mutationTypes.SetCourseAlertText, 'Applicant not found')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Something went wrong')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.UpdateCurriculum] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token in update')
      console.log('updated data is', data)
      const UploadCurriculum:any = await addData(data.url, data.data, token)
      console.log('UploadCurriculum', UploadCurriculum)
      if (UploadCurriculum.payload) {
        await commit(mutationTypes.SetCourseAlertText, 'Curriculum updated successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseApplicants)
      } else if (UploadCurriculum.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (UploadCurriculum.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Bad request received')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else if (UploadCurriculum.message.includes('404')) {
        await commit(mutationTypes.SetCourseAlertText, 'Applicant not found')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Something went wrong')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.UpdateApplicantStatus] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token in update')
      console.log('update data is', data)
      const updateApplicantStatus:any= await addEmptyData(data, token)
      console.log('updateApplicantStatus', updateApplicantStatus)
      if (updateApplicantStatus.payload) {
        await commit(mutationTypes.SetCourseAlertText, 'Applicant status updated successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseApplicants)
      } else if (updateApplicantStatus.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (updateApplicantStatus.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Bad request received')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else if (updateApplicantStatus.message.includes('404')) {
        await commit(mutationTypes.SetCourseAlertText, 'Applicant not found')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Something went wrong')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchEditCourseApplicant] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const applicant:any = await fetchData(data, token)
      console.log('data tch', applicant.payload)
      if (applicant.payload) {
        await commit(mutationTypes.SetEditCourseApplicant, applicant.payload)
      } else if (applicant.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.AddNewCourseCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category:any = await addData(data.url, data.data, token)
      if (!course_category.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_category.payload)
        await commit(mutationTypes.SetCourseAlertText, 'Course Category added successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseCategories)
      } else if (course_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (course_category.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.AddNewCourse] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await addData(data.url, data.data, token)
      if (!course_category.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_category.payload)
        await commit(mutationTypes.SetCourseAlertText, 'Course added successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourses)
      } else if (course_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (course_category.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditCourse] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category:any = await editData(data.url, data.data, token)
      if (!course_category.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_category.payload)
        await commit(mutationTypes.SetCourseAlertText, 'Course updated successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourses)
      } else if (course_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (course_category.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchCourseApplicants] ({ commit }: any, data: any = `${api_url}api/courseapplicant/get-courseapplicant/{pageNumber}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const courseapplicants:any = await fetchData(data, token)
      console.log('course applicants', courseapplicants)
      if (courseapplicants.payload) {
        await commit(mutationTypes.SetCourseApplicants, courseapplicants)
      } else if (courseapplicants.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchCurriculum] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      const curriculum:any = await fetchData(data, token)
      console.log('course curriculum', curriculum)
      if (curriculum.payload) {
        await commit(mutationTypes.setCurriculum, curriculum.payload)
      } else if (curriculum.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditCourseCategory] ({ commit }: any, data: any) {
      await commit(mutationTypes.SetEditCourseCategory, data)
    },
    async [actionTypes.EditCourseCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category:any = await editData(data.url, data.data, token)
      if (!course_category.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_category.payload)
        await commit(mutationTypes.SetCourseAlertText, 'Course Category updated successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseCategories)
      } else if (course_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (course_category.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        // commit(mutationTypes.SetNewCourseCategory, '')
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveCourseCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category:any = await removeData(data, token)
      if (!course_category.hasErrors) {
        await commit(mutationTypes.SetCourseAlertText, 'Course Category removed successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseCategories)
      } else if (course_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (course_category.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.DeleteCurriculum] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_curriculum:any = await removeData(data, token)
      if (!course_curriculum.hasErrors) {
        await commit(mutationTypes.SetCourseAlertText, 'Course Curriculum removed successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseCategories)
      } else if (course_curriculum.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (course_curriculum.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveCourseApplicant] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category:any = await removeData(data, token)
      if (!course_category.hasErrors) {
        await commit(mutationTypes.SetCourseAlertText, 'Course Applicant removed successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseApplicants)
      } else if (course_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (course_category.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveCourse] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course:any = await removeData(data, token)
      if (!course.hasErrors) {
        await commit(mutationTypes.SetCourseAlertText, 'Course removed successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourses)
      } else if (course.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (course.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    }
  },
}