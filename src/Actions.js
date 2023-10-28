import {Button, Dropdown} from 'antd';
import {MoreOutlined} from '@ant-design/icons';

export const Actions = ({isEditing, onEdit, onDelete}) => {
    const items = [
        {
            key: '0',
            label: (
                <Button
                    type='link'
                    onClick={onEdit}
                >
                    Edit
                </Button>
            ),
        },
        {
            key: '1',
            label: (
                <Button
                    type='link'
                    onClick={onDelete}
                >
                    Delete
                </Button>
            ),
        },
    ]

    return isEditing ? (
        <>
            <Button
                type='link'
                htmlType='submit'
            >
                &#10003;
            </Button>
            <Button
                type='link'
                onClick={onDelete}
            >
                &#10007;
            </Button>
        </>
    ) : (
        <Dropdown menu={{items}}>
            <MoreOutlined />
        </Dropdown>
    )
}
