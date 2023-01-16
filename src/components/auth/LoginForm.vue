<script lang="ts">
export default {
  name: 'LoginForm',
}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcons from '../SvgIcons.vue';
import spinner from '../spinner.vue'
import { useStore } from 'vuex'
import * as actionTypes from '../../store/module/auth/constants/action'
import * as mutationTypes from '../../store/module/auth/constants/mutation'
import { grant_type, client_id, client_secret, scope, api_url } from '../../config'

const store = useStore();

const route = useRouter();

let rememberChecked:any = ref(false);
let isDisabled = ref(true);
let isError:any = ref(false);
let isLoading:any = ref(false);

let errors = reactive({
    username: false,
    usertext: '',
    password: false,
    passwordtext: '',
})

const password_pattern = '^(?=.*\\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$';
const username_pattern ='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

let data = reactive({
    username: '',
    password: ''
})

const check:any = ():any => {
    rememberChecked.value = !rememberChecked.value;
}

const forgotPassword:any = ():any => {
    route.push('/forgot-password')
}

const login:any = async () => {
    isLoading.value = true;
    isDisabled.value = true;
    const params = new URLSearchParams();

    params.append('username', data.username);
    params.append('password', data.password);
    params.append('grant_type', `${grant_type}`);
    params.append('client_id', `${client_id}`);
    params.append('client_secret', `${client_secret}`);
    params.append('scope', `${scope}`);

    const request:any = {
        url: `${api_url}connect/token`,
        data: params,
    }

    await store.dispatch(actionTypes.FetchData, request)
    .then(() => {
        if (store.getters.getLoginAlertText.value.includes('Successful')) {
            isLoading.value = false;
            isDisabled.value = false;
            setTimeout(() => {
                route.push('/dashboard')
            }, 600);
        } else {
            isLoading.value = false;
            isDisabled.value = false;
        }
    })
}

const checkError:any = () => {
    if (!data.username) {
        errors.username = true;
        isDisabled.value = true;
        errors.usertext = 'Username is required'
    } else if (!data.username.match(username_pattern)) {
        errors.username = true;
        isDisabled.value = true;
        errors.usertext = `Username must match pattern 'brainadams@gmail.com'`
    } else {
        isDisabled.value = false;
        errors.username = false;
    }

    if (!data.password) {
        errors.password = true;
        isDisabled.value = true;
        errors.passwordtext = 'Password is required'
    } else if (!data.password.match(password_pattern)) {
        errors.password = true;
        isDisabled.value = true;
        errors.passwordtext = 'Password must be at least 8 characters, contain at least one number, one symbol, one uppercase and one lowercase letter'
    } else {
        isDisabled.value = false;
        errors.password = false;
    }

    if (errors.username) {
        errors.username = true;
        isError.value = true;
    } else if (errors.password) {
        errors.password = true;
        isError.value = true;
    } else {
        isError.value = false;
        isDisabled.value = false;
    }
}

// const clientSettings = {
//     authority: backendUri,
//     client_id: clientId,
//     redirect_uri: redirectUri,
//     post_logout_redirect_uri: logoutRedirectUri,
//     response_type: 'code',
//     filterProtocolClaims: true,
//     loadUserInfo: false,
//     scope: scopes,
//     extraTokenParams: {scope: scopes},
// };

const submit:any = () => {
    console.log('hello');
    checkError();
    !isError.value ? login() : '';
}
</script>

<template>
    <div class="relative main w-full bg-white">
        <form class=" text-sm grid">
            <div class="grid gap-1 mb-4">
                <label for="username" class="font-semibold">
                    Username
                </label>
                <input type="text" name="username" v-model="data.username" id="username" @focus="checkError" @keyup="checkError" @blur="checkError()" placeholder="Enter username" :class="[errors.username ? 'border text-red border-red' : '']" class="p-4 rounded-md bg-gray-50 text-xs focus:outline-none">
                <p class="text-[10px] text-red">
                    {{ errors.username ? errors.usertext : '' }}
                </p>
            </div>
            <div class="grid gap-1 mt-4 mb-2">
                <label for="password" class="font-semibold">
                    Password
                </label>
                <input type="password" @focus="checkError" @keyup="checkError" name="password" id="password" placeholder="Enter password" v-model="data.password" :class="[errors.password ? 'border text-red border-red' : '']" class="p-4 rounded-md bg-gray-50 text-xs focus:outline-none">
                <p class="text-[10px] text-red">
                    {{ errors.password ? errors.passwordtext : '' }}
                </p>
            </div>
            <div class="extras flex justify-between items-center text-[10px] text-blue-600 mt-2 mb-8">
                <div class="forgot">
                    <button @click.prevent="forgotPassword">
                        Forgot password?
                    </button>
                </div>
                <div class="remember flex">
                    <div class="flex items-center">
                        <input id="list-check" @click.prevent="check" type="checkbox" class="opacity-0 absolute h-5 w-5" />
                        <div class="bg-primary text-primary border-2 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary">
                        <SvgIcons v-if="rememberChecked" class="text-white" name="tick" />
                        </div>
                    </div>
                    <label for="remember">
                        Remember me
                    </label>
                </div>
            </div>
            <div class="grid">
                <button @click.prevent="submit" :disabled="isDisabled" :class="[isDisabled ? 'bg-grey' : 'bg-primary']" class="p-4 font-bold flex justify-center border text-white rounded-md">
                    <span class="px-4 flex" :class="[isLoading ? '' : 'hidden']">
                        <spinner />
                    </span>
                    Login
                </button>
            </div>
        </form>
        <!-- <div class="flex items-center justify-center mt-8 gap-3">
            <hr class="bg-primary w-full h-[2px]"/>
            <p>OR</p>
            <hr class="bg-primary w-full h-[2px]"/>
        </div>
        <div class="my-5">
            <button @click="loginWithZoho" class="bg-[#CE2232] flex w-full font-semibold bg-opacity-70 hover:bg-opacity-100 justify-center text-white py-3 px-5 rounded">
                Sign in with Zoho
            </button>
        </div> -->
    </div>
</template>

<style scoped>
</style>