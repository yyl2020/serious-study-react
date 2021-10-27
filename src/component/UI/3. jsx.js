/*
* JSX 将 Html 放入 JS, JSX 和 React 是两个独立的东西,可以相互独立使用
* */
// JSX 规则
// 1. 返回单个根元素(return a single root element): 组件返回多个元素时,需要用一个父标签包裹起来
export function TodoList(){
    // <></> 空标签被称为React片段,用于对事物分组,不会在DOM树中出现
    // JSX 看起来像 HTML,但在底层被转换成普通的 JS 对象.
    // 你不能不用标签包裹多个JSX元素,就像你不能在JS中返回两个对象而不放在数组中。
    return (
         <>
            <h1>Hedy Lamarr's Todos</h1>
            <img
                src="https://i.imgur.com/yXOvdOSs.jpg"
                alt="Hedy Lamarr"
                className="photo"
                data-columns="3"
            />
        </>
    )
}
// 2. 闭合所有标签(close all tags)
// <img > => <img />
// 3. 驼峰命名大部分东西(camelCase most of the things)
// JSX编写的属性被转换成JS对象的key,JS对变量名有限制不能包含破折号或class关键字
// 所以 class => className等等, 但是aria-*和data-*属性因为历史原因保存不变

/*
* JSX 添加 JS逻辑
* */
// 使用花括号: 进入 JS 的窗口
export function Avatar() {
    const avatar = 'https://i.imgur.com/7vQD0fPs.jpg'
    const des = 'yyl'
    const content = 'my name is uu'
    return (
        <>
            {/* 任何 JS 表达式都可以在 {} 中工作 */}
            {/* JS两种使用方式：1.在 = 符号后面的属性 2.在 JSX 标签内的文本 */}
            <img src={avatar} alt={des}/>
            <p>{content}</p>
        </>
    )
}
// 使用{{}} : JSX 中的 CSS 和其他对象
// {{}} 就是 {} 中的一个对象
export function Todos() {
    const person = {
        name: 'Gregorio Y. Zara',
        theme: {
            backgroundColor: 'black',
            color: 'pink'
        }
    }
    return (
        <>
            {/* 内联 CSS 属性也是以驼峰命名 */}
            <ul style={
                {
                    backgroundColor: 'block',
                    color: 'pink'
                }
            }>
                <li>Improve the videophone</li>
                <li>Prepare aeronautics lectures</li>
                <li>Work on the alcohol-fuelled engine</li>
            </ul>
            <div style={person.theme}>
                <h1>{person.name}</h1>
            </div>
        </>
    )
}
