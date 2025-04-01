import {useState} from "react";
import {Button, Checkbox, Input, List, Space, Typography} from "antd";
import { CloseOutlined } from "@ant-design/icons";
const { Text } = Typography;

const Main = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Тестовое задание', completed: false },
        { id: 2, text: 'Прекрасный код', completed: true },
        { id: 3, text: 'Покрытие тестами', completed: false },
    ]);
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

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

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });
    const itemsLeft = todos.filter(todo => !todo.completed).length;

    return (
        <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
            <Input
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onPressEnter={addTodo}
                style={{ marginBottom: 24 }}
            />

            <List
                bordered
                dataSource={filteredTodos}
                renderItem={todo => (
                    <List.Item
                        actions={[
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => deleteTodo(todo.id)}
                            />
                        ]}
                    >
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        >
                            <Text delete={todo.completed}>{todo.text}</Text>
                        </Checkbox>
                    </List.Item>
                )}
            />

            <Space style={{ marginTop: 24, justifyContent: 'space-between', width: '100%' }}>
                <Text>{itemsLeft} items left</Text>

                <Button.Group>
                    <Button
                        type={filter === 'all' ? 'primary' : 'default'}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </Button>
                    <Button
                        type={filter === 'active' ? 'primary' : 'default'}
                        onClick={() => setFilter('active')}
                    >
                        Active
                    </Button>
                    <Button
                        type={filter === 'completed' ? 'primary' : 'default'}
                        onClick={() => setFilter('completed')}
                    >
                        Completed
                    </Button>
                </Button.Group>

                <Button
                    type="text"
                    onClick={() => setTodos(todos.filter(todo => !todo.completed))}
                >
                    Clear completed
                </Button>
            </Space>
        </div>
    );
};
export default Main