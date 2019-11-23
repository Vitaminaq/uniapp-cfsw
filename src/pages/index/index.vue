<template>
	<view class="content">
		<view class="list">
			<view
				v-for="i1 in list"
				class="child"
				:key="i1.id"
				@click="(e) => select1(e)"
				>{{ i1.text }}</view
			>
		</view>
		<view class="list">
			<view
				v-for="i2 in list1"
				class="child"
				:key="i2.id"
				@click="(e) => select2(e)"
				>{{ i2.text }}</view
			>
		</view>
		<view class="line" id="line" :style="lineStyle"></view>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component<Index>({})
export default class Index extends Vue {
	public title: string = '你好123';
	public startX = 0;
	public startY = 0;
	public endX = 0;
	public endY = 0;
	public lineStyle = '';

	public list = [
		{
			id: 1,
			text: 'niu'
		},
		{
			id: 2,
			text: 'niu2'
		},
		{
			id: 3,
			text: 'ni3'
		},
		{
			id: 4,
			text: 'niu4'
		}
	];
	public list1 = [
		{
			id: 1,
			text: 'niu'
		},
		{
			id: 2,
			text: 'niu2'
		},
		{
			id: 3,
			text: 'ni3'
		},
		{
			id: 4,
			text: 'niu4'
		}
	];

	// 保存左边盒子的中心点坐标
	public select1(e: any) {
		console.log(e);
		const { x, y, offsetLeft, offsetTop } = e.target;
		// 63盒子高度
		this.startX = offsetLeft + 120;
		this.startY = 63 / 2 + offsetTop;
		console.log('当前左边边盒子中心点左边x, y', this.startX, this.startY);
	}
	public select2(e: any) {
		const { x, y, offsetLeft, offsetTop } = e.target;
		// 计算右边盒子的中心值
		this.endX = offsetLeft;
		this.endY = 63 / 2 + offsetTop;
		console.log('当前右边盒子中心点左边x, y', this.endX, this.endY);
		// 计算三角形两直角边长
		const aX = this.endX - this.startX;
		const aY = this.endY - this.startY;
		console.log('当前两直角边长x, y', aX, aY);
		// 计算线条布局位置

		// 旋转角度
		const α = (Math.atan2(aY, aX) * 180) / Math.PI;
		console.log('当前旋转角度', α);
		// 第三边长度 = 划线长度
		const r = Math.sqrt(Math.pow(aX, 2) + Math.pow(aY, 2));
		console.log('当前划线长度', r);
		this.lineStyle = `top: ${this.startY}px; left: ${this.startX}px; transform: rotate(${α}deg); width: ${r}px; transform-origin: left top;`;
		console.log(this.lineStyle);
	}
}
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	display: flex;
}
.list {
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px;
}
.child {
	padding: 20px;
	border: 1px solid red;
}
.line {
	position: absolute;
	height: 2px;
	width: 100px;
	background-color: red;
}
</style>
