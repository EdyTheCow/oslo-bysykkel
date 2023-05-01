<script setup>
  defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
})
</script>

<template>
    <div class="bg-gray-900 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">{{ title }}</h2>
          <p class="mt-6 text-lg leading-8 text-gray-300">{{ subtitle }}</p>
        </div>
      </div>
    </div>
</template>