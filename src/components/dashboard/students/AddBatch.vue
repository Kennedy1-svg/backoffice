<script lang="ts">
export default {
  name: 'AddBatch',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { api_url } from '../../../config'
import moment from 'moment';
import { DatePicker } from'v-calendar'
import SvgIcons from '../../SvgIcons.vue';
import Filter from '../../Filter.vue';
import Datepicker from 'vue3-date-time-picker';
import 'v-calendar/dist/style.css';
import 'vue3-date-time-picker/dist/main.css';
// import datepicker from '../../datepicker.vue'
import multiselect from '@vueform/multiselect'
import * as courseActionTypes from '../../../store/module/courses/constants/action'
import * as batchActionTypes from '../../../store/module/batch/constants/action'
import * as batchMutationTypes from '../../../store/module/batch/constants/mutation'
import * as instructorActionTypes from '../../../store/module/instructors/constants/action';

const store = useStore();

// const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
// let isLoading:any = ref(false);

let formData = new FormData()

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);

const newBatch:any = computed(() => {
    return store.getters.getNewBatch.value
})

const checkError:any = () => {
    if (!newBatch.value.title) {
        errors.name = true;
        errors.nameText = 'Cohort title is required'
    } else if (newBatch.value.title.length <= 3) {
        errors.name = true;
        errors.nameText = 'Cohort title needs to be more than 3 characters'
    } else {
        errors.name = false;
        errors.nameText = ''
    }

    if (!newBatch.value.trainingType && newBatch.value.trainingType != '0') {
        errors.trainingType = true;
        errors.trainingTypeText = 'Training Type is required'
    } else {
        errors.trainingType = false;
        errors.trainingTypeText = ''
    }

    if (!newBatch.value.batchCapacity) {
        errors.batchCapacity = true;
        errors.batchCapacityText = 'Cohort capacity is required'
    } else if (newBatch.value.batchCapacity <= 0) {
        errors.batchCapacity = true;
        errors.batchCapacityText = 'Cohort capacity name needs to be more than 0'
    } else {
        errors.batchCapacity = false;
        errors.batchCapacityText = '';
    }

    if (!newBatch.value.startDate) {
        errors.startDate = true;
        errors.startDateText = 'Start date is required. Please select a startDate'
    } else {
        errors.startDate = false;
        errors.startDateText = '';
    }

    if (!newBatch.value.courseId) {
        errors.course = true;
        errors.courseText = 'Course is required. Please select a course'
    } else {
        errors.course = false;
        errors.courseText = '';
    }

    if (!newBatch.value.endDate) {
        errors.endDate = true;
        errors.endDateText = 'End date is required'
    } else {
        errors.endDate = false;
        errors.endDateText = '';
    }

    if (newBatch.value.instructors.length === 0) {
        errors.instructor = true;
        errors.instructorText = 'Instructor(s) is required'
    } else {
        errors.instructor = false;
        errors.instructorText = '';
    }

    if (errors.name) {
        errors.name = true;
        isError.value = true;
    } else if (errors.trainingType) {
        errors.trainingType = true;
        isError.value = true;
    } else if (errors.batchCapacity) {
        errors.batchCapacity = true;
        isError.value = true;
    } else if (errors.endDate) {
        errors.endDate = true;
        isError.value = true;
    } else if (errors.instructor) {
        errors.instructor = true;
        isError.value = true;
    } else if (errors.startDate) {
        errors.startDate = true;
        isError.value = true;
    } else if (errors.course) {
        errors.course = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

let isChecked:any = ref(false);
const startDate:any = ref('');
const endDate:any = ref('');

const courses:any = computed(() => {
  return store.getters.getCourses.value.payload;
});

const check:any = ():any => {
    isChecked.value = !isChecked.value;
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

let errors = reactive({
    name: false,
    nameText: '',
    trainingType: false,
    trainingTypeText: '',
    batchCapacity: false,
    batchCapacityText: '',
    startDate: false,
    startDateText: '',
    endDate: false,
    endDateText: '',
    instructor: false,
    instructorText: '',
    course: false,
    courseText: '',
})

const today:any = moment().format('YYYY-MM-DD');

const Instructors:any = computed(() => {
  return store.getters.getInstructor.value.payload;
});

const training:any = ref('')

const instructor:any = ref([])

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

const anotherTime:any = computed(() => {
    return moment(newBatch.endDate).format('MM-DD-YYYY')
})

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    store.commit(batchMutationTypes.SetNewBatch, {})
    emits('close')
}

const batchcourse:any = ref('')

// const MonthYear = defineAsyncComponent(() => import('./MonthYearCustom.vue'));

// const monthYear = computed(() => MonthYear);

const addbatch:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/batch/create-batch`;

    const batchdata:any = {
        title: newBatch.value.title,
        trainingType: newBatch.value.trainingType,
        batchCapacity: newBatch.value.batchCapacity,
        startDate: moment(newBatch.value.startDate).format('MM/DD/YYYY'),
        endDate: moment(newBatch.value.endDate).format('MM/DD/YYYY'),
        instructors: newBatch.value.instructors,
        courseId: newBatch.value.courseId,
    }

    // formData.append('title', newBatch.value.title);
    // formData.append('trainingType', newBatch.value.trainingType);
    // formData.append('batchCapacity', newBatch.value.batchCapacity);
    // formData.append('startDate', moment(newBatch.value.startDate).format('MM/DD/YYYY'));
    // formData.append('endDate', moment(newBatch.value.endDate).format('MM/DD/YYYY'));
    // formData.append('instructors', newBatch.value.instructors);
    // formData.append('courseId', newBatch.value.courseId);

    const newData:any = {
        url: request,
        data: batchdata,
    }
    console.log('newData', newData)
    await store.dispatch(batchActionTypes.AddBatch, newData)
    await store.dispatch(batchActionTypes.FetchBatch)
    const result:any = await store.getters.getBatch
    closeModal()
    store.commit(batchMutationTypes.SetNewBatch, {})
}

const enddate:any = ref(null)

const sayhi:any = () => {
    console.log('say hi')
    enddate.value.openMenu
}

const editbatch:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/batch/edit-batch`;

    const batchdata:any = {
        id: newBatch.value.id,
        title: newBatch.value.title,
        trainingType: newBatch.value.trainingType,
        batchCapacity: newBatch.value.batchCapacity,
        startDate: moment(newBatch.value.startDate).format('MM/DD/YYYY'),
        endDate: moment(newBatch.value.endDate).format('MM/DD/YYYY'),
        instructors: JSON.parse(JSON.stringify(newBatch.value.instructors)),
        courseId: newBatch.value.courseId,
    }

    // formData.append('title', newBatch.value.title);
    // formData.append('id', newBatch.value.id);
    // formData.append('trainingType', newBatch.value.trainingType);
    // formData.append('BatchCapacity', newBatch.value.batchCapacity);
    // formData.append('startDate', moment(newBatch.value.startDate).format('MM/DD/YYYY'));
    // formData.append('endDate', moment(newBatch.value.endDate).format('MM/DD/YYYY'));
    // formData.append('instructors', newBatch.value.instructors);
    // formData.append('courseId', newBatch.value.courseId);

    const newData:any = {
        url: request,
        data: batchdata,
    }
    console.log('newData', newData)
    await store.dispatch(batchActionTypes.EditBatch, newData)
    await store.dispatch(batchActionTypes.FetchBatch)
    const result:any = await store.getters.getBatch
    closeModal()
    store.commit(batchMutationTypes.SetNewBatch, {})
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
    console.log('hello batch');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addbatch() : '';
}

const submitEdit:any = () => {
    console.log('hello batch');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editbatch() : '';
}

const activeView:any = 'bg-primary hover:opacity-80';
const disabledView:any = 'bg-gray-300';

onMounted(async () => {
    console.log('I am now here')
    const request:any = `${api_url}api/course/get-courses`;
    await store.dispatch(courseActionTypes.FetchCourses, request)
    const instructorrequest:any = `${api_url}api/instructor/get-instructors`;
    await store.dispatch(instructorActionTypes.FetchInstructors, instructorrequest)
})
</script>

<template>
    <div class="main w-full pb-12 mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">{{ props.name }} Cohort</p>
            <!-- {{ newBatch }} -->
            <!-- <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" /> -->
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="addbatch" class="text-sm text-left grid">
            <div class="grid grid-cols-2 gap-8 mb-10">
                <!-- {{ newBatch }} -->
                <div class="grid gap-4">
                    <label for="name" class="font-semibold">
                        Name*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newBatch.title" name="name" id="name" placeholder="Enter name" class="px-4 py-[10px] w-full border rounded-md focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.name ? errors.nameText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="course" class="font-semibold">
                        Course*
                    </label>
                    <multiselect @select="checkError" @clear="checkError" v-model="newBatch.courseId" valueProp="id" :options="courses" track-by="title" label="title" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] text-red">
                        {{ errors.course ? errors.courseText : '' }}
                    </p>

                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="item in courses" :key="item.id"  :value=item.id>{{ item.title }}</option>
                    </select> -->
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4">
                    <label for="trainingtype" class="font-semibold">
                        Training Type*
                    </label>

                    <multiselect @select="checkError" @clear="checkError"  v-model="newBatch.trainingType" valueProp="value" :options="trainingoptions" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" />

                    <p class="text-[10px] text-red">
                        {{ errors.trainingType ? errors.trainingTypeText : '' }}
                    </p>

                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="trainingtype" id="trainingtype">
                        <option value="">Select option</option>
                        <option value="Online">Online</option>
                        <option value="Onsite">Onsite</option>
                    </select> -->
                </div>
                <div class="grid gap-4">
                    <label for="capacity" class="font-semibold">
                        Batch capacity*
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newBatch.batchCapacity" name="capacity" id="capacity" placeholder="Enter number" class="px-4 py-[10px] w-full border rounded-md focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.batchCapacity ? errors.batchCapacityText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4" id="startdate">
                    <label for="startdate" class="font-semibold">
                        Start date*
                    </label>
                    <DatePicker v-if="props.name == 'Edit'" v-model="newBatch.startDate">
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                            class="px-3 py-4 w-full border rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input" menuClassName="dp-custom-menu" :monthChangeOnScroll="false" :minDate="today" v-model="newBatch.startDate" :maxDate="newBatch.endDate" placeholder="Start Date" :format="format" position="left" teleport="#startdate"/>
                    <!-- <datepicker /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.startDate ? errors.startDateText : '' }}
                    </p>
                </div>
                <div class="grid gap-4" id="enddate">
                    <label for="enddate" class="font-semibold">
                        End date*
                    </label>
                    <!-- <Datepicker :format="format" :value="newBatch.endDate" /> -->
                    <DatePicker v-if="props.name == 'Edit'" v-model="newBatch.endDate">
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                            class="px-3 py-4 border w-full rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input" @open="sayhi" @cleared="checkError" ref="enddate" :monthChangeOnScroll="false" menuClassName="dp-custom-menu" v-model="newBatch.endDate" :minDate="newBatch.startDate" :format="format" position="left" placeholder="End Date" teleport="#enddate" />
                    <!-- <input type="datetime-local" name="date" id="date" placeholder="End Date" v-model="newBatch.endDate" class="px-4 py-[10px] w-full border rounded-md focus:outline-none" min="newBatch.startDate"> {{ newBatch.endDate }} {{ anotherTime }} -->
                    <p class="text-[10px] text-red">
                        {{ errors.endDate ? errors.endDateText : '' }}
                    </p>
                </div>
            </div>
            <div class="grid gap-8 mb-10">
                <label for="instructor" class="font-semibold">
                    Instructor
                </label>
                <multiselect @select="checkError" @clear="checkError" v-model="newBatch.instructors" mode="tags" :close-on-select="false" valueProp="id" :options="Instructors" track-by="fullName" label="fullName" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                <p class="text-[10px] text-red">
                    {{ errors.instructor ? errors.instructorText : '' }}
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
                <button v-if="!isEditing" @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
                <button v-else @click.prevent="submitEdit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss">

.dp-custom-menu {
    position: static !important;
}
</style>