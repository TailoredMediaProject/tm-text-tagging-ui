<template>
  <div
    :class="getBgClass()"
    class="badge rounded-pill p-2 text-wrap d-flex align-items-center justify-content-between"
  >
    <span class="text-break flex-grow-1">
      {{ label }}
    </span>
    <i
      @click="$emit('delete-annotation')"
      class="bi bi-x-circle-fill ms-1 clear-icon flex-shrink-0"
    ></i>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnnotationBadge",
  props: {
    label: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
      default: "primary",
      validator: function (value: string) {
        // The value must match one of these strings
        return ["primary", "warning", "danger"].indexOf(value) !== -1;
      },
    },
  },
  emits: ["delete-annotation"],
  methods: {
    getBgClass(): string {
      return "bg-" + this.bgColor;
    },
  },
});
</script>
<style lang="scss" scoped>
.clear-icon {
  font-size: 1rem;
  cursor: pointer;
}
</style>
