import React, { useState } from "react";

import { Table, Space, Button, Typography, Input } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import S3ExpandCell from "./s3-expand-cell/S3ExpandCell";

import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

const keyRender = (key) => ({
  title: key,
  dataIndex: key,
  key: key,
});

const S3Table = ({ title, userId, data = [], keys = [] }) => {
  let searchInput = null;
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = keys.map((key) => {
    if (key === "action") {
      return {
        ...keyRender(key),
        render: (text, record) => (
          <Space>
            <Button type="primary" onClick={() => handleEdit(record.username)}>
              <EditOutlined />
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleRemove(record.id)}
              disabled={userId === record.id}
            >
              <DeleteOutlined />
            </Button>
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
    return {
      ...keyRender(key),
    };
  });
  let dataSource = data.map((val, index) => {
    return {
      key: index,
      ...val,
    };
  });
  const handleEdit = (user) => {
    console.log(user);
  };

  const handleRemove = (id) => {
    console.log(dataSource);
  };

  return (
    <div>
      <Title level={2} style={{ textAlign: "center", margin: "10px 0" }}>
        {title}
      </Title>
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

export default S3Table;
