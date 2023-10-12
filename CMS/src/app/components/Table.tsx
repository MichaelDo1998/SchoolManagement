"use client";

import React, { useEffect, useState } from "react";
import { ISchoolPaging } from "../type/schoolPaging";
import ModalAdd from "./AddModel";
import { Delete } from "../../../api";
import { toast } from "react-toastify";
import ModalUpdate from "./UpdateModel";
import { ISchool } from "../type/school";
import { Button, Space, Table, TablePaginationConfig } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { TableParams, formatDate, initValue } from "../type/common";
import Column from "antd/es/table/Column";

interface IProps {
  ipaging: ISchoolPaging;
  pageSize: string;
  current?: number;
}

const TableSchool: React.FC<IProps> = (props) => {
  const { ipaging, pageSize, current } = props;
  const [showUpdate, setShowUpdate] = useState(false);
  const [school, setSchool] = useState<ISchool>({
    ...initValue,
  });

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: current ?? 1,
      pageSize: pageSize != "NaN" ? parseInt(pageSize ?? "5") : 5,
      pageSizeOptions: [5, 10, 15],
      defaultPageSize: 5,
      showSizeChanger: true,
      showTitle: false,
    },
  });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });

    if (tableParams?.pagination?.pageSize && pageSize != "NaN")
      router.replace(`?pageSize=${tableParams.pagination?.pageSize}`);
  };

  const router = useRouter();

  const DeleteSchool = async (id?: number, name?: string) => {
    if (confirm(`Do you want delete ${name}`)) {
      if (id) {
        var rs = await Delete(id);
        if (rs && rs == 200) {
          toast.success("Delete  school success");
          router.refresh();
        } else {
          toast.error("Delete error");
        }
      }
    }
  };

  return (
    <div>
      <ModalAdd />
      <br />
      <br />

      <Table
        dataSource={ipaging.schools}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        rowKey="id"

      >
        <Column
          key="abc"
          title="Order"
          dataIndex="key"
          className="text-center"
          render={(_: any, record: ISchool, index) => index + 1}
        />
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Establish Date"
          dataIndex="establishDate"
          key="establishDate"
          className="text-center"
          render={(_: any, record: ISchool) => (
            <Space size="middle">
              {formatDate(record?.establishDate ?? new Date())}
            </Space>
          )}
        />
        <Column
          title="Delete"
          dataIndex="isDelete"
          key="isDelete"
          className="text-center"
          render={(_: any, record: ISchool) => (
            <Space size="middle">{record.isDelete && <CheckOutlined />}</Space>
          )}
        />

        <Column
          title="Action"
          key="action"
          className="text-center"
          render={(_: any, record: ISchool) => (
            <Space size="middle">
              <Button
                type="dashed"
                onClick={() => {
                  setShowUpdate(true);
                  setSchool(record ?? {});
                }}
              >
                Edit
              </Button>
              <Button
                type="link"
                onClick={() => DeleteSchool(record.id, record.name)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>

      <ModalUpdate
        show={showUpdate}
        setShow={setShowUpdate}
        school={school ?? {}}
      />
    </div>
  );
};

export default TableSchool;
