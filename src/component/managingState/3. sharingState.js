/**
 * lifting state up(状态提升): 希望将两个组件的steat始终一起变化，将state移动到最近的公共父节点，通过props传递给子组件
 */
import { useState } from 'react';

function Panel({title, children}){
    // 非受控组件：父组件无法影响面板是否处于活动状态
    const [isActive, setIsActive] = useState(false)
    return (
        <section>
            <h3>{title}</h3>
            {isActive ? (
                <p>{children}</p>
            ) : (
                <button onClick={() => setIsActive(true)}>
                Show
                </button>
            )}
        </section>
    )
}
export function Accordion() {
    return (
      <>
        <h2>Almaty, Kazakhstan</h2>
        <Panel title="About">
          With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
        </Panel>
        <Panel title="Etymology">
          The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
        </Panel>
      </>
    );
  }

// 状态提升：1.删除子组件状态 2.父组件传递硬编码数据(hardcoded data 我理解的硬编码就是写死的数据)3.将状态添加到公共父级
function Panel2({title, children, isActive, onShow}){
    // const [isActive, setIsActive] = useState(false) 1.删除子组件状态,从props传入
    // 受控组件：组件中的重要信息是由 props 而不是它自己的本地状态驱动
    return (
        <section>
            <h3>{title}</h3>
            {isActive ? (
                <p>{children}</p>
            ) : (
                <button onClick={onShow}>
                Show
                </button>
            )}
        </section>
    )
}
export function Accordion() {
    const [activeIndex, setActiveIndex] = useState(0); // 3.将状态添加到公共父级
    return (
      <>
        <h2>Almaty, Kazakhstan</h2>
        <Panel 
        title="About" 
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}>
        {/*isActive={true}> 2.父组件传递硬编码数据*/}
          With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
        </Panel>
        <Panel title="Etymology" 
        onShow={() => setActiveIndex(1)}
        isActive={activeIndex === 1}>
          The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
        </Panel>
      </>
    );
  }
