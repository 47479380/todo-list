import actionTypes from "./actionTypes";

function todoReducer(todoList,acton) {
    const {type,payload}=acton
    switch (type) {
        case actionTypes.ADD_TODO:
            return addTodo(todoList,payload)
        case actionTypes.UPDATE_TODO:
            return updateTodo(todoList,payload)
    }
    return todoList
}
function addTodo(todoList,payload) {
    //不能直接修改原来的todoList
    //需要返回一个新的todoList
    return [...todoList,payload]
}
function updateTodo(todoList,payload) {
    const {index,item}=payload
    let array = new Array(...todoList);
    array[index]=item
    return array
}
export {todoReducer}