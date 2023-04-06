<template>
  <!-- Start of loading -->
  <div v-if="pending" class="flex items-center justify-center">
    <div
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    />
  </div>
  <!-- End of loading-->

  <!-- Start of sections -->
  <div v-else>
    <!-- Start of LHS section which have list of templates and icons -->
    <div
      class="grid grid-rows-3 grid-flow-col grid-cols-4 border w-[80vw] mx-auto my-5 rounded-lg pr-[4px]"
    >
      <div
        class="row-span-3 bg-gray-50 border-r p-5 rounded-l-lg h-[calc(103vh-150px)] overflow-auto"
      >
        <div class="pb-3 w-[100%]">
          <button
            class="bg-white hover:bg-gray-50 hover:text-gray-800 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 font-semibold inline-flex items-center justify-center px-3 py-3 rounded-md shadow-sm text-gray-600 text-sm w-[100%]"
            @click="add()"
          >
            <span>
              <PlusIcon class="h-5 w-5 mr-2" />
            </span>
            Add Template
          </button>
        </div>

        <CollectionList
          :templates="templates"
          @select="select"
          @delete="deleteItem"
        />
      </div>
      <!-- End of LHS section -->

      <!-- Start of RHS section which have input fields and body-->
      <CollectionAdd v-if="addTemplate" @save="save" @cancel="cancel" />
      <CollectionEdit
        v-show="editTemplate && templates.length"
        :key="render"
        :template="currentTemplate"
        :url="url"
        :project-id="projectId"
        :share-type="shareType"
        :entity="entity"
        :is-active="isActive"
        @edit="edit"
        @delete="deleteItem"
      />
      <p
        v-show="!templates.length && !addTemplate"
        class="mt-[150px] justify-center text-xl text-b ml-[400px]"
      >
        {{ heading }}
      </p>
      <!-- End of RHS section -->
    </div>
  </div>
  <!-- End of Sections -->
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";

// Defining Props
const props = defineProps({
  heading: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  isActive: {
    type: String,
    default: "1",
  },
  projectId: {
    type: String,
    default: "95",
  },
  // PUBLIC/PRIVATE
  shareType: {
    type: String,
    default: "PRIVATE",
  },
  // Email tempaltes for contacts, deal etc.
  entity: {
    type: String,
    default: "1",
  },
});

const addTemplate: any = ref(false);
const editTemplate: any = ref(false);
const currentTemplate: any = ref({});
const render = ref(0);

// Authorization token
const authHeader = {
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiM2QwMjI0MjY1MDBmNDA1Njk1OWMwY2M1Nzk4Mzg0NjgiLCJkIjoiMTY4MDA2OCIsInIiOiJzYSIsInAiOiJmcmVlIiwiYSI6ImZpbmRlci5pbyIsImwiOiJ1czEiLCJleHAiOjE2ODMyNzEyMzd9.lMm7qCLU343-fMBeaOSy-LYa37vVUPmF3ncRpw3XOg4",
};

// Get templates data using api call
const { pending, data: templates } = await useLazyFetch(
  `${props.url}?offset=0&limit=100&sort_column=id&sort_direction=desc`,
  {
    method: "GET",
    headers: authHeader,
  }
);

onMounted(() => {
  if (templates.value.length > 0) {
    editTemplate.value = true;
    currentTemplate.value = templates.value[0];
  }
});

// Add new template when click on add template button
const add = () => {
  editTemplate.value = false;
  addTemplate.value = true;
};

const cancel = () => {
  addTemplate.value = false;
  editTemplate.value = true;
};

// Assign selected template value to current template
const select = (template: object) => {
  addTemplate.value = false;
  editTemplate.value = true;
  currentTemplate.value = template;
};

// Save template data
const save = async (template: any) => {
  const postData = ref({
    project_id: props.projectId,
    name: template.name,
    subject: template.subject,
    body: template.body,
    is_active: props.isActive,
    type: "PLAIN_TEXT",
    share_type: props.shareType,
    category: props.entity,
  });

  // Post call hits when click on save button
  const { data: response } = await useLazyFetch(props.url, {
    method: "POST",
    headers: authHeader,
    body: postData.value,
  });

  templates.value.unshift(response.value);
};

// Update templates data
const edit = async (template: any) => {
  const postData = ref({
    project_id: props.projectId,
    name: template.name,
    subject: template.subject,
    body: template.body,
    is_active: props.isActive,
    type: template.type,
    share_type: props.shareType,
    category: props.entity,
  });

  // Put call hits when click on save button
  const { data: response } = await useLazyFetch(`${props.url}${template.uid}`, {
    method: "PUT",
    headers: authHeader,
    body: postData.value,
  });

  if (response) {
    templates.value.forEach((templateData: any) => {
      if (currentTemplate.value.uid === templateData.uid) {
        templateData.name = template.name;
        templateData.subject = template.subject;
        templateData.body = template.body;
        templateData.type = template.type;
      }
    });
  }
};

// Delete template based on uid
const deleteItem = (uid: string) => {
  const { data: response } = useLazyFetch(`${props.url}${uid}`, {
    method: "DELETE",
    headers: authHeader,
  });
  if (response) {
    const index = templates.value.findIndex(
      (template: any) => template.uid === uid
    );
    if (index !== -1) {
      templates.value.splice(index, 1);
    }
  }
  if (templates.value.length) currentTemplate.value = templates.value[0];
  else currentTemplate.value = {};
};
</script>
