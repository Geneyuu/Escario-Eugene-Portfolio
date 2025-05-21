import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import MainLayout from "../layouts/MainLayout";
import Letschat from "../pages/Letschat";

export const AppRoutes = () => (
	<Routes>
		<Route element={<MainLayout />}>
			<Route path="/" element={<Home />} />
			<Route path="/about-me" element={<About />} />
			<Route path="/projects" element={<Projects />} />
			<Route path="/lets-chat" element={<Letschat />} />
		</Route>
	</Routes>
);
