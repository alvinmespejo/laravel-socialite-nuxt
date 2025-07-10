<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-vue-next'

import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem
} from '@/components/ui/form'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { login } = useSanctumAuth()

type ValidationErrors = {
  [key: string] : string | string[]
}

const isSigningIn = ref<boolean>(false)
const errors = ref<ValidationErrors>({})

const zodSchema = z.object({
  email: z.string().email('Must be a valid email'),
  password: z.string()
})

const formSchema = toTypedSchema(zodSchema)
const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const signIn = handleSubmit(async (values) => {
  try {
    isSigningIn.value = true
    await login(values)
  } catch (e: Error | any) {
     e.statusCode === 422
      ? errors.value = e.data.errors
      : errors.value = { general: e.message }
    isSigningIn.value = false
  }
})

const handleSocialAuthentication = (provider: string) => {
  const { appApiUrl } = useRuntimeConfig().public
  window.location.href = `${appApiUrl}/auth/${provider}/redirect`;
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card class="gap-4">
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          Welcome Back
        </CardTitle>
      </CardHeader>
      <CardContent>
        
          <div class="grid gap-6">
            <div class="flex flex-col gap-4">
              <Button variant="outline" class="w-full hover:cursor-pointer" @click.prevent="handleSocialAuthentication('github')">
                <Icon name="mdi:github" size="22"/>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg> -->
                Continue with Github
              </Button>
              <Button variant="outline" class="w-full hover:cursor-pointer" @click.prevent="handleSocialAuthentication('google')">
                <!-- <Icon name="mdi:google" size="20" /> -->
                <Icon name="icons:fe-google" size="20"/>
                Continue with Google
              </Button>
            </div>
            <div class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span class="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div class="grid gap-6">
              <form @submit.prevent="signIn" class="space-y-3">
                <div class="grid gap-3">
                  <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="johndoe@email.com" v-bind="componentField" />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  </FormField>
                </div>
                <div class="grid gap-3">
                  <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                      <div class="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <NuxtLink
                          to="/"
                          class="ml-auto text-sm underline-offset-4 hover:underline hover:decoration-slate-400 hover:text-muted-foreground"
                        >
                          Forgot your password?
                        </NuxtLink>
                      </div>
                      <FormControl>
                        <Input id="password" type="password" placeholder="**********" v-bind="componentField" />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  </FormField>
                </div>
                <Button 
                  class="w-full hover:cursor-pointer"
                  :class="{ 'cursor-not-allowed opacity-50' : isSigningIn, 'hover:cursor-pointer': !isSigningIn }"
                  :disabled="isSigningIn"
                >
                  <Loader2 class="size-4 mr-2 animate-spin" v-if="isSigningIn" />
                  {{ isSigningIn ? 'Signing In' : 'Sign In' }}
                </Button>
              </form>
            </div>
            <div class="text-center text-sm">
              Don't have an account?
              <NuxtLink 
                class="underline underline-offset-4" 
                to="/auth/signup">
                  Sign Up
              </NuxtLink>
            </div>
          </div>
        
      </CardContent>
    </Card>
    <div class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </div>
  </div>
</template>
