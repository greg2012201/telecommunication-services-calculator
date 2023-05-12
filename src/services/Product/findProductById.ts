import { TProduct } from "../../types";

function findProductById(
  id: TProduct["id"],
  products: TProduct[]
): TProduct | null {
  const foundProduct = products.find((product) => {
    return product.id === id;
  });
  return foundProduct ?? null;
}

export default findProductById;
