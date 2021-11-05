import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TableList from './components/TableList'
import CheckboxTest from './components/CheckboxTest'
import React, { useEffect, useState, useForm } from 'react';
import { Button, Layout, Breadcrumb, Row, Col, Input, Form, } from 'antd'
function App() {
  const { Header, Content, Footer } = Layout
  const isEditing = (record) => record.key === editingKey;
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([])
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [editingKey, setEditingKey] = useState('');
  const [titleTable, setTitleTable] = useState("Title Table");
  const [columns, setColumns] = useState([
    {
      title: 'Code',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    }, {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
      editable: true,
    }, {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    }, {
      title: 'Action',
      dataIndex: 'Action',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          [<Button type='dashed' style={{ marginLeft: '10px', marginRight: '10px' }}>Save</Button>, <Button type='danger' onClick={cancel}>Cancel</Button>]
        ) : ([<Button type='dashed' style={{ marginLeft: '10px', marginRight: '10px' }} disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Button>, <Button type='danger'>Delete</Button>]

        )
      }


    }
  ])

  useEffect(async () => {
    await getData()
  }, []
  )

  const edit = (record) => {
    console.log("eeeee")
    form.setFieldsValue({
      name: '',
      user: '',
      email: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {

    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        // setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        // setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts',
        {
          name: name,
          user: user,
          email: email,
        }, {
        headers: { 'Content-type': 'application/json; charset=UTF-8', }
      }
      )
      console.log('Repos',)
    } catch (e) {
      console.log("error", e)
    }
  }
  const handleClear = async () => {
    try {
      await axios.delete('https://jsonplaceholder.typicode.com/posts/1')
      console.log('deleted',)
    } catch (e) {
      console.log("error", e)
    }
  }
  const getData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    try {
      await setDataSource(response.data)
      console.log('Repos', response)
    } catch (e) {
      console.log("error", e)
    }
  }

  return (
    <div className="App">
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }} >
          <div className="logo" />
        </Header>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <TableList
              columns={columns}
              dataSource={dataSource}
              titleTable={titleTable}
              pagination={{
                onChange: cancel,
              }}
            />
            <Row>
              <Col span={4}> Input </Col>
              <Col span={4}><Input placeholder="input Name" value={name} onChange={e => setName(e.target.value)} /> </Col>
              <Col span={4}><Input placeholder="input User" value={user} onChange={e => setUser(e.target.value)} /> </Col>
              <Col span={4}><Input placeholder="input Email" value={email} onChange={e => setEmail(e.target.value)} /> </Col>
              <Col span={4}><Button type="primary" onClick={handleAdd}>Add</Button> <Button type="danger" onClick={handleClear}>Clear</Button> </Col>

            </Row>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </div >
  );
}

export default App;
