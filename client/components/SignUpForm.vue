<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from "zod"

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import {
  FormField, 
  FormItem, 
  FormMessage, 
  FormControl, 
  FormLabel 
} from '@/components/ui/form'
import { Loader2 } from 'lucide-vue-next'

const zodSchema = z.object({
    email: z.string({message: 'Email is required'}).email({message: 'Must be a valid email'}),
    firstname: z
      .string()
      .min(2, { message: 'First name is too short'})
      .refine(val => !/\d/.test(val), {
        message: "Numbers are not allowed"
      }),
    lastname: z
      .string()
      .min(2, { message: 'Last name is too short'})
      .refine(val => !/\d/.test(val), {
        message: 'Numbers are not allowed'
      }),
    password: z.string().min(8, { message: 'Password too short'}),
    password_confirmation: z.string().min(8, { message: 'Password too short'})
  })
  .refine(({password, password_confirmation}) => password === password_confirmation, {
    message: "Password does not match",
    path: ['password_confirmation']
  })

const formSchema = toTypedSchema(zodSchema)
const { handleSubmit } = useForm({
  validationSchema: formSchema
})



const apiHttp = useAuthApi()
const { refreshIdentity } = useSanctumAuth()
const isSigningUp = ref<boolean>(false)

interface RegistrationResponse {}
interface RegistrationForm {
  firstname: string
  lastname: string
  email: string
  password: string
  password_confirmation: string
  name?: string
}

interface ValidationErrors {
  [key: string]: string | string[]
}
const errors = ref<ValidationErrors>({})

const onSubmit = handleSubmit(async (values) => {
    if(isSigningUp.value) {
      return;
    }

    let form: RegistrationForm = {
      ...values,
      name: `${values.firstname} ${values.lastname}`
    }

    try {
      isSigningUp.value = true
      const response = await apiHttp.post<RegistrationResponse, RegistrationForm>('/register', form, {})
      await refreshIdentity()
      // console.log(response, response.status);
      await navigateTo('/')

    } catch (e: Error | any) {
      isSigningUp.value = false
        errors.value = e.statusCode === 422 
          ? e.data.errors
          : { general: e.message }
    }
    
    // setTimeout(function() {
    //   isSigningUp.value = false
    // }, 1000)
})

const signUp = async (values: z.infer<typeof zodSchema>) => {
  setTimeout(function() {
    isSigningUp.value = false
  }, 2000)
}

const handleSocialAuthentication = (provider: string) => {
  const { appApiUrl } = useRuntimeConfig().public
  window.location.href = `${appApiUrl}/auth/${provider}/redirect`;
}

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card class="gap-5">
      <CardHeader class="text-center">
        <CardTitle class="text-xl">
          Sign Up
        </CardTitle>
      </CardHeader>
      <CardContent class="">
        <div class="grid gap-6">
          <div class="flex flex-col gap-4">
            {{ errors }}
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
          <div class="grid gap-4">
            <form @submit.prevent="onSubmit" class="space-y-4 ">
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-2">
                  <FormField v-slot="{ componentField }" name="firstname">
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input id="firstname" type="text" placeholder="Jon" v-bind="componentField" />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  </FormField>
                </div>
                <div class="grid gap-2">
                  <FormField v-slot="{ componentField }" name="lastname">
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input id="lastname" type="text" placeholder="Doe" v-bind="componentField" />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  </FormField>
                </div>
              </div>
              <div class="grid gap-2">
                <FormField v-slot="{ componentField }" name="email">
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="johndoe@email.com" v-bind="componentField" />
                    </FormControl>
                    <FormMessage/>
                    <div class="text-destructive-foreground text-sm" v-if="errors.email">
                      {{ errors.email[0] }}
                    </div>
                  </FormItem>
                </FormField>
              </div>
              <div class="grid gap-2">
                <FormField v-slot="{ componentField }" name="password">
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" placeholder="*******" v-bind="componentField" />
                    </FormControl>
                    <FormMessage/>
                    <div class="text-destructive-foreground text-sm" v-if="errors.password">
                      {{ errors.password[0] }}
                    </div>
                  </FormItem>
                </FormField>
              </div>
              <div class="grid gap-2">
                <FormField v-slot="{ componentField }" name="password_confirmation">
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="password_confirmation" type="password" placeholder="********" v-bind="componentField" />
                    </FormControl>
                    <FormMessage/>
                    <div class="text-destructive-foreground text-sm" v-if="errors.password_confirmation">
                      {{ errors.password_confirmation[0] }}
                    </div>
                  </FormItem>
                </FormField>
              </div>
              <Button 
                type="submit" 
                class="w-full hover:cursor-pointer"
                :class="{ 'cursor-not-allowed opacity-50' : isSigningUp, 'hover:cursor-pointer': !isSigningUp }" 
                :disable="isSigningUp">
                <Loader2 class="size-4 animate-spin" v-if="isSigningUp" />
                {{ isSigningUp ? 'Signing Up' : 'Sign Up' }}
              </Button>
            </form>
          </div>
          <div class="text-center text-sm">
            Already have an account?
            <NuxtLink 
              class="underline underline-offset-4" to="/">
              Sign In
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
