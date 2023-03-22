<script lang="ts">
export default {
  name: 'AddProject',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { api_url } from '../../../config'
import moment from 'moment';
import SvgIcons from '../../SvgIcons.vue';
import { DatePicker } from 'v-calendar'
import Filter from '../../Filter.vue';
import Datepicker from 'vue3-date-time-picker';
import 'v-calendar/dist/style.css';
import 'vue3-date-time-picker/dist/main.css'
// import datepicker from '../../datepicker.vue'
import multiselect from '@vueform/multiselect'
import * as projectActionTypes from '../../../store/module/services/constants/action'
import * as projectMutationTypes from '../../../store/module/services/constants/mutation'
import * as instructorActionTypes from '../../../store/module/instructors/constants/action';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

let formData = new FormData()

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);

const newProject:any = computed(() => {
    return store.getters.getNewProject.value
})

const email ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

const checkError:any = () => {
    if (!newProject.value.companyName) {
        errors.companyName = true;
        errors.companyNameText = 'Company name is required'
    } else if (newProject.value.companyName.length <= 3) {
        errors.companyName = true;
        errors.companyNameText = 'Company name needs to be more than 3 characters'
    } else {
        errors.companyName = false;
        errors.companyNameText = ''
    }

    if (!newProject.value.email) {
        errors.email = true;
        errors.emailText = 'Email is required'
    } else if (!newProject.value.email.match(email)) {
        errors.email = true;
        errors.emailText = `Email must should have the format 'brianadams@walure.com`
    } else {
        errors.email = false;
        errors.emailText = ''
    }

    if (!newProject.value.noOfResources) {
        errors.noOfResources = true;
        errors.noOfResourcesText = 'Number of resources is required'
    } else if (isNaN(newProject.value.noOfResources)) {
        errors.noOfResources = true;
        errors.noOfResourcesText = 'Number of resources cannot contain letters'
    } else {
        errors.noOfResources = false;
        errors.noOfResourcesText = '';
    }

    if (!newProject.value.startDate) {
        errors.startDate = true;
        errors.startDateText = 'Start date is required.'
    } else {
        errors.startDate = false;
        errors.startDateText = '';
    }

    if (!newProject.value.title) {
        errors.title = true;
        errors.titleText = 'Title is required. Please enter a title'
    } else {
        errors.title = false;
        errors.titleText = '';
    }

    if (!newProject.value.endDate) {
        errors.endDate = true;
        errors.endDateText = 'End date is required'
    } else {
        errors.endDate = false;
        errors.endDateText = '';
    }

    if (!newProject.value.brief) {
        errors.brief = true;
        errors.briefText = 'Project brief is required'
    } else {
        errors.brief = false;
        errors.briefText = '';
    }

    if (errors.companyName) {
        errors.companyName = true;
        isError.value = true;
    } else if (errors.email) {
        errors.email = true;
        isError.value = true;
    } else if (errors.noOfResources) {
        errors.noOfResources = true;
        isError.value = true;
    } else if (errors.endDate) {
        errors.endDate = true;
        isError.value = true;
    } else if (errors.brief) {
        errors.brief = true;
        isError.value = true;
    } else if (errors.startDate) {
        errors.startDate = true;
        isError.value = true;
    } else if (errors.title) {
        errors.title = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

let isChecked:any = ref(false);
const startDate:any = ref('');
const endDate:any = ref('');

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

let errors = reactive({
    companyName: false,
    companyNameText: '',
    email: false,
    emailText: '',
    noOfResources: false,
    noOfResourcesText: '',
    startDate: false,
    startDateText: '',
    endDate: false,
    endDateText: '',
    brief: false,
    briefText: '',
    title: false,
    titleText: '',
})

const today:any = moment().format('YYYY-MM-DD');

const briefs:any = computed(() => {
  return store.getters.getInstructor.value.payload;
});

const training:any = ref('')

const brief:any = ref([])

const trainingoptions:any = ref([
    {
        label: "Onsite",
        value: 0
    },
    {
        label: "Online",
        value: 1
    }
]);

const emits = defineEmits(['close'])

const closeModal:any = async () => {
    await store.commit(projectMutationTypes.SetNewProject, {})
    emits('close')
}

const projectcourse:any = ref('')

const addproject:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/project/create-project`;

    const projectdata:any = {
        companyName: newProject.value.companyName,
        email: newProject.value.email,
        noOfResources: newProject.value.noOfResources,
        startDate: moment(newProject.value.startDate).format('MM/DD/YYYY'),
        endDate: moment(newProject.value.endDate).format('MM/DD/YYYY'),
        brief: newProject.value.brief,
        title: newProject.value.title
    //     Title: newProject.value.name,
    //     TrainingType: newProject.value.email,
    //     ProjectCapacity: newProject.value.noOfResources,
    //     // StartDate: moment(newProject.value.startDate).format('MM/DD/YYYY'),
    //     // EndDate: moment(newProject.value.endDate).format('MM/DD/YYYY'),
    //     StartDate: newProject.value.startDate,
    //     EndDate: newProject.value.endDate,
    //     Instructors: JSON.parse(JSON.stringify(newProject.value.brief)),
    //     CourseId: newProject.value.courseId,
    }

    // formData.append('companyName', newProject.value.companyName);
    // formData.append('email', newProject.value.email);
    // formData.append('noOfResources', newProject.value.noOfResources);
    // formData.append('startDate', moment(newProject.value.startDate).format('MM/DD/YYYY'));
    // formData.append('endDate', moment(newProject.value.endDate).format('MM/DD/YYYY'));
    // formData.append('brief', newProject.value.brief);
    // formData.append('title', newProject.value.title);

    const newData:any = {
        url: request,
        data: projectdata,
    }
    console.log('newData', newData)
    await store.dispatch(projectActionTypes.AddProject, newData)
    await store.dispatch(projectActionTypes.FetchProject)
    store.commit(projectMutationTypes.SetNewProject, {})
    const result:any = await store.getters.getProject
    closeModal()
}

const editproject:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/project/edit-project`;

    const projectdata:any = {
        companyName: newProject.value.companyName,
        email: newProject.value.email,
        noOfResources: newProject.value.noOfResources,
        startDate: moment(newProject.value.startDate).format('MM/DD/YYYY'),
        endDate: moment(newProject.value.endDate).format('MM/DD/YYYY'),
        brief: newProject.value.brief,
        title: newProject.value.title,
        id: newProject.value.id
    //     Title: newProject.value.name,
    //     TrainingType: newProject.value.email,
    //     ProjectCapacity: newProject.value.noOfResources,
    //     // StartDate: moment(newProject.value.startDate).format('MM/DD/YYYY'),
    //     // EndDate: moment(newProject.value.endDate).format('MM/DD/YYYY'),
    //     StartDate: newProject.value.startDate,
    //     EndDate: newProject.value.endDate,
    //     Instructors: JSON.parse(JSON.stringify(newProject.value.brief)),
    //     CourseId: newProject.value.courseId,
    }

    // formData.append('Title', newProject.value.companyName);
    // formData.append('Id', newProject.value.id);
    // formData.append('TrainingType', newProject.value.email);
    // formData.append('ProjectCapacity', newProject.value.noOfResources);
    // formData.append('StartDate', moment(newProject.value.startDate).format('MM/DD/YYYY'));
    // formData.append('EndDate', moment(newProject.value.endDate).format('MM/DD/YYYY'));
    // formData.append('Instructors', newProject.value.brief);
    // formData.append('CourseId', newProject.value.title);

    const newData:any = {
        url: request,
        data: projectdata,
    }
    console.log('newData', newData)
    await store.dispatch(projectActionTypes.EditProject, newData)
    await store.dispatch(projectActionTypes.FetchProject)
    await store.getters.getProject
    closeModal()
    store.commit(projectMutationTypes.SetNewProject, {})
}

const format:any = (date:any) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

let isActive:any = computed(() => {
    if (props.name == 'Edit') {
        return true
    } else {
        return false
    }
})

const submit:any = () => {
    console.log('hello project');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addproject() : '';
}

const submitEdit:any = () => {
    console.log('hello project');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editproject() : '';
}

const activeRemove:any = 'border-primary text-primary hover:opacity-80';
const disabledRemove:any = 'border-grey text-grey';
const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted(async () => {
    console.log('I am now here')
})
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">{{ props.name }} project</p>
            <!-- <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" /> -->
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="addproject" class="text-sm text-left grid">
            <div class="grid grid-cols-2 gap-8 mb-10">
                <!-- {{ newProject }} -->
                <div class="grid gap-4">
                    <label for="companyName" class="font-semibold">
                        Company name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newProject.companyName" name="companyName" id="companyName" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.companyName ? errors.companyNameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="title" class="font-semibold">
                        Title*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newProject.title" name="title" id="title" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <!-- <multiselect @select="checkError" @clear="checkError" v-model="newProject.title" valueProp="id" :options="courses" track-by="title" label="title" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.title ? errors.titleText : '' }}
                    </p>

                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="item in courses" :key="item.id"  :value=item.id>{{ item.title }}</option>
                    </select> -->
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4" id="startdate">
                    <label for="startdate" class="font-semibold">
                        Start date*
                    </label>
                    <DatePicker v-if="props.name == 'Edit'" v-model="newProject.startDate">
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                            class="px-3 py-4 w-full border rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input" @update:model-value="checkError" @cleared="checkError"  menuClassName="dp-custom-menu" v-model="newProject.startDate" :minDate="today" :maxDate="newProject.endDate" placeholder="Start Date" :format="format" position="left" teleport="#startdate"/>
                    <!-- <datepicker /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.startDate ? errors.startDateText : '' }}
                    </p>
                </div>
                <div class="grid gap-4" id="enddate">
                    <label for="enddate" class="font-semibold">
                        End date*
                    </label>
                    <DatePicker v-if="props.name == 'Edit'" v-model="newProject.endDate">
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                            class="px-3 py-4 border w-full rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input"  @focus="checkError" @cleared="checkError" menuClassName="dp-custom-menu" v-model="newProject.endDate" :minDate="newProject.startDate" :format="format" position="left" placeholder="End Date" teleport="#enddate" />
                    <p class="text-[10px] text-red">
                        {{ errors.endDate ? errors.endDateText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="email" class="font-semibold">
                        Email*
                    </label>
                    <input type="email" @focus="checkError" @keyup="checkError"  v-model="newProject.email" name="email" id="email" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">

                    <!-- <multiselect @select="checkError" @clear="checkError"  v-model="newProject.email" valueProp="value" :options="trainingoptions" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->

                    <p class="text-[10px] text-red">
                        {{ errors.email ? errors.emailText : '' }}
                    </p>

                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="trainingtype" id="trainingtype">
                        <option value="">Select option</option>
                        <option value="Online">Online</option>
                        <option value="Onsite">Onsite</option>
                    </select> -->
                </div>
                <div class="grid gap-4">
                    <label for="noOfResources" class="font-semibold">
                        No of resources*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newProject.noOfResources" name="noOfResources" id="noOfResources" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.noOfResources ? errors.noOfResourcesText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid gap-8 mb-10">
                <label for="brief" class="font-semibold">
                    Project Brief*
                </label>
                <textarea type="text" @focus="checkError" @keyup="checkError" v-model="newProject.brief" name="brief" id="brief" placeholder="Type here" rows="4" class="p-4 border rounded-md text-xs focus:outline-none" />

                <!-- <multiselect @select="checkError" @clear="checkError" v-model="newProject.brief" mode="tags" :close-on-select="false" valueProp="id" :options="briefs" track-by="fullName" label="fullName" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->
                <p class="text-[10px] text-red">
                    {{ errors.brief ? errors.briefText : '' }}
                </p>
                <!-- <Filter>
                    <template #info>
                        <span class="pl-5 pr-56">
                            <p class="text-grey">
                                Choose instructor
                            </p>
                        </span>
                    </template>
                    <template #input>
                        <input class="border-2 text-sm p-3 rounded h-7 w-full mx-auto">
                    </template>
                    <template #list>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">
                            Araba Temi
                        </p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Araba Temi</p></li>
                        <li><p class="py-2 px-5 hover:bg-gray-50 block hover:bg-grey-light cursor-pointer">Araba Temi</p></li>
                    </template>
                </Filter> -->
            </div>
            <div class="flex justify-end pb-10">
                <button v-if="props.name == 'Add'" @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
                <button v-if="props.name == 'Edit'" @click.prevent="submitEdit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss">

.dp-custom-menu {
    position: static !important;
}
</style>