<template>
	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>
		<view @click="test">
			<text class="title">{{ title }}</text>
		</view>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component<Index>({})
export default class Index extends Vue {
	public title: string = '你好123';

	public test() {
		return this.$pupop.toast('lihai');
	}
}
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
}
.logo {
	height: 200upx;
	width: 200upx;
	margin-top: 200upx;
}
.title {
	font-size: 36upx;
	color: #8f8f94;
}
</style>
