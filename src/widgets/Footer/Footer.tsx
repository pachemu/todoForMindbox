import { Button, Space, Typography } from 'antd';
import {clearCompleted, selectFilter, selectItemsLeft, setFilter} from "../../app/store/slices/todosSlice";
import {useDispatch, useSelector} from "react-redux";

const { Text } = Typography;
type FilterType = 'all' | 'active' | 'completed';

const Footer = () => {
    const dispatch = useDispatch();
    const itemsLeft = useSelector(selectItemsLeft);
    const currentFilter = useSelector(selectFilter);

    return (
        <Space style={{ marginTop: 24, justifyContent: 'space-between', width: '100%' }}>
            <Text>{itemsLeft} items left</Text>

            <Button.Group>
                {['all', 'active', 'completed'].map((filter) => (
                    <Button
                        key={filter}
                        type={currentFilter === filter ? 'primary' : 'default'}
                        onClick={() => dispatch(setFilter(filter as FilterType))}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Button>
                ))}
            </Button.Group>

            <Button type="text" onClick={() => dispatch(clearCompleted())}>
                Clear completed
            </Button>
        </Space>
    );
};

export default Footer;