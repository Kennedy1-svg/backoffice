<script lang="ts">
export default {
  name: 'AddAccountCategory',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
import { api_url } from '../../../config'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
import Switch from '../../switch.vue'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import * as courseMutationTypes from '../../../store/module/courses/constants/mutation'
import * as studentActionTypes from '../../../store/module/students/constants/action'
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

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);

let errors = reactive({
    name: false,
    nameText: '',
    // description: false,
    // descriptionText: '',
})

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

// const newCategory:any = computed(() => {
//     return store.getters.getNewCourse.value;
// })

const newCategory:any = computed(() => {
    return store.getters.getNewCourseCategory.value;
});

const courseContentTwo ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
const phone ='^[0]+[0-9]';

const checkError:any = () => {
    // let imageType:String = newCategory.value.imageFile.type;
    // console.log('imageType is', imageType)
    if (!newCategory.value.name) {
        errors.name = true;
        errors.nameText = 'Name is required'
    } else if (newCategory.value.name.length <= 3) {
        errors.name = true;
        errors.nameText = 'Name needs to be more than 3 characters'
    } else {
        errors.name = false;
        errors.nameText = ''
    }

    // if (!newCategory.value.description) {
    //     errors.description = true;
    //     errors.descriptionText = 'Description is required'
    // } else if (newCategory.value.description.length <= 10) {
    //     errors.description = true;
    //     errors.descriptionText = 'Description needs to be more than 10 characters'
    // } else {
    //     errors.description = false;
    // }

    if (errors.name) {
        errors.name = true;
        isError.value = true;
    // } else if (errors.description) {
    //     errors.description = true;
    //     isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

const test = () => {
    console.log('hi')
    // console.log('new notes', newCategory.courseDescription.value)
}

const isEditing:any = computed(() => {
    let answer:any = ref(false)
    if (props.name == 'Add') {
        return
    } else if (props.name == 'Edit') {
        answer = true
    }
    return answer;
})

const newText = () => {
    console.log('hello')
    // console.log('new notes here', newCategory.courseDescription.value)
}

const notes = ref('')

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    // store.commit(courseMutationTypes.SetNewCourseCategory, {})
    emits('close')
}

const showProfilePicture = ref(false);

let isActive:any = computed(() => {
    // if (newCategory.value.imageFile) {
    //     return true
    // } else {
    //     return false
    // }
})

const toggle:any = (status:any) => {
    if (status == 0) {
        return status = 1
    } else {
        return status = 0
    }
}

const resetForm:any = Object.freeze({
        name: '',
        description: '',
})

const addCategory:any = async () => {
    console.log('hi');
    // console.log('newstudent', newCategory.value)
    // console.log('newstudent', newCategory.value.imageFile)
    const request:any = `${api_url}api/coursecategory/create-category`;

    // const formElem = document.getElementById('formElem')
    formData.append('Name', newCategory.value.name)
    // formData.append('Description', newCategory.value.description)

    // const data:any = {
    //     name: newCategory.value.name,
    //     description: newCategory.value.description,
    // }

    // console.log('formData', JSON.parse(JSON.stringify(formData)))

    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newCategory.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newCategory.value.imageFile
    // }
    console.log('added Data', formData)
    // console.log('formdata items', [...data.entries()])

    const newData:any = {
        url: request,
        data: formData
    }
    console.log('newData', newData)
    await store.dispatch(courseActionTypes.AddNewCourseCategory, newData)
    const result:any = await store.getters.getCourseCategories
    closeModal()
    store.commit(courseMutationTypes.SetNewCourseCategory, {})
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addCategory() : '';
}

const editCategory:any = async () => {
    console.log('hi');
    // console.log('newstudent', newCategory.value)
    // console.log('newstudent', newCategory.value.imageFile)
    const request:any = `${api_url}api/coursecategory/edit-category`;

    // const formElem = document.getElementById('formElem')
    // formData.append('Name', newCategory.value.name)
    // formData.append('Description', newCategory.value.description)

    const data:any = {
        id: newCategory.value.id,
        name: newCategory.value.name,
        // description: newCategory.value.description,
    }

    // console.log('formData', JSON.parse(JSON.stringify(formData)))

    // Display the values
// for (var value of formData.entries()) {
//    console.log(value);
// }
    // const formData = JSON.parse(JSON.stringify(newCategory.value))

    // const submitdata = {
    //     ...formData,
    //     imageFile: newCategory.value.imageFile
    // }
    console.log('edited data', data)
    // console.log('formdata items', [...formData.entries()])

    const newData:any = {
        url: request,
        data: data
    }
    console.log('newData', newData)
    await store.dispatch(courseActionTypes.EditCourseCategory, newData)
    const result:any = await store.getters.getCourseCategories
    closeModal()
    store.commit(courseMutationTypes.SetNewCourseCategory, {})
    // formEl.reset()
    // console.log('result', JSON.parse(JSON.stringify(result.value)))
    // route.push('/dashboard/student-management')
}

const submitEdit:any = () => {
    console.log('hello');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editCategory() : '';
}

onMounted(async () => {
    console.log('I am now here')
    // const request:any = `${api_url}api/coursecategory/get-categories`;
    // await store.dispatch(courseActionTypes.FetchCourseCategories, request)

})

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';
</script>

<template>
    <div class="main w-full mt-[0.5px] xl:px-[45px] overflow-hidden px-6 bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">{{ props.name }} Category</p>
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form class="text-sm grid">
            <div class="grid text-left gap-8 mb-10">
                <!-- {{ newCategory }} -->
                <div class="grid gap-4">
                    <label for="name" class="font-semibold">
                        Name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newCategory.name" name="name" id="name" class="p-4 border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.name ? errors.nameText : '' }}
                    </p>
                </div>
                <!-- <div class="grid gap-4">
                    <label for="description" class="font-semibold">
                        Description*
                    </label>
                    <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newCategory.description" name="description" id="description" placeholder="Write something" rows="5" class="p-4 border rounded-md text-xs focus:outline-none" />
                    <p class="text-[10px] -mt-2 text-red">
                        {{ errors.description ? errors.descriptionText : '' }}
                    </p>
                </div> -->
            </div>
            <div class="flex justify-end gap-10 pb-10">
                <button @click.prevent="closeModal" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border border-primary text-primary rounded-md">Cancel</button>
                <button v-if="!isEditing" @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Create</button>
                <button v-else @click.prevent="submitEdit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>
