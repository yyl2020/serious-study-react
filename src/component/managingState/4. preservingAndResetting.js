/**
 * 保留和重置状态(preserving and resetting)
 */
 import { useState } from 'react';
// UI tree
// React 从JSX生成 UI tree 然后 React DOM 更新浏览器 DOM 

// state 与 UI tree 某个位置关联
export function example() {
    const [showB, setShowB] = useState(true)
    const counter = <Counter />;
    return (
      <div>
        {/** 这是两个独立的计数器，每个计算器在 tree 中有自己独立的位置 */}
        {counter}
        { showB && counter}
        <label>
            <input
            type="checkbox"
            checked={showB}
            onChange={e => {
                setShowB(e.target.checked)
            }}
            />
            {/** 只要组件在 UI tree 中的位置被渲染，React就会保留state。
             * 如果被移除，React会丢弃组件state */}
            Render the second counter
        </label>
      </div>
    );
  }
  
  function Counter({ isFancy }) {
    const [score, setScore] = useState(0);
    const [hover, setHover] = useState(false);
  
    let className = 'counter';
    if (hover) {
      className += ' hover';
    }
    if (isFancy) {
        className += ' fancy';
      }
    return (
      <div
        className={className}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <h1>{score}</h1>
        <button onClick={() => setScore(score + 1)}>
          Add one
        </button>
      </div>
    );
  }
  /**
   * 相同位置的相同组件保持 state
   */
  export function example2() {
    const [isFancy, setIsFancy] = useState(false);
    return (
      <div>
        {/** 从React角度它们是相同的计数器，因为它们在 UI tree 中的位置(position)相同*/}
        {isFancy ? (
          <Counter isFancy={true} /> 
        ) : (
          <Counter isFancy={false} /> 
        )}
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          Use fancy styling
        </label>
      </div>
    );
  }
  /**
   * 相同位置的不同组件重置 state
   */
  export function example3() {
    const [isPaused, setIsPaused] = useState(false);
    return (
      <div>
          {/**当您在同一位置渲染不同的组件时，它会重置其整个子树的状态 */}
        {isPaused ? (
          <p>See you later!</p> 
        ) : (
          <Counter /> 
        )}
        <label>
          <input
            type="checkbox"
            checked={isPaused}
            onChange={e => {
              setIsPaused(e.target.checked)
            }}
          />
          Take a break
        </label>
      </div>
    );
  }
 export function example4() {
    const [isFancy, setIsFancy] = useState(false);
    return (
      <div>
        {/**如果你想在重新渲染的时候保留 state, 前后渲染的树结构需要匹配(match up) */}
        {isFancy ? (
          <div>
            <Counter isFancy={true} /> 
          </div>
        ) : (
          <section>
            <Counter isFancy={false} />
          </section>
        )}
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => {
              setIsFancy(e.target.checked)
            }}
          />
          Use fancy styling
        </label>
      </div>
    );
  }
// 这就是为什么不应该嵌套组件函数定义的原因
  export function MyComponent() {
    const [counter, setCounter] = useState(0);
    // 重新渲染的时候，不同的MyTextField被创建，在同一位置渲染不同的组件，会重置组件下的所有状态
    // 所以一定要在顶层声明组件函数，不要嵌套它们的定义
    function MyTextField() {
      const [text, setText] = useState('');
  
      return (
        <input
          value={text}
          onChange={e => setText(e.target.value)}
        />
      );
    }
  
    return (
      <>
        <MyTextField />
        <button onClick={() => {
          setCounter(counter + 1)
        }}>Clicked {counter} times</button>
      </>
    );
  }
  /**
   * 在相同位置重置 state
   */
  // 1.渲染不同位置的组件
  export function Scoreboard() {
    const [isPlayerA, setIsPlayerA] = useState(true);
    return (
      <div>
        {isPlayerA &&
          <Counter person="Taylor" />
        }
        {!isPlayerA &&
          <Counter person="Sarah" />
        }
        <button onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}>
          Next player!
        </button>
      </div>
    );
  }
  // 2. 给每个组件一个明确的key
  export function Scoreboard2() {
    const [isPlayerA, setIsPlayerA] = useState(true);
    return (
      <div>
        {isPlayerA ? (
          <Counter key="Taylor" person="Taylor" />
        ) : (
          <Counter key="Sarah" person="Sarah" />
        )}
        <button onClick={() => {
          setIsPlayerA(!isPlayerA);
        }}>
          Next player!
        </button>
      </div>
    );
  }