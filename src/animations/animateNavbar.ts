import gsap from "gsap";
import type { GsapTarget } from "../types/animationTypes";

export const animateNavbar = (target: GsapTarget) => {
	if (!target) return;

	gsap.fromTo(
		target,
		{ y: -100, opacity: 0 },
		{
			y: 0,
			opacity: 1,
			duration: 0.5,
			ease: "bounce.inOut",
		}
	);
};
