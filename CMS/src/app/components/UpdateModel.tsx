"use client";

import { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { Update, urlGetAll } from "../../../api";
import { mutate } from "swr";
import { ISchool } from "../type/school";
import { Button, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";

interface IProps {
  show: boolean;
  setShow: (value: boolean) => void;
  school: ISchool;
}

type FieldType = {
  name?: string;
};

const dateFormat = "YYYY/MM/DD";

const initValue: ISchool = {
  isDelete: false,
  name: "",
};

function ModalUpdate(props: IProps) {
  const { show, setShow, school } = props;
  const [schoolUpdate, setSchool] = useState<ISchool>({
    ...initValue,
  });
  const [dateCreate, setDate] = useState("");
  const [form] = Form.useForm();

  form.setFieldsValue({ ...schoolUpdate });

  useEffect(() => {
    if (school && school.id) {
      setSchool({ ...school });
      var dateT = new Date(school?.establishDate ?? "");
      if (school?.establishDate)
        setDate(
          `${dateT.getFullYear()}-${dateT.getMonth() + 1}-${dateT.getDate()}`
        );
    }
  }, [show]);

  const handleClose = () => {
    setShow(false);
    mutate(urlGetAll);
    setSchool({ ...initValue });
    setDate("");
    form.resetFields();
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
        if (!schoolUpdate?.name) {
          toast.error("Please fill name");
          return;
        }

        if (!schoolUpdate?.establishDate) {
          toast.error("Please fill establish Date");
          return;
        }

        const name = schoolUpdate?.name;
        const isDelete = schoolUpdate?.isDelete;
        const establishDate = schoolUpdate?.establishDate;
        const id = schoolUpdate?.id;

        const rs = await Update({ name, isDelete, establishDate, id });

        if (rs && rs == 200) {
          toast.success("Update school success");
          handleClose();
        } else {
          toast.error("Update error");
        }
      }
    } catch (error) {
      console.log("Failed:", error);
    }
  };

  return (
    <>
      <Modal
        title="Update New School"
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
              maxLength={250}
              value={form.getFieldValue("name") || ""}
              onChange={(e) =>
                setSchool({ ...schoolUpdate, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Date Establish">
            <DatePicker
              value={
                dateCreate.length > 0 ? dayjs(dateCreate, dateFormat) : null
              }
              onChange={(e, datestring) => {
                setDate(datestring);
                setSchool({
                  ...schoolUpdate,
                  establishDate: new Date(datestring),
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Delete" valuePropName="checked">
            <Checkbox
              checked={schoolUpdate?.isDelete ?? false}
              onChange={(e) =>
                setSchool({ ...schoolUpdate, isDelete: e.target.checked })
              }
            >
              Checkbox
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalUpdate;
