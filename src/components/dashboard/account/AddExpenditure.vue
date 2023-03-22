<script lang="ts">
export default {
  name: 'AddExpenditure',
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
    if (!newProject.value.category && newProject.value.category != '0') {
        errors.category = true;
        errors.categoryText = 'Category is required'
    } else {
        errors.category = false;
        errors.categoryText = '';
    }

    // if (!newProject.value.email) {
    //     errors.email = true;
    //     errors.emailText = 'Email is required'
    // } else if (!newProject.value.email.match(email)) {
    //     errors.email = true;
    //     errors.emailText = `Email must should have the format 'brianadams@walure.com`
    // } else {
    //     errors.email = false;
    //     errors.emailText = ''
    // }

    if (!newProject.value.amount) {
        errors.amount = true;
        errors.amountText = 'Number of resources is required'
    } else if (isNaN(newProject.value.amount)) {
        errors.amount = true;
        errors.amountText = 'Number of resources cannot contain letters'
    } else {
        errors.amount = false;
        errors.amountText = '';
    }

    if (!newProject.value.dot) {
        errors.dot = true;
        errors.dotText = 'DOT is required.'
    } else {
        errors.dot = false;
        errors.dotText = '';
    }

    if (!newProject.value.product) {
        errors.product = true;
        errors.productText = 'Product is required. Please enter a product'
    } else {
        errors.product = false;
        errors.productText = '';
    }

    // if (!newProject.value.endDate) {
    //     errors.endDate = true;
    //     errors.endDateText = 'End date is required'
    // } else {
    //     errors.endDate = false;
    //     errors.endDateText = '';
    // }

    // if (!newProject.value.brief) {
    //     errors.brief = true;
    //     errors.briefText = 'Project brief is required'
    // } else {
    //     errors.brief = false;
    //     errors.briefText = '';
    // }

    if (errors.category) {
        errors.category = true;
        isError.value = true;
    // } else if (errors.email) {
    //     errors.email = true;
    //     isError.value = true;
    } else if (errors.amount) {
        errors.amount = true;
        isError.value = true;
    // } else if (errors.endDate) {
    //     errors.endDate = true;
    //     isError.value = true;
    // } else if (errors.brief) {
    //     errors.brief = true;
    //     isError.value = true;
    } else if (errors.dot) {
        errors.dot = true;
        isError.value = true;
    } else if (errors.product) {
        errors.product = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

let isChecked:any = ref(false);
const dot:any = ref('');
const endDate:any = ref('');

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

let errors = reactive({
    category: false,
    categoryText: '',
    email: false,
    emailText: '',
    amount: false,
    amountText: '',
    dot: false,
    dotText: '',
    endDate: false,
    endDateText: '',
    brief: false,
    briefText: '',
    product: false,
    productText: '',
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

const isEditing:any = computed(() => {
    let answer:any = ref(false)
    if (props.name == 'Add') {
        return
    } else if (props.name == 'Edit') {
        answer = true
    }
    return answer;
})

const closeModal:any = async () => {
    await store.commit(projectMutationTypes.SetNewProject, {})
    emits('close')
}

const projectcourse:any = ref('')

const addproject:any = async () => {
    console.log('hi');
    const request:any = `${api_url}api/project/create-project`;

    const projectdata:any = {
        category: newProject.value.category,
        email: newProject.value.email,
        amount: newProject.value.amount,
        dot: moment(newProject.value.dot).format('MM/DD/YYYY'),
        endDate: moment(newProject.value.endDate).format('MM/DD/YYYY'),
        brief: newProject.value.brief,
        product: newProject.value.product
    //     Product: newProject.value.name,
    //     TrainingType: newProject.value.email,
    //     ProjectCapacity: newProject.value.amount,
    //     // StartDate: moment(newProject.value.dot).format('MM/DD/YYYY'),
    //     // EndDate: moment(newProject.value.endDate).format('MM/DD/YYYY'),
    //     StartDate: newProject.value.dot,
    //     EndDate: newProject.value.endDate,
    //     Instructors: JSON.parse(JSON.stringify(newProject.value.brief)),
    //     CourseId: newProject.value.courseId,
    }

    // formData.append('category', newProject.value.category);
    // formData.append('email', newProject.value.email);
    // formData.append('amount', newProject.value.amount);
    // formData.append('dot', moment(newProject.value.dot).format('MM/DD/YYYY'));
    // formData.append('endDate', moment(newProject.value.endDate).format('MM/DD/YYYY'));
    // formData.append('brief', newProject.value.brief);
    // formData.append('product', newProject.value.product);

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
        category: newProject.value.category,
        email: newProject.value.email,
        amount: newProject.value.amount,
        dot: moment(newProject.value.dot).format('MM/DD/YYYY'),
        endDate: moment(newProject.value.endDate).format('MM/DD/YYYY'),
        brief: newProject.value.brief,
        product: newProject.value.product,
        id: newProject.value.id
    //     Product: newProject.value.name,
    //     TrainingType: newProject.value.email,
    //     ProjectCapacity: newProject.value.amount,
    //     // StartDate: moment(newProject.value.dot).format('MM/DD/YYYY'),
    //     // EndDate: moment(newProject.value.endDate).format('MM/DD/YYYY'),
    //     StartDate: newProject.value.dot,
    //     EndDate: newProject.value.endDate,
    //     Instructors: JSON.parse(JSON.stringify(newProject.value.brief)),
    //     CourseId: newProject.value.courseId,
    }

    // formData.append('Product', newProject.value.category);
    // formData.append('Id', newProject.value.id);
    // formData.append('TrainingType', newProject.value.email);
    // formData.append('ProjectCapacity', newProject.value.amount);
    // formData.append('StartDate', moment(newProject.value.dot).format('MM/DD/YYYY'));
    // formData.append('EndDate', moment(newProject.value.endDate).format('MM/DD/YYYY'));
    // formData.append('Instructors', newProject.value.brief);
    // formData.append('CourseId', newProject.value.product);

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
            <p class="text-2xl">{{ props.name }} expenditure</p>
            <!-- <SvgIcons onclick="document.getElementById('myModal').close();" name="cancel" class="cursor-pointer" /> -->
            <SvgIcons @click="closeModal" name="cancel" class="cursor-pointer" />
        </div>
        <form id="addproject" class="text-sm text-left grid">
            <div class="grid grid-cols-2 gap-8 mb-10">
                <!-- {{ newProject }} -->
                <div class="grid gap-4">
                    <label for="category" class="font-semibold">
                        Category <span class="text-red font-bold">*</span>
                    </label>
                    <!-- <input type="text" @focus="checkError" @keyup="checkError"  v-model="newProject.category" name="category" id="category" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none"> -->
                    <multiselect @select="checkError" @clear="checkError"  v-model="newProject.category" valueProp="value" :options="trainingoptions" track-by="label" label="label" placeholder="Select option" :searchable="true" class="multiselect-blue" />
                    <p class="text-[10px] text-red">
                        {{ errors.category ? errors.categoryText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="product" class="font-semibold">
                        Product <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError"  v-model="newProject.product" name="product" id="product" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <!-- <multiselect @select="checkError" @clear="checkError" v-model="newProject.product" valueProp="id" :options="courses" track-by="product" label="product" placeholder="Select option" :searchable="true" class="multiselect-blue" /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.product ? errors.productText : '' }}
                    </p>

                    <!-- <select class="pl-5 text-sm py-3 bg-transparent rounded border text-grey" name="course" id="course">
                        <option value="">Select option</option>
                        <option  v-for="item in courses" :key="item.id"  :value=item.id>{{ item.product }}</option>
                    </select> -->
                </div>
            </div>
            <div class="grid grid-cols-2 gap-8 mb-10">
                <div class="grid gap-4" id="dot">
                    <label for="dot" class="font-semibold">
                        DOT <span class="text-red font-bold">*</span>
                    </label>
                    <DatePicker v-if="props.name == 'Edit'" v-model="newProject.dot">
                        <template v-slot="{ inputValue, inputEvents }">
                            <input
                            class="px-3 py-4 w-full border rounded focus:outline-none focus:border-primary"
                            :value="inputValue"
                            v-on="inputEvents"
                            />
                        </template>
                    </DatePicker>
                    <Datepicker v-else inputClassName="dp-custom-input" @update:model-value="checkError" @cleared="checkError"  menuClassName="dp-custom-menu" v-model="newProject.dot" placeholder="Select Date" :format="format" position="left" teleport="#dot"/>
                    <!-- <datepicker /> -->
                    <p class="text-[10px] text-red">
                        {{ errors.dot ? errors.dotText : '' }}
                    </p>
                </div>
                <div class="grid gap-4">
                    <label for="amount" class="font-semibold">
                        Amount <span class="text-red font-bold">*</span>
                    </label>
                    <input type="text" @focus="checkError" @keyup="checkError" v-model="newProject.amount" name="amount" id="amount" class="px-4 py-[10px] w-full border rounded-md text-xs focus:outline-none">
                    <p class="text-[10px] text-red">
                        {{ errors.amount ? errors.amountText : '' }}
                    </p>
                </div>
            </div>
            <div class="flex justify-end mt-20 gap-10 pb-10">
                <button @click.prevent="closeModal" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border border-primary text-primary rounded-md">Cancel</button>
                <button v-if="!isEditing" @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Create</button>
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