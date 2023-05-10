import { ProductProvider } from "./services/Product";

function App() {
  return (
    <ProductProvider>
      <div className="flex flex-col items-center">
        <h1 className="pt-8 text-2xl">Telco Services calculator</h1>
        <p>Find your best offer</p>
      </div>
    </ProductProvider>
  );
}

export default App;
