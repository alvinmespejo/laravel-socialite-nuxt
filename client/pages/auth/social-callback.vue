<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { isAuthenticated, refreshIdentity } = useSanctumAuth();

const queryParamToken: string | undefined = route.query.access_token as string
const queryParamTokenType: string| undefined = route.query.token_type as string
const queryParamProvider: string| undefined = route.query.provider as string

onMounted(async () => {
    // console.log(queryParamProvider, queryParamToken, queryParamTokenType)
    try {
        if (queryParamToken) {
        } else {
            await refreshIdentity()
            if (isAuthenticated.value) {
                router.push({ path: '/dashboard'})
                return
            }

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


definePageMeta({
    title: 'Social Authentication'
})

</script>

<template>
    <div>
        <p>Completing social login authentication...</p>
        <p>Please wait, you are being redirected...</p>
    </div>
</template>