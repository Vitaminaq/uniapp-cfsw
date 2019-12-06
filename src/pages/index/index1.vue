<template>
	<view class="content">
		<!-- {{ time }} -->
		<view class="list">
			<view
				v-for="(i1, idx1) in list"
				class="child"
				:key="i1.id"
				:id="idx1"
				@click="(e) => select1(e)"
				>{{ i1.text }}</view
			>
		</view>
		<view class="list">
			<view
				v-for="(i2, idx2) in list1"
				class="child"
				:key="i2.id"
				:id="idx2"
				@click="(e) => select2(e)"
				>{{ i2.text }}</view
			>
		</view>
		<view
			class="line"
			v-for="item in lines"
			:key="item.name"
			:id="item.name"
			:style="item.value"
			@click="(e) => cancel(e)"
		></view>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { countDown } from '@/utils/publics';
@Component<Index>({})
export default class Index extends Vue {
	public title: string = '你好123';
	public startX = 0;
	public startY = 0;
	public endX = 0;
	public endY = 0;
	public currentStr = '';
	public time = '2:00';
	public timer = 0;
	public domHeight = 0;
	public domWidth = 0;

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
	public lines: any[] = [];

	public onLoad() {
		countDown(this, 1);
	}

	public async mounted() {
		const len = this.list.length;
		const len1 = this.list1.length;
		for (let x = 0; x < len; x++) {
			for (let y = 0; y < len1; y++) {
				this.lines.push({
					name: `${x},${y}`,
					value: ''
				});
			}
		}
		await this.$nextTick();
		uni.createSelectorQuery()
			.in(this)
			.select('.child')
			.boundingClientRect((e) => {
				this.domHeight = e.height || 0;
				this.domWidth = e.width || 0;
			})
			.exec();
	}

	// 保存左边盒子的中心点坐标
	public select1(e: any) {
		console.log(e);
		const { id, offsetLeft, offsetTop } = e.target;
		// 63盒子高度
		this.startX = offsetLeft + this.domWidth;
		this.startY = this.domHeight / 2 + offsetTop;
		console.log('当前左边边盒子中心点左边x, y', this.startX, this.startY);

		// 保存当前连线左边点
		this.currentStr = id;
	}
	public select2(e: any) {
		if (!this.currentStr) return;
		const { id, offsetLeft, offsetTop } = e.target;
		// 计算右边盒子的中心值
		this.endX = offsetLeft;
		this.endY = this.domHeight / 2 + offsetTop;
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

		// 拼接当前连线两点
		const tp = `${this.currentStr},${id}`;
		console.log('当前连线两点', tp);

		// 移动对应线条
		const ls = this.lines;
		const lsn = ls.length;
		for (let i = 0; i < lsn; i++) {
			if (ls[i].name === tp) {
				ls[
					i
				].value = `top: ${this.startY}px; left: ${this.startX}px; transform: rotate(${α}deg); width: ${r}px; transform-origin: left top;`;
				this.lines = [...ls];
				return;
			}
		}
		console.log('当前连线情况', this.lines);
	}
	// 取消连线
	public cancel(e: any) {
		const { id } = e.target;
		const ls = this.lines;
		const lsn = ls.length;
		// this.lines为对象是第二次无法触发试图更新
		for (let i = 0; i < lsn; i++) {
			if (ls[i].name === id) {
				ls[i].value = `top: -999px`;
				this.lines = [...ls];
				return;
			}
		}
		this.currentStr = '';
		console.log(this.lines, 'jjjjjjjjjjjjjjjjjjjjjjjjj');
		console.log('取消两点连线', id);
	}
}
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
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
.line {
	position: absolute;
	top: -999px;
	height: 2px;
	width: 100px;
	background-color: red;
}
</style>
