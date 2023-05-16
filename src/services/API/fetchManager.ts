import type { TProduct } from '../../types';
import products from '../../mocks/products.json';
import { isString } from '../../types/utils';

const apiUrl: string | unknown = import.meta.env.VITE_REACT_APP_FETCH_URL;

type FeatureFlag = 'REMOTE_DATA_SOURCE' | 'STATIC_DATA_SOURCE';
type Response = Promise<TProduct | unknown>;
interface FetcherFn {
  (): Response;
}

const fetchers: Record<FeatureFlag, FetcherFn> = {
  REMOTE_DATA_SOURCE: async () => {
    try {
      if (!isString(apiUrl)) {
        throw new TypeError('API URL must be a string');
      }
      return await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  STATIC_DATA_SOURCE: async () => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(products), 500);
    });
  },
};

function fetchManager(featureFlag: FeatureFlag | null): FetcherFn {
  if (featureFlag === null) {
    throw new TypeError('feature flag must be specified');
  }
  return fetchers[featureFlag];
}

export default fetchManager;
