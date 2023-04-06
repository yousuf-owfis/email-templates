<template>
  <div v-for="(template) in templates" :key="template.uid" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 m-4" @click="emit('select', template)">
    <!-- Start of templates list-->

    <!-- Emit selected template when click on template -->
    <div class="min-w-0 flex-1">
      <a href="#" class="focus:outline-none">
        <span class="absolute inset-0" aria-hidden="true" />
        <p class="text-sm font-medium text-gray-900">{{ template.name }}</p>
        <p class="text-sm text-gray-500">{{ template.subject }}</p>
      </a>
    </div>
    <!-- End of templates list -->

    <!-- Starts of delete icon -->
    <span>
      <TrashIcon
        class="h-5 w-5 text-gray-600 mt-[-5px]"
        @click="emit('delete', template.uid)"
      />
    </span>
    <!-- End of delete icon -->
  </div>
</template>

<script setup lang="ts">
import { DocumentIcon, TrashIcon } from "@heroicons/vue/24/outline";
// Define props
defineProps({
  // Take templates list as props
  templates: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

// Define emits
const emit = defineEmits(["select", "delete"]);
</script>
<style scoped></style>
