<template>
	<view>
		<map
			id="map"
			:longitude="longitude"
			:latitude="latitude"
			scale="12"
			:markers="markers"
			@callouttap="callouttap"
			show-location
			style="width: 100%; height: 100vh;"
		>
		</map>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
const QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
const plugin = requirePlugin('routePlan');

@Component<Navigator>({})
export default class Navigator extends Vue {
	public qqmapsdk: any = null;
	public includePoints: any = [];
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
				// this.includePoints = [...this]
			}
		});
		this.qqmapsdk = new QQMapWX({
			key: 'UFTBZ-HATC6-VYESI-MSJXK-YIAQ7-IEBRU'
		});
	}

	public callouttap(e: any) {
		const mark = this.markers.filter((item) => {
			return item.id === e.markerId;
		});
		console.log(mark[0].latitude, mark[0].longitude);
		this.qqmapsdk.reverseGeocoder({
			location: `${mark[0].latitude},${mark[0].longitude}`,
			key: 'X0Bt8yzF7j6lF4DkSyvrfaF12pOM9Idw',
			success: (res: any) => {
				console.log(res, 'ggggggggggggg');
				const { address, formatted_addresses } = res.result;
				let key = 'UFTBZ-HATC6-VYESI-MSJXK-YIAQ7-IEBRU'; //使用在腾讯位置服务申请的key
				let referer = 'uniapp-cfsw'; //调用插件的app的名称
				let endPoint = JSON.stringify({
					//终点
					name: formatted_addresses.recommend,
					latitude: mark[0].latitude,
					longitude: mark[0].longitude
				});
				wx.navigateTo({
					url:
						'plugin://routePlan/index?key=' +
						key +
						'&referer=' +
						referer +
						'&endPoint=' +
						endPoint +
						'&navigation=1'
				});
			}
		});
	}
}
</script>

<style scoped></style>
