<script lang="ts">
export default {
  name: 'TopNavigation',
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import SvgIcons from '../components/SvgIcons.vue';

const logout:any = async () => {
	localStorage.clear();
	window.location.href = '/';
}
</script>

<template>
<div class="grid w-4/5 bg-white shadow-md py-2 justify-end items-center px-6">
	<!-- {{ endSessionEndpoint }} -->
	<div class="relative inline-block text-left dropdown">
		<button class="border text-grey flex justify-around gap-8 items-center rounded px-3 py-2" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
			<span class="icon border rounded-full ">
				<SvgIcons class="m-2" name="user-avatar" /> <!-- avatar icon -->
			</span>
			<span class="text-black">
				<p class="text-sm">Admin</p>
				<p class="text-xs">Walure Capital</p>
			</span>
			<span class="icon">
				<SvgIcons name="chevron-down" /> <!-- chevron down icon -->
			</span>
		</button>
		<div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
			<div class="absolute right-0 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
				<div class="py-1">
					<button @click.prevent="logout" tabindex="0" class="flex items-center py-5 px-7"  role="menuitem">
						<SvgIcons class="mr-4" name="logout" /> <!-- logout icon -->
						<p>Sign Out</p>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<style scoped>
    .dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }
</style>
