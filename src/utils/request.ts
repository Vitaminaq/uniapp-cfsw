import { baseUrl } from './config';

export default (url: string, method: RequestOptions['method'], params: any) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${baseUrl}${url}`,
			method,
			data: params,
			header: {
				token: uni.getStorageSync('token'),
				uid: uni.getStorageSync('uid'),
				cid: uni.getStorageSync('cid')
			},
			success: (res: any) => {
				const { data } = res;
				if (data && data.code !== 0) {
					uni.navigateTo({ url: '/pages/login/login' });
				}
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
