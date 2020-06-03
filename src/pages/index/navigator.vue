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
/* eslint-disable */
const plugin = requirePlugin('routePlan');
/* eslint-disable */
import api from '@/api/wechat';

@Component<Navigator>({})
export default class Navigator extends Vue {
	public qqmapsdk: any = null;
	public markers: any[] = [];
	//当前定位位置
	latitude = '';
	longitude = '';

	async onLoad() {
		//获取当前位置
		uni.getLocation({
			type: 'gcj02',
			success: (res: any) => {
				console.log(res, 'iiiiiiiiiiiiiii');
				this.latitude = res.latitude;
				this.longitude = res.longitude;
			}
		});
		this.qqmapsdk = new QQMapWX({
			key: 'UFTBZ-HATC6-VYESI-MSJXK-YIAQ7-IEBRU'
		});
		const r = await api.getAll();
		if (r.code !== 0) return;
		this.markers = r.data.map((item: any) => {
			return {
				iconPath: item.avatarUrl,
				id: item.uid,
				latitude: item.latitude,
				longitude: item.longitude,
				width: 30,
				height: 30,
				borderRadius: 30,
				callout: {
					content: '到这里去'
				}
			};
		});
		console.log(this.markers, 'wwwwwwwwwwwwwwwwwwwwwwwwwwwww');
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
					latitude: parseFloat(mark[0].latitude),
					longitude: parseFloat(mark[0].longitude)
				});
				uni.navigateTo({
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
