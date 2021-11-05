import React, { useState } from 'react';
import { Table, Form } from 'antd'

const TableList = props => {

    const isEditing = (record) => record.key === editingKey;
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    return (
        <div>
            <h1>{props.titleTable} </h1>
            <Form form={form} component={false}>
                <Table
                    columns={props.columns}
                    dataSource={props.dataSource}
                    bordered
                    pagination
                />
            </Form>
        </div>
    )
}

export default TableList