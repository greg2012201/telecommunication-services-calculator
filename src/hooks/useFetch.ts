import { useCallback, useEffect, useState } from "react";
import useStateMachine, { actions, states } from "./useStateMachine";
import { isUnaryFn } from "../types";

// type data  ?
export interface Result<ExpectedFetchRes> {
  data: ExpectedFetchRes | [];
  isFetching: boolean;
  hasError: boolean;
  fetchData(): void;
}

type Props<T> = {
  fetcher: () => Promise<T | any>;
  fetchOnInitialRender?: boolean;
  onSuccess?(data: T): void | null;
};

function useFetch<ExpectedFetchRes>({
  fetcher,
  fetchOnInitialRender,
  onSuccess,
}: Props<ExpectedFetchRes>): Result<ExpectedFetchRes> {
  const [data, setData] = useState<ExpectedFetchRes | []>([]);
  const { updateState, compareState } = useStateMachine();

  const fetchData = useCallback(async () => {
    updateState(actions.initialize);
    try {
      const response = await fetcher();
      if (isUnaryFn(onSuccess)) {
        onSuccess(response);
      } else {
        setData(response);
      }
      updateState(actions.success);
    } catch (error) {
      updateState(actions.error);
    }
  }, [fetcher, updateState, onSuccess]);

  useEffect(() => {
    if (!fetchOnInitialRender) {
      return;
    }
    fetchData();
  }, [fetchOnInitialRender]);

  return {
    data,
    isFetching: compareState(states.isLoading),
    hasError: compareState(states.hasError),
    fetchData,
  };
}

export default useFetch;
