<template>
  <div class="col mt-4">
    <div class="card" @click="goToAnnotationMode(text.id)">
      <div class="card-header d-flex">
        <span class="badge rounded-pill bg-secondary me-1">
          {{ textStatisticsFullTextAnnotations }}
          <i class="bi bi-tags-fill"></i
        ></span>
        <span class="badge rounded-pill bg-primary">
          {{ textStatisticsSpecificTextAnnotations }}
          <i class="bi bi-tags-fill"></i
        ></span>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ text.title }}</h5>
        <p class="card-text text-truncate text-black-50">
          {{ text.content }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TextDocResponse } from "@/openapi";
import useGoToAnnotationMode from "@/composables/useGoToAnnotationMode";

export default defineComponent({
  name: "TextResource",
  props: {
    text: {
      type: Object as PropType<TextDocResponse>,
      required: true,
    },
  },
  computed: {
    textStatisticsFullTextAnnotations(): string {
      return `${
        this.text.statistics?.annotationCount?.document || 0
      } full-text `;
    },
    textStatisticsSpecificTextAnnotations(): string {
      return `${
        this.text.statistics?.annotationCount?.documentPart || 0
      } specific-text `;
    },
  },
  setup() {
    const { goToAnnotationMode } = useGoToAnnotationMode();
    return {
      goToAnnotationMode,
    };
  },
});
</script>
<style lang="scss" scoped>
.card {
  box-shadow: 3px 3px 1px var(--bs-light);
  &:hover {
    box-shadow: 3px 3px 1px var(--bs-primary);
  }
  cursor: pointer;
}
</style>
