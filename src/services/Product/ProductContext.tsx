import React, {
  createContext,
  useReducer,
  ReactNode,
  FC,
  useContext,
} from "react";
import { TProduct, TSummaryItem } from "../../types";
import summaryItemsUpdater from "./summaryItemsUpdater";

interface Props {
  children: ReactNode;
}

export interface State {
  totalPrice: number;
  products: TProduct[];
  summaryItems: TSummaryItem[];
}
export type Action =
  | { type: "SET_PRODUCTS"; payload: TProduct[] }
  | { type: "UPDATE_SUMMARY"; payload: TSummaryItem }
  | { type: "RESET_SUMMARY" };

const initialState: State = {
  totalPrice: 0,
  products: [],
  summaryItems: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "UPDATE_SUMMARY": {
      const newSummaryItems = summaryItemsUpdater({
        itemToAdd: action.payload,
        products: state.products,
        summaryItems: state.summaryItems,
      });
      return { ...state, summaryItems: newSummaryItems };
    }
    case "RESET_SUMMARY":
      return { ...state, totalPrice: 0, summaryItems: [] };
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
