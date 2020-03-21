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

@Component<Index>({})
export default class Index extends Vue {
	public code: string = '';
	public async onLoad() {
		uni.login({
			provider: 'weixin',
			success: async ({ code }) => {
				if (!code) return;
				this.code = code;
				// await api.getUnion({ code });
			}
		});
	}
	public async getUserInfo(e: any) {
		const detail = e.detail;
		const { encryptedData, iv, userInfo } = detail;
		if (!encryptedData) return;
		console.log(detail, 'jjjjjjjjjjjjjjj');
		const r = await api.getUnion({
			code: this.code,
			avatarUrl: userInfo.avatarUrl,
			nickName: userInfo.nickName
		});
		if (r.code !== 0) return;
		uni.setStorageSync('token', r.data.token);
		uni.setStorageSync('uid', r.data.uid);
		uni.navigateTo({ url: '/pages/index/index' });
		// return saveUserInfo(this.loginCode, encryptedData, iv, userInfo);
	}
}
</script>

<style>
.login {
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
