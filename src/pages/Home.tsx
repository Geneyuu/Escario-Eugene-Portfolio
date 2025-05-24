import { useEffect, useState } from "react";
import Typed from "typed.js";
import HeroLayout from "../layouts/HeroLayout";
import logo from "../assets/images/fallingman.webp";
import { GoDownload } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { RiArrowDownDoubleLine } from "react-icons/ri";

import { Link, Element } from "react-scroll";

const Home = () => {
	const [hideScroll, setHideScroll] = useState(false);

	useEffect(() => {
		const typed = new Typed("#typing-text", {
			strings: [
				"Eugene Escario.",
				"a Web Developer.",
				"a Software Developer.",
				"a Problem Solver.",
				"a Design keen.",
			],
			typeSpeed: 50,
			backSpeed: 30,
			loop: true,
		});

		return () => typed.destroy();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const aboutSection = document.getElementById("about-section");
			if (!aboutSection) return;

			const top = aboutSection.getBoundingClientRect().top;
			setHideScroll(top <= window.innerHeight / 1.5);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<HeroLayout>
			<div className="flex flex-col md:flex-row justify-between items-start gap-10 mt-25 md:mt-50">
				<div className="flex flex-col flex-1 text-center md:text-left">
					<div className="relative inline-block w-fit overflow-hidden group mb-4 mx-auto md:mx-0">
						<div className="pl-5 text-white text-[14px] text-center md:text-left">
							<p className="rounded-2xl transition-all duration-500 ease-in-out group-hover:-translate-y-full">
								Available for Work
							</p>
							<p className="absolute top-full left-0 pl-5 transition-all duration-500 ease-in-out group-hover:translate-y-[-100%]">
								Available for Work
							</p>
						</div>
						<div className="absolute left-1 top-[5px] h-2.5 w-2.5 rounded-full bg-gradient-to-b from-green-400 to-green-600 shadow-[0_0_10px_#22c55e] animate-pulse z-10"></div>
					</div>

					<h1 className="anton w-full text-4xl font-normal md:text-4xl lg:text-[65px] md:w-[90%] text-white">
						Crafting Digital experiences with passion and bold
						creative ideas.
						<p className="inter flex justify-center md:justify-start text-xl items-center tracking-tight md:text-3xl lg:text-4xl font-medium my-5">
							I am{" "}
							<span
								id="typing-text"
								className="bg-gradient-to-br from-[#3ABFF8] to-[#146e7c] px-3 ml-2 rounded-md text-xl"
							></span>
						</p>
					</h1>

					<p className="text-gray-300 tracking-tight max-w-xl mx-auto md:mx-0">
						I'm a Full-Stack Developer based in Philippines. I have
						a passion for building web applications and solving
						problems.
					</p>

					<div className="flex flex-row md:flex-row items-center md:items-center gap-5 mt-5 justify-center md:justify-start">
						<NavLink to={"/lets-chat"}>
							<button className="inter text-white text-[14px] font-light cursor-pointer px-4 py-2 backdrop-blur-[2px] border border-white/15 rounded-md active:scale-90 transition-all duration-300">
								Get in Touch
							</button>
						</NavLink>

						<button className="inter flex gap-1 items-center text-white text-[14px] cursor-pointer z-100">
							<GoDownload size={18} /> Download CV
						</button>
					</div>
				</div>

				<div className="flex justify-center z-20 mx-auto -mt-10 items-center">
					<img
						src={logo}
						alt="Logo"
						className="object-contain transform rotate-[160deg] w-[clamp(12rem,16vw,30rem)]"
					/>
				</div>
			</div>

			{/* Scroll Down Button */}
			<div
				className={`w-full flex justify-center -mt-15 lg:mt-25 transition-opacity duration-300 ${
					hideScroll ? "invisible opacity-0" : "visible opacity-100"
				}`}
			>
				<Link
					to="about-section"
					smooth={true}
					duration={1000}
					offset={-100}
					className="cursor-pointer text-white flex flex-col items-center"
				>
					<span className="mb-2 text-sm md:text-base z-50 transition-all duration-300 group-hover:text-[#3ABFF8]">
						Scroll Down
					</span>
					<RiArrowDownDoubleLine
						size={23}
						className="animate-bounce"
					/>
				</Link>
			</div>

			{/* About Section */}
			<div className="h-screen mt-20 text-center md:text-left">
				<Element name="about-section" id="about-section">
					<div className="bg-black/10 backdrop-blur-sm rounded-xl p-10 text-white max-w-4xl mx-auto">
						<h2 className="text-2xl font-semibold">About Me</h2>
						<p className="mt-4">
							I’m passionate about building tools that help others
							thrive. I love turning problems into clean, elegant
							solutions.
						</p>
					</div>
				</Element>
			</div>
		</HeroLayout>
	);
};

export default Home;
