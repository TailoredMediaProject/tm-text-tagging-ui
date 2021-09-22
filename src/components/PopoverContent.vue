<template>
  <div class="input-group">
    <input
      tabindex="0"
      id="popoverInput"
      ref="popoverInputRef"
      type="text"
      class="form-control"
      placeholder="Add annotation"
      aria-label="Adding specific text annotations"
      aria-describedby="button-addAnnotation"
      autocomplete="off"
    />
    <div class="input-group-append" id="button-addAnnotation">
      <button
        class="btn btn-outline-primary"
        type="button"
        id="popoverButton"
        disabled
      >
        <i class="bi bi-check"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopoverContent",
};
</script>

<style lang="scss" scoped>
#popoverInput {
  &:focus {
    border: 1px solid red;
  }
}
</style>
