import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Injectable } from '@angular/core';

export interface GetOptions {
  url: string;
  params?: Params;
}

export interface Params {
  [key: string]: any;
}

@Injectable({
  // Service created by the root application injector
  providedIn: 'root',
})
export class ApiClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      timeout: 3000,
    });
  }

  public async get<T>(options: GetOptions): Promise<T> {
    try {
      const axiosResponse = await this.axiosClient.request<T>({
        method: 'get',
        url: options.url,
        params: options.params,
      });

      return axiosResponse.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
