import React from "react";
import "./S3Header.css";

import "antd/dist/antd.css";
import { Layout, Space, Avatar } from "antd";
import LogoutBtn from "../logout-btn/LogoutBtn";

const { Header } = Layout;

const S3Header = ({ username, avatar }) => {
  return (
    <Header className="layout-align">
      <Space align="baseline">
        <Avatar src={avatar} />
        <p style={{ color: "white" }}>{username}</p>
        <LogoutBtn></LogoutBtn>
      </Space>
    </Header>
  );
};

export default S3Header;
