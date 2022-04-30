import { useState, useEffect } from "react";
import { Layout, Spin } from "antd";

import { Header, Table, Modal, SelectPostCode } from "./components";
import { Get, Post, Patch, Delete } from "./API";
import {
  GetDataInterface,
  DataPostCodeInterface,
  DataTableInterface,
  modalType,
  DataPostCodeDetailInterface,
} from "./interface";
import success_icon from "./image/success_icon.svg";
import fail_icon from "./image/fail_icon.svg";

const modalArray = [
  {
    textTitle: "Success",
    textDes: "Create a Successful!",
    isVisible: "createDone",
    icon: success_icon,
    btnName: "CONTINUE",
  },
  {
    textTitle: "Success",
    textDes: "Edit a Successful!",
    isVisible: "editDone",
    icon: success_icon,
    btnName: "CONTINUE",
  },
  {
    textTitle: "Success",
    textDes: "Remove a Successful!",
    isVisible: "removeDone",
    icon: success_icon,
    btnName: "CONTINUE",
  },
  {
    textTitle: "Fail",
    textDes: "Let’s try one more again",
    isVisible: "fail",
    icon: fail_icon,
    btnName: "TRY AGAIN",
  },
];

const App = () => {
  const [dataTable, setDataTable] = useState<DataTableInterface>({
    data: [],
    count: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [showModal, setShowModal] = useState<modalType>("");
  const [postCodeData, setPostCodeData] = useState<DataPostCodeInterface[]>([]);
  const [postCodeDetailData, sePostCodeDetailData] =
    useState<DataPostCodeDetailInterface>({
      average: "",
      median: "",
    });

  useEffect(() => {
    if (url) {
      fetchDataPostCode();
    }
  }, [url]);

  const handelConnect = async (url: string) => {
    setIsLoading(true);
    const res = await Get({ url: `${url}/home?skip=1&take=100` });
    const { status, message } = res;
    if (status) {
      const { payload, count } = message?.data;
      setDataTable({
        data: payload,
        count: count,
      });
      setUrl(url);
    } else {
      setShowModal("fail");
      setDataTable({
        data: [],
        count: 0,
      });
      setUrl("");
    }
    setIsLoading(false);
  };

  const handelData = async (value: GetDataInterface) => {
    setIsLoading(true);
    const body = { ...value };
    const res = value.id
      ? await Patch({ url: `${url}/home/${value.id}`, body })
      : await Post({ url: `${url}/home`, body });
    const { status } = res;
    if (status) {
      setShowModal(value.id ? "editDone" : "createDone");
      handelConnect(url);
    } else {
      setShowModal("fail");
    }
    setIsLoading(false);
  };

  const handelDel = async (id: number) => {
    setIsLoading(true);
    const res = await Delete({ url: `${url}/home/${id}` });
    const { status } = res;
    if (status) {
      setShowModal("removeDone");
      handelConnect(url);
    } else {
      setShowModal("fail");
    }
    setIsLoading(false);
  };

  const fetchDataPostCode = async (id?: string) => {
    const res = id
      ? await Get({ url: `${url}/postCode/${id}` })
      : await Get({ url: `${url}/postCode` });
    const { status, message } = res;
    if (status) {
      const { payload } = message?.data;
      id ? sePostCodeDetailData({ ...payload }) : setPostCodeData(payload);
    } else {
      id
        ? sePostCodeDetailData({
            average: "",
            median: "",
          })
        : setPostCodeData([]);
    }
  };

  return (
    <Layout>
      {modalArray.map((val) => {
        return (
          <Modal
            textTitle={val.textTitle}
            textDes={val.textDes}
            onSubmit={() => setShowModal("")}
            isVisible={showModal === val.isVisible}
            icon={val.icon}
            btnName={val.btnName}
          />
        );
      })}
      <Header onSubmit={handelConnect} />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        url && (
          <>
            <Table
              dataTable={dataTable}
              onSubmit={handelData}
              onDel={handelDel}
            />
            {postCodeData.length &&
              (isLoading ? (
                <Spin size="large" />
              ) : (
                <SelectPostCode
                  data={postCodeData}
                  dataDetail={postCodeDetailData}
                  handleChange={fetchDataPostCode}
                />
              ))}
          </>
        )
      )}
    </Layout>
  );
};

export default App;
