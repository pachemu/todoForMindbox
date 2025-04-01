import React, { useState } from 'react';
import { Button, Checkbox, Input, List } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {addTodo, deleteTodo, selectFilteredTodos, toggleTodo} from "../app/store/slices/todosSlice";

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

    return (
        <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
            <Input
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onPressEnter={handleAddTodo}
                style={{ marginBottom: 24 }}
            />

            <List
                bordered
                dataSource={todos}
                renderItem={(todo) => (
                    <List.Item
                        key={todo.id}
                        actions={[
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => dispatch(deleteTodo(todo.id))}
                            />
                        ]}
                    >
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => dispatch(toggleTodo(todo.id))}
                        >
                            <span
                                style={{
                                    marginLeft: 8,
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    opacity: todo.completed ? 0.6 : 1,
                                    transition: 'all 0.3s'
                                }}
                            >
                                {todo.text}
                            </span>
                        </Checkbox>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default React.memo(TodoList);