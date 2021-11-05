/*
* principles for structuring state(state 结构化原则)
* */
import {useState} from "react";
import { initialNestedTravelPlan, initialFlatTravelPlan } from './places'
// group related state(合并相关的 state，如果总是同时更新两个或多个变量，请考虑是否合并成一个)
const [x, setX] = useState(0);
const [y, setY] = useState(0);
// or
const [position, setPosition] = useState({x:0,y:0}); // better
//注意：setPosition要同时更新两个值，setPosition({x: 100})意味这下次渲染position的值为{x:100}

// avoid contradictions in state(避免 state 矛盾)
export function FeedbackForm() {
    const [text, setText] = useState('');
    // 由于isSending和isSent永远不应该true同时存在，最好用一个status状态变量替换它们
    // 该变量可能采用以下三种有效状态之一：'typing','sending','sent'
    // const [isSending, setIsSending] = useState(false);
    // const [isSent, setIsSent] = useState(false);
    const [status, setStatus] = useState('typing');
    async function handleSubmit(e) {
        e.preventDefault();
        // setIsSending(true);
        setStatus('sending');
        await sendMessage(text);
        // setIsSending(false);
        // setIsSent(true);
        setStatus('sent');
    }
    const isSending = status === 'sending';
    const isSent = status === 'sent';
    if (isSent) {
        return <h1>Thanks for feedback!</h1>
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>How was your stay at The Prancing Pony?</p>
            <textarea
                disabled={isSending}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <br />
            <button
                disabled={isSending}
                type="submit"
            >
                Send
            </button>
            {isSending && <p>Sending...</p>}
        </form>
    );
}
function sendMessage(text){
    return new Promise(resolve => setTimeout(resolve, 2000))
}
// avoid redundant state(避免冗余的 state，比如有些值可以从props中或者state中计算得出)
function Message({initialColor}) {
    // 如果父组件传递了一个不同的initialColor值,color 状态变量将不会被更新！
    const [color, setColor] = useState(initialColor);// 这样写代表initialColor更新的值被忽略
}
// avoid duplication in state(避免 state 重复)
const initialItems = [
    { title: 'pretzels', id: 0 },
    { title: 'crispy seaweed', id: 1 },
    { title: 'granola bar', id: 2 },
];

export function Menu() {
    const [items, setItems] = useState(initialItems);
    // selectedItem的内容与items列表中的项目之一是同一个对象
    // const [selectedItem, setSelectedItem] = useState(
    //     items[0]
    // );
    const [selectedId, setSelectedId] = useState(0);

    const selectedItem = items.find(item =>
        item.id === selectedId
    );
    return (
        <>
            <h2>What's your travel snack?</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.title}
                        {' '}
                        <button onClick={() => {
                            setSelectedId(item.id);
                        }}>Choose</button>
                    </li>
                ))}
            </ul>
            <p>You picked {selectedItem.title}.</p>
        </>
    );
}
// avoid deeply nested state(避免深层次嵌套 state)
function NestedPlaceTree({ place }) {
    const childPlaces = place.childPlaces;
    return (
        <>
            <li>{place.title}</li>
            {childPlaces.length > 0 && (
                <ol>
                    {childPlaces.map(place => (
                        <PlaceTree key={place.id} place={place} />
                    ))}
                </ol>
            )}
        </>
    );
}

export function NestedTravelPlan() {
    const [plan, setPlan] = useState(initialNestedTravelPlan);
    const planets = plan.childPlaces;
    return (
        <>
            <h2>Places to visit</h2>
            <ol>
                {planets.map(place => (
                    <NestedPlaceTree key={place.id} place={place} />
                ))}
            </ol>
        </>
    );
}
function PlaceTree({ id, placesById }) {
    const place = placesById[id];
    const childIds = place.childIds;
    return (
        <>
            <li>{place.title}</li>
            {childIds.length > 0 && (
                <ol>
                    {childIds.map(childId => (
                        <PlaceTree
                            key={childId}
                            id={childId}
                            placesById={placesById}
                        />
                    ))}
                </ol>
            )}
        </>
    );
}

export function TravelPlan() {
    const [plan, setPlan] = useState(initialFlatTravelPlan); // 现在state是“平坦的(flat)”（也称为“规范化(normalized)”），更新嵌套项变得更容易。
    const root = plan[0];
    const planetIds = root.childIds;
    return (
        <>
            <h2>Places to visit</h2>
            <ol>
                {planetIds.map(id => (
                    <PlaceTree
                        key={id}
                        id={id}
                        placesById={plan}
                    />
                ))}
            </ol>
        </>
    );
}
