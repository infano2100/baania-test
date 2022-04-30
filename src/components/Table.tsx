import { useState } from "react";
import {
  Table as TableAntd,
  Button,
  Modal,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  Popconfirm,
} from "antd";
import styled from "styled-components";

import { GetDataInterface } from "../interface";

interface TablePropsInterface {
  dataTable: {
    data: GetDataInterface[];
    count: number;
  };
  onSubmit: (val: GetDataInterface) => void;
  onDel: (id: number) => void;
}

const Table = ({
  dataTable = {
    data: [],
    count: 0,
  },
  onSubmit = () => {},
  onDel = () => {},
}: TablePropsInterface) => {
  const [form] = Form.useForm();

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState<number | null>(null);

  const { data, count } = dataTable;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Post Code",
      dataIndex: "post_code",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      dataIndex: "Action",
      render: (val: any, allValue: GetDataInterface) => {
        const { id } = allValue;
        return (
          <div>
            <ButtonViewDetail
              onClick={() => handleOpen(allValue)}
              type="link"
              shape="round"
              size="middle"
            >
              View Detail
            </ButtonViewDetail>

            <Popconfirm
              title="คุณต้องการลบรายการ?"
              onConfirm={() => (id ? onDel(id) : {})}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <ButtonDel type="link" shape="round" size="middle">
                DELETE
              </ButtonDel>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const onFinish = (values: GetDataInterface) => {
    const checkIdEdit = idEdit ? { id: idEdit } : {};
    onSubmit({ ...values, ...checkIdEdit });
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsShowModal(false);
    setIdEdit(null);
  };

  const handleOpen = (value?: GetDataInterface) => {
    if (value && value.id) {
      form.setFieldsValue({ ...value });
      setIdEdit(value.id);
    }
    setIsShowModal(true);
  };

  return (
    <Content>
      {data.length ? (
        <>
          <ContentTitle>
            <FontTitle>HOUSE LIST</FontTitle>
            <Button
              onClick={() => handleOpen()}
              className="btn_create"
              type="primary"
            >
              CREATE
            </Button>
          </ContentTitle>
          <TableAntd
            columns={columns as any}
            dataSource={data}
            bordered
            pagination={{
              showSizeChanger: true,
              pageSize: 5,
              total: count - 1,
            }}
            scroll={{ x: 400 }}
          />
        </>
      ) : (
        <></>
      )}

      <Modal
        title="Create"
        visible={isShowModal}
        closable={false}
        destroyOnClose={true}
        width={800}
        footer={[
          <ButtonCancel type="dashed" onClick={handleCancel}>
            CANCEL
          </ButtonCancel>,
          <ButtonSubmit
            isEdit={idEdit !== null}
            type="dashed"
            onClick={handleOk}
          >
            {idEdit ? "UPDATE" : "CREATE"}
          </ButtonSubmit>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item name="name" rules={[{ required: true }]}>
                <Input className="inputCustomHeight" placeholder="Name" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 6 }}>
              <Form.Item name="post_code" rules={[{ required: true }]}>
                <Input className="inputCustomHeight" placeholder="Post Code" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 6 }}>
              <Form.Item name="price" rules={[{ required: true }]}>
                <InputNumber
                  style={{ width: "100%" }}
                  className="inputCustomHeight"
                  placeholder="Price"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 24 }}>
              <Form.Item name="desc" rules={[{ required: true }]}>
                <Input.TextArea
                  rows={5}
                  showCount
                  maxLength={100}
                  placeholder="Description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Content>
  );
};

export default Table;

const Content = styled.div`
  background-color: #ffffff;
  padding: 20px 75px 0px 75px;
  .btn_create {
    width: 200px;
    height: 53px;
    background: #22bb66;
    border-radius: 4px;
    border-color: #22bb66;
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonDel = styled(Button)`
  background: #fdf4f7;
  border-radius: 20px;
  color: #b93e5c;
`;

const ButtonViewDetail = styled(Button)`
  background: #fff7e6;
  border-radius: 20px;
  color: #ff9900;
  margin-right: 10px;
`;

const FontTitle = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  margin-top: 5px;
`;

const ButtonSubmit = styled<any>(Button)`
  width: 164px;
  height: 45px;
  background: ${(props) => (props.isEdit ? "#F6A623" : "#22bb66")};
  border-radius: 4px;
  border-colo: ${(props) => (props.isEdit ? "#F6A623" : "#22bb66")};
  color: #ffffff;
  &:hover {
    background: ${(props) => (props.isEdit ? "#F6A623" : "#22bb66")};
    border-radius: 4px;
    border-colo: ${(props) => (props.isEdit ? "#F6A623" : "#22bb66")};
    color: #ffffff;
  }
  &:active {
    background: ${(props) => (props.isEdit ? "#F6A623" : "#22bb66")};
    border-colo: ${(props) => (props.isEdit ? "#F6A623" : "#22bb66")};
    border-radius: 4px;
    color: #ffffff;
  }
`;

const ButtonCancel = styled(Button)`
  width: 164px;
  height: 45px;
  border: 1px solid #c0c5ce;
  box-sizing: border-box;
  border-radius: 4px;
  color: #7c7e82;
  &:hover {
    background: #ffffff;
    border-radius: 4px;
    border-color: #c0c5ce;
    color: #7c7e82;
  }
`;
