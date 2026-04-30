/**
 * @fileoverview 提供各种缓动函数，用于平滑滚动动画
 * @author wbw121124
 * @copyright GPL-3.0 License
 * @version 1.0.0
 */

import Easings from './easings';

/**
 * 平滑滚动到指定元素
 * @param {HTMLElement} element 目标元素
 * @param {number} [duration=500] 滚动持续时间，默认为 500ms
 * @param {function(number): number} [easing=Easings.easeInOutQuad] 缓动函数，默认为 `Easings.easeInOutQuad`
 * @returns {void} 返回值为 `void`
 */
function smoothScrollToElement(element: HTMLElement, duration: number = 500, easing: (progress: number) => number = Easings.easeInOutQuad): void {
	const startPosition = window.scrollY;

	// 获取 scroll-margin-top
	const computedStyle = window.getComputedStyle(element);
	const scrollMarginTop = parseFloat(computedStyle.scrollMarginTop) || 0;

	// 计算目标位置（减去 scroll-margin-top）
	const targetPosition = element.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
	const distance = targetPosition - startPosition;

	let startTime: any = null;

	/**
	 * 动画函数
	 */
	function animation(currentTime: any) {
		if (startTime === null) startTime = currentTime;
		const timeElapsed = currentTime - startTime;
		const progress = Math.min(timeElapsed / duration, 1);
		const ease = easing(progress);
		window.scrollTo(0, startPosition + distance * ease);

		if (timeElapsed < duration) {
			requestAnimationFrame(animation);
		}
	}

	requestAnimationFrame(animation);
}

export default smoothScrollToElement;