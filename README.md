# telecommunication-services-calculator

The app is a simple calculator built using React + Vite. The `ProductContainer` component serves as the starting point of the data flow. 
Remote or mocked data is used to hydrate the shared state located in the `ProductContext`. 
The core business logic is located in `src/services/Product`. 
The view consists of two product lists: one for adding products and another for displaying the summary list.

### Preview: https://greg2012201.github.io/telecommunication-services-calculator/

### Tech stack:
Ract, TypeScript, Vite, Vitest, CSS, npm

## Development
   
   ### Installation:
  - `git clone https://github.com/greg2012201/telecommunication-services-calculator.git`
  - `cd telecomunication-services-calculator`
  - `npm install`
  
   ### Dev preview & test:
- `npm run dev` - Preview on http://localhost:3000/telecommunication-services-calculator
- `npm test` - Run tests

   ### Feature flags:
   It is possible to mock data fetch. This option is set by default. 
   To setup feature flag you need to set `VITE_REACT_APP_FEATURE_FLAG` in your `.env` file.
- `mock fetch` - set flag to `VITE_REACT_APP_FEATURE_FLAG=STATIC_DATA_SOURCE`
- `remote fetch(external API)` - set flag to `VITE_REACT_APP_FEATURE_FLAG=REMOTE_DATA_SOURCE` and `VITE_REACT_APP_FETCH_URL=<API_URL>`
