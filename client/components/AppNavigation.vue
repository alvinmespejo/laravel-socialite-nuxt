<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

useHead({
    title: <string>route.meta.title
})

type IUser = {
    id: number;
    name: string;
    email: string; 
}

const { isAuthenticated, logout: signoutAction } = useSanctumAuth()
const user = useSanctumUser<IUser>()

const signout = async () => {
    await signoutAction()
}
</script>

<template>
    <div class="p-6 flex items-center justify-between">
        <div class="flex items-center space-x-3">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        </div>

        <div class="flex items-center space-x-3">
            <template v-if="isAuthenticated">
                <div class="font-semibold">
                    {{ user?.name }}
                </div>
                <!-- <NuxtLink to="/account">Account</NuxtLink> -->
                <button @click.prevent="signout" class="cursor-pointer">Sign Out</button>
            </template>
            <template v-if="!isAuthenticated">
                <NuxtLink to="/">Sign In</NuxtLink>
                <NuxtLink to="/auth/signup">Sign Up</NuxtLink>
            </template>
        </div>
    </div>
</template>