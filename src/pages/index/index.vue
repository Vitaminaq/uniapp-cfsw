<template>
	<view class="index-contain">
		<image :src="userInfo.avatarUrl" class="head-img" />
		<view class="info">
			<MenuItem
				v-for="(item, index) in menuList"
				:key="item.left"
				:left="item.left"
				:right="item.right"
				:index="index"
				:len="menuList.length"
			/>
		</view>
		<button class="submit-btn" type="primary" @tap="toWatch">
			查看{{ userInfo.type === 1 ? '员工' : '同事' }}位置
		</button>
		<image class="login-out" src="/static/login-out.png" @tap="loginOut" />
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MenuItem from './components/menu-item.vue';
import api from '@/api/wechat';

@Component<Index>({
	components: {
		MenuItem
	}
})
export default class Index extends Vue {
	public userInfo: any = null;
	public get menuList() {
		if (!this.userInfo) return [];
		const { nickname, type, cname } = this.userInfo;
		return [
			{
				left: '昵称',
				right: nickname
			},
			{
				left: '所属公司',
				right: cname
			},
			{
				left: '身份',
				right: type === 1 ? '老板' : '员工'
			}
		];
	}
	public async onLoad() {
		// 获取用户信息
		const info = await api.getUserInfo();
		if (info.code !== 0) return;
		this.userInfo = info.data;
		//获取当前位置
		uni.getLocation({
			type: 'gcj02',
			success: async (res: any) => {
				const r = await api.savePosition({
					latitude: res.latitude,
					longitude: res.longitude
				});
				if (r.code !== 0)
					return uni.redirectTo({
						url: `/pages/login/login?code=${res.code}`
					});
			}
		});
	}
	public toWatch() {
		return uni.navigateTo({ url: '/pages/index/navigator' });
	}
	public loginOut() {
		uni.showModal({
			title: '提示',
			content: '是否退出当前公司？',
			success: async ({ confirm }) => {
				if (confirm) {
					await api.signout();
					uni.showToast({
						title: '退出成功',
						icon: 'success',
						duration: 1000,
						success: () => {
							uni.removeStorageSync('cid');
							uni.removeStorageSync('uid');
							uni.reLaunch({ url: '/pages/login/login' })
						}
					})
				}
			}
		});
	}
}
</script>

<style>
.index-contain {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100vh;
}
.login-out {
	position: absolute;
	right: 32rpx;
	top: 32rpx;
	width: 44rpx;
	height: 44rpx;
}
.head-img {
	padding: 40rpx 0;
	height: 100rpx;
	width: 100rpx;
	border-radius: 100rpx;
	display: block;
	margin: 0 auto;
}
.info {
	flex: 1;
}
.submit-btn {
	margin: 0 auto;
	padding: 0;
	width: 80%;
	height: 94rpx;
	background: linear-gradient(
		90deg,
		rgba(68, 208, 255, 1) 0%,
		rgba(37, 180, 255, 1) 100%
	);
	border-radius: 47rpx;
	line-height: 94rpx;
	text-align: center;
	color: #fff;
	margin-bottom: 32rpx;
}
button:after {
	border: none;
}
</style>
