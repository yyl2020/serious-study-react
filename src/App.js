import './App.css';
import {data as products} from './component/quickStart/data'
import FilterableProductTable from './component/quickStart/thinkingInReact'
function App() {
  return (
    <div className="App">
        <FilterableProductTable products={products}/>
    </div>
  );
}

export default App;
