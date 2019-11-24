const mTimerFormat = (time: number) => {
	const m = Math.floor(time / 60);
	const s = time - m * 60;
	const s1 = s === 0 ? '00' : s < 10 ? `0${s}` : s;
	return `${m}:${s1}`;
};
/**
 * 倒计时
 * @param that 当前实例
 * @param time 时长
 */
export const countDown = (that: any, time: number) => {
	const ts = time * 60;
	const start = Date.now();
	that.timer = setInterval(() => {
		const tms = ts - Math.floor((Date.now() - start) / 1000);
		if (!tms) return clearInterval(that.timer);
		that.time = mTimerFormat(tms);
	}, 1000);
};
