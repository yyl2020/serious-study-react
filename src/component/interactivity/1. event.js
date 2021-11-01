/*
* adding event handlers
* */
export function Button (){
    function handlerClick() {
        alert('click me')
    }
    // 传递函数而不是调用函数，因为不是每次渲染的时候触发函数，而是创建一个触发事件调用函数
    return (
        <>
            <button onClick={handlerClick}>
                Click me
            </button>
            <button onClick={()=>alert('click me')}>
                Click me
            </button>
        </>
    )
}

// 将事件处理程序作为 props 传递
export function Button2({onSmash,children}) { // 自定义命名事件处理程序 props
    return (
        <button onClick={onSmash}>
            {children}
        </button>
    )
}
function playButton({movieName}) {
    function handlerPlayClick(){
        alert('play')
    }
    return (
        <Button2 onSmash={handlerPlayClick}>
            play{movieName}
        </Button2>
    )
}
function UploadButton() {
    return (
        <Button2 onSmash={()=>alert('upload')}>
            Upload Image
        </Button2>
    )
}
/*
* 事件传播(Event propagation)又称事件冒泡(除了onScroll)
* */
export default function Toolbar() {
    return (
        <div className="Toolbar" onClick={() => {
            alert('You clicked on the toolbar!');
        }}>

            <button onClick={() => alert('Uploading!')}>
                Upload Image
            </button>
            <Button3 onClick={() => alert('Playing')}>
                play Movie
            </Button3>
        </div>
    );
}
function Button3({onClick,children}) {
    function handlerClick(e) {
        e.stopPropagation() // 阻止事件冒泡
        onClick()
    }
    return (
        <button onClick={handlerClick}>
            {children}
        </button>
    )
}
// 捕获事件(capture phase events)
function example() {
    return (
        <div onClickCapture={() => { /* this runs first */ }}>
            <button onClick={e => e.stopPropagation()} />
            <button onClick={e => e.stopPropagation()} />
        </div>
    )
}
// 防止默认行为(Preventing default behavior)
export function Singup() {
    return (
        <form onSubmit={(e)=> {
            e.preventDefault()
            alert('submit')
        }}>
            <input type="text"/>
            <button>Send</button>
        </form>
    )
}
