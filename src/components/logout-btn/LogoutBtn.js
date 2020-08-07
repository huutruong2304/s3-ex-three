import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";

const LogoutBtn = ({ onLogout }) => {
  let logout = null;

  const handleRedirect = () => {
    onLogout();
    logout = <Redirect to="/logout"></Redirect>;
  };
  const confirmLogout = () => {
    handleRedirect();
  };

  if (logout === null) {
    logout = (
      <Popconfirm
        placement="bottomRight"
        title="Are you sure log out?"
        onConfirm={() => confirmLogout()}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" danger>
          <LogoutOutlined />
        </Button>
      </Popconfirm>
    );
  }

  return logout;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogout: () => {
      dispatch(actions.authLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(LogoutBtn);
