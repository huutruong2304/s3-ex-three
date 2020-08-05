import React from "react";
import { Space, Avatar } from "antd";
import "antd/dist/antd.css";

const S3ExpandCell = ({ username, email, avatar }) => {
  return (
    <Space>
      <Avatar shape="square" size={100} src={avatar}></Avatar>
      <div>
        <p>
          <strong>Username: </strong>
          {username}
        </p>
        <p>
          <strong>Email: </strong>
          {email}
        </p>
      </div>
    </Space>
  );
};

export default S3ExpandCell;
