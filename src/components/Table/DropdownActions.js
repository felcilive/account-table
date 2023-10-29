import {Button, Dropdown} from 'antd';
import {MoreOutlined} from '@ant-design/icons';

export const DropdownActions = ({onEdit, onDelete}) => {
    const items = [
        {
            key: '0',
            label: (
                <Button type='link' onClick={onEdit}>
                    Edit
                </Button>
            ),
        },
        {
            key: '1',
            label: (
                <Button type='link' onClick={onDelete}>
                    Delete
                </Button>
            ),
        },
    ]

    return (
        <Dropdown menu={{items}}>
            <MoreOutlined />
        </Dropdown>
    )
}
