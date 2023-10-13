"use client";

import React, { useEffect, useState, useRef } from "react";
import { ISchoolPaging } from "../type/schoolPaging";
import { ISchool } from "../type/school";
import { Space, Spin, Table, TablePaginationConfig } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { TableParams, formatDate } from "../type/common";
import { ColumnsType } from "antd/es/table";

interface IProps {
  ipaging: ISchoolPaging;
  entities: number;
}

const ListSchool: React.FC<IProps> = (props) => {
  const { ipaging } = props;
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      disabled: true,
    },
  });
  const [entities, setEntities] = useState([] as ISchool[]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setEntities(ipaging.schools ?? []);
      setLoading(false);
    }, 1000);
  };

  const isBottom = (obj: any) => {
    const element = obj.target;
    return (
      element.offsetHeight + element.scrollTop >= element.scrollHeight - 20
    );
  };

  const handleScroll = (e: any) => {
    if (isBottom(e)) {
      handleLoadMore();
      const elementHandleScroll =
        document.getElementsByClassName("ant-table-body")[0];
      elementHandleScroll.removeEventListener("scroll", handleScroll);
    }
  };

  useEffect(() => {
    const newEntities = ipaging.schools?.slice(0, 5) ?? [];
    setEntities(newEntities);

    const elementHandleScroll =
      document.getElementsByClassName("ant-table-body")[0];
    elementHandleScroll.addEventListener("scroll", handleScroll);

    return () => {
      if (elementHandleScroll) {
        elementHandleScroll.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });
  };

  const columns: ColumnsType<ISchool> = [
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
      className: "text-center",
      render: (_: any, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "text-center",
    },
    {
      title: "Establish Date",
      dataIndex: "date",
      key: "date",
      className: "text-center",
      render: (_: any, record: ISchool) => (
        <Space size="middle">
          {formatDate(record?.establishDate ?? new Date())}
        </Space>
      ),
    },
    {
      title: "Delete",
      dataIndex: "isDelete",
      key: "isDelete",
      className: "text-center",
      render: (_: any, record: ISchool) => (
        <Space size="middle">{record.isDelete && <CheckOutlined />}</Space>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      className: "text-center",
      render: (_: any, record: ISchool) => (
        <Space size="middle">
          {formatDate(record?.createdDate ?? new Date())}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <br />
      <br />
      <Table
        ref={containerRef}
        dataSource={entities}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        rowKey="id"
        columns={columns}
        scroll={{ x: 50, y: 50, scrollToFirstRowOnChange: true }}
        loading={loading}
      ></Table>
    </div>
  );
};

export default ListSchool;
