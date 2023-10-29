import React, {useEffect, useState} from 'react';
import {Form, Button, Table} from 'antd';
import {EditableCell} from './components/Table/EditableCell';
import {TotalCount} from './components/Table/TotalCount';
import {DefaultActions} from './components/Table/DefaultActions';
import {DropdownActions} from './components/Table/DropdownActions';
import {getFromLocaleStorage, setToLocaleStorage, replaceDate} from './helpers/locale-storage';
import {getFormattedDate, sortDate} from './helpers/date';

const components = {
    body: {
        cell: EditableCell,
    },
};

const App = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const checkIsEditing = (record) => record.key === editingKey;

    useEffect(() => {
        setData(getFromLocaleStorage('data', replaceDate) || []);
    }, [])

    const handleEdit = (record) => {
        form.setFieldsValue(record);
        setEditingKey(record.key);
    };

    const handleDelete = (key) => {
        const updatedData = data.filter((item) => item.key !== key);

        setData(updatedData);
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            editable: true,
            width: '15%',
            render: (_, {date}) => getFormattedDate(date),
            sorter: {
                compare: sortDate,
            },
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            editable: true,
            width: '20%',
            render: (_, {amount}) => `${amount}$`,
            sorter: {
                compare: (a, b) => a.amount - b.amount,
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            editable: true,
            width: '20%',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            editable: true,
            width: '25%',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            align: 'end',
            render: (_, record) => {
                const isEditing = checkIsEditing(record);

                const onEdit = () => handleEdit(record);
                const onDelete = () => handleDelete(record.key);

                return isEditing
                    ? <DefaultActions onDelete={onDelete} />
                    : <DropdownActions onEdit={onEdit} onDelete={onDelete} />
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
                isEditing: checkIsEditing(record),
            }),
        };
    });

    const onClick = () => {
        const key = new Date().valueOf();

        form.resetFields();
        setData((prevData) => [...prevData, {key}]);
        setEditingKey(key);
    }

    const onFinish = (values) => {
        const {type, amount = 0} = values;
        const updatedData = data.map((elem) => {
            if (checkIsEditing(elem)) {
                return {
                    ...values,
                    amount: type === 'expense' ? amount * (-1) : amount,
                    key: editingKey
                }
            }

            return elem;
        })

        setToLocaleStorage('data', updatedData);
        setData(updatedData);
        setEditingKey('');
    }

    return (
        <div style={{margin: '16px'}}>
            <Button style={{marginBottom: '16px'}} onClick={onClick}>
                Add new
            </Button>
            <Form form={form} onFinish={onFinish}>
                <Table
                    components={components}
                    summary={(pageData) => {
                        const total = pageData.reduce((sum, {amount}) => (
                            sum += amount
                        ), 0);

                        return <TotalCount total={total || 0} />
                    }}
                    dataSource={data}
                    columns={mergedColumns}
                    pagination={false}

                />
            </Form>
        </div>
    );
};

export default App;
