import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./Admin.css";
import S3Header from "../../../components/s3-header/S3Header";
import "antd/dist/antd.css";
import { Layout } from "antd";
import S3Sidebar from "../../../components/s3-sidebar/S3Sidebar";
import S3Table from "../../../components/s3-table/S3Table";
import { initUserData } from "../../../store/actions";

import { Route } from "react-router-dom";
// import { users } from "./users";

const { Content, Footer } = Layout;

const keys = ["username", "email", "avatar", "action"];

const Admin = ({ avatar, username, userId, users, onInitTableUser }) => {
  useEffect(() => {
    onInitTableUser();
    // message.success("Welcome to S3Corp!");
  }, [onInitTableUser]);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <S3Sidebar></S3Sidebar>
      <Layout className="site-layout">
        <S3Header avatar={avatar} username={username}></S3Header>
        <Content style={{ margin: "0 16px" }}>
          <Route path="/">
            <S3Table
              title="Users Manager"
              userId={userId}
              data={users}
              keys={keys}
            ></S3Table>
          </Route>
          {/* <Route path="/admin/profile-panel">profile panel</Route> */}
        </Content>
        <Footer style={{ textAlign: "center" }}> Nguyễn Hữu Trường</Footer>
      </Layout>
    </Layout>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    avatar: state.auth.avatar,
    username: state.auth.username,
    userId: state.auth.userId,
    users: state.user.users,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInitTableUser: () => {
      dispatch(initUserData());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
