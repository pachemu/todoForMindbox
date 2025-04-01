// todosSlice.test.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer, {
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
    selectTodos,
    selectFilter,
    selectFilteredTodos,
    selectItemsLeft, TodosState,
} from './todosSlice';

describe('todosSlice', () => {
    const mockInitialState: TodosState = {
        items: [
            { id: '1', text: 'Тестовое задание', completed: false },
            { id: '2', text: 'Прекрасный код', completed: true },
            { id: '3', text: 'Покрытие тестами', completed: false },
        ],
        filter: 'all',
        _persist: { version: 1, rehydrated: true },
    };

    test('should return initial state', () => {
        const store = configureStore({ reducer: { todos: todosReducer } });
        const state = store.getState().todos;
        expect(state).toEqual(mockInitialState);
    });

    describe('reducers', () => {
        test('addTodo adds new todo', () => {
            const action = addTodo('Новая задача');
            const newState = todosReducer(mockInitialState, action);

            expect(newState.items).toHaveLength(4);
            expect(newState.items[3]).toMatchObject({
                text: 'Новая задача',
                completed: false
            });
        });

        test('toggleTodo switches completion status', () => {
            const stateAfterToggle = todosReducer(mockInitialState, toggleTodo('1'));
            expect(stateAfterToggle.items[0].completed).toBe(true);

            const stateAfterSecondToggle = todosReducer(stateAfterToggle, toggleTodo('1'));
            expect(stateAfterSecondToggle.items[0].completed).toBe(false);
        });

        test('deleteTodo removes todo by id', () => {
            const stateAfterDelete = todosReducer(mockInitialState, deleteTodo('1'));
            expect(stateAfterDelete.items).toHaveLength(2);
            expect(stateAfterDelete.items.some(t => t.id === '1')).toBe(false);
        });

        test('setFilter changes current filter', () => {
            const stateWithActiveFilter = todosReducer(mockInitialState, setFilter('active'));
            expect(stateWithActiveFilter.filter).toBe('active');

            const stateWithCompletedFilter = todosReducer(stateWithActiveFilter, setFilter('completed'));
            expect(stateWithCompletedFilter.filter).toBe('completed');
        });

        test('clearCompleted removes all completed todos', () => {
            const stateAfterClear = todosReducer(mockInitialState, clearCompleted());
            expect(stateAfterClear.items).toHaveLength(2);
            expect(stateAfterClear.items.every(t => !t.completed)).toBe(true);
        });
    });

    describe('selectors', () => {
        const mockState = {
            todos: {
                items: [
                    { id: '1', text: 'Тестовое задание', completed: false },
                    { id: '2', text: 'Прекрасный код', completed: true }
                ],
                filter: 'all' as const,
                _persist: {
                    version: 1,
                    rehydrated: true
                }
            }
        };

        test('selectTodos returns all todos', () => {
            const result = selectTodos(mockState);
            expect(result).toEqual(mockInitialState.items);
        });

        test('selectFilter returns current filter', () => {
            const result = selectFilter(mockState);
            expect(result).toBe('all');
        });

        test('selectFilteredTodos filters correctly', () => {
            // All filter
            let result = selectFilteredTodos(mockState);
            expect(result).toHaveLength(3);

            // Active filter
            const activeState = { ...mockState, todos: { ...mockState.todos, filter: 'active' as const } };
            result = selectFilteredTodos(activeState);
            expect(result).toHaveLength(2);

            // Completed filter
            const completedState = { ...mockState, todos: { ...mockState.todos, filter: 'completed' as const } };
            result = selectFilteredTodos(completedState);
            expect(result).toHaveLength(1);
        });

        test('selectItemsLeft counts uncompleted todos', () => {
            const result = selectItemsLeft(mockState);
            expect(result).toBe(2);
        });
    });

    describe('edge cases', () => {
        test('toggleTodo with invalid id does nothing', () => {
            const state = todosReducer(mockInitialState, toggleTodo('invalid-id'));
            expect(state).toEqual(mockInitialState);
        });

        test('deleteTodo with invalid id does nothing', () => {
            const state = todosReducer(mockInitialState, deleteTodo('invalid-id'));
            expect(state).toEqual(mockInitialState);
        });

        test('clearCompleted when no completed todos', () => {
            const stateWithoutCompleted = {
                ...mockInitialState,
                items: mockInitialState.items.filter(t => !t.completed)
            };
            const state = todosReducer(stateWithoutCompleted, clearCompleted());
            expect(state.items).toHaveLength(2);
        });
    });
});