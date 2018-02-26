import { h, app } from 'hyperapp'
import style from './index.less'
import TodoItem from './components/TodoItem'
const FilterInfo = { All: 0, Todo: 1, Done: 2 }
const state = {
    todos: [],
    filter: FilterInfo.All,
    input: "",
    placeholder: "Do that thing...",
    title:''
}
const dangerouslySetInnerHTML =html=>e=>{
    e.innerHTML = html
}
const view = (state, actions) => (
    <div>
        <div oncreate={dangerouslySetInnerHTML('hhhhh<span style="color:red">mmmm</span>')}></div>
        {/* <h1 oncreate={()=>actions.setTitle('TODO')}>{state.title}</h1>  */}
        <p>
            {Object.keys(FilterInfo)
                .filter(key => FilterInfo[key] !== state.filter)
                .map(key => (
                    <span>
                        <a
                            href="#"
                            onclick={() =>
                                actions.filter({
                                    value: FilterInfo[key]
                                })
                            }
                        >
                            {key}
                        </a>{" "}
                    </span>
                ))}
        </p>

        <div class="flex">
            <input
                type="text"
                onkeyup={e => (e.keyCode === 13 ? actions.add() : "")}
                oninput={e => actions.input({ value: e.target.value })}
                value={state.input}
                placeholder={state.placeholder}
            />
            <button onclick={actions.add}>＋</button>
        </div>

        <p>
            <ul>
                {state.todos
                    .filter(
                        t =>
                            state.filter === FilterInfo.Done
                                ? t.done
                                : state.filter === FilterInfo.Todo
                                    ? !t.done
                                    : state.filter === FilterInfo.All
                    )
                    .map(t => {
                        return (
                            <TodoItem
                                id={t.id}
                                value={t.value}
                                done={t.done}
                                toggle={actions.toggle}
                            />
                        )})}
      </ul>
        </p>
    </div>
)

const actions = {
    add: () => state => ({
        input: "",
        todos: state.todos.concat({
            done: false,
            value: state.input,
            id: state.todos.length + 1
        })
    }),
    toggle: ({ id, value }) => state => ({
        todos: state.todos.map(
            t => (id === t.id ? Object.assign({}, t, { done: !value }) : t)
        )
    }),
    input: ({ value }) => ({ input: value }),
    filter: ({ value }) => ({ filter: value }),
    // setTitleHandler :title=>({title}),
    // setTitle : (title)=>async (state, actions) => {
    //     await new Promise(() => setTimeout(actions.setTitleHandler(title), 1000))
    //   },
}

app(state, actions, view, document.body)