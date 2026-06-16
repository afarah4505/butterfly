"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ThreeBackdropProps = {
  nightMix: number;
  reduceEffects?: boolean;
};

export default function ThreeBackdrop({ nightMix, reduceEffects = false }: ThreeBackdropProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const canvas = document.createElement("canvas");
    const hasWebGL = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    if (!hasWebGL) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 24;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !reduceEffects,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, reduceEffects ? 1.2 : 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const pointCount = reduceEffects ? 420 : 1200;
    const positions = new Float32Array(pointCount * 3);

    for (let i = 0; i < pointCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf6f0df,
      size: 0.1,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const leafGeometry = new THREE.PlaneGeometry(0.7, 1.3);
    const leafMaterial = new THREE.MeshBasicMaterial({ color: 0x89b775, transparent: true, opacity: 0.3 });
    const leaves = new THREE.Group();

    for (let i = 0; i < (reduceEffects ? 14 : 40); i += 1) {
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set((Math.random() - 0.5) * 70, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 10);
      leaf.rotation.z = Math.random() * Math.PI;
      leaves.add(leaf);
    }

    scene.add(leaves);

    let mouseX = 0;
    let mouseY = 0;
    const onPointerMove = (event: PointerEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      if (!mount) {
        return;
      }
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", onResize);
    if (!reduceEffects) {
      window.addEventListener("pointermove", onPointerMove);
    }

    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const now = performance.now() * 0.0002;

      particles.rotation.y = now * 0.8;
      particles.rotation.x = now * 0.2;

      leaves.children.forEach((leaf, idx) => {
        leaf.position.y -= 0.03 + (idx % 5) * 0.002;
        leaf.position.x += Math.sin(now * 20 + idx) * 0.01;
        leaf.rotation.z += 0.002;
        if (leaf.position.y < -32) {
          leaf.position.y = 32;
          leaf.position.x = (Math.random() - 0.5) * 70;
        }
      });

      camera.position.x += (mouseX * 2.2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 2.2 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      if (!reduceEffects) {
        window.removeEventListener("pointermove", onPointerMove);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      leafGeometry.dispose();
      leafMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [reduceEffects]);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-[1] transition-opacity duration-700"
      style={{ opacity: 0.55 - nightMix * 0.15 }}
      aria-hidden="true"
    />
  );
}
