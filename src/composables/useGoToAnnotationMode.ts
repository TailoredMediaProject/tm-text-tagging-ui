import { useRouter } from "vue-router";

export default function useGoToAnnotationMode(): {
  goToAnnotationMode: (id: string) => void;
} {
  const router = useRouter();
  const goToAnnotationMode = (id: string) => {
    const textIdParts = id.split("/");
    if (textIdParts.length > 0) {
      router.push({
        name: "Resource",
        params: { id: textIdParts[textIdParts.length - 1] },
      });
    }
  };
  return {
    goToAnnotationMode,
  };
}
