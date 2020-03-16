<template>
	<view>
		<map
			id="map"
			:longitude="longitude"
			:latitude="latitude"
			scale="14"
			:markers="markers"
			@markertap="markertap"
			@regionchange="regionchange"
			@tap="selectIt"
			show-location
			style="width: 100%; height: 300px;"
		>
		</map>
		<button type="primary" @tap="toPath">去哪儿</button>
		<button type="primary" @tap="navigate">导航</button>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component<Navigator>({})
export default class Navigator extends Vue {
	public markers = [
		{
			// title: '目的地',
			iconPath: '/static/position-icon.svg',
			id: 4,
			latitude: 22.521120010511527,
			longitude: 113.92478942871094,
			width: 30,
			height: 30,
			callout: {
				content: '到这里去'
			}
		}
	];
	//当前定位位置
	latitude = '';
	longitude = '';

	onLoad() {
		//获取当前位置
		uni.getLocation({
			type: 'gcj02',
			success: (res: any) => {
				this.latitude = res.latitude;
				this.longitude = res.longitude;
			}
		});
	}

	public navigate() {
		////使用微信内置地图查看标记点位置，并进行导航
		uni.openLocation({
			name: '哈哈哈',
			latitude: this.markers[0].latitude, //要去的纬度-地址
			longitude: this.markers[0].longitude //要去的经度-地址
		});
	}
	public toPath() {
		uni.chooseLocation({
			keyword: '西乡',
			success: (res: any) => {
				console.log(res);
			}
		});
	}
	public selectIt(e: any) {
		console.log('点击地图', e);
		const { latitude, longitude } = e.detail;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	public markertap(e: any) {
		console.log('点击标记', e);
	}
	public regionchange(e: any) {
		console.log('视野变化', e);
	}
}
</script>

<style scoped></style>
