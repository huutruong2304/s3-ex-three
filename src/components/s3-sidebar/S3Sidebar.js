import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const S3Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/">Users</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<AntDesignOutlined />}>
          <Link to="/"> Persional Profile</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.auth.username,
    avatar: state.auth.avatar,
  };
};

export default connect(mapStateToProps)(S3Sidebar);
