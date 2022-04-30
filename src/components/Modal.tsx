import { Layout, Form, Input, Button, Space, Modal as ModalAntd } from "antd";
import styled from "styled-components";

interface ModalPropsInterface {
  textTitle: string;
  textDes: string;
  onSubmit: () => void;
  isVisible: boolean;
  icon?: any;
  btnName: string;
}

const Modal = ({
  onSubmit = () => {},
  textTitle = "",
  textDes = "",
  isVisible = false,
  icon = "",
}: ModalPropsInterface) => {
  return (
    <ModalAntd
      title=""
      visible={isVisible}
      closable={false}
      destroyOnClose={true}
      width={500}
      footer={false}
    >
      <Content>
        {icon && <img width={75} height={75} alt="icon" src={icon} />}
        <TextTitle>{textTitle}</TextTitle>
        <TextDes>{textDes}</TextDes>
        <ButtonModal onClick={() => onSubmit()}>CANCEL</ButtonModal>
      </Content>
    </ModalAntd>
  );
};

export default Modal;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextTitle = styled.p`
  font-weight: 700;
  font-size: 24px;
  align-items: center;
  color: #8d9196;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const TextDes = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #8d9196;
  margin-bottom: 20px;
`;

const ButtonModal = styled(Button)`
  border: 1px solid #c0c5ce;
  box-sizing: border-box;
  border-radius: 4px;
`;
