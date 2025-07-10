
<script setup lang="ts">
import { GalleryVerticalEnd } from 'lucide-vue-next'
import SigninForm from '@/components/SignInForm.vue'

const route = useRoute()

definePageMeta({
  title: 'Sign In',
  middleware: ['sanctum:guest']
})

onMounted(async() => {
  console.log(route.params);
  console.log(route.query);
})

</script>

<template>
  <div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
    <div class="flex flex-col gap-6">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-2 self-center font-medium">
        <div class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <GalleryVerticalEnd class="size-4" />
        </div>
        Acme Inc.
      </a>
      <SigninForm />
    </div>
  </div>
</template>
