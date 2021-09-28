<template>
  <div class="row">
    <div>
      <router-link
        class="text-black-50 text-decoration-none"
        :to="{ name: 'Annotated Resources' }"
        ><i class="bi bi-arrow-left"></i> back to all resources</router-link
      >
    </div>
    <div class="mt-2 text-center" v-if="isLoadingGetText && loadingAnnotations">
      <p class="mt-5">Loading the text and its annotations...</p>
    </div>
    <div class="mt-2 text-center" v-else-if="errorGetText">
      <p class="mt-5">Unfortunately, we can't display this text</p>
      <button class="btn btn-outline-secondary" @click="refetchText">
        Try again
      </button>
    </div>
    <div class="mt-2 text-center" v-else-if="errorAnnotations">
      <p class="mt-5">
        Unfortunately, we can't display this text and its annotations
      </p>
      <button class="btn btn-outline-secondary" @click="refetchAnnotations">
        Try again
      </button>
    </div>
    <div class="row gx-5" v-else-if="text">
      <section class="col-12 mt-2">
        <div class="d-flex justify-content-between align-items-start">
          <h1>{{ text.title }}</h1>
          <button
            class="btn btn-outline-danger btn-sm flex-shrink-0"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Delete text
          </button>
        </div>
        <div
          class="
            mb-3
            d-flex
            flex-wrap
            align-items-baseline
            border border-end-0 border-start-0
            p-2
          "
        >
          <label for="fulltext" class="flex-shrink-0 me-1 mb-2"
            >Full-text annotations</label
          >
          <template v-if="fullTextAnnotations">
            <AnnotationBadge
              v-for="annotation in fullTextAnnotations"
              :key="annotation.id"
              :label="annotation.body.label"
              @delete-annotation="deleteAnnotation(annotation.id)"
              class="me-1 mb-2 bg-secondary"
            />
          </template>
          <input
            type="text"
            class="form-control border-0 mt-1 mb-1"
            id="fulltext"
            autocomplete="off"
            placeholder="Add full-text annotations here"
            v-model="inputFullTextAnnotation"
            @keyup.enter="addFullTextAnnotation"
            @keyup.esc="unfocusElement($event)"
          />
          <button
            class="btn btn-outline-secondary fulltext-button"
            type="button"
            v-if="inputFullTextAnnotation"
            @click="addFullTextAnnotation"
          >
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </section>
      <section class="col-8 mt-2 mb-3">
        <p
          class="w-100 border-0"
          id="popoverText"
          contenteditable
          @keydown="handleKeyboardNavigationActions($event)"
          @contextmenu.prevent
          @mousedown="startSelectingTextOnMouseDown"
          @mouseup="getTextFromSelection"
        >
          {{ text.content }}
        </p>
      </section>
      <section class="col-4 mt-2">
        <div class="sticky-sidebar">
          <h5 class="text-center">Specific text annotations</h5>
          <div
            v-if="specificTextAnnotations && specificTextAnnotations.length > 0"
          >
            <template
              v-for="annotation in specificTextAnnotations"
              :key="annotation.id"
            >
              <AnnotationBadge
                :label="annotation.body.value"
                @delete-annotation="deleteAnnotation(annotation.id)"
                @click="setActiveAnnotationId(annotation.id)"
                @mouseover="setActiveAnnotationId(annotation.id)"
                @mouseleave="activeAnnotationId = ''"
                :bg-color="
                  activeAnnotationId === annotation.id ? 'warning' : 'primary'
                "
              />
              <div class="text-center mb-3 text-truncate">
                {{ getCorrespondingText(annotation) }}
              </div>
            </template>
          </div>
          <div v-else class="text-center mt-5 text-black-50">
            No specific text annotations yet!<br /><br />
            To add new one, you could either select the specific text via your
            mouse or by using the system and arrow keys and hitting the enter
            key!
          </div>
        </div>
      </section>
    </div>
  </div>
  <Modal @modalDangerClicked="deleteTextDocument" />
  <!--  <Popover />-->
  <section>
    <div id="PopoverContent" class="d-none">
      <div class="input-group">
        <input
          tabindex="0"
          id="popoverInput"
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
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import Modal from "@/components/Modal.vue";
import useTextDocAPIClient from "@/composables/useTextDocAPIClient";
import useHandleFullTextAnnotations from "@/composables/useHandleFullTextAnnotations";
import useGetTextAnnotationMode from "@/composables/useGetTextAnnotationMode";
import useDeleteTextAnnotationMode from "@/composables/useDeleteTextAnnotationMode";
import useHandleSpecificTextAnnotations from "@/composables/useHandleSpecificTextAnnotations";
import {
  Annotation,
  SpecificResource,
  TextQuoteSelector,
} from "@/graphql/graphql";
import AnnotationBadge from "@/components/AnnotationBadge.vue";
import useTextSelectionViaPopover from "@/composables/useTextSelectionViaPopover";
import useLoadAllAnnotations from "@/composables/useLoadAllAnnotations";
import useDeleteAnnotation from "@/composables/useDeleteAnnotation";
import PopoverContent from "@/components/PopoverContent.vue";

export default defineComponent({
  name: "ResourceAnnotationMode",
  components: {
    Modal,
    AnnotationBadge,
  },
  setup() {
    const { params } = useRoute();
    const { textDocsApi } = useTextDocAPIClient();
    const activeAnnotationId = ref("");
    const {
      fullTextAnnotations,
      specificTextAnnotations,
      errorAnnotations,
      loadingAnnotations,
      refetchAnnotations,
    } = useLoadAllAnnotations(params.id as string);

    const { text, isLoadingGetText, errorGetText, refetchText } =
      useGetTextAnnotationMode(textDocsApi, params.id as string);

    const { addSpecificTextAnnotation, inputSpecificTextAnnotation } =
      useHandleSpecificTextAnnotations(params.id as string, refetchAnnotations);
    const { inputFullTextAnnotation, addFullTextAnnotation } =
      useHandleFullTextAnnotations(params.id as string, refetchAnnotations);
    const { deleteAnnotation } = useDeleteAnnotation(refetchAnnotations);
    const { deleteTextDocument } = useDeleteTextAnnotationMode(
      textDocsApi,
      params.id as string
    );
    const {
      handleKeyboardNavigationActions,
      getTextFromSelection,
      startSelectingTextOnMouseDown,
    } = useTextSelectionViaPopover(
      text,
      inputSpecificTextAnnotation,
      addSpecificTextAnnotation,
      specificTextAnnotations,
      activeAnnotationId
    );

    const getCorrespondingText = (annotation: Annotation) => {
      if (annotation && annotation.target) {
        const textPositionSel = (
          annotation.target as SpecificResource
        ).selector.filter((sel) => sel.__typename === "TextQuoteSelector");
        if (textPositionSel.length > 0) {
          return (textPositionSel[0] as TextQuoteSelector).exact || "";
        }
      }
      return "";
    };

    const setActiveAnnotationId = (annotationId: string) => {
      activeAnnotationId.value = annotationId;
    };

    const unfocusElement = (event: KeyboardEvent) => {
      if (event.target) {
        (event.target as HTMLElement).blur();
      }
    };
    return {
      text,
      activeAnnotationId,
      deleteTextDocument,
      inputFullTextAnnotation,
      addFullTextAnnotation,
      fullTextAnnotations,
      deleteAnnotation,
      specificTextAnnotations,
      unfocusElement,
      handleKeyboardNavigationActions,
      getTextFromSelection,
      getCorrespondingText,
      errorAnnotations,
      loadingAnnotations,
      refetchAnnotations,
      isLoadingGetText,
      errorGetText,
      refetchText,
      startSelectingTextOnMouseDown,
      setActiveAnnotationId,
    };
  },
});
</script>

<style lang="scss" scoped>
textarea {
  &:focus-visible {
    outline: none;
  }
}
#popoverText {
  white-space: pre-line;
  outline: none;
  line-height: 3;
}
#fulltext {
  width: 250px;
  &:focus {
    box-shadow: none;
    color: var(--bs-dark);
    &::placeholder {
      color: var(--bs-dark);
    }
  }
}
.fulltext-button {
  &:hover {
    color: var(--bs-white);
  }
}
.sticky-sidebar {
  position: sticky;
  top: 30px;
}
</style>
