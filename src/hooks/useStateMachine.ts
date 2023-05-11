import { useCallback, useState } from "react";

export interface Actions {
  initialize: "INITIALIZE";
  success: "FETCH_DATA_SUCCESS";
  error: "FETCH_DATA_ERROR";
}
export interface States {
  idle: "idle";
  isLoading: "loading";
  hasLoaded: "loaded";
  hasError: "error";
}

export type State = string;
export type Action = string;

type Transition = Record<Action, State>;

const actions: Actions = {
  initialize: "INITIALIZE",
  success: "FETCH_DATA_SUCCESS",
  error: "FETCH_DATA_ERROR",
};

const states: States = {
  idle: "idle",
  isLoading: "loading",
  hasLoaded: "loaded",
  hasError: "error",
};

const transitions: Record<State, Transition> = {
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
  const [currentState, setCurrentState] = useState<State>(states.idle);

  const transition = (currentState: State, action: Action): State => {
    const nextState: State = transitions[currentState][action];
    return nextState || currentState;
  };

  const updateState = useCallback(
    (action: Action) =>
      setCurrentState((currentState: State) =>
        transition(currentState, action)
      ),
    []
  );
  const compareState = (state: State) => currentState === state;
  return { updateState, compareState, states };
}

export default useStateMachine;
