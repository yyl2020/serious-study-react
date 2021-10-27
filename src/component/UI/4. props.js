/*
* props 传递给组件
* */
// 1. 将props传递给子组件
export function Profile(){
    return (
        <Avatar
            person={{name: 'John',imageId: '1bX5QH6'}}
            size={100}
        />
    )
}
// 2. 子组件读取props
function Avatar({person, size = 100}){ // 指定默认值
    // 相当于 function Avatar(props){ let person = props.person let size = props.size
    return (
        <img
            className="avatar"
            src={getImageUrl(person)}
            alt={person.name}
            width={size}
            height={size}
        />
    )
}
function getImageUrl(person, size = 's') {
    return (
        'https://i.imgur.com/' +
        person.imageId +
        size +
        '.jpg'
    );
}

// 作为 children 传递 JSX , 类似插槽
function Card({children}){
    return (
        <div className='card'>
            {children}
        </div>
    )
}
export function Profile2(){
    return(
        <Card>
            <Avatar
                size={100}
                person={{
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }}
            />
        </Card>
    )
}

// 组件可能随着时间变化接受不同的props, 但是props是不可变的,需要交互性时需要设置新状态


