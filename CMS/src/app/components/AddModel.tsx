"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Add, urlGetAll } from "../../../api";
import { mutate } from "swr";
import { ISchool } from "../type/school";
import { Button, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";

const dateFormat = "YYYY/MM/DD";

const initValue: ISchool = {
  isDelete: false,
  name: "",
};

type FieldType = {
  name?: string;
};

function ModalAdd() {
  const [show, setShow] = useState(false);
  const [school, setSchool] = useState<ISchool>({
    ...initValue,
  });
  const [dateCreate, setDate] = useState("");
  const [form] = Form.useForm();

  const handleClose = () => {
    setShow(false);
    mutate(urlGetAll);
    setSchool({
      ...initValue,
    });
    setDate("");
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (
        values["errorFields"] &&
        (values["errorFields"] as Array<any>).length > 0
      ) {
        return;
      } else {
        const name = school?.name;
        const isDelete = school?.isDelete;
        const establishDate = school?.establishDate;

        const rs = await Add({ name, isDelete, establishDate });

        if (rs && rs == 200) {
          form.resetFields();
          toast.success("Add school success");
          handleClose();
        } else {
          toast.error("Add error");
        }
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  type FieldType = {
    name?: string;
  };

  return (
    <div>
      <Button
        onClick={() => {
          setShow(true);
        }}
        type="primary"
      >
        Add
      </Button>

      <Modal
        title="Add New School"
        open={show}
        onOk={handleSubmit}
        onCancel={() => handleClose()}
        footer={[
          <Button key="back" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Save
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input your name school!" },
            ]}
          >
            <Input
              name="name"
              maxLength={250}
              value={school?.name}
              onChange={(e) => setSchool({ ...school, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Date Establish">
            <DatePicker
              value={dateCreate.length > 0 ? dayjs(dateCreate, dateFormat) : dayjs(undefined, dateFormat)}
              onChange={(e, datestring) => {
                setDate(datestring);
                setSchool({
                  ...school,
                  establishDate: new Date(datestring),
                });
              }}
              />
          </Form.Item>
          <Form.Item label="Checkbox" valuePropName="checked">
            <Checkbox
              checked={school?.isDelete ?? false}
              onChange={(e) =>
                setSchool({ ...school, isDelete: e.target.checked })
              }
            >
              Checkbox
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalAdd;
