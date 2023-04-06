<template>
  <div class="row-span-3 col-span-4 bg-white h-[calc(100vh-150px)]">
    <!-- Start of form -->
    <form @submit.prevent="update" @reset.prevent="cancel">
      <div class="bg-gray-50 mx-auto px-5 py-3">
        <div class="text-center mb-0 rounded-0">
          <div class="flex justify-between items-center">
            <!-- Start of name field -->
            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              class="block rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-300 w-full placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 mt-2 sm:mx-[-12px]"
              placeholder="Enter Template Name"
              required
            />
            <!-- End of name field -->
          </div>
        </div>
      </div>
      <div class="mx-2 mt-3">
        <div class="flex justify-between items-center">
          <!-- Start of subject field -->
          <input
            v-model="form.subject"
            type="text"
            class="block px-3 rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 w-full"
            placeholder="Enter Template Subject"
            required
          />
          <!-- End of subject field -->
        </div>
        <!-- Start of template body  -->
        <textarea
          v-model="form.body"
          rows="4"
          class="p-4 mt-4 h-[calc(100vh-350px)] block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:py-1.5 sm:text-sm sm:leading-6"
          placeholder="Add Template Body..."
          required
        />
        <!-- End of template body -->
      </div>
      <!-- Start of buttons-->
      <div class="flex justify-end mr-3 mt-4">
        <button
          type="reset"
          class="border rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mr-3"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-blue-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-white-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-600"
        >
          Update
        </button>
      </div>
      <!-- Ends of buttons -->
    </form>
    <!-- End of form -->
  </div>
</template>

<script setup lang="ts">
// Define props
const props = defineProps({
  // Template currentTemplate/selectedTemplate
  template: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const form: any = ref({});

// Define emits
const emit = defineEmits(["edit"]);

// Watcher to update form on change of selected template
watch(
  () => props.template,
  (newValue) => {
    if (newValue) {
      form.value = JSON.parse(JSON.stringify(newValue));
    }
  }
);

// Save the data when click on update or save
const update = () => {
  emit("edit", form.value);
};

// Show previous template when click on cancel
const cancel = () => {
  form.value = JSON.parse(JSON.stringify(props.template));
};
</script>
<style scoped></style>
