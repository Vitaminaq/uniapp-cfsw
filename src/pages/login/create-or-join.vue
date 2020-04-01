<template>
	<view class="create-or-join">
		<view class="uni-padding-wrap">
			<view class="uni-title">请选择你的身份</view>
			<radio-group class="select-contain" @change="radioChange">
				<label class="radio"
					><radio :value="1" :checked="true" />老板</label
				>
				<label class="radio"><radio :value="2" />员工</label>
			</radio-group>
		</view>
		<input
			class="input-contain"
			type="text"
			@input="onInput"
			:placeholder="placeholder"
		/>
		<view class="submit-btn" @tap="submitIt">加入/创建公司</view>
	</view>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import api from '@/api/wechat';

@Component<CreateOrJoin>({})
export default class CreateOrJoin extends Vue {
	// 当前所选的身份
	public currentType: number = 1;
	public text: string = '';

	public get placeholder() {
		const { currentType } = this;
		if (currentType === 1) return '请输入要创建的公司名称';
		return '请输入要加入的公司编号';
	}

	public radioChange(e: any) {
		this.currentType = Number(e.detail.value);
	}
	public onInput(e: any) {
		this.text = e.detail.value;
	}
	public async submitIt() {
		let r = null;
		const { currentType, text } = this;
		if (!text)
			return uni.showToast({
				title: '请填写完整信息',
				icon: 'none',
				duration: 500
			});
		if (this.currentType === 1) {
			r = await api.createCompany({
				name: text
			});
			if (r.code !== 0) return;
		}
		const r1 = await api.joinCompany({
			cid: currentType === 1 ? r.data.cid : +text,
			type: currentType
		});
		if (r1.code !== 0)
			return uni.showToast({
				title: '请求失败',
				icon: 'none',
				duration: 500
			});
		return uni.redirectTo({ url: `/pages/index/index` });
	}
}
</script>

<style scoped>
.create-or-join {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.uni-title {
	margin-bottom: 20rpx;
	text-align: center;
}
.select-contain {
	margin-bottom: 40rpx;
}
.radio {
	margin-right: 10rpx;
}
.input-contain {
	padding: 10rpx;
	border-bottom: 1rpx solid #bcbcbc;
}
.submit-btn {
	margin-top: 160rpx;
	width: 498rpx;
	height: 94rpx;
	background: linear-gradient(
		90deg,
		rgba(68, 208, 255, 1) 0%,
		rgba(37, 180, 255, 1) 100%
	);
	border-radius: 47rpx;
	line-height: 94rpx;
	text-align: center;
	color: #fff;
}
</style>
