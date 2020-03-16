<template>
	<view class="index">
		<MySwiper />
		<view class="add-btn" @tap="add">add</view>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MySwiper from '@/components/swiper/swiper1.vue';
@Component<Index>({
	components: {
		MySwiper
	}
})
export default class Index extends Vue {
	public current: number = 0;
	public get list() {
		return Array.from({ length: 50 }, (v, i) => {
			return {
				distance: `${i}00%`,
				index: i
			};
		});
	}

	public add() {
		this.current++;
	}
}
</script>

<style>
.swiper-item {
	width: 100vw;
	height: 300px;
}
.add-btn {
	position: fixed;
	bottom: 0;
}
</style>
