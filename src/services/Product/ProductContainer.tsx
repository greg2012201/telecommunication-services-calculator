import { fetchManager } from '../API';
import useFetch from '../../hooks/useFetch';
import type { TProduct } from '../../types';
import { ProductProvider } from '.';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function ProductContainer({ children }: Props) {
  const fetcher = fetchManager(
    import.meta.env.VITE_REACT_APP_FEATURE_FLAG || 'STATIC_DATA_SOURCE',
  );
  const { isFetching, data, hasError } = useFetch<TProduct[]>({
    fetcher,
    fetchOnInitialRender: true,
  });
  if (isFetching) {
    return <p>Loading...</p>;
  }
  if (hasError) {
    return <p>Ooops! Something went wrong!</p>;
  }
  return <ProductProvider products={data}>{children}</ProductProvider>;
}

export default ProductContainer;
