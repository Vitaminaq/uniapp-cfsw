import { BaseAxiosApi } from './';

export class wechatApi extends BaseAxiosApi {
	public getUnion(params: any) {
		return this.axios.post('/api/wechat', params);
	}
}

export default new wechatApi();
