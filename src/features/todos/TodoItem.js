import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { Checkbox, List, Button, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../../app/store/slices/todosSlice";
const { Text } = Typography;
const TodoItem = memo(({ id, text, completed }) => {
    const dispatch = useDispatch();
    console.log('Rendering TodoItem:', id); // Для отладки
    return (_jsx(List.Item, { actions: [
            _jsx(Button, { type: "text", icon: _jsx(CloseOutlined, {}), onClick: () => dispatch(deleteTodo(id)) }),
        ], children: _jsx(Checkbox, { checked: completed, onChange: () => dispatch(toggleTodo(id)), children: _jsx(Text, { delete: completed, children: text }) }) }));
});
export default TodoItem;
