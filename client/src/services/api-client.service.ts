import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Injectable } from '@angular/core';

export interface GetOptions {
  route: string;
}

export interface PostOptions {
  route: string;
  videoUrl: string;
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
        url: options.route,
      });

      return axiosResponse.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public async post<T>(options: PostOptions): Promise<T> {
    try {
      const axiosResponse = await this.axiosClient.request<T>({
        method: 'post',
        url: options.route,
        data: {
          videoUrl: options.videoUrl,
        },
      });

      return axiosResponse.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
