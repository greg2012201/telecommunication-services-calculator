import React, {
  createContext,
  useReducer,
  ReactNode,
  FC,
  useContext,
} from "react";
import { TProduct } from "../../types";

interface Props {
  children: ReactNode;
}

interface State {
  totalPrice: number;
  products: TProduct[];
  summedProductsIds: TProduct["id"][];
}
type Action =
  | { type: "SET_PRODUCTS"; payload: TProduct[] }
  | { type: "SET_SUMMED_PRODUCTS_IDS"; payload: TProduct["id"] }
  | { type: "INCREMENT_TOTAL_PRICE"; payload: number }
  | { type: "DECREMENT_TOTAL_PRICE"; payload: number }
  | { type: "RESET_PRICE"; payload: number };

const initialState: State = {
  totalPrice: 0,
  products: [],
  summedProductsIds: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: { ...state.products, ...action.payload } };
    case "SET_SUMMED_PRODUCTS_IDS":
      return {
        ...state,
        summedProductsIds: [...state.summedProductsIds, action.payload],
      };
    case "INCREMENT_TOTAL_PRICE":
      return { ...state, totalPrice: state.totalPrice + action.payload };
    case "DECREMENT_TOTAL_PRICE":
      return { ...state, totalPrice: state.totalPrice - action.payload };
    case "RESET_PRICE":
      return { ...state, totalPrice: 0 };
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
