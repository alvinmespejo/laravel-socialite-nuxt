<script setup lang="ts">

const { remove,get } = useAuthApi()

interface DeleteResponse {}
interface UserResponse {
    // data: {
        id: number
        email: string
        name: string
    // }
}

onMounted(async() => {
    const id: number = 6
    // const user = await get<UserResponse>('/api/users/1');
    // console.log(response.email)
    // const delete = await remove<DeleteResponse>(`/api/users/${id}`)
})

definePageMeta({
    middleware:['sanctum:auth'] as any,
    title: 'Dashboard',
})
</script>

<template>
    <div>
        Dashboard
    </div>
</template>