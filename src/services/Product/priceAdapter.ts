import type { Option } from "../../components/SelectField/SelectField";
import { TProduct } from "../../types";

type item = [string, number];

function descSort(a: item, b: item) {
  return parseInt(b[0], 10) - parseInt(a[0], 10);
}
function mapToOption([key, value]: [string, number]): Option {
  return { label: key, value };
}

function priceAdapter(price: TProduct["price"]): Option[] {
  return Object.entries(price).sort(descSort).map(mapToOption);
}

export default priceAdapter;
