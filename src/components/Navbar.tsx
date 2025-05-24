import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaGithub, FaCog, FaTimes } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";

export default function Navbar() {
	const desktopNavRef = useRef<HTMLDivElement>(null);
	const desktopIndicatorRef = useRef<HTMLDivElement>(null);
	const mobileNavRef = useRef<HTMLDivElement>(null);
	const mobileIndicatorRef = useRef<HTMLDivElement>(null);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);

	// Desktop indicator update
	useEffect(() => {
		const updateDesktopIndicator = () => {
			const activeLink = desktopNavRef.current?.querySelector(
				".active"
			) as HTMLElement | null;
			if (activeLink && desktopIndicatorRef.current) {
				desktopIndicatorRef.current.style.left = `${activeLink.offsetLeft}px`;
				desktopIndicatorRef.current.style.width = `${activeLink.offsetWidth}px`;
			}
		};
		updateDesktopIndicator();
		window.addEventListener("resize", updateDesktopIndicator);
		return () =>
			window.removeEventListener("resize", updateDesktopIndicator);
	}, [pathname]);

	// Mobile indicator update
	useEffect(() => {
		const updateMobileIndicator = () => {
			const activeLink = mobileNavRef.current?.querySelector(
				".active"
			) as HTMLElement | null;
			if (activeLink && mobileIndicatorRef.current) {
				mobileIndicatorRef.current.style.top = `${activeLink.offsetTop}px`;
				mobileIndicatorRef.current.style.height = `${activeLink.offsetHeight}px`;
			}
		};
		updateMobileIndicator();
		window.addEventListener("resize", updateMobileIndicator);
		return () =>
			window.removeEventListener("resize", updateMobileIndicator);
	}, [pathname, menuOpen]);

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

			const routes = ["/", "/projects", "/lets-chat"];
			const currentIndex = routes.findIndex(
				(route) => route === pathname
			);
			if (currentIndex === -1) return;

			let newIndex = currentIndex;
			if (e.key === "ArrowRight") {
				newIndex = (currentIndex + 1) % routes.length;
			} else if (e.key === "ArrowLeft") {
				newIndex = (currentIndex - 1 + routes.length) % routes.length;
			}

			navigate(routes[newIndex]);
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [pathname, navigate]);

	const navLinkClass = ({ isActive }: { isActive: boolean }) =>
		`relative z-10 px-8 py-3 text-sm  font-medium rounded-md transition-colors duration-300 ${
			isActive
				? "text-white transition-all duration-800 active"
				: "text-white hover:text-white"
		}`;

	return (
		<nav className="inter flex items-center justify-between max-w-screen-xl md:max-w-screen-2xl fixed inset-x-0 top-0 mx-auto z-50 my-5 px-2">
			<img src={logo} className="h-12" alt="logo" />
			<div
				ref={desktopNavRef}
				className="md:flex hidden relative items-center ml-25 backdrop-blur-[2px] border border-white/15 py-1 px-3 rounded-xl"
			>
				<div
					ref={desktopIndicatorRef}
					className="absolute  top-2 bottom-2 bg-gradient-to-br from-[#3ABFF8] to-[#146e7c rounded-md transition-all duration-600 z-0"
				></div>

				<NavLink to="/" className={navLinkClass}>
					<h1 className="text-md">Home</h1>
				</NavLink>

				<NavLink to="/projects" className={navLinkClass}>
					<h1 className="text-md">Projects</h1>
				</NavLink>
				<NavLink to="/lets-chat" className={navLinkClass}>
					<h1 className="text-md">Contact</h1>
				</NavLink>
			</div>
			{/* Right Side */}
			<div className="flex items-center gap-4 mr-3 text-white text-sm">
				<a
					href="https://github.com/Geneyuu"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-1 hover:text-[#3ABFF8] transition-colors duration-300"
				>
					<FaGithub size={25} />
					<span className="hidden sm:inline">Geneyuu_</span>
				</a>
				<button
					title="Settings"
					className="p-2 rounded-full transition-transform duration-500 hover:rotate-90 cursor-pointer"
				>
					<FaCog size={19} />
				</button>
				<button
					className="md:hidden text-white cursor-pointer transition-all duration-500"
					onClick={() => setMenuOpen((prev) => !prev)}
				>
					{menuOpen ? (
						<FaTimes size={22} />
					) : (
						<HiMenuAlt1 size={22} />
					)}
				</button>
			</div>

			{/* Mobile Nav */}
			<div
				ref={mobileNavRef}
				className={`
                     absolute top-full mt-3 right-4
                     w-1/2 flex flex-col gap-1
                    rounded-xl border border-white/20 shadow-inner
                     overflow-hidden backdrop-blur-lg px-4 py-3 md:hidden
                     transition-all duration-300 ease-in-out
                   ${
						menuOpen
							? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
							: "opacity-0 scale-95 -translate-y-2 pointer-events-none"
					}
               `}
			>
				<div
					ref={mobileIndicatorRef}
					className="absolute left-2 right-2 bg-gradient-to-tl from-[#3ABFF8] to-[#146e7c] rounded-md transition-all duration-500 z-0"
				/>

				<NavLink to="/" className={navLinkClass}>
					Home
				</NavLink>
				<NavLink to="/projects" className={navLinkClass}>
					Projects
				</NavLink>
				<NavLink to="/lets-chat" className={navLinkClass}>
					Contact
				</NavLink>
			</div>
		</nav>
	);
}
