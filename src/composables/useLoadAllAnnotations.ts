import { Annotation, useAllAnnotationsQuery } from "@/graphql/graphql";
import { computed, Ref } from "vue";
import { useResult } from "@vue/apollo-composable";

export default function useLoadAllAnnotations(textId: string): {
  fullTextAnnotations: Ref<Annotation[]>;
  specificTextAnnotations: Ref<Annotation[]>;
  loadingAnnotations: Ref<boolean>;
  errorAnnotations: Ref<Error | null>;
  refetchAnnotations: () => void;
} {
  const filter = { targetId: textId };

  const {
    loading: loadingAnnotations,
    error: errorAnnotations,
    refetch: refetchAnnotations,
    result,
  } = useAllAnnotationsQuery({
    filter: filter,
  });

  const annotations = useResult(result, [] as Annotation[]);

  const specificTextAnnotations = computed(() => {
    return (annotations.value as Annotation[]).filter(
      (value: Annotation) => value?.body.__typename === "BodyText"
    ) as Annotation[];
  });
  const fullTextAnnotations = computed(() => {
    return (annotations.value as Annotation[]).filter(
      (value: Annotation) => value?.body.__typename !== "BodyText"
    ) as Annotation[];
  });

  return {
    fullTextAnnotations,
    specificTextAnnotations,
    loadingAnnotations,
    errorAnnotations,
    refetchAnnotations,
  };
}
