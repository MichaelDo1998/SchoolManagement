"use client";

import React, { useEffect, useState } from "react";
import { ISchoolPaging } from "../type/schoolPaging";
import ModalAdd from "./AddModel";
import { Delete } from "../../../api";
import { toast } from "react-toastify";
import ModalUpdate from "./UpdateModel";
import { ISchool } from "../type/school";
import {
  Button,
  Checkbox,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  TablePaginationConfig,
} from "antd";
import { CheckOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { TableParams, formatDate, initValue, options } from "../type/common";
import { ColumnsType } from "antd/es/table";
import { CheckboxValueType } from "antd/es/checkbox/Group";

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
  const [defaultChecked, setDefaultChecked] = useState(
    [] as CheckboxValueType[]
  );

  useEffect(() => {
    setDefaultChecked(
      localStorage.getItem("lstColumnChecked")?.split(",") ||
        ([] as CheckboxValueType[])
    );
  }, []);

  const router = useRouter();
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

  const onChangeCheckList = (checkedValues: CheckboxValueType[]) => {
    setDefaultChecked(checkedValues);
    localStorage.setItem("lstColumnChecked", checkedValues.toString());
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
      title: "Action",
      key: "action",
      className: "text-center",
      render: (_: any, record: ISchool) => (
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
      ),
    },
  ];

  const columnTable = columns.filter((x) =>
    defaultChecked.some((e) => e == x.key)
  );

  return (
    <div>
      <Row>
        <ModalAdd />

        <Col span={12} className="text-end">
          <Popconfirm
            title="Select column"
            showCancel={false}
            okText="Close"
            description={() => {
              return (
                <div>
                  {" "}
                  <Checkbox.Group
                    options={options}
                    defaultValue={defaultChecked}
                    onChange={onChangeCheckList}
                  />
                </div>
              );
            }}
            icon={<UnorderedListOutlined />}
          >
            <Button type="default">Filter</Button>
          </Popconfirm>
        </Col>
      </Row>
      <br />

      <Table
        dataSource={ipaging.schools}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        rowKey="id"
        columns={columnTable}
      ></Table>

      <ModalUpdate
        show={showUpdate}
        setShow={setShowUpdate}
        school={school ?? {}}
      />
    </div>
  );
};

export default TableSchool;
