import gsap from "gsap";
import type { GsapTargetPage } from "../types/animatePageType";

export const animatePage = (target: GsapTargetPage) => {
	if (!target) return;

	gsap.fromTo(
		target,
		{ y: 30, opacity: 0 },
		{
			y: 0,
			opacity: 1,
			duration: 0.3,
			ease: "power2.out",
		}
	);
};
