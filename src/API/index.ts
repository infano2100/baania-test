import axios from "axios";

interface axiosPropsInterface {
  url: string;
  body?: any;
  headers?: any;
}

export const Get = async ({
  url = "",
  body = {},
  headers = {},
}: axiosPropsInterface) => {
  try {
    return axios({
      method: "GET",
      url,
      params: {
        ...body,
      },
      headers: {
        ...headers,
      },
    })
      .then((res) => {
        return {
          status: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          status: false,
          message: err,
        };
      });
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

export const Post = async ({
  url = "",
  body = {},
  headers = {},
}: axiosPropsInterface) => {
  try {
    return axios({
      method: "POST",
      headers,
      url,
      data: body,
    })
      .then((res) => {
        return {
          status: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          status: false,
          message: err?.response?.data?.error ?? "",
        };
      });
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

export const Patch = async ({
  url = "",
  body = {},
  headers = {},
}: axiosPropsInterface) => {
  try {
    return axios({
      method: "PATCH",
      url,
      data: {
        ...body,
      },
      headers: {
        ...headers,
      },
    })
      .then((res) => {
        return {
          status: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          status: false,
          message: err,
        };
      });
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

export const Put = async ({
  url = "",
  body = {},
  headers = {},
}: axiosPropsInterface) => {
  try {
    return axios({
      method: "PUT",
      url,
      data: {
        ...body,
      },
      headers: {
        ...headers,
      },
    })
      .then((res) => {
        return {
          status: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          status: false,
          message: err,
        };
      });
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};

export const Delete = async ({
  url = "",
  body = {},
  headers = {},
}: axiosPropsInterface) => {
  try {
    return axios({
      method: "DELETE",
      headers,
      url,
      data: body,
    })
      .then((res) => {
        return {
          status: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          status: false,
          message: err,
        };
      });
  } catch (error) {
    return {
      status: false,
      message: error,
    };
  }
};
