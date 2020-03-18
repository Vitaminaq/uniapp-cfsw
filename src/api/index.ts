import request from '@/utils/request';

/**
 * 请求方法封装
 */
class Axios {
	public get<P extends string | object | ArrayBuffer | undefined>(
		url: string,
		params?: P
	): Promise<any> {
		return request(url, 'GET', params);
	}
	public post<P extends string | object | ArrayBuffer | undefined>(
		url: string,
		params?: P
	): Promise<any> {
		return request(url, 'POST', params);
	}
	public put<P extends string | object | ArrayBuffer | undefined>(
		url: string,
		params?: P
	): Promise<any> {
		return request(url, 'PUT', params);
	}
	public delete<P extends string | object | ArrayBuffer | undefined>(
		url: string,
		params?: P
	): Promise<any> {
		return request(url, 'DELETE', params);
	}
}
/**
 * api基类
 */
export class BaseAxiosApi {
	public axios: Axios = new Axios();
}

export default new Axios();
