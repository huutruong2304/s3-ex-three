import React from "react";
import "./S3Header.css";

import "antd/dist/antd.css";
import { Layout, Space, Button, Avatar } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const S3Header = ({ username, avatar }) => {
  return (
    <Header className="layout-align">
      <Space align="baseline">
        <Avatar src={avatar} />
        <p style={{ color: "white" }}>{username}</p>
        <Button type="primary" danger>
          <LogoutOutlined />
        </Button>
      </Space>
    </Header>
  );
};

export default S3Header;
