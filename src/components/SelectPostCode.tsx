import { Select, Row, Col } from "antd";
import styled from "styled-components";

import {
  DataPostCodeInterface,
  DataPostCodeDetailInterface,
} from "../interface";

const { Option } = Select;

interface HeaderPropsInterface {
  data?: DataPostCodeInterface[];
  dataDetail?: DataPostCodeDetailInterface;
  handleChange?: (val: string) => void;
}

const SelectPostCode = ({
  data = [],
  handleChange = () => {},
  dataDetail = {
    average: "",
    median: "",
  },
}: HeaderPropsInterface) => {
  return (
    <Content>
      <SelectContent>
        <Row gutter={16}>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            md={{ span: 12, offset: 6 }}
          >
            <Select
              defaultValue={"-1"}
              style={{ width: "100%", maxWidth: 450 }}
              onChange={handleChange}
            >
              <Option value="-1">SELECT POST CODE</Option>
              {data &&
                data.length &&
                data.map((val: DataPostCodeInterface) => (
                  <Option value={val.post_code}>{val.post_code}</Option>
                ))}
            </Select>

            <ContentDetail>
              {dataDetail?.average && (
                <>
                  <TextCodeDetail>
                    Average : {dataDetail.average}
                  </TextCodeDetail>
                  <TextCodeDetail>
                    Median:
                    {dataDetail.median}
                  </TextCodeDetail>
                </>
              )}
            </ContentDetail>
          </Col>
        </Row>
      </SelectContent>
    </Content>
  );
};

export default SelectPostCode;

const Content = styled.div`
  padding: 20px 75px 0px 75px;
  background-color: #ffffff;
`;

const SelectContent = styled.div`
  background-color: #f4f7fc;
  display: flex;
  padding: 50px;
  justify-content: center;
  flex-direction: column;
  overflow: scroll;
}
`;

const ContentDetail = styled.div`
  margin-top: 15px;
`;

const TextCodeDetail = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #3c64b1;
  line-height: 30px;
  margin-bottom: 5px;
`;
