import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface ITodo {
    id: string,
    title: string,
    completed: boolean,
}

interface ITodoList {
    list: ITodo[],
}

const initialState: ITodoList = {
    list: [],
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.list.push ({
                id: new Date().toISOString(),
                title: action.payload,
                completed: false,
            })
        },
        removeTodo(state, action: PayloadAction<string>) {
              state.list = state.list.filter((todo) => todo.id !== action.payload)
        },
        updateTodo(state, action: PayloadAction<{id: string, value: string}>) {
            const todo = state.list.find((todo) => todo.id === action.payload.id)
            if(todo) {
                todo.title = action.payload.value;
            }    
        },
        toggleCompleted(state, action: PayloadAction<{id: string, completed: boolean}>) {
            
            const current = state.list.find((todo) => todo.id === action.payload.id);
            if(current){
                current.completed = action.payload.completed
            }
        }
    }
})

export const { addTodo, removeTodo, updateTodo, toggleCompleted } = todoSlice.actions

export default todoSlice.reducer