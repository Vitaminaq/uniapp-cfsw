<template>
	<view>
		<view class="top-content"> </view>
		<view
			class="content"
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
		>
			<view class="left list">
				<view
					v-for="(i1, idx1) in list"
					@touchend.stop="onTouchEnd"
					class="child"
					:key="i1.id"
					:id="`left${idx1}`"
					>{{ i1.text }}</view
				>
			</view>
			<view class="right list">
				<view
					v-for="(i2, idx2) in list1"
					@touchend.stop="onTouchEnd"
					class="child"
					:key="i2.id"
					:id="`right${idx2}`"
					>{{ i2.text }}</view
				>
			</view>
			<canvas
				id="left-canvas"
				canvas-id="leftCanvas"
				class="canvas left-cvs"
				height="100%"
				width="100%"
			></canvas>
			<!-- <canvas
			canvas-id="right-cvs"
			class="canvas right-cvs" 
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
		/> -->
		</view>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { boundingClientRect } from '@/utils/publics';

interface Point {
	x: number;
	y: number;
}

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

	public startPoint: Point | null = null;
	public canvasMsg = {
		w: 0,
		h: 0,
		top: 0
	};
	public domHeight: number = 0;
	public domWidth: number = 0;
	public lines: any[] = [];
	public leftPoints: any = [];
	public rightPoints: any = [];
	public startDir: 'left' | 'right' | null = null;

	public async mounted() {
		await this.$nextTick();
		this.ctx = uni.createCanvasContext('leftCanvas', this);
		// 获取content的信息
		const cr = await boundingClientRect(this, '.content');
		// 获取canvas信息
		const r = await boundingClientRect(this, '#left-canvas');
		this.canvasMsg.w = r.width || 0;
		this.canvasMsg.h = r.height || 0;
		this.canvasMsg.top = r.top || 0;
		// 获取每个盒子宽高
		const r1 = await boundingClientRect(this, '.child');
		this.domHeight = r1.height || 0;
		this.domWidth = r1.width || 0;
		// 计算每点的坐标
		this.leftPoints = this.list.map((item, i) => {
			return {
				x: (r1.left || 0) + this.domWidth,
				y: (r1.top || 0) + this.domHeight / 2 + this.domHeight * i
			};
		});
		this.rightPoints = this.list1.map((item, i) => {
			return {
				x:
					((cr.width || 0) / 2 - (r1.right || 0)) * 2 +
					(r1.right || 0),
				y: (r1.top || 0) + this.domHeight / 2 + this.domHeight * i
			};
		});
	}
	public draw(start?: Point, end?: Point) {
		const { ctx } = this;
		ctx.clearRect(0, 0, this.canvasMsg.w, this.canvasMsg.h);
		let arr = [...this.lines];
		start && end && arr.push([start, end]);
		arr.forEach(([start, end]) => {
			ctx.beginPath();
			ctx.moveTo(start.x, start.y);
			ctx.lineTo(end.x, end.y);
			ctx.stroke();
			ctx.closePath();
		});
		ctx.draw();
	}
	public onTouchStart(e: any) {
		// e.preventDefault();
		const { pageX, pageY } = e.changedTouches[0];
		const { id } = e.target;
		id && this.calculateStartPoint(e);
	}
	public calculateStartPoint(e: any) {
		// 计算左边选项中点坐标
		const { id, offsetLeft, offsetTop } = e.target;
		const { pageX, pageY } = e.changedTouches[0];
		if (id.indexOf('left') !== -1) {
			this.startDir = 'left';
		} else {
			this.startDir = 'right';
		}
		const x = pageX;
		const y = pageY;
		if (this.startDir === 'right') {
			this.rightPoints.forEach((item: any, i: number) => {
				if (
					x >= item.x &&
					x <= item.x + this.domWidth &&
					y >= item.y - this.domHeight / 2 &&
					y <= item.y + this.domHeight / 2
				) {
					this.startPoint = {
						x: item.x,
						y: item.y - this.canvasMsg.top
					};
				}
			});
		} else {
			this.leftPoints.forEach((item: any, i: number) => {
				if (
					x >= item.x - this.domWidth &&
					x <= item.x &&
					y >= item.y - this.domHeight / 2 &&
					y <= item.y + this.domHeight / 2
				) {
					this.startPoint = {
						x: item.x,
						y: item.y - this.canvasMsg.top
					};
				}
			});
		}
	}
	public onTouchMove(e: any) {
		const { ctx } = this;
		const { pageX, pageY } = e.changedTouches[0];
		const x = pageX;
		const y = pageY;
		if (!x || !y) return;
		if (!this.startPoint) return;
		this.draw(this.startPoint, { x, y: y - this.canvasMsg.top });
	}
	public onTouchEnd(e: any) {
		if (!this.startDir || !this.startPoint) return;
		const { pageX, pageY } = e.changedTouches[0];
		const x = pageX;
		const y = pageY;
		let endPoint: any = null;
		if (this.startDir === 'left') {
			this.rightPoints.forEach((item: any, i: number) => {
				console.log(item, x, y);
				if (
					x >= item.x &&
					x <= item.x + this.domWidth &&
					y >= item.y - this.domHeight / 2 &&
					y <= item.y + this.domHeight / 2
				) {
					endPoint = {
						x: item.x,
						y: item.y - this.canvasMsg.top
					};
				}
			});
		} else {
			this.leftPoints.forEach((item: any, i: number) => {
				if (
					x >= item.x - this.domWidth &&
					x <= item.x &&
					y >= item.y - this.domHeight / 2 &&
					y <= item.y + this.domHeight / 2
				) {
					endPoint = {
						x: item.x,
						y: item.y - this.canvasMsg.top
					};
				}
			});
		}
		// 计算结束点是否落在对立选项上
		console.log(endPoint, 'ppppppppppppppppppppppppp');
		if (!endPoint) {
			this.draw();
		} else {
			let has;
			this.lines.forEach(([start, end]) => {
				if (
					start.x === (this as any).startPoint.x &&
					start.y === (this as any).startPoint.y &&
					end.x === endPoint.x &&
					end.y === endPoint.y
				) {
					has = true;
				}
			});
			if (has) {
				this.draw();
			} else {
				this.draw(this.startPoint, endPoint);
				this.lines.push([this.startPoint, endPoint]);
			}
		}

		this.startPoint = null;
		this.startDir = null;
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
