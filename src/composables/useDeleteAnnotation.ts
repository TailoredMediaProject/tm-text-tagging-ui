import { useDeleteAnnotationMutation } from "@/graphql/graphql";

export default function useDeleteAnnotation(
  refetchAnnotations: () => void
): {
  deleteAnnotation: (annotationId: string) => void;
} {
  const deleteAnnotationMutation = useDeleteAnnotationMutation({});
  deleteAnnotationMutation.onDone(() => {
    refetchAnnotations();
  });
  const deleteAnnotation = (annotationId: string): void => {
    deleteAnnotationMutation.mutate({
      id: annotationId,
    });
  };
  return { deleteAnnotation };
}
