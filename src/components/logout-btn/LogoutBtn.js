import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../store/actions/index";

const LogoutBtn = ({ onLogout }) => {
  let logoutRedirect = null;

  const handleRedirect = () => {
    onLogout();
    logoutRedirect = <Redirect to="/logout" />;
  };

  if (logoutRedirect === null) {
    logoutRedirect = (
      <Button type="primary" danger onClick={() => handleRedirect()}>
        <LogoutOutlined />
      </Button>
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
