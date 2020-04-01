import { BaseAxiosApi } from './';

export class wechatApi extends BaseAxiosApi {
	public createCompany(params: any) {
		return this.axios.post('/api/wechat/create/company', params);
	}
	public joinCompany(params: any) {
		return this.axios.post('/api/wechat/join/company', params);
	}
	public getUnion(params: any) {
		return this.axios.post('/api/wechat/union', params);
	}
	public savePosition(params: any) {
		return this.axios.post('/api/wechat/update/position', params);
	}
	public getAll() {
		return this.axios.get('/api/wechat/all/info');
	}
}

export default new wechatApi();
