import React, {useState} from 'react';
import { Table, } from 'antd'

const TableList = props => {
    return(
        <Table 
        columns={props.columns}
        dataSource={props.dataSource}
        bordered
        />
    )
}

export default TableList