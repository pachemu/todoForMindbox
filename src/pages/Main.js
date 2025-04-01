import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button, Checkbox, Input, List, Space, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const { Text } = Typography;
const Main = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Тестовое задание', completed: false },
        { id: 2, text: 'Прекрасный код', completed: true },
        { id: 3, text: 'Покрытие тестами', completed: false },
    ]);
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState('all');
    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos([...todos, {
                    id: Date.now(),
                    text: newTodo,
                    completed: false
                }]);
            setNewTodo('');
        }
    };
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active')
            return !todo.completed;
        if (filter === 'completed')
            return todo.completed;
        return true;
    });
    const itemsLeft = todos.filter(todo => !todo.completed).length;
    return (_jsxs("div", { style: { maxWidth: 500, margin: '0 auto', padding: 24 }, children: [_jsx(Input, { placeholder: "What needs to be done?", value: newTodo, onChange: (e) => setNewTodo(e.target.value), onPressEnter: addTodo, style: { marginBottom: 24 } }), _jsx(List, { bordered: true, dataSource: filteredTodos, renderItem: todo => (_jsx(List.Item, { actions: [
                        _jsx(Button, { type: "text", icon: _jsx(CloseOutlined, {}), onClick: () => deleteTodo(todo.id) })
                    ], children: _jsx(Checkbox, { checked: todo.completed, onChange: () => toggleTodo(todo.id), children: _jsx(Text, { delete: todo.completed, children: todo.text }) }) })) }), _jsxs(Space, { style: { marginTop: 24, justifyContent: 'space-between', width: '100%' }, children: [_jsxs(Text, { children: [itemsLeft, " items left"] }), _jsxs(Button.Group, { children: [_jsx(Button, { type: filter === 'all' ? 'primary' : 'default', onClick: () => setFilter('all'), children: "All" }), _jsx(Button, { type: filter === 'active' ? 'primary' : 'default', onClick: () => setFilter('active'), children: "Active" }), _jsx(Button, { type: filter === 'completed' ? 'primary' : 'default', onClick: () => setFilter('completed'), children: "Completed" })] }), _jsx(Button, { type: "text", onClick: () => setTodos(todos.filter(todo => !todo.completed)), children: "Clear completed" })] })] }));
};
export default Main;
