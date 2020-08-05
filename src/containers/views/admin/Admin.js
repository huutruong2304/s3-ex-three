import React from "react";
import "./Admin.css";

import S3Header from "../../../components/s3-header/S3Header";

import "antd/dist/antd.css";
import { Layout } from "antd";
import S3Sidebar from "../../../components/s3-sidebar/S3Sidebar";

import { Switch, Route } from "react-router-dom";

const { Content, Footer } = Layout;

const Admin = ({ avatar, username }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <S3Sidebar></S3Sidebar>
      <Layout className="site-layout">
        <S3Header avatar={avatar} username={username}></S3Header>
        <Content style={{ margin: "0 16px" }}>
          <Switch>
            <Route path="/user-panel">user panel</Route>
            <Route path="/profile-panel">profile panel</Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}> Nguyễn Hữu Trường</Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
