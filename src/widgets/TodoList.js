import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Button, Checkbox, Input, List } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, selectFilteredTodos, toggleTodo } from "../app/store/slices/todosSlice";
const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector(selectFilteredTodos);
    const [newTodo, setNewTodo] = useState('');
    const handleAddTodo = () => {
        if (newTodo.trim()) {
            dispatch(addTodo(newTodo));
            setNewTodo('');
        }
    };
    return (_jsxs("div", { style: { maxWidth: 500, margin: '0 auto', padding: 24 }, children: [_jsx(Input, { placeholder: "What needs to be done?", value: newTodo, onChange: (e) => setNewTodo(e.target.value), onPressEnter: handleAddTodo, style: { marginBottom: 24 } }), _jsx(List, { bordered: true, dataSource: todos, renderItem: (todo) => (_jsx(List.Item, { actions: [
                        _jsx(Button, { type: "text", icon: _jsx(CloseOutlined, {}), onClick: () => dispatch(deleteTodo(todo.id)) })
                    ], children: _jsx(Checkbox, { checked: todo.completed, onChange: () => dispatch(toggleTodo(todo.id)), children: _jsx("span", { style: {
                                marginLeft: 8,
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                opacity: todo.completed ? 0.6 : 1,
                                transition: 'all 0.3s'
                            }, children: todo.text }) }) }, todo.id)) })] }));
};
export default React.memo(TodoList);
