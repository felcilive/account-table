import {Table, Typography} from 'antd';

export const TotalCount = ({total}) => (
    <Table.Summary.Row>
        <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
        <Table.Summary.Cell index={1} />
        <Table.Summary.Cell index={2} />
        <Table.Summary.Cell index={3} />
        <Table.Summary.Cell index={4} align='end'>
            <Typography.Text>{total}</Typography.Text>
        </Table.Summary.Cell>
    </Table.Summary.Row>
);
