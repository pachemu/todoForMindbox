import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button, Space, Typography } from 'antd';
import { clearCompleted, selectFilter, selectItemsLeft, setFilter } from "../../app/store/slices/todosSlice";
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography;
const Footer = () => {
    const dispatch = useDispatch();
    const itemsLeft = useSelector(selectItemsLeft);
    const currentFilter = useSelector(selectFilter);
    return (_jsxs(Space, { style: { marginTop: 24, justifyContent: 'space-between', width: '100%' }, children: [_jsxs(Text, { children: [itemsLeft, " items left"] }), _jsx(Button.Group, { children: ['all', 'active', 'completed'].map((filter) => (_jsx(Button, { type: currentFilter === filter ? 'primary' : 'default', onClick: () => dispatch(setFilter(filter)), children: filter.charAt(0).toUpperCase() + filter.slice(1) }, filter))) }), _jsx(Button, { type: "text", onClick: () => dispatch(clearCompleted()), children: "Clear completed" })] }));
};
export default Footer;
