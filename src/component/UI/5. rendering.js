/*
*  Conditional Rendering
* */
// if/else 语句
// 三元运算符(? :)
// 逻辑与运算符(&&)
function Item({name, isPacked}) {
    // if (isPacked){
    //     return <li className="item">{name} ✔</li> // return null 不返回内容
    // }
    // return <li className='item'>{name}</li>
    // 上面JSX有些重复，改成下面这种,这种适用与简单的条件,如果嵌套过多造成混乱考虑抽成组件
    // return (
    //     <li className='item'>
    //         {isPacked ? (
    //             <del>
    //                 {name + ' ✔'}
    //             </del>
    //         ) : (name)}
    //     </li>
    // )
    // 逻辑与运算符(&&) 左侧不要设置数字,0会渲染成0，左侧要为布尔值
    // return (
    //     <li className='item'>
    //         {name} {isPacked && '✔'}
    //     </li>
    // )
    // 将JSX分配给变量,这种方式最灵活
    let itemContent = name
    if (isPacked){
        itemContent = name + '✔'
    }
    return (
        <li className='item'>
            { itemContent }
        </li>
    )
}
export default function PackingList() {
    return (
        <section>
            <h1>Sally Ride's Packing List</h1>
            <ul>
                <Item
                    isPacked={true}
                    name='Space suit'
                />
                <Item
                    isPacked={false}
                    name='Photo of Tam'
                />
            </ul>
        </section>
    )
}
/*
* Rendering Lists
* */
