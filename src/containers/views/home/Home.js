import React, { useState } from "react";
import { Layout, Menu, Avatar } from "antd";
import "./Home.css";
import "antd/dist/antd.css";

import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
// import { SearchOutlined, LogoutOutlined } from "@ant-design/icons";

import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import S3Header from "../../../components/s3-header/S3Header";

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      //   ...this.getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      //   ...this.getColumnSearchProps("age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      //   ...this.getColumnSearchProps("address"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      //   ...this.getColumnSearchProps("address"),
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<UserOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="2" icon={<AntDesignOutlined />}>
            Users
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <S3Header
          avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/200px-Cristiano_Ronaldo_2018.jpg"
          username="Nguyễn Văn Rô"
        ></S3Header>
        <Content style={{ margin: "0 16px" }}>
          <Table columns={columns} dataSource={data} />;
        </Content>
        <Footer style={{ textAlign: "center" }}> Nguyễn Hữu Trường</Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
