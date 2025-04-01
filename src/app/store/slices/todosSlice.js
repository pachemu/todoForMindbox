import { createSlice, nanoid } from '@reduxjs/toolkit';
const initialState = {
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
            reducer(state, action) {
                state.items.push(action.payload);
            },
            prepare(text) {
                return {
                    payload: {
                        id: nanoid(),
                        text,
                        completed: false,
                    },
                };
            },
        },
        toggleTodo(state, action) {
            const todo = state.items.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo(state, action) {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },
        setFilter(state, action) {
            state.filter = action.payload;
        },
        clearCompleted(state) {
            state.items = state.items.filter((t) => !t.completed);
        },
    },
});
export const { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;
export const selectFilteredTodos = (state) => {
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
export const selectItemsLeft = (state) => selectTodos(state).filter((t) => !t.completed).length;
