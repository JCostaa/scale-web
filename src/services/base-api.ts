import axios  from "axios";
import type { AxiosInstance } from "axios"

export abstract class BaseService {
  protected static readonly api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    responseType: "json",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: false,
  });
}
