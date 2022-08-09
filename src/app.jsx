import {useState} from "preact/compat";
import {initTodoList} from "./state";
import {todoReducer} from "./reducer";
import {useReducer} from "preact/hooks";
import actionTypes from "./actionTypes";

const filterOptions = {
    all: {
        title: "全部",
        filter: () => true
    },
    done: {
        title: "已完成",
        filter: function ({done}) {
            return done
        }
    },
    undone: {
        title: "未完成",
        filter: function ({done}) {
            return !done
        }
    }
}
const App = function () {
    const [filter, setFilters] = useState("all")
    const [value, setValue] = useState("")
    const [todoList, todoDispatch] = useReducer(todoReducer, initTodoList)
    const addTodo = () => {
        todoDispatch({
            type: actionTypes.ADD_TODO, payload: {
                title: value,
                done: false
            }
        })
        setValue("")
    }
    const updateTodo=(index,item)=>{
       todoDispatch({type:actionTypes.UPDATE_TODO,payload:{index,item}})
    }
    const removeTodo=(index)=>{
        todoDispatch({type:actionTypes.REMOVE_TODO,payload:index})
    }
    return (
        <div className="main" id="app">
            <div className="container">
                <h1>欢迎使用 Feng 待办事项</h1>
                <div className="input-add">
                    <input type="text" value={value} onChange={(evt) => {
                        setValue(evt.target.value)
                    }}/>
                    <button onClick={addTodo}><i className="plus"/></button>
                </div>
                <TodoFilters value={filter} onChange={setFilters}/>

                <TodoList todoList={todoList} updateTodo={updateTodo} filter={filter}/>
            </div>
        </div>
    )
}
const TodoList = function ({filter,todoList,updateTodo}) {
    return (
        <div className="todo-list">
            {todoList.filter(filterOptions[filter].filter).map((value, index) => {
                return (
                    <TodoItem updateTodo={updateTodo} key={Symbol(value)} value={value} {...value} index={index}/>
                )
            })}
        </div>
    )
}
const TodoItem = function ({title, done,updateTodo,index}) {

    return (<div className={`todo-item ${done && "done"}`}>
        <label>
            <input type="checkbox" checked={done} onChange={()=>{updateTodo(index,{title,done:!done})}}/>
            {title}
            <span className="check-button"/>
        </label>
    </div>)
}
const TodoFilters = function ({value, onChange}) {
    return (
        <div className="filters">
            {
                Object.keys(filterOptions).map((key) => {
                    const {title} = filterOptions[key]
                    return <div onClick={() => {
                        onChange(key)
                    }} key={key} className={`filter ${value === key && "active"}`}>{title}</div>
                })
            }
        </div>
    )
}
export {App}