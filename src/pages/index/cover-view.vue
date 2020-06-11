<template>
	<view>
		<movable-area
			class="movable-area"
			:style="{ height: containHeight }"
			@touchend="onTouchEnd"
			@touchstart="onTouchStart"
		>
			<movable-view
				v-for="item in movableList"
				:key="item.sort"
				:x="item.scrollX || item.x"
				:y="item.scrollY || item.y"
				:disabled="item.disabled"
				direction="all"
				:style="{ height: `${cellHeight}px`, width: `${cellWidth}px` }"
				@change="onChange($event, item)"
			>
				<view class="table-cell">{{ item.title }}</view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { boundingClientRect } from '@/utils/publics';

interface MovableItem {
	icon: string;
	title: string;
	sort: number;
	x: number;
	y: number;
	scrollX: number;
	scrollY: number;
	maxX: number;
	maxY: number;
}

@Component<CoverView>({})
export default class CoverView extends Vue {
	@Prop({ default: 4 }) rowCount!: number;
	@Prop({ default: 100 }) cellHeight!: number;
	@Prop({ default: '100vh' }) containHeight!: number;
	// @Prop({ default: () => {} }) list!: MovableItem[];

	public list = [
		{
			icon: 'icon1',
			title: 'title1'
		},
		{
			icon: 'icon1',
			title: 'title2'
		},
		{
			icon: 'icon1',
			title: 'title3'
		},
		{
			icon: 'icon1',
			title: 'title4'
		},
		{
			icon: 'icon1',
			title: 'title5'
		},
		{
			icon: 'icon1',
			title: 'title6'
		},
		{
			icon: 'icon1',
			title: 'title7'
		}
	];
	public containWidth: number = 0;
	public movableList: MovableItem[] = [];
	public currentItem: MovableItem | null = null;
	public crashItem: MovableItem | null = null;
	public currentType: string = 'noStart';

	public get cellWidth() {
		return this.containWidth / this.rowCount;
	}
	// 面积
	public get cellArea() {
		return this.cellHeight * this.cellWidth;
	}

	public async created() {
		await this.$nextTick();
		const { width = 0 } = await boundingClientRect(this, '.movable-area');
		this.containWidth = width;
		this.movableList = this.list.map((item, index) => {
			const x = this.cellWidth * (index % this.rowCount);
			const y = this.cellHeight * Math.floor(index / this.rowCount);
			return {
				sort: index,
				x,
				y,
				scrollX: 0,
				scrollY: 0,
				maxX: x + this.cellWidth,
				maxY: y + this.cellHeight,
				// disabled: true,
				...item
			};
		});
	}

	public onChange(e: any, currentItem: MovableItem) {
		const { x, y } = e.detail;
		if (this.currentType === 'end') return;
		this.currentType = 'move';
		!this.currentItem && (this.currentItem = { ...currentItem });
		if (this.currentItem && this.currentItem.sort !== currentItem.sort)
			return;
		const maxX = x + this.cellWidth;
		const maxY = y + this.cellHeight;
		const { sort } = currentItem;
		// 碰撞检测 - 检测碰撞方向 - 检测有效碰撞
		this.movableList.forEach((item) => {
			if (sort === item.sort) {
				if (this.crashItem && sort === this.crashItem.sort) return;
				this.movableList[sort].x = x;
				this.movableList[sort].y = y;
				return;
			}
			// 左上角碰撞
			if (
				x > item.x &&
				x < item.maxX &&
				y > item.y &&
				y < item.maxY &&
				((item.maxX - x) * (item.maxY - y)) / this.cellArea > 0.6
			) {
				console.log('有效左上角碰撞');
				if (!this.currentItem) return;
				this.movableList[item.sort].scrollX = this.currentItem.x;
				this.movableList[item.sort].scrollY = this.currentItem.y;
				this.crashItem = item;
			} else if (
				maxX > item.x &&
				maxX < item.maxX &&
				y > item.y &&
				y < item.maxY &&
				((maxX - item.x) * (item.maxY - y)) / this.cellArea > 0.6
			) {
				console.log('有效右上角碰撞');
				if (!this.currentItem) return;
				this.movableList[item.sort].scrollX = this.currentItem.x;
				this.movableList[item.sort].scrollY = this.currentItem.y;
				this.crashItem = item;
			} else if (
				x > item.x &&
				x < item.maxX &&
				maxY > item.y &&
				maxY < item.maxY &&
				((item.maxX - x) * (maxY - item.y)) / this.cellArea > 0.6
			) {
				// 左下角碰撞
				console.log('有效左下角碰撞');
				if (!this.currentItem) return;
				this.movableList[item.sort].scrollX = this.currentItem.x;
				this.movableList[item.sort].scrollY = this.currentItem.y;
				this.crashItem = item;
			} else if (
				maxX > item.x &&
				maxX < item.maxX &&
				maxY > item.y &&
				maxY < item.maxY &&
				((maxX - item.x) * (maxY - item.y)) / this.cellArea > 0.6
			) {
				// 右下角碰撞
				console.log('有效右下角碰撞');
				if (!this.currentItem) return;
				this.movableList[item.sort].scrollX = this.currentItem.x;
				this.movableList[item.sort].scrollY = this.currentItem.y;
				this.crashItem = item;
			}
		});
	}
	public onTouchStart() {
		this.currentType = 'noStart';
	}
	public onTouchEnd(e: any) {
		// 碰撞失败则回弹
		this.currentType = 'end';
		if (!this.currentItem) return;
		// 碰撞有效，交换位置
		console.log(this.crashItem, 'iiiiiiiiiiiiiiiiiiiiiii');
		if (this.crashItem) {
			this.movableList[this.currentItem.sort].x = this.crashItem.x;
			this.movableList[this.currentItem.sort].y = this.crashItem.y;
			this.movableList[this.crashItem.sort].x = this.currentItem.x;
			this.movableList[this.crashItem.sort].y = this.currentItem.y;
			this.movableList = this.movableList.map((item) => {
				item.scrollY = 0;
				item.scrollX = 0;
				return item;
			});
			console.log(this.movableList);
			this.crashItem = null;
			this.currentItem = null;
			return;
		}
		this.movableList[this.currentItem.sort] = this.currentItem;
		this.currentItem = null;
	}
}
</script>

<style>
movable-area {
	width: 100%;
}
movable-view {
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1rpx solid #bcbbbc;
}
.table-cell {
	border: 1rpx solid red;
	height: 100rpx;
	width: 100rpx;
	background: #fff;
}
</style>
