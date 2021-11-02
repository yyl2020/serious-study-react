import { useState } from 'react'
import { useImmer } from 'use-immer'
/*
* updating objects in state:更新对象时需要创建新对象(或者现有对象的副本)，然后将 state 设置为使用该副本
* */
// 突变(mutation):更改对象本身的内容，对于State中的对象应该替换它们而不是改变它们
// 将任何放入 state 的 JS 对象视为只读对象
export function MovingDot(){
    const [position, setPosition] = useState({ x: 0, y: 0 });
    return (
        <div
            onPointerMove={e =>{
                // position.x = e.clientX // 突变
                // position.y = e.clientY // 要真正触发重新渲染，创建一个新对象并传递给 state setting function
                setPosition({
                    x: e.clientX,
                    y: e.clientY
                })
                // const nextPosition = {};
                // nextPosition.x = e.clientX; // 局部突变完全没问题
                // nextPosition.y = e.clientY; // 当改变已经存在在state中的对象才会造成突变问题
                // setPosition(nextPosition);
            }}
            style={{
                position:'relative',
                width:'100vw',
                height: '100vh'
            }}
        >
            <div style={{
                position: 'absolute',
                backgroundColor: 'red',
                borderRadius: '50%',
                transform: `translate(${position.x}px, ${position.y}px)`,
                left: -10,
                top: -10,
                width: 20,
                height: 20,
            }} />
        </div>
    )
}
// 使用扩展语法(spread syntax)复制对象：用在当你只想更新对象的一个字段，但保留其他字段的原先值时
function Item({value,onChange}){
    return (
        <label>
            {value}:
            <input
                name={value}
                value={value}
                onChange={onChange}
            />
        </label>
    )
}
export function Form2() {
    const [person, setPerson] = useState({
        firstName: 'Barbara',
        lastName: 'Hepworth',
        email: 'bhepworth@sculpture.com'
    })
    function handleChange(e) {
        setPerson({
            ...person,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <Item
                value={person.firstName}
                onChange={handleChange}
            />
            <Item
                value={person.lastName}
                onChange={handleChange}
            />
            <Item
                value={person.email}
                onChange={handleChange}
            />
            <p>
                {person.firstName}{' '}
                {person.lastName}{' '}
                ({person.email})
            </p>
        </>
    );
}

// 更新嵌套对象
export function Form3() {
    const [person, setPerson] = useState({
        name: 'Niki de Saint Phalle',
        artwork: {
            title: 'Blue Nana',
            city: 'Hamburg',
            image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        }
    });
    function handleNameChange(e){
        setPerson({
            ...person,
            name: e.target.value
        })
    }
    function handleTitleChange(e) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                title: e.target.value
            }
        })
    }
    function handleCityChange(e){
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                city: e.target.value
            }
        })
    }
    function handleImageChange(e) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                image: e.target.value
            }
        })
    }
    return(
        <>
            <label>
                Name:
                <input
                    value={person.name}
                    onChange={handleNameChange}
                />
            </label>
            <label>
                Title:
                <input
                    value={person.artwork.title}
                    onChange={handleTitleChange}
                />
            </label>
            <label>
                City:
                <input
                    value={person.artwork.city}
                    onChange={handleCityChange}
                />
            </label>
            <label>
                Image:
                <input
                    value={person.artwork.image}
                    onChange={handleImageChange}
                />
            </label>
            <p>
                <i>{person.artwork.title}</i>
                {' by '}
                {person.name}
                <br />
                (located in {person.artwork.city})
            </p>
            <img
                src={person.artwork.image}
                alt={person.artwork.title}
            />
        </>
    );
}

// 使用Immer编写简洁的更新逻辑
function Form4() {
    const [person, updatePerson] = useImmer({
        name: 'Niki de Saint Phalle',
        artwork: {
            title: 'Blue Nana',
            city: 'Hamburg',
            image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        }
    });
    function handleNameChange(e){
        updatePerson(draft => {
            draft.name = e.target.value;
        })
    }
    function handleTitleChange(e) {
        updatePerson(draft =>{
            draft.artwork.title = e.target.value
        })
    }
    function handleCityChange(e){
        updatePerson(draft =>{
            draft.artwork.city = e.target.value
        })
    }
    function handleImageChange(e) {
        updatePerson(draft =>{
            draft.artwork.image = e.target.value
        })
    }
    return (
        <>
            <label>
                Name:
                <input
                    value={person.name}
                    onChange={handleNameChange}
                />
            </label>
            <label>
                Title:
                <input
                    value={person.artwork.title}
                    onChange={handleTitleChange}
                />
            </label>
            <label>
                City:
                <input
                    value={person.artwork.city}
                    onChange={handleCityChange}
                />
            </label>
            <label>
                Image:
                <input
                    value={person.artwork.image}
                    onChange={handleImageChange}
                />
            </label>
            <p>
                <i>{person.artwork.title}</i>
                {' by '}
                {person.name}
                <br />
                (located in {person.artwork.city})
            </p>
            <img
                src={person.artwork.image}
                alt={person.artwork.title}
            />
        </>
    );
}

/*
* updating array in state: 和对象一样应该数组视为不可变的
* */
// 添加到数组
let nextId = 0;
export function List() {
    const [name, setName] = useState('')
    const [artists, setArtists] = useState([])
    return (
        <>
            <h1>Inspiring sculptors:</h1>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button onClick={() => {
                setName('');
                // artists.push({ // 不生效
                //     id: nextId++,
                //     name: name,
                // });
                setArtists([
                    ...artists, // spread 可以push()通过添加到数组的开头和unshift()添加到数组的末尾来完成两者的工作。
                    { id: nextId++, name: name }
                ]);
            }}>Add</button>
            <ul>
                {artists.map(artist => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
        </>
   );
}
// 从数组删除
let initialArtists = [
    { id: 0, name: 'Marta Colvin Andrade' },
    { id: 1, name: 'Lamidi Olonade Fakeye'},
    { id: 2, name: 'Louise Nevelson'},
];

export function List2() {
    const [artists, setArtists] = useState(
        initialArtists
    );

    return (
        <>
            <h1>Inspiring sculptors:</h1>
            <ul>
                {artists.map(artist => (
                    <li key={artist.id}>
                        {artist.name}{' '}
                        <button onClick={() => {
                            setArtists(
                                artists.filter(a => // filter不会修改原始数组。
                                    a.id !== artist.id
                                )
                            );
                        }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

// 转换数组
let initialShapes = [
    { id: 0, type: 'circle', x: 50, y: 100 },
    { id: 1, type: 'square', x: 150, y: 100 },
    { id: 2, type: 'circle', x: 250, y: 100 },
];

export function ShapeEditor() {
    const [shapes, setShapes] = useState(
        initialShapes
    );

    function handleClick() {
        const nextShapes = shapes.map(shape => {
            if (shape.type === 'square') {
                // No change
                return shape;
            } else {
                // Return a new circle 50px below
                return {
                    ...shape,
                    y: shape.y + 50,
                };
            }
        });
        // Re-render with the new array
        setShapes(nextShapes);
    }

    return (
        <>
            <button onClick={handleClick}>
                Move circles down!
            </button>
            {shapes.map(shape => (
                <div style={{
                    background: 'purple',
                    position: 'absolute',
                    left: shape.x,
                    top: shape.y,
                    borderRadius:
                        shape.type === 'circle'
                            ? '50%' : '',
                    width: 20,
                    height: 20,
                }} />
            ))}
        </>
    );
}

// 替换数组中的项目
let initialCounters = [
    0, 0, 0
];

export function CounterList() {
    const [counters, setCounters] = useState(
        initialCounters
    );

    function handleIncrementClick(index) {
        const nextCounters = counters.map((c, i) => {
            if (i === index) {
                // Increment the clicked counter
                return c + 1;
            } else {
                // The rest haven't changed
                return c;
            }
        });
        setCounters(nextCounters);
    }

    return (
        <ul>
            {counters.map((counter, i) => (
                <li key={i}>
                    {counter}
                    <button onClick={() => {
                        handleIncrementClick(i);
                    }}>+1</button>
                </li>
            ))}
        </ul>
    );
}

// 插入数组
let nextId2 = 3;
const initialArtists2 = [
    { id: 0, name: 'Marta Colvin Andrade' },
    { id: 1, name: 'Lamidi Olonade Fakeye'},
    { id: 2, name: 'Louise Nevelson'},
];

export function List3() {
    const [name, setName] = useState('');
    const [artists, setArtists] = useState(
        initialArtists2
    );

    function handleClick() {
        const insertAt = 1; // Could be any index
        const nextArtists = [
            // Items before the insertion point:
            ...artists.slice(0, insertAt),
            // New item:
            { id: nextId2++, name: name },
            // Items after the insertion point:
            ...artists.slice(insertAt)
        ];
        setArtists(nextArtists);
        setName('');
    }

    return (
        <>
            <h1>Inspiring sculptors:</h1>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button onClick={handleClick}>
                Insert
            </button>
            <ul>
                {artists.map(artist => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
        </>
    );
}

// 更新数组中的对象
const initialList = [
    { id: 0, title: 'Big Bellies', seen: false },
    { id: 1, title: 'Lunar Landscape', seen: false },
    { id: 2, title: 'Terracotta Army', seen: true },
];

export function BucketList() {
    const [myList, setMyList] = useState(initialList);
    const [yourList, setYourList] = useState(
        initialList
    );

    function handleToggleMyList(artworkId, nextSeen) {
        setMyList(myList.map(artwork => {
            if (artwork.id === artworkId) {
                // Create a *new* object with changes
                return { ...artwork, seen: nextSeen };
            } else {
                // No changes
                return artwork;
            }
        }));
    }

    function handleToggleYourList(artworkId, nextSeen) {
        setYourList(yourList.map(artwork => {
            if (artwork.id === artworkId) {
                // Create a *new* object with changes
                return { ...artwork, seen: nextSeen };
            } else {
                // No changes
                return artwork;
            }
        }));
    }

    return (
        <>
            <h1>Art Bucket List</h1>
            <h2>My list of art to see:</h2>
            <ItemList
                artworks={myList}
                onToggle={handleToggleMyList} />
            <h2>Your list of art to see:</h2>
            <ItemList
                artworks={yourList}
                onToggle={handleToggleYourList} />
        </>
    );
}

function ItemList({ artworks, onToggle }) {
    return (
        <ul>
            {artworks.map(artwork => (
                <li key={artwork.id}>
                    <label>
                        <input
                            type="checkbox"
                            checked={artwork.seen}
                            onChange={e => {
                                onToggle(
                                    artwork.id,
                                    e.target.checked
                                );
                            }}
                        />
                        {artwork.title}
                    </label>
                </li>
            ))}
        </ul>
    );
}

// 使用 Immer 编写更简洁的更新逻辑
export function BucketList2() {
    const [myList, updateMyList] = useImmer(
        initialList
    );
    const [yourArtworks, updateYourList] = useImmer(
        initialList
    );

    function handleToggleMyList(id, nextSeen) {
        updateMyList(draft => {
            const artwork = draft.find(a =>
                a.id === id
            );
            artwork.seen = nextSeen;
        });
    }

    function handleToggleYourList(artworkId, nextSeen) {
        updateYourList(draft => {
            const artwork = draft.find(a =>
                a.id === artworkId
            );
            artwork.seen = nextSeen;
        });
    }

    return (
        <>
            <h1>Art Bucket List</h1>
            <h2>My list of art to see:</h2>
            <ItemList
                artworks={myList}
                onToggle={handleToggleMyList} />
            <h2>Your list of art to see:</h2>
            <ItemList
                artworks={yourArtworks}
                onToggle={handleToggleYourList} />
        </>
    );
}
