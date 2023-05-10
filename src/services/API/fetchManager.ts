import { IProduct, isString } from "../../types";
import products from "../../mocks/products.json";

const apiUrl: string | unknown = process.env.REACT_APP_FETCH_URL;

type FeatureFlag = "REMOTE_SOURCE" | "STATIC_SOURCE";
type Response = Promise<IProduct | unknown>;
interface FetcherFn {
  (): Response;
}

const fetchers: Record<FeatureFlag, FetcherFn> = {
  REMOTE_SOURCE: async () => {
    try {
      if (!isString(apiUrl)) {
        throw new TypeError("API URL must be a string");
      }
      return await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  STATIC_SOURCE: () => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(new Response(JSON.stringify(products))), 1000)
    );
  },
};

function fetchManager(featureFlag: FeatureFlag | null): FetcherFn {
  if (featureFlag === null) {
    throw new TypeError("feature flag must be specified");
  }
  return fetchers[featureFlag];
}

export default fetchManager;
