<template>
	<view class="swiper">
		<view
			class="swiper-content"
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
			@touchend="onTouchEnd"
			:animation="animationData"
		>
			<view v-for="item in list" class="swiper-item" :key="item.index">{{
				item.index
			}}</view>
		</view>
		<view class="btn" @tap="pre">上一节</view>
		<view class="btn next" @tap="next">下一节</view>
	</view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { boundingClientRect, toPercent } from '@/utils/publics';

interface Point {
	x: number;
	y: number;
}
@Component<Swiper>({})
export default class Swiper extends Vue {
	// @Prop({ default: 0 }) currentIndex!: number;
	// 记录当前索引
	public currentIndex: number = 0;
	// 储存动画队列
	public animations: any = {};
	// 动画实例
	public animation: any = {};
	public animation1: any = {};
	// 动画执行对象
	public animationData: any = {};
	// 记录触摸开始点
	public startPoint: any = null;
	// 记录触摸开始时间
	public startTime: number = 0;
	// 获取swiper真实宽度
	public swiperWidth: number = 0;
	// 储存api引用
	public localUni: Uni = uni;
	// 当前所占比
	public currentTl: number = 0;

	public get list() {
		return Array.from({ length: 2000 }, (v, i) => {
			return {
				distance: `${i}00%`,
				index: i
			};
		});
	}
	public async created() {
		const localUni = uni;
		// 平滑切换动画
		this.animation = this.createAnimation(300, 'ease');
		// 快切
		this.animation1 = this.createAnimation(0, 'ease');
		await this.$nextTick();
		const r = await boundingClientRect(this, '.swiper-content');
		console.log(r, '66666666666666666666666666');
		this.swiperWidth = r.width || 0;
		this.currentTl = 100 / this.list.length;
	}

	/**
	 * 创建动画
	 */
	public createAnimation(duration: number, timingFunction: any) {
		return this.localUni.createAnimation({
			duration,
			timingFunction
		});
	}
	public pre() {
		this.currentIndex--;
		this.$emit('onchange', this.currentIndex);
		this.animate();
	}
	public next() {
		this.currentIndex++;
		this.$emit('onchange', this.currentIndex);
		this.animate();
	}
	public animate() {
		this.animation
			.translateX(
				`-${((this.currentIndex * this.currentTl) / 100) * 100}%`
			)
			.step();
		this.animationData = this.animation.export();
	}
	/**
	 * 计算手指滑动直线距离
	 */
	public calculateDistance(type: 'move' | 'end', x: number, y: number) {
		const lenX = x - this.startPoint.x;
		if (lenX > 0) {
			console.log('左滑后退');
		} else {
			console.log('右滑向前');
		}
		type === 'move' && this.animateMove(lenX);
		return lenX / this.swiperWidth;
	}
	public animateMove(distance: number) {
		// 获取当前位置
		const percent = `${(distance / this.swiperWidth -
			(this.currentIndex * this.currentTl) / 100) *
			100}%`;
		this.animation1.translateX(percent).step();
		this.animationData = this.animation1.export();
	}
	/**
	 * 触摸开始
	 */
	public onTouchStart(e: any) {
		const { pageX, pageY } = e.changedTouches[0];
		this.startPoint = {
			x: pageX,
			y: pageY
		};
		this.startTime = Date.now();
	}
	/**
	 * 手指移动
	 */
	public onTouchMove(e: any) {
		const { pageX, pageY } = e.changedTouches[0];
		this.calculateDistance('move', pageX, pageY);
	}
	/**
	 * 触摸结束
	 */
	public onTouchEnd(e: any) {
		const { pageX, pageY } = e.changedTouches[0];
		const r = this.calculateDistance('end', pageX, pageY);
		if (r >= 0.5) {
			this.pre();
		} else if (r < 0.5 && r >= -0.5) {
			const speed = Math.abs(r / (Date.now() - this.startTime));
			if (r > 0) {
				if (speed > 0.0000014) {
					this.pre();
				} else {
					this.animate();
				}
			} else {
				if (speed > 0.0000014) {
					this.next();
				} else {
					this.animate();
				}
			}
		} else {
			this.next();
		}
	}
}
</script>

<style>
.swiper {
	position: relative;
	width: 100%;
	overflow: hidden;
	height: 400px;
	display: flex;
}
.swiper-content {
	position: absolute;
	width: auto;
	height: 300px;
	display: flex;
}
.swiper-item {
	width: 100vw;
	height: 300px;
	background: red;
	border: 1px solid #adadda;
}
.btn {
	height: 40px;
	width: 100px;
	background: blue;
	position: absolute;
	bottom: 0;
	z-index: 1000000000000000;
}
.next {
	left: 200px;
}
</style>
