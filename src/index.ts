import { Easing } from './easings';

function smoothScrollToElement(element: HTMLElement, duration: number = 500, easing: Function = Easing.easeInOutQuad): void {
	const startPosition = window.scrollY;

	// 获取 scroll-margin-top
	const computedStyle = window.getComputedStyle(element);
	const scrollMarginTop = parseFloat(computedStyle.scrollMarginTop) || 0;

	// 计算目标位置（减去 scroll-margin-top）
	const targetPosition = element.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
	const distance = targetPosition - startPosition;

	let startTime: any = null;

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
export * from './easings';