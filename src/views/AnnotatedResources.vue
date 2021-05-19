<template>
  <div class="d-flex justify-content-between align-items-end">
    <h1>Annotated Resources</h1>
    <div>
      <label v-show="false" for="filter"> Filter </label>
      <input
        v-model="filterValue"
        type="search"
        class="form-control"
        id="filter"
        placeholder="Filter for title"
        :disabled="!texts || texts.length === 0"
      />
    </div>
  </div>
  <div
    class="mt-5 text-center"
    v-if="texts && texts.length === 0 && !isLoading"
  >
    <p>Unfortunately, no resources are yet created.</p>
    <router-link :to="{ name: 'Create Text' }">
      <button class="btn btn-outline-secondary">
        Create new text
      </button></router-link
    >
  </div>
  <p v-else-if="isLoading">Loading...</p>
  <template v-else-if="filterValue !== '' && filteredTexts.length > 0">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <TextResource v-for="text of filteredTexts" :key="text.id" :text="text" />
    </div>
  </template>
  <div
    class="mt-5 text-center"
    v-else-if="filterValue !== '' && filteredTexts.length === 0"
  >
    <p>Unfortunately, no resources are found with your filter.</p>
    <button class="btn btn-outline-secondary" @click="filterValue = ''">
      Remove filter
    </button>
  </div>
  <div class="mt-5 text-center" v-else-if="error">
    <p>Unfortunately, we had some problems.</p>
    <button class="btn btn-outline-secondary" @click="refetch">
      Try again
    </button>
  </div>
  <template v-else>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <TextResource v-for="text of texts" :key="text.id" :text="text" />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { TextDocResponse } from "@/openapi";
import TextResource from "@/components/TextResource.vue";
import useTextDocAPIClient from "@/composables/useTextDocAPIClient";
import useAsyncDataWrapper from "@/composables/useAsyncDataWrapper";

export default defineComponent({
  name: "AnnotatedResources",
  components: {
    TextResource,
  },
  setup() {
    let filteredTexts = ref([] as TextDocResponse[]);
    let filterValue = ref("");

    const { textDocsApi } = useTextDocAPIClient();
    const getAnnotatedTexts = async () => {
      return await textDocsApi.listTextDocuments();
    };
    const { isLoading, error, data, refetch } = useAsyncDataWrapper(
      getAnnotatedTexts
    );
    const setFilteredTexts = () => {
      filteredTexts.value = (data.value as TextDocResponse[]).filter(
        (text: TextDocResponse) => {
          if (text.title) {
            return text.title
              .toLowerCase()
              .includes(filterValue.value.toLowerCase());
          }
          return false;
        }
      );
    };
    watch(filterValue, () => {
      setFilteredTexts();
    });

    return {
      texts: data,
      isLoading,
      error,
      filterValue,
      filteredTexts,
      refetch,
    };
  },
});
</script>
