<template>
	<view
		class="content"
		@touchstart="(e) => touchStart(e)"
		@touchend="(e) => touchEnd(e)"
	>
		<view class="item" v-for="item in currentItem" :key="item.id">{{
			item.text
		}}</view>
		<view @click="toggle"> 点击</view>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component<Index>({})
export default class Index extends Vue {
	public title: string = '你好123';
	public touchStartX = 0;
	public task = {
		current: 0,
		list: [
			{
				id: 0,
				text: '1'
			},
			{
				id: 1,
				text: '2'
			},
			{
				id: 2,
				text: '3'
			}
		]
	};
	public get currentItem() {
		return this.task.list.filter((i) => i.id === this.task.current);
	}

	public toggle() {
		this.task.current++;
	}
	public touchStart(e: any) {
		this.touchStartX = e.changedTouches[0].clientX;
	}
	public touchEnd(e: any) {
		if (!this.task.current) return;
		if (e.changedTouches[0].clientX - this.touchStartX > 20) {
			this.task.current--;
		}
	}
}
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
}
.item {
	height: 200px;
	width: 200px;
	background-color: red;
}
</style>
