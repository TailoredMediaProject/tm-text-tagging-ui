import { TextDocResponse } from "@/openapi";
import { onUnmounted, Ref, watch, watchEffect } from "vue";
import {
  Annotation,
  SpecificResource,
  TextPositionSelector,
} from "@/graphql/graphql";
import usePopoverInstance from "@/composables/usePopoverInstance";
import useTextPostionUtil from "@/composables/useTextPostionUtil";

export interface SpecificText {
  start: number;
  end: number;
  text: string;
}

export default function useTextSelectionViaPopover(
  text: Ref<TextDocResponse | null>,
  inputSpecificTextAnnotation: Ref<string>,
  addSpecificTextAnnotation: (specificText: SpecificText) => void,
  existingSpecificTextAnnotations: Ref<Annotation[]>,
  activeAnnotationId: Ref<string>
): {
  handleKeyboardNavigationActions: (event: KeyboardEvent) => void;
  getTextFromSelection: () => void;
  startSelectingTextOnMouseDown: () => void;
} {
  let currentSelectedTextRange: Range;
  let currentSelectedSpecificText: SpecificText = {} as SpecificText;
  let mouseDownInsideSelectionText = false;
  let textRootElement: Element;
  const popoverInstance = usePopoverInstance();
  const textPositionUtil = useTextPostionUtil();

  watch(activeAnnotationId, (id, prevId) => {
    document
      .querySelectorAll(`span[data-id='${prevId}']`)
      .forEach((element) => element.classList.remove("active-annotation"));
    document
      .querySelectorAll(`span[data-id='${id}']`)
      .forEach((element) => element.classList.add("active-annotation"));
  });

  watchEffect(
    () => {
      if (text.value?.content) {
        textRootElement = document.querySelector("#popoverText") as Element;
        if (textRootElement) {
          textRootElement.innerHTML = textRootElement.textContent || "";
          existingSpecificTextAnnotations.value.forEach((annotation) => {
            addVisualAnnotationToText(annotation);
          });
        }
      }
    },
    {
      flush: "post",
    }
  );

  const addVisualAnnotationToText = (annotation: Annotation) => {
    const annotationSelector = (annotation.target as SpecificResource).selector.filter(
      (selector) => selector.__typename === "TextPositionSelector"
    )[0] as TextPositionSelector;
    const textLength = text.value?.content?.length || 0;
    const selectorStart = annotationSelector.start || 0;
    const selectorEnd = annotationSelector.end || 0;
    if (selectorStart >= 0 && selectorEnd <= textLength) {
      const annotationRange = new Range();
      const {
        node: startNode,
        offset: startOffset,
      } = textPositionUtil.calculateNodeAndOffsetByTextPosition(
        textRootElement.firstChild,
        selectorStart
      );
      const {
        node: endNode,
        offset: endOffset,
      } = textPositionUtil.calculateNodeAndOffsetByTextPosition(
        textRootElement.firstChild,
        selectorEnd
      );
      if (startNode && endNode) {
        annotationRange.setStart(startNode, startOffset);
        annotationRange.setEnd(endNode, endOffset);
        createAnnotationSpanElement(annotation.id, annotationRange);
      }
    }
  };

  const createAnnotationSpanElement = (
    annotationId: string,
    annotationRange: Range
  ) => {
    const annotationSpan = document.createElement("span");
    annotationSpan.dataset.id = annotationId;
    annotationSpan.classList.add("annotation");
    annotationSpan.addEventListener("mouseover", (event) => {
      event.stopPropagation();
      annotationSpan.classList.add("active-annotation");
      activeAnnotationId.value = annotationId;
    });
    annotationSpan.addEventListener("mouseleave", () => {
      annotationSpan.classList.remove("active-annotation");
      activeAnnotationId.value = "";
    });
    annotationSpan.appendChild(annotationRange.extractContents());
    annotationRange.insertNode(annotationSpan);
  };

  const startSelectingTextOnMouseDown = () => {
    popoverInstance.hideAnnotationPopoverInstance();
    popoverInstance.resetSelectionSpanElement(inputSpecificTextAnnotation);
    mouseDownInsideSelectionText = true;
  };

  const getTextFromSelection = () => {
    const windowSelection = window.getSelection();
    if (
      windowSelection &&
      !windowSelection.isCollapsed &&
      windowSelection.rangeCount !== 0 &&
      text.value &&
      mouseDownInsideSelectionText
    ) {
      mouseDownInsideSelectionText = false;
      currentSelectedTextRange = windowSelection.getRangeAt(0);
      const start = textPositionUtil.calculateTextPositionByNodeAndOffset(
        currentSelectedTextRange.startContainer,
        currentSelectedTextRange.startOffset,
        textRootElement
      );
      const end = textPositionUtil.calculateTextPositionByNodeAndOffset(
        currentSelectedTextRange.endContainer,
        currentSelectedTextRange.endOffset,
        textRootElement
      );

      currentSelectedSpecificText = {
        start,
        end,
        text: text.value.content?.substring(start, end) as string,
      };
      popoverInstance.initialiseAnnotationPopover(
        currentSelectedTextRange as Range
      );
    }
  };

  const emptyWindowSelection = () => {
    const windowSelection = window.getSelection();
    if (windowSelection) {
      windowSelection.removeAllRanges();
    }
  };
  const addSelectedSpecificTextAnnotation = () => {
    if (Object.keys(currentSelectedSpecificText).length > 0) {
      addSpecificTextAnnotation(currentSelectedSpecificText);
      popoverInstance.hideAnnotationPopoverInstance();
      popoverInstance.resetSelectionSpanElement(inputSpecificTextAnnotation);
      emptyWindowSelection();
    }
    currentSelectedSpecificText = {} as SpecificText;
  };
  const resetAnnotationPopoverOnEscape = (key: string): void => {
    if (key === "Escape") {
      popoverInstance.hideAnnotationPopoverInstance();
      popoverInstance.resetSelectionSpanElement(inputSpecificTextAnnotation);
      emptyWindowSelection();
    }
  };
  const handleKeyboardNavigationActions = (event: KeyboardEvent) => {
    const systemKeys = ["Meta", "Shift", "Ctrl", "Alt"];
    const navigationKeys = [
      "ArrowUp",
      "ArrowRight",
      "ArrowLeft",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
    ];
    if (
      !navigationKeys.includes(event.key) &&
      !systemKeys.includes(event.key)
    ) {
      event.preventDefault();
    }
    resetAnnotationPopoverOnEscape(event.key);
    if (event.key === "Enter") {
      mouseDownInsideSelectionText = true;
      getTextFromSelection();
    }
  };

  const handleClickEventListener = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target && target.closest(".popover")) {
      if (
        target?.closest(".popover button") &&
        text.value &&
        text.value.content
      ) {
        addSelectedSpecificTextAnnotation();
      }
    } else if (target && !target.closest("#popoverText")) {
      popoverInstance.hideAnnotationPopoverInstance();
      popoverInstance.resetSelectionSpanElement(inputSpecificTextAnnotation);
    }
  };
  const handleKeyUpEventListener = (event: KeyboardEvent) => {
    if ((event.target as HTMLElement)?.closest(".popover input")) {
      resetAnnotationPopoverOnEscape(event.key);
      if (
        (event.target as HTMLElement)?.closest(".popover input") &&
        event.key === "Enter" &&
        text.value &&
        text.value.content &&
        inputSpecificTextAnnotation.value !== ""
      ) {
        addSelectedSpecificTextAnnotation();
      }
    }
  };
  const handleInputEventListener = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target && target.closest(".popover input")) {
      const addButton = document.querySelector(
        ".popover button"
      ) as HTMLButtonElement;
      inputSpecificTextAnnotation.value = (event.target as HTMLInputElement)?.value;
      addButton.disabled = !(
        inputSpecificTextAnnotation.value !== "" && addButton
      );
    }
  };
  document.addEventListener("click", handleClickEventListener);
  document.addEventListener("keyup", handleKeyUpEventListener);
  document.addEventListener("input", handleInputEventListener);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickEventListener);
    document.removeEventListener("keyup", handleKeyUpEventListener);
    document.removeEventListener("input", handleInputEventListener);
  });

  return {
    handleKeyboardNavigationActions,
    getTextFromSelection,
    startSelectingTextOnMouseDown,
  };
}
