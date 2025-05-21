import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 2;
		const renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		containerRef.current?.appendChild(renderer.domElement);

		const particleCount = 1500; // medyo dami pero maliit kaya okay lang
		const positions = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount);

		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 15;
			positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
			positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
			velocities[i] = 0.001 + Math.random() * 0.03;
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute(
			"position",
			new THREE.BufferAttribute(positions, 3)
		);

		const texture = createSoftCircleTexture();

		const material = new THREE.PointsMaterial({
			map: texture,
			size: 0.04, // maliit na bilog
			transparent: true,
			alphaTest: 0.01,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			color: 0xffffff,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		const animate = () => {
			requestAnimationFrame(animate);
			const pos = geometry.attributes.position.array as Float32Array;

			for (let i = 0; i < particleCount; i++) {
				pos[i * 3 + 2] += velocities[i];
				if (pos[i * 3 + 2] > 7) {
					pos[i * 3 + 2] = -7;
				}
			}

			geometry.attributes.position.needsUpdate = true;
			renderer.render(scene, camera);
		};

		animate();

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			if (containerRef.current) {
				containerRef.current.removeChild(renderer.domElement);
			}
		};
	}, []);

	function createSoftCircleTexture() {
		const size = 60;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d")!;
		const center = size / 2;
		const radius = size / 2;

		const gradient = ctx.createRadialGradient(
			center,
			center,
			radius * 0.3,
			center,
			center,
			radius
		);
		gradient.addColorStop(0, "rgba(255,255,255,1)");
		gradient.addColorStop(0.7, "rgba(255,255,255,0.15)");
		gradient.addColorStop(1, "rgba(255,255,255,0)");

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(center, center, radius, 0, Math.PI * 2);
		ctx.fill();

		return new THREE.CanvasTexture(canvas);
	}

	return (
		<div
			ref={containerRef}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: -1,
				overflow: "hidden",
			}}
		/>
	);
}
