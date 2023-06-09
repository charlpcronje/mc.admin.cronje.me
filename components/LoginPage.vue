<template>
	<div class="max-w-2xl mx-auto">
		<div
			class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
			<form class="space-y-6"  @submit.prevent="submitForm">
				<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to Mall Chat Admin</h3>
				<div>
					<button>Email and Password</button>
				</div>
				<div>
					<label for="email" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
						email</label>
					<input v-model="formData.email" type="email" name="email" id="email"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder="name@company.com" required="true">
				</div>
				<div>
					<label for="password" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your
						password</label>
					<input v-model="formData.password" type="password" name="password" id="password" placeholder="••••••••"
						class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						required="true">
				</div>
				<div class="flex items-start">
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input id="remember" aria-describedby="remember" type="checkbox"
								class="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"/>
						</div>
						<div class="text-sm ml-3">
							<label for="remember" class="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
						</div>
					</div>
					<a href="#" class="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500">Lost Password?</a>
				</div>
				<button type="submit" 
					class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
					Sign In
				</button>
				<!--
				<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create
				account</a>
				</div>
				-->
			</form>
		</div>


		<p class="mt-5">
			There are no new registrations available right now
			<br />
			<a class="text-blue-600 hover:underline" href="#" target="_blank">
				Mall Documentation
			</a>.
		</p>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/store/auth';
console.log("LoginPage.vue");
const auth = useAuthStore();

const formData = ref({
	email: 'charl@cronje.me',
	password: '9983538'
});

async function submitForm() {
	console.log("Authenticating user");
	auth.authenticateUser(formData.value);
	if (auth.authenticated) {
		navigateTo('/dashboard');
	} else {
		console.log("User not authenticated");
	}
};
</script>