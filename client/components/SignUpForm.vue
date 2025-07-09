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
    confirmPassword: z.string().min(8, { message: 'Password too short'})
  })
  .refine(({password, confirmPassword}) => password === confirmPassword, {
    message: "Password does not match",
    path: ['confirmPassword']
  })

const formSchema = toTypedSchema(zodSchema)
const { handleSubmit } = useForm({
  validationSchema: formSchema
})

const isSigningUp = ref<Boolean>(false)
// type Album = {
//   userId: number,
//   id: number,
//   body: string
// }

// type Post = {
//   userId: number,
//   id: number,
//   title: string,
//   body: string
// }

// type Comment = {
//   id: number,
//   name: string,
//   body: string,
//   email: string,
//   postId: string,
// }

// const { data } = await useAsyncData('fetch-data', async () => {
//     return await Promise.all([
//       $fetch<Album[]>(`https://jsonplaceholder.typicode.com/albums`),
//       $fetch<Post[]>(`https://jsonplaceholder.typicode.com/posts`),
//       $fetch<Comment[]>(`https://jsonplaceholder.typicode.com/comments`),
//       $fetch<Comment>(`https://jsonplaceholder.typicode.com/comments/1`)
//     ])
//   }, { 
//     lazy: true, 
//     dedupe: 'cancel' 
//   })
    
//   if (data.value) {
//     const [albums, posts, comments, comment] : [Album[], Post[], Comment[], Comment] = data.value
//     console.log(albums, posts, comments, comment);
//   }

const onSubmit = handleSubmit(async (values) => {
    if(isSigningUp.value) {
      return;
    }

    isSigningUp.value = true
    // const [albums, posts, comments, comment]: [Album[], Post[], Comment[], Comment] = await Promise.all([
    //   $fetch<Album[]>(`https://jsonplaceholder.typicode.com/albums`),
    //   $fetch<Post[]>(`https://jsonplaceholder.typicode.com/posts`),
    //   $fetch<Comment[]>(`https://jsonplaceholder.typicode.com/comments`),
    //   $fetch<Comment>(`https://jsonplaceholder.typicode.com/comments/1`)
    // ])
    
    setTimeout(function() {
      isSigningUp.value = false
    }, 1000)
})

const signUp = async (values: z.infer<typeof zodSchema>) => {
  setTimeout(function() {
    isSigningUp.value = false
  }, 2000)
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
        <form @submit.prevent="onSubmit">
          <div class="grid gap-6">
            <div class="flex flex-col gap-4">
              <Button variant="outline" class="w-full hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                  />
                </svg>
                Continue with Apple
              </Button>
              <Button variant="outline" class="w-full hover:cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
            <div class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span class="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div class="grid gap-4">
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
                  </FormItem>
                </FormField>
              </div>
              <div class="grid gap-2">
                <FormField v-slot="{ componentField }" name="confirmPassword">
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="confirmPassword" type="password" placeholder="********" v-bind="componentField" />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                </FormField>
              </div>
              <Button 
                type="submit" 
                class="w-full"
                :class="{ 'cursor-not-allowed opacity-50' : isSigningUp, 'hover:cursor-pointer': !isSigningUp }" 
                :disable="isSigningUp">
                <Loader2 class="size-4 animate-spin" v-if="isSigningUp" />
                {{ isSigningUp ? 'Signing Up' : 'Sign Up' }}
              </Button>
            </div>
            <div class="text-center text-sm">
              Already have an account?
              <NuxtLink 
                class="underline underline-offset-4" to="/">
                Sign In
              </NuxtLink>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <div class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      By clicking continue, you agree to our <a href="#">Terms of Service</a>
      and <a href="#">Privacy Policy</a>.
    </div>
  </div>
</template>
