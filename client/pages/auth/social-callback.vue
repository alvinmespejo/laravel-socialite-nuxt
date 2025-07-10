<script setup lang="ts">
// const route = useRoute()
const router = useRouter()
const { isAuthenticated, refreshIdentity } = useSanctumAuth();

definePageMeta({
    title: 'Social Authentication',
    // middleware: ['sanctum:guest'] as any
})

onMounted(async () => {
    try {
        await refreshIdentity()
        if (isAuthenticated.value) {
            router.push({ path: '/dashboard'})
        } else {
            router.push({
                path: '/',
                query: {
                    error: 'social-auth-failed'
                }
            })
        }
    } catch (e: any) {
        router.push({
                path: '/',
                query: {
                    error: 'social-auth-callback-failed'
                }
            })
    }
})
</script>

<template>
    <div>
        <p>Completing social login authentication...</p>
        <p>Please wait, you are being redirected...</p>
    </div>
</template>