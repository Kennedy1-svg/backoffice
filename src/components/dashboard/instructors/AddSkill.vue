<script lang="ts">
export default {
  name: 'AddSkill',
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from '../../SvgIcons.vue';
import * as actionTypes from '../../../store/module/instructors/constants/action'
import * as mutationTypes from '../../../store/module/instructors/constants/mutation'
import Filter from '../../Filter.vue';
import { api_url } from '../../../config'
import { useStore } from 'vuex';

const store = useStore();

const route = useRouter();

let isDisabled = ref(true);
let isError:any = ref(false);
let formData = new FormData()

let isChecked:any = ref(false);

const check:any = ():any => {
    isChecked.value = !isChecked.value;
}

const props = defineProps({
    name: {
    type: String,
  }
});

const { name } = toRefs(props);

let errors = reactive({
    name: false,
    nameText: '',
})

const newSkill:any = computed(() => {
    return store.getters.getNewSkill.value;
});

const isEditing:any = computed(() => {
    let answer:any = ref(false)
    if (props.name == 'Add') {
        return
    } else if (props.name == 'Edit') {
        answer = true
    }
    return answer;
})

const checkError:any = () => {
    // let imageType:String = newSkill.value.imageFile.type;
    // console.log('imageType is', imageType)
    if (!newSkill.value.name) {
        errors.name = true;
        errors.nameText = 'Name is required'
    } else if (newSkill.value.name.length <= 3) {
        errors.name = true;
        errors.nameText = 'Name needs to be more than 3 characters'
    } else {
        errors.name = false;
        errors.nameText = ''
    }

    if (errors.name) {
        errors.name = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

const emits = defineEmits(['close'])

const closeModal:any =  () => {
    store.commit(mutationTypes.SetNewSkill, {})
    emits('close')
}

const addSkill:any = async () => {
    // console.log('hi');
    // route.push('/dashboard/student-management')
    const request:any = `${api_url}api/skill/create-skill`;

    // const formElem = document.getElementById('formElem')
    // formData.append('name', newSkill.value.name)
    // console.log('added Data', formData)
    // console.log('formdata items', [...data.entries()])

    const data:any = {
        name: newSkill.value.name,
    }

    console.log('new skill to be added ', data)

    const newData:any = {
        url: request,
        data: data
    }
    console.log('newData', newData)
    await store.dispatch(actionTypes.AddNewSkill, newData)
    const result:any = await store.getters.getSkills
    closeModal()

}

const submit:any = () => {
    console.log('hello skill');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? addSkill() : '';
}

const editSkill:any = async () => {
    // console.log('hi');
    // route.push('/dashboard/student-management')
    const request:any = `${api_url}api/skill/edit-skill`;

    // const formElem = document.getElementById('formElem')
    // formData.append('name', newSkill.value.name)
    // formData.append('id', newSkill.value.id)
    // console.log('added Data', formData)

    const data:any = {
        name: newSkill.value.name,
        id: newSkill.value.id
    }

    console.log('new skill to be added ', data)
    // console.log('formdata items', [...data.entries()])

    const newData:any = {
        url: request,
        data: data
    }
    console.log('newData', newData)
    await store.dispatch(actionTypes.UpdateSkill, newData)
    const result:any = await store.getters.getSkills
    closeModal()

}

const submitEdit:any = () => {
    console.log('hello Skill');
    checkError();
    console.log('iserror value', isError.value)
    !isError.value ? editSkill() : '';
}
</script>

<template>
    <div class="main w-full mt-[0.5px] px-[45px] bg-white">
        <div class="flex justify-between py-[53px] items-center ">
            <p class="text-2xl">{{ props.name }} Skill</p>
            <SvgIcons onclick="document.getElementById('addskill').close();" name="cancel" class="cursor-pointer" />
        </div>
        <form class="text-sm grid">
            <div class="grid gap-1 mb-10">
                <label for="batch" class="text-left font-semibold">
                    Name
                </label>
                <input type="text" v-model="newSkill.name" name="name" id="name" placeholder="Enter name" class="p-3 rounded border">
            </div>
            <div class="flex justify-end pb-10">
                <!-- <button @click.prevent="addSkill" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button> -->
                <button v-if="!isEditing" @click.prevent="submit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Add</button>
                <button v-else @click.prevent="submitEdit" class="py-4 px-8 hover:bg-opacity-80 font-bold flex justify-center border bg-primary text-white rounded-md">Save Changes</button>
            </div>
        </form>
    </div>
</template>
