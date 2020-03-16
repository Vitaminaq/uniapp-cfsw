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
			@callouttap="callouttap"
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
			iconPath:
				'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1293166224,1986999621&fm=26&gp=0.jpg',
			id: 3,
			latitude: 22.580925,
			longitude: 113.954437,
			width: 30,
			height: 30,
			borderRadius: 30,
			callout: {
				content: '到这里去'
			}
		},
		{
			iconPath:
				'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1854308153,463637643&fm=26&gp=0.jpg',
			id: 4,
			latitude: 22.57529,
			longitude: 113.863891,
			width: 30,
			height: 30,
			borderRadius: 30,
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
				console.log(res, 'iiiiiiiiiiiiiii');
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
		// const { latitude, longitude } = e.detail;
		// this.latitude = latitude;
		// this.longitude = longitude;
	}
	public markertap(e: any) {
		// console.log('点击标记', e);
	}
	public regionchange(e: any) {
		// console.log('视野变化', e);
	}
	public callouttap(e: any) {
		console.log(e);
		const mark = this.markers.filter((item) => {
			return item.id === e.markerId;
		});
		uni.openLocation({
			name: '哈哈哈',
			address: '1236453',
			latitude: mark[0].latitude, //要去的纬度-地址
			longitude: mark[0].longitude //要去的经度-地址
		});
	}
}
</script>

<style scoped></style>
