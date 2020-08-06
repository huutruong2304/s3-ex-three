import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";

const LogoutBtn = ({ onLogout }) => {
  let logoutRedirect = null;

  const handleRedirect = () => {
    onLogout();
    logoutRedirect = <Redirect to="/logout" />;
  };
  const confirmLogout = () => {
    handleRedirect();
  };

  if (logoutRedirect === null) {
    logoutRedirect = (
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

  return logoutRedirect;
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogout: () => {
      dispatch(actions.authLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(LogoutBtn);
