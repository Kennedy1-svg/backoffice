<script lang="ts">
export default {
  name: 'AddCourse',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import alert from '../../alerts.vue';
import SvgIcons from '../../SvgIcons.vue';
import Switch from '../../switch.vue'
import Modal from '../../Modal.vue';
import multiselect from '@vueform/multiselect'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import * as studentActionTypes from '../../../store/module/students/constants/action'
import * as courseMutationTypes from '../../../store/module/courses/constants/mutation'
import { useStore } from 'vuex';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

// const alertState:any = computed(() => store.getters.getCourseAlertStatus.value)
// const alertText:any = computed(() => store.getters.getCourseAlertText.value)

// const alertState:any = ref(false)
// const alertText:any = ref(false)
const isBannerActive:any = computed(() => {
    let answer:any = false
    if (newCourse.value.banner) {
        answer = true
    }
    return answer
})
const isThumbnailActive:any = computed(() => {
    let answer:any = false
    if (newCourse.value.thumbnail) {
        answer = true
    }
    return answer
})
const isBannerRemoved:any = ref(false)
const isThumbnailRemoved:any = ref(false)

let errors = reactive({
    title: false,
    titleText: '',
    courseCode: false,
    courseCodeText: '',
    cost: false,
    costText: '',
    CourseLine1: false,
    CourseLine1Text: '',
    CourseLine2: false,
    CourseLine2Text: '',
    CourseLine3: false,
    CourseLine3Text: '',
    CourseLine4: false,
    CourseLine4Text: '',
    CourseLine5: false,
    CourseLine5Text: '',
    resource: false,
    resourceText: '',
    levels: false,
    levelsText: '',
    categories: false,
    categoriesText: '',
    duration: false,
    durationText: '',
    subTitle: false,
    subTitleText: '',
    banner: false,
    bannerText: '',
    thumbnail: false,
    thumbnailText: '',
    isFeatured: false,
    isFeaturedText: '',
    isActive: false,
    isActiveText: '',
    courseDescription: false,
    courseDescriptionText: '',
})

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);

const status:any = computed(() => {
    let answer:any
    // if (alertText.value.includes('successfully')) {
    //     answer = true
    // } else {
    //     answer = false
    // }
    return answer
})

const formEl:any = ref(null)

let isChecked:any = ref(false);

let formData = new FormData()

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const newCourse:any = computed(() => {
    return store.getters.getNewCourse.value;
})

// const newCourse:any = {}

const CourseLine2 ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    // let imageType:String = newCourse.value.imageFile.type;
    // console.log('imageType is', imageType)
    if (!newCourse.value.title) {
        errors.title = true;
        errors.titleText = 'Course title is required'
    } else if (newCourse.value.title.length <= 3) {
        errors.title = true;
        errors.titleText = 'Course title needs to be more than 3 characters'
    } else {
        errors.title = false;
        errors.titleText = ''
    }

    if (!newCourse.value.courseCode) {
        errors.courseCode = true;
        errors.courseCodeText = 'Course code is required'
    } else if (newCourse.value.courseCode.length <= 3) {
        errors.courseCode = true;
        errors.courseCodeText = 'Course code needs to be more than 3 characters'
    } else {
        errors.courseCode = false;
        errors.courseCodeText = ''
    }

    if (!newCourse.value.cost) {
        errors.cost = true;
        errors.costText = 'Cost is required'
    } else if (isNaN(newCourse.value.cost)) {
        errors.cost = true;
        errors.costText = 'Cost cannot contain letters'
    } else {
        errors.cost = false;
        errors.costText = ''
    }

    if (!newCourse.value.CourseLine1) {
        errors.CourseLine1 = true;
        errors.CourseLine1Text = 'Course content one is required.'
    } else {
        errors.CourseLine1 = false;
        errors.CourseLine1Text = ''
    }

    if (!newCourse.value.banner) {
        errors.banner = true;
        errors.bannerText = 'Banner is required. Please upload an banner'
    } else if (newCourse.value.banner.size > 5242880) {
        errors.banner = true;
        errors.bannerText = 'Banner size should not be more than 5MB'
    } else {
        errors.banner = false;
        errors.bannerText = ''
    }

    if (!newCourse.value.thumbnail) {
        errors.thumbnail = true;
        errors.thumbnailText = 'Thumbnail is required. Please upload an thumbnail'
    } else if (newCourse.value.thumbnail.size > 5242880) {
        errors.thumbnail = true;
        errors.thumbnailText = 'Thumbnail size should not be more than 5MB'
    } else {
        errors.thumbnail = false;
        errors.thumbnailText = ''
    }

    if (!newCourse.value.CourseLine2) {
        errors.CourseLine2 = true;
        errors.CourseLine2Text = 'Course content two is required'
    } else {
        errors.CourseLine2 = false;
        errors.CourseLine2Text = ''
    }

    if (!newCourse.value.CourseLine3) {
        errors.CourseLine3 = true;
        errors.CourseLine3Text = 'Course content three is required'
    } else {
        errors.CourseLine3 = false;
        errors.CourseLine3Text = ''
    }

    if (!newCourse.value.CourseLine4) {
        errors.CourseLine4 = true;
        errors.CourseLine4Text = 'Course content four is required'
    } else {
        errors.CourseLine4 = false;
        errors.CourseLine4Text = ''
    }

    if (!newCourse.value.CourseLine5) {
        errors.CourseLine5 = true;
        errors.CourseLine5Text = 'Course content five is required'
    } else {
        errors.CourseLine5 = false;
        errors.CourseLine5Text = ''
    }

    if (!newCourse.value.levelType) {
        errors.levels = true;
        errors.levelsText = 'Level is required'
    } else {
        errors.levels = false;
        errors.levelsText = ''
    }

    if (!newCourse.value.categories) {
        errors.categories = true;
        errors.categoriesText = 'Please select a category'
    } else {
        errors.categories = false;
        errors.categoriesText = ''
    }

    if (!newCourse.value.duration) {
        errors.duration = true;
        errors.durationText = 'Duration is required'
    } else {
        errors.duration = false;
        errors.durationText = ''
    }

    if (!newCourse.value.resourceUrl) {
        errors.resource = true;
        errors.resourceText = 'Add a resource url'
    } else if (newCourse.value.resourceUrl.length <= 5) {
        errors.resource = true;
        errors.resourceText = 'Url needs to be more than 5 characters'
    } else {
        errors.resource = false;
        errors.resourceText = '';
    }

    if (!newCourse.value.subTitle) {
        errors.subTitle = true;
        errors.subTitleText = 'Add a sub text'
    } else if (newCourse.value.subTitle.length <= 5) {
        errors.subTitle = true;
        errors.subTitleText = 'Sub text needs to be more than 5 characters'
    } else {
        errors.subTitle = false;
        errors.subTitleText = '';
    }

    if (!notes.value) {
        errors.courseDescription = true;
        errors.courseDescriptionText = 'Add a course description'
    } else if (notes.value.length <= 10) {
        errors.courseDescription = true;
        errors.courseDescriptionText = 'Description needs to be more than 10 characters'
    } else {
        errors.courseDescription = false;
        errors.courseDescriptionText = '';
    }

    if (errors.title) {
        errors.title = true;
        isError.value = true;
    } else if (errors.courseCode) {
        errors.courseCode = true;
        isError.value = true;
    } else if (errors.cost) {
        errors.cost = true;
        isError.value = true;
    } else if (errors.CourseLine2) {
        errors.CourseLine2 = true;
        isError.value = true;
    } else if (errors.banner) {
        errors.banner = true;
        isError.value = true;
    } else if (errors.CourseLine3) {
        errors.CourseLine3 = true;
        isError.value = true;
    } else if (errors.CourseLine5) {
        errors.CourseLine5 = true;
        isError.value = true;
    } else if (errors.CourseLine4) {
        errors.CourseLine2 = true;
        isError.value = true;
    } else if (errors.CourseLine1) {
        errors.CourseLine1 = true;
        isError.value = true;
    } else if (errors.categories) {
        errors.categories = true;
        isError.value = true;
    } else if (errors.duration) {
        errors.duration = true;
        isError.value = true;
    } else if (errors.resource) {
        errors.resource = true;
        isError.value = true;
    } else if (errors.subTitle) {
        errors.subTitle = true;
        isError.value = true;
    } else if (errors.levels) {
        errors.levels = true;
        isError.value = true;
    } else if (errors.courseDescription) {
        errors.courseDescription = true;
        isError.value = true;
    } else if (errors.thumbnail) {
        errors.thumbnail = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

const removeBanner:any = async () => {
    return newCourse.value.banner = ''
}

const removeThumbnail:any = async () => {
    return newCourse.value.thumbnail = ''
}

const courses:any = computed(() => {
    return store.getters.getCourses.value.payload;
})

const test = () => {
    console.log('hi')
    // console.log('new notes', newCourse.courseDescription.value)
}

const newText = () => {
    console.log('hello')
    // console.log('new notes here', newCourse.courseDescription.value)
}

const notes = ref('')

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    store.commit(courseMutationTypes.SetNewCourse, {})
    emits('close')
}

const showProfilePicture = ref(false);

let isActive:any = computed(() => {
    // if (newCourse.value.imageFile) {
    //     return true
    // } else {
    //     return false
    // }
})

const toggle:any = (status:any) => {
    console.log('i can switch up')
    if (status == 0) {
        console.log('i can switch on', status)
        return newCourse.value.isFeatured = true
    } else {
        console.log('i can switch off', status)
        return newCourse.value.isFeatured = false
    }
}

const toggleActive:any = (status:any) => {
    console.log('i can switch up')
    if (status == 0) {
        console.log('i can switch on', status)
        return newCourse.value.isActive = true
    } else {
        console.log('i can switch off', status)
        return newCourse.value.isActive = false
    }
}

const level_options:any = [
    {
        value: 0,
        label: 'Beginner'
    },
    {
        value: 1,
        label: 'Intermediate'
    },
    {
        value: 2,
        label: 'Advanced'
    }
]

const deselectCategory:any = async () => {
    console.log('on deselect')
    const request:any = `${api_url}api/coursecategory/get-categories`;
    await store.dispatch(courseActionTypes.FetchCourseCategories, request)
}

const deselect:any = async () => {
    console.log('on deselect')
    const request:any = `${api_url}api/coursecategory/get-categories`;
    await store.dispatch(courseActionTypes.FetchCourseCategories, request)
}

const categories:any = computed(() => {
    return store.getters.getCourseCategories.value.payload;
})

const onChangeBanner:any = (event:any):any => {
    console.log('event', event.target.files[0].name)
    newCourse.value.banner = event.target.files[0]
    formData.append('file', event.target.files[0])
    let images: any = document.getElementById('bannerimage')
    images.src = URL.createObjectURL(event.target.files[0])
    console.log('newCourse image', newCourse.value.banner.type)
}

const onChangeThumbnail:any = (event:any):any => {
    console.log('event', event.target.files[0].name)
    newCourse.value.thumbnail = event.target.files[0]
    formData.append('file', event.target.files[0])
    let images: any = document.getElementById('thumbnailimage')
    images.src = URL.createObjectURL(event.target.files[0])
    console.log('newCourse image', newCourse.value.thumbnail.type)
}

// const resetForm:any = Object.freeze({
//         firstName: '',
//         courseCode: '',
//         cost: '',
//         CourseLine2: '',
//         phoneNumber: '',
//         resourceUrl: '',
//         imageFile: '',
//         CourseLine1: '',
//         courseId: ''
// })

const addCourse:any = async () => {
    console.log('hi');
    console.log('newcourse', newCourse.value)
    console.log('new banner', newCourse.value.banner)
    console.log('new thumbnail', newCourse.value.thumbnail)
    const request:any = `${api_url}api/course/create-course`;

    // const formElem = document.getElementById('formElem')
    formData.append('title', newCourse.value.title)
    formData.append('courseCode', newCourse.value.courseCode)
    formData.append('cost', newCourse.value.cost)
    formData.append('banner', newCourse.value.banner, newCourse.value.banner.name)
    formData.append('thumbnail', newCourse.value.thumbnail, newCourse.value.thumbnail.name)
    formData.append('resourceUrl', newCourse.value.resourceUrl)
    formData.append('levelType', newCourse.value.levelType)
    formData.append('CourseLine1', newCourse.value.CourseLine1)
    // formData.append('courseId', newCourse.value.courseId)
    formData.append('CourseLine2', newCourse.value.CourseLine2)
    formData.append('CourseLine3', newCourse.value.CourseLine3)
    formData.append('CourseLine4', newCourse.value.CourseLine4)
    formData.append('CourseLine5', newCourse.value.CourseLine5)
    formData.append('categories', newCourse.value.categories)
    formData.append('duration', newCourse.value.duration)
    formData.append('isFeatured', newCourse.value.isFeatured)
    formData.append('description', notes.value)
    formData.append('subTitle', newCourse.value.subTitle)
    formData.append('isActive', newCourse.value.isActive)

    // console.log('formData', JSON.parse(JSON.stringify(formData)))

    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newCourse.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newCourse.value.imageFile
    // }
    console.log('formData', formData)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    await store.dispatch(courseActionTypes.AddNewCourse, newData)
    const result:any = await store.getters.getCourse
    closeModal()
    store.commit(courseMutationTypes.SetNewCourse, {})
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addCourse() : '';
}

onMounted(async () => {
    console.log('I am now here')
    // const request:any = `${api_url}api/course/search-courses/{pageIndex}/{pageSize}`;
    // await store.dispatch(courseActionTypes.FetchCourses, request)
})

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';
</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">{{ props.name }} Course</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="forrmElem" ref="forrmEl" class="text-sm grid">
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="title" class="font-semibold">
                        Title
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.title" name="title" id="title" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.title ? errors.titleText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="courseCode" class="font-semibold">
                        Course Code
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.courseCode" name="courseCode" id="courseCode" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.courseCode ? errors.courseCodeText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="cost" class="font-semibold">
                        Cost
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.cost" name="cost" id="cost" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.cost ? errors.costText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="resource" class="font-semibold">
                        Resource Download*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.resourceUrl" name="resource" id="resource" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.resource ? errors.resourceText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="CourseLine1" class="font-semibold">
                        Course Content (1)*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.CourseLine1" name="CourseLine1" id="CourseLine1" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.CourseLine1 ? errors.CourseLine1Text : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="CourseLine2" class="font-semibold">
                        Course Content (2)*
                    </label>
                    <input type="CourseLine2" @focus="checkError" @keyup="checkError" v-model="newCourse.CourseLine2" name="CourseLine2" id="CourseLine2" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.CourseLine2 ? errors.CourseLine2Text : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="CourseLine3" class="font-semibold">
                        Course Content (3)*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.CourseLine3" name="CourseLine3" id="CourseLine3" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.CourseLine3 ? errors.CourseLine3Text : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="CourseLine4" class="font-semibold">
                        Course Content (4)*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.CourseLine4" name="CourseLine4" id="CourseLine4" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.CourseLine4 ? errors.CourseLine4Text : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="CourseLine5" class="font-semibold">
                        Course Content (5)*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.CourseLine5" name="CourseLine5" id="CourseLine5" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.CourseLine5 ? errors.CourseLine5Text : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="CourseLine1" class="font-semibold">
                        Levels*
                    </label>

                    <!-- <select @focus="checkError" @keyup="checkError" class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" v-model="newCourse.levels" name="levels" id="levels">
                        <option value="">Select option</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="experienced">Experienced</option>
                    </select> -->
                    <multiselect @clear="deselect" v-model="newCourse.levelType" valueProp="value" :options="level_options" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.levels ? errors.levelsText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <!-- {{ categories }} -->
                    <!-- {{ newCourse.categories }} -->
                    <label for="categories" class="font-semibold">
                        Categories*
                    </label>
                    <!-- <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.categories" name="categories" id="categories" class="p-4 border rounded-md text-xs focus:outline-none"> -->
                    <multiselect @clear="deselect" v-model="newCourse.categories" valueProp="id" :options="categories" mode="tags" :close-on-select="false" track-by="name" label="name" placeholder="Select category" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.categories ? errors.categoriesText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="duration" class="font-semibold">
                        Duration*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.duration" name="duration" id="duration" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.duration ? errors.durationText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="subTitle" class="font-semibold">
                        Sub Text*
                    </label>
                    <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.subTitle" name="subTitle" id="subTitle" placeholder="Write something" rows="5" class="p-4 border rounded-md text-xs focus:outline-none" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.subTitle ? errors.subTitleText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="banner" class="font-semibold">
                        Banner
                    </label>
                    <div class="flex items-start justify-start gap-3 w-full">
                        <label :class="[errors.banner ? 'text-red border-red' : '', isBannerActive ? 'hidden' : '']" class="flex bg-primary-accent rounded flex-col w-2/3 h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div class="flex flex-col items-center pt-8">
                                <SvgIcons name="upload" />
                                <p class="pt-2 text-sm tracking-wider font-semibold group-hover:text-gray-600">
                                    Upload Document</p>
                            </div>
                            <input type="file" name="imageFile" @change="onChangeBanner" class="opacity-0 absolute" accept=".png, .jpg, .mp4" />
                        </label>
                        <img class="w-36 p-1 " :class="[isBannerActive && props.name == 'Add' && !isBannerRemoved ? '' : 'hidden']" id="bannerimage" alt="course banner image">
                        <div v-if="isBannerActive" class="buttons flex items-center gap-3 justify-around">
                            <SvgIcons name="eye" />
                            <SvgIcons name="delete" @click="removeBanner" />
                        </div>
                    </div>
                    <p class="text-xs font-medium">
                        Allowed Formats: jpg, png, mp4
                    </p>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.banner ? errors.bannerText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Thumbnail
                    </label>
                    <div class="flex items-start justify-start gap-3 w-full">
                        <label :class="[errors.thumbnail ? 'text-red border-red' : '', isThumbnailActive ? 'hidden' : '']" class="flex bg-primary-accent rounded flex-col w-2/3 h-32 border-2 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div class="flex flex-col items-center pt-8">
                                <SvgIcons name="upload" />
                                <p class="pt-2 text-sm tracking-wider font-semibold group-hover:text-gray-600">
                                    Upload Document</p>
                            </div>
                            <input type="file" name="imageFile" @change="onChangeThumbnail" class="opacity-0 absolute" accept=".png, .jpg, .mp4" />
                        </label>
                        <img class="w-36 p-1 " :class="[isThumbnailActive && props.name == 'Add' && !isThumbnailRemoved ? '' : 'hidden']" id="thumbnailimage" alt="course thumbnail image">
                        <div v-if="isThumbnailActive" class="buttons flex items-center gap-3 justify-around">
                            <SvgIcons name="eye" />
                            <SvgIcons name="delete" @click="removeThumbnail" />
                        </div>
                    </div>
                    <p class="text-xs font-medium">
                        Allowed Formats: jpg, png, mp4
                    </p>
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.thumbnail ? errors.thumbnailText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid text-left grid-cols-4 gap-8 mb-10">
                <div class="flex items-center gap-4">
                    <Switch name="course" :status="newCourse.isFeatured" @toggle="toggle" />
                    <label for="isFeatured" class="font-semibold">
                        Is Featured
                    </label>
                </div>
                <div class="flex items-center gap-4">
                    <Switch name="course" :status="newCourse.isActive" @toggle="toggleActive" />
                    <label for="isActive" class="font-semibold">
                        Is Active
                    </label>
                </div>
            </div>
            <div class="grid text-left gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="courseDescription" class="font-semibold">
                        Course Description
                    </label>
                    <QuillEditor
                        class="border-x border-b shadow-lg rounded"
                        contentType="html"
                        theme="snow"
                        toolbar="full"
                        v-model:content="notes"
                        @ready="test"
                        @text-change="newText"
                    />
                    <!-- <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newCourse.courseDescription" name="courseDescription" id="courseDescription" placeholder="Input courseDescription" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.courseDescription ? errors.courseDescriptionText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end pb-10">
                <button @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.multiselect-blue {
  --ms-option-bg: #DBEAFE;
  --ms-option-color: #2563EB;
  --ms-bg: #FFFFFF;
}
</style>

<style>
.dp-custom-input {
    @apply py-[8px] rounded-md;
}
.multiselect-blue {
  /* --ms-option-bg: #DBEAFE; */
  --ms-option-color: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-dropdown-bg: #FFFFFF;
  --ms-option-bg-selected: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-tag-bg: hsla(var(--color-primary), var(--tw-bg-opacity));
  --ms-py: 8px;
  --ms-font-size: 12px;
  --ms-option-bg-selected-pointed: hsla(var(--color-primary), var(--tw-bg-opacity));
}
</style>

<style src="@vueform/multiselect/themes/default.css"></style>