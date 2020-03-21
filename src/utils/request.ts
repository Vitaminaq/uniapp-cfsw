import { baseUrl } from './config';

export default (url: string, method: RequestOptions['method'], params: any) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${baseUrl}${url}`,
			method,
			data: params,
			header: {
				token: uni.getStorageSync('token'),
				uid: uni.getStorageSync('uid')
			},
			success: (res) => {
				resolve(res.data);
			},
			fail: (e) => {
				reject({
					code: -1,
					data: null,
					message: JSON.stringify(e)
				});
			}
		});
	});
};
