import { useCallback, useState } from "react";

export const actions = {
  initialize: "INITIALIZE",
  success: "FETCH_DATA_SUCCESS",
  error: "FETCH_DATA_ERROR",
};

export const states = {
  idle: "idle",
  isLoading: "loading",
  hasLoaded: "loaded",
  hasError: "error",
};

const transitions = {
  [states.idle]: {
    [actions.initialize]: states.isLoading,
  },
  [states.isLoading]: {
    [actions.success]: states.hasLoaded,
    [actions.error]: states.hasError,
  },
  [states.hasLoaded]: {
    [actions.initialize]: states.isLoading,
  },
  [states.hasError]: {
    [actions.initialize]: states.isLoading,
  },
};

function useStateMachine() {
  const [currentState, setCurrentState] = useState<string>(states.idle);

  const transition = (currentState: string, action: string): string => {
    const nextState: string = transitions[currentState][action];
    return nextState || currentState;
  };

  const updateState = useCallback(
    (action: string) =>
      setCurrentState((currentState: string) =>
        transition(currentState, action)
      ),
    []
  );
  const compareState = (state: string) => currentState === state;
  return { updateState, compareState, states };
}

export default useStateMachine;
