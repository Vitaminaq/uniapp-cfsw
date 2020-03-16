<template>
	<view>
		<view
			class="swiper"
			@touchstart="onTouchStart"
			@touchmove="onTouchMove"
			@touchend="onTouchEnd"
		>
			<view
				class="swiper-item"
				v-for="item in list"
				:key="item.index"
				:style="{ transform: `translateX(${item.distance})` }"
				:animation="animations[`animationData${item.index}`]"
			>
				<!-- {{ currentIndex }} -->
				<solt />
			</view>
		</view>
		<view @tap="pre">上一节</view>
		<view @tap="next">下一节</view>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { boundingClientRect, toPercent } from '@/utils/publics';

interface Point {
	x: number;
	y: number;
}
@Component<Swiper>({})
export default class Swiper extends Vue {
	// 记录当前索引
	public currentIndex: number = 0;
	// 储存动画队列
	public animations: any = {};
	// 记录触摸开始点
	public startPoint: any = null;
	// 记录触摸开始时间
	public startTime: number = 0;
	// 获取swiper真实宽度
	public swiperWidth: number = 0;

	public get list() {
		return Array.from({ length: 50 }, (v, i) => {
			return {
				distance: `${i}00%`,
				index: i
			};
		});
	}
	public async created() {
		this.list.forEach((item: any) => {
			this.$set(
				this.animations,
				`animation${item.index}`,
				uni.createAnimation({
					duration: 300,
					timingFunction: 'ease'
				})
			);
			this.$set(
				this.animations,
				`animationMove${item.index}`,
				uni.createAnimation({
					duration: 0,
					timingFunction: 'ease'
				})
			);
			this.$set(this.animations, `animationData${item.index}`, {});
		});
		const r = await boundingClientRect(this, '.swiper');
		this.swiperWidth = r.width || 0;
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
		this.list.forEach((v, i) => {
			this.animations[`animation${i}`]
				.translateX(`${i - this.currentIndex}00%`)
				.step();
			this.animations[`animationData${i}`] = this.animations[
				`animation${i}`
			].export();
		});
	}
	/**
	 * 计算手指滑动速度
	 */
	public calculateSpeed() {}
	/**
	 * 计算手指滑动直线距离
	 */
	public calculateDistance(type: 'move' | 'end', x: number, y: number) {
		const lenX = x - this.startPoint.x;
		// const lenY = y - this.startPoint.y;
		if (lenX > 0) {
			console.log('左滑后退');
		} else {
			console.log('右滑向前');
		}
		type === 'move' && this.animateMove(lenX);
		return lenX / this.swiperWidth;
	}
	public animateMove(distance: number) {
		this.list.forEach((v, i) => {
			// 获取当前位置
			const percent = toPercent(
				i - this.currentIndex + distance / this.swiperWidth
			);
			this.animations[`animationMove${i}`].translateX(percent).step();
			this.animations[`animationData${i}`] = this.animations[
				`animationMove${i}`
			].export();
		});
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
			// this.animate();
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
	height: 400px;
}
.swiper-item {
	position: absolute;
	height: 100%;
	width: 100%;
	background: red;
	border: solid 1px #adadda;
	will-change: transform;
}
</style>
