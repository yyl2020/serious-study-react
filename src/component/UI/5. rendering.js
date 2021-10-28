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
* Rendering Lists ,use filter() and map()
* */
// map()
// 1. 将数据移动到数组中
const people = [
    'Creola Katherine Johnson: mathematician',
    'Mario José Molina-Pasquel Henríquez: chemist',
    'Mohammad Abdus Salam: physicist',
    'Percy Lavon Julian: chemist',
    'Subrahmanyan Chandrasekhar: astrophysicist'
]
// 2. 将数组成员映射到新的的JSX节点数组
const listItems = people.map((person) => <li>{person}</li>)

// 3. ul 包裹 listItems 返回组件
function List(){
    return (
        <ul>{listItems}</ul>
    )
}
// filter()
const people2 = [{
    id: 0,
    name: 'Creola Katherine Johnson',
    profession: 'mathematician',
}, {
    id: 1,
    name: 'Mario José Molina-Pasquel Henríquez',
    profession: 'chemist',
}, {
    id: 2,
    name: 'Mohammad Abdus Salam',
    profession: 'physicist',
}, {
    id: 3,
    name: 'Percy Lavon Julian',
    profession: 'chemist',
}, {
    id: 4,
    name: 'Subrahmanyan Chandrasekhar',
    profession: 'astrophysicist',
}];
function List2() {
    const chemist = people2.filter(person => person.profession === 'chemist')
    // map 必须要key值.key在同一个数组中必须唯一 .避免即时生成密匙会导致渲染之间的键不会匹配
    const listItems = chemist.map(person =>
        <li key={person.id}>
            <p>
                <b>{person.name}</b>
                {' ' + person.profession + ' '}
            </p>
        </li>
    )
    return <ul>{listItems}</ul>
}

/*
* keeping components pure
* */
// 纯函数的特征: 只管之间的事，不会更改在调用之前存在的任何对象或变量。同样的输入，同样的输出。
function double(number) { // 纯函数
    return 2 * number
}
// React 假设你编写每个组件都是纯函数。给定相同输入的情况下，您编写的 React 组件必须始终返回相同的 JSX

// side effects(副作用): 非预期结果，多次调用这个组件会产生不同的JSX

// React.StrictMode 提供了一种严格模式,在这种模式下，它在开发过程中两次调用每个组件的函数。
// 通过两次调用组件函数，严格模式有助于找到违反这些规则的组件。一些框架默认这种模式

// local mutation(局部突变): 组件在渲染时改变了一个预先存在的变量(preexisting variable)
// 但是，在渲染时更改您刚刚创建的变量和对象是完全可以的
function Cup({ guest }) {
    return <h2>Tea cup for guest #{guest}</h2>;
}
export function TeaGathering(){
    let cups = [] // cups 数组在函数内被称为刚刚创建的变量，在函数外被称为预先存在变量
    for (let i = 1;i <= 12; i++){
        cups.push(<Cup key={i} guest={i}/>)
    }
    return cups
}

// 那些地方造成副作用: 更新屏幕、开始动画、改变数据, 在 React中,副作用通常属于事件处理程序
// 它们也不会在渲染期间运行！所以事件处理程序不需要是纯的。
