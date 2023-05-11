import { useCallback, useState } from "react";

type Action = "INITIALIZE" | "FETCH_DATA_SUCCESS" | "FETCH_DATA_ERROR";
type State = "idle" | "loading" | "loaded" | "error";

export const states = {
  idle: "idle",
  isLoading: "loading",
  hasLoaded: "loaded",
  hasError: "error",
};

const actions = {
  initialize: "INITIALIZE",
  success: "FETCH_DATA_SUCCESS",
  error: "FETCH_DATA_ERROR",
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
  const [currentState, setCurrentState] = useState(states.idle);

  const transition = (currentState: string, action: Action) => {
    const nextState = transitions[currentState][action];
    return nextState || currentState;
  };

  const updateState = useCallback(
    (action: Action) =>
      setCurrentState((currentState) => transition(currentState, action)),
    []
  );
  const compareState = (state: State) => currentState === state;
  return { updateState, compareState, states };
}

export default useStateMachine;
