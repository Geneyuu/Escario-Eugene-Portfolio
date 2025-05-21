import { useState } from "react";
import ParticleBackground from "./components/ParticleBackground";

export default function App() {
	return (
		<div className="z-0 min-h-screen flex items-center justify-center">
			<ParticleBackground />
			<h1 className="text-white text-5xl">In Infinity And Beyond</h1>
		</div>
	);
}
