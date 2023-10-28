import React, {useEffect, useState} from 'react';
import {Form, Button, Table, Typography} from 'antd';
import {EditableCell} from './EditableCell';
import {Actions} from './Actions'

const getFormattedDate = (date) => {
    return new Intl.DateTimeFormat('en-GB').format(date)
}

const App = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'), (key, value) => {
            if (key === 'date') {
                return new Date(value);
            }

            return value
        })

        setData(data || []);
    }, [])

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const handleDelete = (record) => {
        const newData = data.filter((item) => item.key !== record.key);

        setData(newData);
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            editable: true,
            render: (_, record) => getFormattedDate(record.date),
            sorter: {
                compare: (a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);

                    if (dateA < dateB) {
                        return -1;
                    }

                    if (dateA > dateB) {
                        return 1;
                    }

                    return 0
                },
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            editable: true,
            render: (_, record) => `${record.amount}$`,
            sorter: {
                compare: (a, b) => a.amount - b.amount,
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            editable: true,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            editable: true,
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => {
                const isEdited = isEditing(record);

                const onEdit = () => edit(record)
                const onDelete = () => handleDelete(record)


                return (
                    <Actions
                        isEditing={isEdited}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                editing: isEditing(record),
            }),
        };
    });

    const onClick = () => {
        form.resetFields();
        const key = new Date().valueOf();

        setData((table) => [...table, {
            key,
        }]);
        setEditingKey(key);
    }

    const onFinish = (values) => {
        const {type, amount = 0} = values;
        const updatedDataSource = data.map((elem) => {
            if (isEditing(elem)) {
                return {
                    ...values,
                    amount: type === 'expense' ? amount * (-1) : amount,
                    key: editingKey
                }
            }

            return elem;
        })

        localStorage.setItem('data', JSON.stringify(updatedDataSource));

        setData(updatedDataSource);
        cancel();
    }

    return (
        <div>
            <Button onClick={onClick}>Add new</Button>
            <Form form={form} onFinish={onFinish}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    summary={(pageData) => {
                        const total = pageData.reduce((sum, {amount}) => (
                            sum += amount
                        ), 0) || 0;

                        return (
                            <Table.Summary.Row>
                                <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                                <Table.Summary.Cell index={1} />
                                <Table.Summary.Cell index={2} />
                                <Table.Summary.Cell index={3} />
                                <Table.Summary.Cell index={4}>
                                    <Typography.Text>{total}</Typography.Text>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        );
                    }}
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
        </div>

    );
};
export default App;
