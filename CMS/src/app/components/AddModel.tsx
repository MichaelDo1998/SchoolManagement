"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Add } from "../../../api";
import { Button, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { FieldType, dateFormat } from "../type/common";

function ModalAdd() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    setShow(false);
    router.refresh();
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
        const name = form.getFieldValue("name");
        const isDelete = form.getFieldValue("isDelete");
        const establishDate = form.getFieldValue("establishDate");

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
            <Input maxLength={250} />
          </Form.Item>
          <Form.Item label="Date Establish" name="establishDate">
            <DatePicker format={dateFormat} />
          </Form.Item>
          <Form.Item label="Delete" valuePropName="checked" name="isDelete">
            <Checkbox />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalAdd;
