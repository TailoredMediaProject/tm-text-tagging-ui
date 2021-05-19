<template>
  <h1>Create text</h1>
  <form @submit.prevent="createText">
    <div class="mt-3 mb-3">
      <label for="title" class="form-label">Title</label>
      <input
        type="text"
        class="form-control"
        id="title"
        placeholder="Title of the text"
        autocomplete="off"
        required
        v-model="textResource.title"
      />
    </div>
    <div class="mb-3">
      <label for="text" class="form-label">Text</label>
      <textarea
        class="form-control"
        id="text"
        rows="10"
        placeholder="The text resource"
        required
        v-model="textResource.content"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary text-white">
      Create text
    </button>
  </form>
</template>

<script lang="ts">
import { TextDocRequest } from "@/openapi";
import { defineComponent, reactive } from "vue";
import useGoToAnnotationMode from "@/composables/useGoToAnnotationMode";
import useTextDocAPIClient from "@/composables/useTextDocAPIClient";
export default defineComponent({
  name: "CreateText",
  setup() {
    const textResource = reactive({} as TextDocRequest);
    const { goToAnnotationMode } = useGoToAnnotationMode();
    const { textDocsApi } = useTextDocAPIClient();
    const createText = async () => {
      const response = await textDocsApi.createTextDocument(textResource);
      if (response.data.id) {
        goToAnnotationMode(response.data.id);
      }
    };
    return { createText, textResource };
  },
});
</script>
