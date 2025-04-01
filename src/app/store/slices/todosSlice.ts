import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import { PersistPartial } from 'redux-persist/es/persistReducer';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}


export interface TodosState extends PersistPartial{
    items: Todo[];
    filter: 'all' | 'active' | 'completed';
}

const initialState: TodosState = {
    items: [
        { id: '1', text: 'Тестовое задание', completed: false },
        { id: '2', text: 'Прекрасный код', completed: true },
        { id: '3', text: 'Покрытие тестами', completed: false },
    ],
    filter: 'all',
    _persist: { version: 1, rehydrated: true },
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: {
            reducer(state, action: PayloadAction<Todo>) {
                state.items.push(action.payload);
            },
            prepare(text: string) {
                return {
                    payload: {
                        id: nanoid(),
                        text,
                        completed: false,
                    },
                };
            },
        },
        toggleTodo(state, action: PayloadAction<string>) {
            const todo = state.items.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo(state, action: PayloadAction<string>) {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },
        setFilter(state, action: PayloadAction<'all' | 'active' | 'completed'>) {
            state.filter = action.payload;
        },
        clearCompleted(state) {
            state.items = state.items.filter((t) => !t.completed);
        },
    },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;

export const selectTodos = (state: RootState) => state.todos.items;
export const selectFilter = (state: RootState) => state.todos.filter;
export const selectFilteredTodos = (state: RootState) => {
    const todos = selectTodos(state);
    const filter = selectFilter(state);

    switch (filter) {
        case 'active':
            return todos.filter((t) => !t.completed);
        case 'completed':
            return todos.filter((t) => t.completed);
        default:
            return todos;
    }
};
export const selectItemsLeft = (state: RootState) =>
    selectTodos(state).filter((t) => !t.completed).length;