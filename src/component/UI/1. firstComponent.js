/*
* components: UI building block
* */
// React 组件是一个 JS 函数, 你能做上记号(sprinkle with markup)
// 创建组件的3个步骤：1. Export the component 2. Define the function 3. add markup
export function Profile () { // 函数组件名必须大写字母开头
    return ( // jsx 与 return 语句不在同一行,必须用括号包裹
        <img
            src='https://i.imgur.com/MK3eW3Am.jpg'
            alt='Katherine Johnson'
        />
    )
}

// 使用组件
export default function Gallery () {
    return (
        <section>
            <h1>image</h1>
            <Profile />
            <Profile />
            <Profile />
        </section>
    )
}
