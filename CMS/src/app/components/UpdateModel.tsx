import { useEffect } from "react";
import { toast } from "react-toastify";
import { Update } from "../../../api";
import { ISchool } from "../type/school";
import { Button, Checkbox, DatePicker, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { FieldType, dateFormat } from "../type/common";
import dayjs from "dayjs";

interface IProps {
  show: boolean;
  setShow: (value: boolean) => void;
  school: ISchool;
}

function ModalUpdate(props: IProps) {
  const { show, setShow, school } = props;
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    if (school && school.id) {
      form.setFieldsValue({
        ...school,
        establishDate: dayjs(school.establishDate),
      });
    }
  }, [show]);

  const handleClose = () => {
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
        const id = form.getFieldValue("id");

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
        title="Update School"
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
    </>
  );
}

export default ModalUpdate;
