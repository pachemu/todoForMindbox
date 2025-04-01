import { memo } from 'react';
import { Checkbox, List, Button, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {deleteTodo, toggleTodo} from "../../app/store/slices/todosSlice";

const { Text } = Typography;

interface TodoItemProps {
    id: string;
    text: string;
    completed: boolean;
}

const TodoItem = memo(({ id, text, completed }: TodoItemProps) => {
    const dispatch = useDispatch();
    console.log('Rendering TodoItem:', id); // Для отладки

    return (
        <List.Item
            actions={[
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => dispatch(deleteTodo(id))}
                />,
            ]}
        >
            <Checkbox
                checked={completed}
                onChange={() => dispatch(toggleTodo(id))}
            >
                <Text delete={completed}>{text}</Text>
            </Checkbox>
        </List.Item>
    );
});

export default TodoItem;