/*
* exporting and importing a component
* */
// 一个文件最多只能有一个默认导出(default export),但是可以有任意多个命名导出(named export)
// 如果一个文件之导出一个组件,通常使用默认导出. 如果导出多个组件和值,通常使用命名导出
// 不建议导出没有名称的函数,例如: export default () => {}
import Gallery, { Profile } from './firstComponent'

export default function ModuleComponent(){
    return (
        <div>
            <Gallery />
            <Profile />
        </div>
    )
}
