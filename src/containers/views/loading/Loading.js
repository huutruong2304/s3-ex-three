import React from "react";
import "antd/dist/antd.css";
import { Spin } from "antd";
import "./Loading.css";

import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
  const antIcon = (
    <LoadingOutlined
      style={{ color: "white", fontSize: "10vh" }}
    ></LoadingOutlined>
  );
  return (
    <div className="Wrapper-green-background">
      <Spin indicator={antIcon} />
    </div>
  );
};

export default Loading;
