<template>
	<view>
		<button type="primary" @tap="toWatch">查看员工位置</button>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import api from '@/api/wechat';

@Component<Index>({})
export default class Index extends Vue {
	public async onLoad() {
		//获取当前位置
		uni.getLocation({
			type: 'gcj02',
			success: (res: any) => {
				api.savePosition({
					latitude: res.latitude,
					longitude: res.longitude
				});
				console.log(res, 'iiiiiiiiiiiiiii');
				// this.latitude = res.latitude;
				// this.longitude = res.longitude;
				// this.includePoints = [...this]
			}
		});
	}
	public toWatch() {
		return uni.navigateTo({ url: '/pages/index/navigator' });
	}
}
</script>

<style>
.top-content {
	width: 100%;
	height: 600px;
}
.content {
	position: relative;
	text-align: center;
	width: 100%;
	height: 400px;
	display: flex;
	/* overflow: auto; */
}
.list {
	position: relative;
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px;
}
.left {
	float: left;
}
.right {
	float: right;
}
.child {
	padding: 20px;
	border: 1px solid red;
}
.canvas {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	height: 400px;
	width: 375px;
	z-index: -1;
	border: 1px solid #d3d3d3;
}
/* .left-cvs {
	z-index: 99;
} */
/* .right-cvs {
	z-index: -2;
} */
</style>
