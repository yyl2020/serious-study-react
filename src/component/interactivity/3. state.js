/*
* state: a component memory
* */
import sculptureList from './data'
import { useState } from "react";
import {data} from "../quickStart/data";

// 当常规变量失效时
function Sculpture({sculpture, index}) {
    return (
        <>
            <h2>
                <i>{sculpture.name} </i>
                by {sculpture.artist}
            </h2>
            <h3>
                ({index + 1} of {sculptureList.length})
            </h3>
            <img
                src={sculpture.url}
                alt={sculpture.alt}
            />
            <p>
                {sculpture.description}
            </p>
        </>
    )
}
export function Gallery(){
    // 局部变量不会在渲染时持续存在，当二次渲染组件时，会从头开始渲染
    // 对局部变量的更改不会触发渲染
    let index = 0;
    function handleClick() {
        index = index + 1;
    }
    let sculpture = sculptureList[index]
    return (
        <>
            <button onClick={handleClick}>
                Next
            </button>
            <Sculpture sculpture={sculpture} index={index}/>
        </>
    )
}
// 如果要使用新数据更新组件，要能保留渲染之间的数据，以及触发 React 使用新数据渲染组件(重新渲染)
// useState 提供了上面2个功能
// state 变量保留了渲染之间的数据，setter 函数更新变量并触发 React 重新渲染
export function Gallery2(){
    // use开头的函数称为 Hook，Hooks是特殊的函数仅在渲染时可用
    // Hooks 只能在组件顶层调用，不能在条件、循环、嵌套函数中调用 Hook
    let [index, setIndex] = useState(0)
    function handleClick() {
        setIndex(index + 1)
    }
    let sculpture = sculptureList[index]
    return (
        <>
            <button onClick={handleClick}>
                Next
            </button>
            <Sculpture sculpture={sculpture} index={index}/>
        </>
    )
}
// Hooks 依赖于相同组件的每次渲染的稳定调用顺序
// useState 心智模型
let componentHooks = []
let currentHooksIndex = 0
function useState(initialState) {
    let pair = componentHooks[currentHooksIndex]
    if (pair) {
        // 这不是首次渲染，所以 state pair 已经存在，返回 state 并且准备下次 Hook 调用
        currentHooksIndex++
        return pair
    }
    pair = [initialState, setState]
    // 首次渲染
    function setState(nextState) {
        pair[0] = nextState
        // updateDOM()
    }
    // Store the pair for future renders
    // and prepare for the next Hook call.
    componentHooks[currentHooksIndex] = pair
    currentHooksIndex++
    return pair
}

// state 是独立和私有的(isolated and private)，如果同一组件渲染两次，每个副本都会有完全隔离的状态
export function Page() {
    return (
        <div>
            <Gallery2/>
            <Gallery2/>
        </div>
    )
}
