import React, { useState } from "react";

import Form from "../form/Form";
import {
  Table,
  Space,
  Button,
  Typography,
  Input,
  Popconfirm,
  message,
  Modal,
} from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import S3ExpandCell from "./s3-expand-cell/S3ExpandCell";

import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { userCreate } from "../../store/actions/index";
import { removeUserById, userUpdate } from "../../store/actions/user";
const { Title } = Typography;

const keyRender = (key) => ({
  title: key,
  dataIndex: key,
  key: key,
});

const S3Table = ({
  title,
  userId,
  data = [],
  keys = [],
  addUser,
  removeUser,
  updateUser,
}) => {
  let searchInput = null;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [formAddStatus, setFormAddStatus] = useState(false);
  const [formUpdateStatus, setFormUpdateStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // filter setup
  const getColumnSeachProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // search by property in table column
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // rest popconfirm
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  // create new one
  const toggleAddForm = () => {
    setFormAddStatus(!formAddStatus);
  };

  const submitCreateUser = (formData) => {
    console.log(formData);
    toggleAddForm();
    addUser(formData.username, formData.email, formData.avatar);
    message.success("Created successully");
  };

  // updated one
  const toggleFormUpdate = () => {
    setFormUpdateStatus(!formUpdateStatus);
  };
  const handleFormUpdate = (user) => {
    setCurrentUser({ ...user });
    toggleFormUpdate();
  };

  const submitUpdateUser = (id, updatedUser) => {
    console.log(updatedUser);
    updateUser(
      data,
      id,
      updatedUser.username,
      updatedUser.email,
      updatedUser.avatar
    );
    toggleFormUpdate();
    message.success("Updated user ID: " + id + " successully");
  };

  // remove one
  const handleRemove = (data, id) => {
    console.log(dataSource);
    removeUser(data, id);
    message.success("Removed user ID: " + id + " successully");
  };

  // columns: attribute of table
  const columns = keys.map((key) => {
    if (key === "action") {
      return {
        ...keyRender(key),
        render: (text, record) => (
          <Space>
            <Button type="primary" onClick={() => handleFormUpdate(record)}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Are you sure delete this user?"
              onConfirm={() => handleRemove(data, record.id)}
              okText="Yes"
              cancelText="No"
              disabled={userId === record.id}
            >
              <Button type="primary" danger disabled={userId === record.id}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        ),
      };
    }
    if (key === "email") {
      return {
        ...keyRender(key),
        filters: [
          {
            text: "yahoo",
            value: "@yahoo",
          },
          {
            text: "gmail",
            value: "@gmail",
          },
        ],
        onFilter: (value, record) => record.email.indexOf(value) > 0,
      };
    }
    if (key === "username" || key === "name") {
      return {
        ...keyRender(key),
        sorter: (a, b) => a.username.localeCompare(b.username),
        ...getColumnSeachProps(key),
      };
    }
    if (key === "avatar") {
      return {
        ...keyRender(key),
        render: (text, record) => {
          return (
            <a href={record.avatar} target="_blank" rel="noopener noreferrer">
              {record.avatar.slice(0, 30) + "..."}
            </a>
          );
        },
      };
    }
    return {
      ...keyRender(key),
    };
  });

  // add key to dataSource
  let dataSource = data.map((val, index) => {
    return {
      key: index,
      ...val,
    };
  });

  return (
    <div>
      <Title level={2} style={{ textAlign: "center", margin: "10px 0" }}>
        {title}
      </Title>
      <Button
        type="primary"
        style={{ margin: "10px 0" }}
        onClick={() => toggleAddForm()}
      >
        Add user
      </Button>
      <Form
        visable={formAddStatus}
        getFormData={(formData) => submitCreateUser(formData)}
        size="full"
      ></Form>
      <Modal
        title={"Update user: " + currentUser.id}
        visible={formUpdateStatus}
        onCancel={() => toggleFormUpdate()}
        footer={null}
        bodyStyle={{ padding: 0 }}
      >
        <Form
          getFormData={(formData) => submitUpdateUser(currentUser.id, formData)}
          size="full"
          placeHolder={currentUser}
        ></Form>
      </Modal>
      <Table
        dataSource={dataSource}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <S3ExpandCell
              username={record.username}
              email={record.email}
              avatar={record.avatar}
            ></S3ExpandCell>
          ),
          //   rowExpandable: (record) => record.id !== userId,
        }}
      />
    </div>
  );
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     users: state.user.users,
//   };
// };
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // onInit: () => {
    //   dispatch(initUserData());
    // },
    addUser: (username, email, avatar) => {
      dispatch(userCreate(username, email, avatar));
    },
    removeUser: (users, id) => {
      dispatch(removeUserById(users, id));
    },
    updateUser: (users, id, username, email, avatar) => {
      dispatch(userUpdate(users, id, username, email, avatar));
    },
  };
};

export default connect(null, mapDispatchToProps)(S3Table);
