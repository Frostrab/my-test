import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TableList from './components/TableList'
import React, { useEffect, useState } from 'react';
import { Button, Layout, Breadcrumb, Row, Col, Input } from 'antd'
function App() {
  const { Header, Content, Footer } = Layout
  const [dataSource, setDataSource] = useState([])
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
      render: (text, record) => [<Button>Edit</Button>, <Button>Delete</Button>]

    }
  ])


  useEffect(async () => {
    await getData()
  }, []
  )

  const getData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    try {
      await setDataSource(response.data)
      console.log('Repos', response)
    } catch (e) {
      console.log("error", e)
    }
  }
  const handleAdd = async () => {
    console.log(dataSource)
    
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
            />
            <Row>
              <Col span={4}> Input </Col>
              <Col span={4}><Input placeholder="input Name" /> </Col>
              <Col span={4}><Input placeholder="input User" /> </Col>
              <Col span={4}><Input placeholder="input Email" /> </Col>
              <Col span={4}><Button type="primary" onClick={handleAdd}>Add</Button> </Col>

            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </div >
  );
}

export default App;
