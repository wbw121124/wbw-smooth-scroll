/**
 * @fileoverview 提供各种缓动函数，用于平滑滚动动画
 * @author wbw121124
 * @copyright GPL-3.0 License
 * @version 1.0.0
 */

/**
 * 基本缓动函数集合
 */
const Easing = {
	// 线性（无缓动）
	linear: (t: number) => t,

	// === 二次方缓动（Quad） ===
	easeInQuad: (t: number) => t * t,
	easeOutQuad: (t: number) => t * (2 - t),
	easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,

	// === 三次方缓动（Cubic） ===
	easeInCubic: (t: number) => t * t * t,
	easeOutCubic: (t: number) => (--t) * t * t + 1,
	easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

	// === 四次方缓动（Quart） ===
	easeInQuart: (t: number) => t * t * t * t,
	easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
	easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,

	// === 五次方缓动（Quint） ===
	easeInQuint: (t: number) => t * t * t * t * t,
	easeOutQuint: (t: number) => 1 + (--t) * t * t * t * t,
	easeInOutQuint: (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
};

/**
 * 正弦缓动函数
 */
const SineEasing = {
	easeInSine: (t: number) => 1 - Math.cos(t * Math.PI / 2),
	easeOutSine: (t: number) => Math.sin(t * Math.PI / 2),
	easeInOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
};

/**
 * 指数缓动函数
 */
const ExpoEasing = {
	easeInExpo: (t: number) => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
	easeOutExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
	easeInOutExpo: (t: number) => {
		if (t === 0) return 0;
		if (t === 1) return 1;
		return t < 0.5
			? Math.pow(2, 20 * t - 10) / 2
			: (2 - Math.pow(2, -20 * t + 10)) / 2;
	},
};

/**
 * 圆形缓动函数
 */
const CircEasing = {
	easeInCirc: (t: number) => 1 - Math.sqrt(1 - t * t),
	easeOutCirc: (t: number) => Math.sqrt(1 - (--t) * t),
	easeInOutCirc: (t: number) => t < 0.5
		? (1 - Math.sqrt(1 - 4 * t * t)) / 2
		: (Math.sqrt(1 - 4 * (t - 1) * (t - 1)) + 1) / 2,
};

/**
 * 弹性缓动函数
 */
const ElasticEasing = {
	easeInElastic: (t: number) => {
		if (t === 0) return 0;
		if (t === 1) return 1;
		return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * (2 * Math.PI) / 3);
	},
	easeOutElastic: (t: number) => {
		if (t === 0) return 0;
		if (t === 1) return 1;
		return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1;
	},
	easeInOutElastic: (t: number) => {
		if (t === 0) return 0;
		if (t === 1) return 1;
		return t < 0.5
			? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI) / 4.5)) / 2
			: (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI) / 4.5)) / 2 + 1;
	},
};

/**
 * 回弹缓动函数（back）
 */
const BackEasing = {
	easeInBack: (t: number) => {
		const c1 = 1.70158;
		const c3 = c1 + 1;
		return c3 * t * t * t - c1 * t * t;
	},
	easeOutBack: (t: number) => {
		const c1 = 1.70158;
		const c3 = c1 + 1;
		return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
	},
	easeInOutBack: (t: number) => {
		const c1 = 1.70158;
		const c2 = c1 * 1.525;
		return t < 0.5
			? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
			: (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
	},
};

/**
 * 回弹缓动函数（bounce）
 */
const BounceEasing = {
	easeOutBounce: (t: number): number => {
		const n1 = 7.5625;
		const d1 = 2.75;

		if (t < 1 / d1) {
			return n1 * t * t;
		} else if (t < 2 / d1) {
			const adjustedT = t - 1.5 / d1;
			return n1 * adjustedT * adjustedT + 0.75;
		} else if (t < 2.5 / d1) {
			const adjustedT = t - 2.25 / d1;
			return n1 * adjustedT * adjustedT + 0.9375;
		} else {
			const adjustedT = t - 2.625 / d1;
			return n1 * adjustedT * adjustedT + 0.984375;
		}
	},
	easeInBounce: (t: number) => 1 - BounceEasing.easeOutBounce(1 - t),
	easeInOutBounce: (t: number) => t < 0.5
		? (1 - BounceEasing.easeOutBounce(1 - 2 * t)) / 2
		: (1 + BounceEasing.easeOutBounce(2 * t - 1)) / 2,
};

/**
 * 所有缓动函数的集合
 */
const Easings = {
	...Easing,
	...SineEasing,
	...ExpoEasing,
	...CircEasing,
	...ElasticEasing,
	...BackEasing,
	...BounceEasing,
}

export { Easing, SineEasing, ExpoEasing, BackEasing, CircEasing, BounceEasing, ElasticEasing, Easings };
export default Easings;