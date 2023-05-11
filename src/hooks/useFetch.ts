import { useCallback, useEffect, useState } from "react";
import useStateMachine, { actions, states } from "./useStateMachine";

interface Result<ExpectedFetchRes> {
  data: ExpectedFetchRes | null;
  isFetching: boolean;
  hasError: boolean;
  fetchData(): void;
}

function useFetch<ExpectedFetchRes>(
  fetcher: () => Promise<ExpectedFetchRes | any>,
  fetchOnInitialRender?: boolean
): Result<ExpectedFetchRes> {
  const [data, setData] = useState<ExpectedFetchRes | null>(null);
  const { updateState, compareState } = useStateMachine();

  const fetchData = useCallback(async () => {
    updateState(actions.initialize);
    try {
      const response = await fetcher();
      setData(response);
      updateState(actions.success);
    } catch (error) {
      updateState(actions.error);
      console.error(error);
    }
  }, [fetcher, updateState]);

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
