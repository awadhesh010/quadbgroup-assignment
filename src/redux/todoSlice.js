import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  todoList: [],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {  //add todo reducer
      state.todoList.push(action.payload)
    },

    removeTodo: (state, action) => {   //remove todo reducer
      state.todoList.splice(action.payload, 1);
    },

    editTodo: (state, action) => {                        //remove todo reducer
      state.todoList[action.payload.index] = action.payload.value;
    },

    toggleTodoCompleted: (state, action) => {
      const index = action.payload;
      state.todoList[index].completed = !state.todoList[index].completed;
  }

  },
})

export const { addTodo, removeTodo, editTodo, toggleTodoCompleted } = todoSlice.actions

export default todoSlice.reducer  