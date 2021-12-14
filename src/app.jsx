
import {useState} from "preact/compat";
import {useStoreon} from "storeon/preact";

const filterOptions={
    all: {
        title: "全部",
        filter: ()=>true
    },
    done:{
        title:"已完成",
        filter: function ({done}) {
            return done
        }
    },
    undone:{
        title:"未完成",
        filter: function ({done}) {
            return !done
        }
    }
}
const App = function () {
    const [filter,setFilters]=useState("all")
    const [value,setValue]=useState("")
    const {dispatch}=useStoreon("TodoList")
    const addTodo=()=>{
        dispatch("todo.add",{
            title:value,
            done:false
        })
        setValue("")
    }
    return (

        <div className="main" id="app">
            <div className="container">
                <h1>欢迎使用 Feng 待办事项</h1>
                <div className="input-add">
                    <input type="text" value={value} onChange={(evt)=>{setValue(evt.target.value)}}/>
                    <button onClick={addTodo}><i className="plus"/></button>
                </div>
                <TodoFilters value={filter} onChange={setFilters}/>

                <TodoList filter={filter}/>
            </div>
        </div>
    )
}
const TodoList = function ({filter}) {

    const {dispatch,TodoList}=useStoreon("TodoList")
    return (
        <div className="todo-list">
            {TodoList.filter(filterOptions[filter].filter).map((value,index) => {
                return (
                    <TodoItem key={Symbol(value)} value={value} {...value}/>
                )
            })}
        </div>
    )
}
const TodoItem = function ({title, done,value}) {
    const {dispatch,TodoList}=useStoreon("TodoList")
    const onChange=()=>{
        let index=TodoList.indexOf(value)
        let t=TodoList[index]
        t.done=!t.done
        dispatch("todo.update",TodoList)
    }
    return (<div  className={`todo-item ${done&&"done"}`}>
        <label>
            <input type="checkbox" checked={done} onChange={onChange}/>
            {title}
            <span className="check-button"/>
        </label>
    </div>)
}
const TodoFilters = function ({value,onChange}) {

    return (
        <div className="filters" >
            {
                Object.keys(filterOptions).map((key)=>{
                    const {title}=filterOptions[key]
                    return <div onClick={()=>{onChange(key)}} key={key}  className={`filter ${value===key&&"active"}`}>{title}</div>
                })
            }
        </div>
    )
}
export {App}