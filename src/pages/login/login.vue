<template>
	<view class="login">
		<button
			type="primary"
			open-type="getUserInfo"
			@getuserinfo="getUserInfo"
		>
			微信授权登录
		</button>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import api from '@/api/wechat';

interface Options {
	code: string;
}

@Component<Index>({})
export default class Index extends Vue {
	// 微信code
	public code: string = '';

	public async onLoad(options: Options) {
		uni.login({
			provider: 'weixin',
			success: ({ code }) => {
				if (!code) return;
				this.code = code;
			}
		});
	}

	public async getUserInfo(e: any): Promise<void> {
		const detail = e.detail;
		const { encryptedData, iv, userInfo } = detail;
		if (!encryptedData) return;
		const r = await api.getUnion({
			code: this.code,
			avatarUrl: userInfo.avatarUrl,
			nickName: userInfo.nickName
		});
		if (r.code !== 0) return;
		uni.setStorageSync('token', r.data.token);
		uni.setStorageSync('uid', r.data.uid);
		uni.setStorageSync('cid', r.data.cid);
		console.log(r.data.cid, 'kkkkkkkkkkkkkkkk')
		if (r.data.cid) return uni.redirectTo({ url: '/pages/index/index' });
		return uni.redirectTo({ url: '/pages/login/create-or-join' });
	}
}
</script>

<style>
.login {
	height: 100vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
