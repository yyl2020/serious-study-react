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
/*
* state as a snapshot:state 的行为更像是snapshot，设置它不会更改您已有的状态变量，而是会触发重新渲染。
* */
// 设置 state 触发渲染，set state 经过 React 处理后 re-render
export function Form() {
    const [isSent, setIsSent] = useState(false)
    const [message, setMessage] = useState('hi !')
    if (isSent){
        return <h1>Your message is on its way!</h1>
    }
    return(
        <form onSubmit={(e)=>{
            e.preventDefault()
            setIsSent(true)
        }}>
            <textarea
                placeholder="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}>
            </textarea>
            <button type='submit'>send</button>
        </form>
    )
}
// render 意味着React在调用组件
// props,event handler,local variables这些值都是使用渲染时的状态计算的(calculated using its state at the time of the render.)
// re-render 时意味着React再次调用函数，函数返回新的JSX snapshot，然后React更新DOM树
// 而state不像常规变量一样，state是在React中，并且在函数外的。
// 当 React 调用您的组件时，state会为您提供该特定渲染的状态快照。
// 您的组件在其 JSX 中返回带有一组新props和event handler的 UI 快照，所有这些都使用该渲染的状态值计算(calculated using the state values from that render!)
export function Counter() {
    const [number, setNumber] = useState(0)
    // 设置状态只会在下次渲染时更改它
    // 第一次 setNumber(number + 1)，number是 0 + 1，React准备在下次渲染时更改number为1
    // 第二次 setNumber(number + 1)，number还没有改变所以还是0 + 1，React 准备在下一次渲染时更改number为1
    // 第三次同理，所以点击按钮number是+1而不是+3
    return (
        <>
            <h1>{number}</h1>
            <button onClick={()=>{
                setNumber(number + 1)
                setNumber(number + 1)
                setNumber(number + 1)
            }}>+3</button>
        </>
    )
}
export function Counter2() {
    const [number, setNumber] = useState(0)
    return (
        <>
            <h1>{number}</h1>
            <button onClick={()=>{
                setNumber(number + 5)
                setTimeout(()=>{
                    // React 将状态值固定在一个渲染的事件处理程序中
                    alert(number) // alert 0, state 变量的值在渲染中永远不会改变，即使是异步的
                },5000)
            }}>+5</button>
        </>
    )
}
export  function Form2() {
    const [to, setTo] = useState('Alice');
    const [message, setMessage] = useState('Hello');

    function handleSubmit(e) {
        e.preventDefault();
        setTimeout(() => {
            alert(`You said ${message} to ${to}`);
        }, 5000);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                To:{' '}
                <select
                    value={to}
                    onChange={e => setTo(e.target.value)}>
                    <option value="Alice">Alice</option>
                    <option value="Bob">Bob</option>
                </select>
            </label>
            <textarea
                placeholder="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
}
/*
* state 更新队列顺序:React是如何批量更新 state 的
* */
// 在处理更新状态之前，React会等待事件处理程序中所有代码运行完成，这种行为称为批处理(batching)
// 但是React不会故意跨过多个不同事件进行批处理
// 这就是为什么重新渲染只在所有这些setNumber()调用之后发生的原因。
/*
* 在下次渲染之前多次更新相同的state
* */
export function Counter3() {
    const [number, setNumber] = useState(0)
    return (
        <>
            <h1>{number}</h1>
            <button onClick={()=>{
                setNumber(n=>n+1) // 更新函数(updater function)必须是纯函数(pure)而且只返回结果
                setNumber(n=>n+1) // 1.在事件处理程序中的所有其他代码运行后，React 将此函数排入队列以进行处理。
                setNumber(n=>n+1) // 2.在下一次渲染期间，React 遍历队列并为您提供最终更新状态。
            }}>+3</button>
        </>
    )
}
// 命名约定：通常通过相应state的第一个字母来命名更新程序函数参数：
// setEnabled(e => !e);
// setLastName(ln => ln.reverse());

// 实现状态队列(queue)
function getFinalState(baseState, queue) {
    let finalState = baseState
    for (const item of queue) {
        if (typeof item === 'function'){
            finalState = item(finalState)
        }else {
            finalState = item
        }
    }
    return finalState
}
function TestCase({baseState,queue, expected}) {
    const actual = getFinalState(baseState, queue);
    return (
        <>
            <p>Base state: <b>{baseState}</b></p>
            <p>Queue: <b>[{queue.join(', ')}]</b></p>
            <p>Expected result: <b>{expected}</b></p>
            <p style={{
                color: actual === expected ?
                    'green' :
                    'red'
            }}>
                Your result: <b>{actual}</b>
                {' '}
                ({actual === expected ?
                'correct' :
                'wrong'
            })
            </p>
        </>
    );
}
function increment(n) {
    return n + 1;
}
increment.toString = () => 'n => n+1';

export function TestStateQueue() {
    return (
        <>
            <TestCase
                baseState={0}
                queue={[1, 1, 1]}
                expected={1}
            />
            <hr />
            <TestCase
                baseState={0}
                queue={[
                    increment,
                    increment,
                    increment
                ]}
                expected={3}
            />
            <hr />
            <TestCase
                baseState={0}
                queue={[
                    5,
                    increment,
                ]}
                expected={6}
            />
            <hr />
            <TestCase
                baseState={0}
                queue={[
                    5,
                    increment,
                    42,
                ]}
                expected={42}
            />
        </>
    );
}
