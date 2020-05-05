<template>
	<view class="menu-item" :class="{ 'menu-item-last': index === len - 1 }">
		<view class="left">{{ left }}：</view>
		<view class="right">{{ right }}</view>
	</view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component<Index>({})
export default class Index extends Vue {
	@Prop({ default: '' }) left!: string;
	@Prop({ default: '' }) right!: string;
	@Prop({ default: 0 }) index!: number;
	@Prop({ default: 0 }) len!: number;
}
</script>

<style scoped>
.menu-item {
	display: flex;
	align-items: center;
	padding: 32rpx;
	border-top: 1rpx solid #bfc2cc;
}
.menu-item-last {
	border-bottom: 1rpx solid #bfc2cc;
}
.left {
	width: 160rpx;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(48, 49, 51, 1);
}
.right {
	flex: 1;
	font-size: 32rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(48, 49, 51, 1);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
