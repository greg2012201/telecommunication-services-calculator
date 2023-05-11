import { FC } from "react";
import { fetchManager } from "../API";
import useFetch from "../../hooks/useFetch";
import { TProduct } from "../../types";
import { useProduct } from ".";

interface Props {
  children: JSX.Element;
}

const ProductContainer: FC<Props> = ({ children }) => {
  const { dispatch } = useProduct();
  const fetcher = fetchManager(import.meta.env.VITE_REACT_APP_FEATURE_FLAG);
  const { isFetching } = useFetch<TProduct[]>({
    fetcher,
    fetchOnInitialRender: true,
    onSuccess: (data) => {
      dispatch({ type: "SET_PRODUCTS", payload: data });
    },
  });
  if (isFetching) {
    return <p>Loading...</p>;
  }
  return children;
};

export default ProductContainer;
