import React, {
  createContext,
  useReducer,
  ReactNode,
  FC,
  useContext,
} from "react";
import { IProduct } from "../../types";

interface Props {
  children: ReactNode;
}

interface State {
  totalPrice: number;
  products?: IProduct[];
}
type Action =
  | { type: "INCREMENT_PRICE"; payload: number }
  | { type: "DECREMENT_PRICE"; payload: number }
  | { type: "RESET_PRICE"; payload: number };

const initialState: State = {
  totalPrice: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT_PRICE":
      return { totalPrice: state.totalPrice + action.payload };
    case "DECREMENT_PRICE":
      return { totalPrice: state.totalPrice - action.payload };
    case "RESET_PRICE":
      return { totalPrice: 0 };
    default:
      throw new Error("Unexpected action");
  }
}

interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const ProductContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

const ProductProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };
