import { Ref, ref } from "vue";
import { TextDocResponse } from "@/openapi";
import { AxiosPromise } from "axios";

export default function useAsyncDataWrapper(
  func: () => AxiosPromise<TextDocResponse | TextDocResponse[] | void>
): {
  data: Ref<TextDocResponse | TextDocResponse[] | void>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
  refetch: () => Promise<void>;
} {
  const isLoading = ref(false);
  const error = ref(null);
  const data = ref();
  const refetch = async (): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await func();
      data.value = response.data;
      isLoading.value = false;
    } catch (e) {
      error.value = e;
      isLoading.value = false;
    }
  };
  refetch();
  return { isLoading, error, data, refetch };
}
