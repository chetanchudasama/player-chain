import axios, { AxiosRequestConfig, Method } from "axios";
import { toast } from "react-toastify";
import Router from "next/router";

interface Props {
  url: string;
  method: string;
  body?: any;
  headers?: any;
  secure?: boolean;
  baseUrl?: string;
}

export const api = async (props: Props) => {
  try {
    const { url, method, body, headers, secure, baseUrl } = props;
    const token = null;

    let config: AxiosRequestConfig<any> = {
      url,
      method: method as Method,
      baseURL: baseUrl || process.env.NEXT_PUBLIC_API_URL,
    };

    const getHeaders = () => {
      if (Boolean(headers)) {
        config.headers = { ...headers };
      } else {
        config.headers = {
          "Content-Type": "application/json",
        };
      }
      if (secure !== false) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    };

    const getBody = () => {
      config.data = Boolean(body) ? body : {};
    };
    switch (method) {
      case "get":
        getHeaders();
        break;
      case "post":
      case "put":
      case "delete":
        getHeaders();
        getBody();
        break;
      default:
        getHeaders();
        break;
    }

    const data: any = await axios(config);
    if (data?.status === 401 || data?.status === 403) {
      toast.error(data.data.serverResponse.message);
      Router.push("/");
    }
    return data;
  } catch (err) {
    // @ts-ignore
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      // @ts-ignore
      toast.error(err.response.data.serverResponse.message);
      Router.push("/");
    } else {
      return err;
    }
  }
};

export const apiPluginForImageUpload = async (props: Props) => {
  try {
    const { url, method, body, headers, secure, baseUrl } = props;
    let config: AxiosRequestConfig<any> = {
      url,
      method: method as Method,
      baseURL: baseUrl || process.env.NEXT_PUBLIC_API_URL,
    };
    const getHeaders = () => {
      if (Boolean(headers)) {
        config.headers = { ...headers };
      } else {
        config.headers = {
          "Content-Type": "application/octet-stream",
        };
      }
    };

    const getBody = () => {
      config.data = Boolean(body) ? body : {};
    };
    switch (method) {
      case "get":
        getHeaders();
        break;
      case "post":
      case "put":
      case "delete":
        getHeaders();
        getBody();
        break;
      default:
        getHeaders();
        break;
    }

    const data: any = await axios(config);

    if (data?.status === 401 || data?.status === 403) {
      toast.error(data.data.serverResponse.message);
      Router.push("/");
    }
    return data;
  } catch (err) {
    // @ts-ignore
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      // @ts-ignore
      toast.error(err.response.data.serverResponse.message);
      Router.push("/");
    } else {
      return err;
    }
  }
};
