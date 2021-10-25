/*
* 在 React 中实现 UI 五步法：
* */
// 1. 将 UI 分解为组件层次结构
// 2. 在 React中构建一个静态版本,在简单的例子中,自上而下构建更容易.而较大的项目中,自下而上更容易.
// 3. 找到 UI state 最小但完整的表示, state 随之时间变化并且无法从任何东西算出来.
// 4. 确定你的 state 应该在哪里存在,也就是确定哪个组件更改 state 和拥有 state
// 确定 state 组件策略: 1.找到使用状态的组件, 2.找到它们的共同父组件, 3.确定状态的位置
// 5. 添加逆向数据流
import {useState} from "react";

function ProductRow({product}) {
    const name = product.stocked ? product.name :
        <span style={{ color: 'red' }}>
            { product.name }
        </span>
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}
function ProductCategoryRow({category}) {
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    )
}
function ProductTable({products, filterText, inStockOnly}) {
    const rows = []
    let labelCategory = null
    products.forEach((product) =>{
        if (product.name.indexOf(filterText) === -1) return
        if (inStockOnly && !product.stocked) return
        if(product.category !== labelCategory){
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category}
                />
            )
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
        )
        labelCategory = product.category
    })
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}
function SearchBar({filterText,inStockOnly,onFilterTextChange, onInStockOnlyChange}) {
    return (
        <form>
            <input
                onChange={(e) => onFilterTextChange(e.target.value)}
                value={filterText}
                type="text"
                placeholder="Search..."/>
            <label>
                <input
                    onChange={(e) => onInStockOnlyChange(e.target.checked)}
                    type="checkbox"
                    checked={inStockOnly}/>
                { ' ' }
                Only show products in stock
            </label>
        </form>
    )
}
export default function FilterableProductTable({products}){
    const [filterText, setFilterText] = useState('')
    const [inStockOnly, setInStockOnly] = useState(false)
    return (
        <div>
            <SearchBar
                filterText = {filterText}
                inStockOnly = {inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
            />
            <ProductTable
                products={products}
                filterText={filterText}
                inStockOnly={inStockOnly}
            />
        </div>
    )
}
