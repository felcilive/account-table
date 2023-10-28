import {Form, Input, DatePicker, InputNumber, Select} from 'antd';

export const EditableCell = ({
    editing,
    dataIndex,
    record,
    children,
    ...restProps
}) => {
    let inputNode = <Input />;

    if (dataIndex === 'date') {
        inputNode = <DatePicker format="DD/MM/YYYY" />;
    } else if (dataIndex === 'amount') {
        inputNode = <InputNumber min={0} addonAfter='$' />;
    } else if (dataIndex === 'type') {
        inputNode = (
            <Select>
                <Select.Option value='income'>income</Select.Option>
                <Select.Option value='expense'>expense</Select.Option>
            </Select>
        );
    }

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex}>
                    {inputNode}
                </Form.Item>
            ) : children}
        </td>
    );
};