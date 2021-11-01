import ReactDOM from "react-dom";
/*
* 1. 触发渲染(triggering a render)
* */
// 组件初始化渲染(initial render)
export function Image() {
    return (
        <img
            src="https://i.imgur.com/ZF6s192.jpg"
            alt="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
        />
    );
}
ReactDOM.render(
    <Image/>,
    document.getElementById('root')
)
// 组件 state 更新(re-renders when state updates)

/*
* 2. 渲染组件(rendering the component):'render' 是 React 调用你的组件。
* */
// 初始化渲染时，React将调用根组件。
// 对于随后的渲染，React将会在state更新触发渲染的时候调用该函数组件
// 在重新渲染期间， React 将计算它们的哪些属性（如果有）自上次渲染以来发生了变化。然后进入提交阶段。

/*
* 3. 提交到DOM(committing to the DOM)
* */
// 对于初始化渲染,React将使用appendChild() DOM API加到DOM中
// 对于重新渲染,React 将应用最少的必要操作（在渲染时计算！）以使 DOM 匹配最新的渲染输出.
// 如果渲染存在差异,React只会更改DOM节点
