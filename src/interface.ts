export interface GetDataInterface {
  id?: number;
  name: string;
  desc: string;
  price: string;
  post_code: string;
}

export interface DataPostCodeInterface {
  post_code: string;
}

export interface DataPostCodeDetailInterface {
  average: string;
  median: string;
}

export interface DataTableInterface {
  data: GetDataInterface[];
  count: number;
}

export type modalType = "" | "createDone" | "editDone" | "removeDone" | "fail";
