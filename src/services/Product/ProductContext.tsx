import React, { createContext, useReducer, ReactNode, FC, useContext } from 'react';
import type { TProduct, TSummaryItem } from '../../types';
import summaryItemsUpdater from './summaryItemsUpdater';

interface Props {
  children: ReactNode;
  products: TProduct[];
}

export interface State {
  products: TProduct[];
  summaryItems: TSummaryItem[];
}
export type Action =
  | { type: 'UPDATE_SUMMARY'; payload: TSummaryItem }
  | { type: 'REMOVE_ITEM'; payload: TSummaryItem['id'] }
  | { type: 'RESET_SUMMARY' };

const initialState: State = {
  products: [],
  summaryItems: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_SUMMARY': {
      const newSummaryItems = summaryItemsUpdater({
        itemToAdd: action.payload,
        products: state.products,
        summaryItems: state.summaryItems,
      });
      return { ...state, summaryItems: newSummaryItems };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        summaryItems: state.summaryItems.filter((item) => item.id !== action.payload),
      };
    case 'RESET_SUMMARY':
      return { ...state, summaryItems: [] };
    default:
      throw new Error('Unexpected action');
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

function ProductProvider({ children, products }: Props) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, products });

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

function useProduct() {
  return useContext(ProductContext);
}

export { ProductProvider, useProduct };
