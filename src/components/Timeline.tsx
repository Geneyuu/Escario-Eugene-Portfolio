import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
	{
		year: "2022",
		title: "Frontend Developer",
		description: "Worked at XYZ Company.",
	},
	{
		year: "2023",
		title: "Full Stack Developer",
		description: "Worked at ABC Company.",
	},
	{
		year: "2024",
		title: "Senior Developer",
		description: "Leading projects and mentoring juniors.",
	},
];

const Timeline: React.FC = () => {
	const lineRef = useRef<HTMLDivElement | null>(null);
	const itemRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (lineRef.current) {
				gsap.fromTo(
					lineRef.current,
					{ height: 0 },
					{
						height: "100%",
						ease: "none",
						scrollTrigger: {
							trigger: lineRef.current.parentElement,
							start: "top center",
							end: "bottom center",
							scrub: true,
						},
					}
				);
			}

			itemRefs.current.forEach((el) => {
				gsap.fromTo(
					el,
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "power2.out",
						scrollTrigger: {
							trigger: el,
							start: "top 80%",
							end: "top 60%",
							scrub: true,
						},
					}
				);
			});
		});

		return () => ctx.revert();
	}, []);

	return (
		<div className="relative mx-auto max-w-4xl py-20 px-4">
			{/* Vertical Line with gradient fade mask */}
			<div
				ref={lineRef}
				className="absolute left-1/2 top-0 w-1 -translate-x-1/2 bg-gray-300 z-0"
				style={{
					height: 0, // initial height, animated by gsap
					// Use CSS mask for fade effect top & bottom
					WebkitMaskImage:
						"linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
					maskImage:
						"linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
				}}
			/>

			{/* Timeline Items */}
			<div className="space-y-20 relative z-10">
				{experiences.map((exp, i) => (
					<div
						key={i}
						ref={(el) => {
							if (el) {
								console.log("Element for index", i, ":", el);
								itemRefs.current[i] = el;
							}
						}}
						className="relative flex justify-start"
					>
						<div className="w-1/2 pr-10 text-right">
							<div className="inline-block bg-white shadow-lg rounded-lg p-6 border border-gray-200">
								<h3 className="text-xl font-bold text-black">
									{exp.year} - {exp.title}
								</h3>
								<p className="text-gray-600">
									{exp.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Timeline;
