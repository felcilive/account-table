import {Button} from 'antd';

export const DefaultActions = ({onDelete}) => {
    return (
        <>
            <Button type='link' htmlType='submit'>
                &#10003;
            </Button>
            <Button type='link' onClick={onDelete}>
                &#10007;
            </Button>
        </>
    )
}
