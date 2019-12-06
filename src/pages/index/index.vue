<template>
	<view class="content">
		<!-- <view class="left list" @touchstart="onClick">
			<view
				v-for="(i1, idx1) in list"
				class="child"
				:key="i1.id"
				:id="idx1"
				>{{ i1.text }}</view
			>
		</view>
		<view class="right list" @touchstart="onClick">
			<view
				v-for="(i2, idx2) in list1"
				class="child"
				:key="i2.id"
				:id="idx2"
				>{{ i2.text }}</view
			>
		</view> -->
		<canvas
			canvas-id="leftCanvas"
			class="canvas left-cvs"
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
			@touchend="onTouchEnd"
			height="300"
			width="300"
		></canvas>
		<!-- <canvas
			canvas-id="right-cvs"
			class="canvas right-cvs"
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
		/> -->
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component<Index>({})
export default class Index extends Vue {
	public ctx: CanvasContext = {} as CanvasContext;
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

	public startX: number = 0;
	public startY: number = 0;

	public mounted() {
		this.ctx = uni.createCanvasContext('leftCanvas');
		const { ctx } = this;
		// ctx.beginPath();
		// ctx.moveTo(0, 0);
		// ctx.lineTo(100, 100);
		// ctx.stroke();
		// ctx.closePath();
		// this.context.setFontSize(30);
		// this.context.setFillStyle('#333');
		// this.context.fillText('我是canvas', 20, 20);
		// this.context.draw();
		// const { ctx } = this;
		// console.log(ctx, 'jjjjjjjjjjjjjjjjjj');
		// if (!ctx) return;
		// ctx.beginPath();
		// ctx.moveTo(0, 0);
		// ctx.lineTo(100, 100);
		// ctx.stroke();
		// ctx.draw();
	}
	public onClick(e: any): any {
		// console.log(e, 'kk');
	}
	public onTouchStart(e: any) {
		const { x, y } = e.changedTouches[0];
		this.startX = x;
		this.startY = y;
		const { ctx } = this;
		ctx.beginPath();
		ctx.moveTo(x, y);
	}
	public onTouchMove(e: any) {
		const { ctx } = this;
		const { x, y } = e.changedTouches[0];
		ctx.lineTo(x, y);
		ctx.closePath();
		ctx.stroke();
		ctx.draw();
		// context.clearRect(0, 0, 600, 400);
		// context.beginPath();
		// context.moveTo(this.startX, this.startY);
		// context.setLineCap('butt');
		// context.lineTo(x, y);
		// context.closePath();
		// context.stroke();
	}
	public onTouchEnd() {
		// this.ctx.draw();
	}
}
</script>

<style>
.content {
	position: relative;
	text-align: center;
	width: 100%;
	height: 400px;
	display: flex;
	overflow: auto;
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
.child:hover {
	background: greenyellow;
}
.canvas {
	/* position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	height: auto;
	width: auto; */
	border: 1px solid #d3d3d3;
}
.left-cvs {
	z-index: 99;
}
.right-cvs {
	z-index: -2;
}
</style>
