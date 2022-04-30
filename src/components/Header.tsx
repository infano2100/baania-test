import { Layout, Form, Input, Button, Space, Col, Row } from "antd";
import styled from "styled-components";

interface HeaderPropsInterface {
  onSubmit?: (val: string) => void;
}

interface FormValueInterface {
  url: string;
  port: string | undefined;
}

const Header = ({ onSubmit = () => {} }: HeaderPropsInterface) => {
  const [form] = Form.useForm();

  const onFinish = (values: FormValueInterface) => {
    onSubmit(`${values.url}${values.port ? `:${values.url}` : ""}`);
  };

  return (
    <HeaderCustom>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{}}
      >
        <Row gutter={16}>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 10 }}>
            <Form.Item name="url" label="URL" rules={[{ required: true }]}>
              <Input className="inputCustom" placeholder="http://localhost" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 10 }}>
            <Form.Item name="port" label="PORT">
              <Input className="inputCustom" placeholder="8000" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 4 }}>
            <Form.Item>
              <Space>
                <Button className="btn_submit" type="primary" htmlType="submit">
                  CONNECT
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
        {/* <div className="setFlex"> */}

        {/* </div> */}
      </Form>
    </HeaderCustom>
  );
};

export default Header;

const HeaderCustom = styled(Layout.Header)`
  min-height: 170px;
  height: auto;
  background-color: #f4f7fc;
  overflow: scroll;
  padding: 20px 50px 20px 50px;
  .setFlex {
    display: flex;
    justify-content: center;
    justify-content: space-evenly;
  }
  .btn_submit {
    width: 200px;
    height: 53px;
    background: #3c64b1;
    border-radius: 4px;
    margin-top: 30px;
  }
  .inputCustom {
    min-width: 100%;
    min-height: 53px;
    background: #ffffff;
    border: 1px solid #8d9196;
    box-sizing: border-box;
    border-radius: 4px;
  }
  @media (max-width: 767px) {
    .setFlex {
      display: flex;
      flex-direction: column;
    }
    .inputCustom {
      min-width: 0;
      min-height: 53px;
      background: #ffffff;
      border: 1px solid #8d9196;
      box-sizing: border-box;
      border-radius: 4px;
    }
    .btn_submit {
      margin-top: 0px;
      text-align: center;
    }
  }
`;
