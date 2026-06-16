"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type HeroButterfly3DProps = {
  mouseX: number;
  mouseY: number;
};

export default function HeroButterfly3D({ mouseX, mouseY }: HeroButterfly3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    try {
      const mount = mountRef.current;
      if (!mount) return;

      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.shadowMap.enabled = true;
      mount.appendChild(renderer.domElement);

      // Lighting
      const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xffebcd, 0.8);
      dirLight.position.set(5, 8, 5);
      dirLight.castShadow = true;
      scene.add(dirLight);

      const pointLight = new THREE.PointLight(0xff9f5a, 1.2, 20);
      pointLight.position.set(-3, 2, 4);
      scene.add(pointLight);

      // Create butterfly group
      const butterfly = new THREE.Group();
      scene.add(butterfly);

      // Body
      const bodyGeom = new THREE.CapsuleGeometry(0.15, 1.2, 8, 16);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.3, roughness: 0.6 });
      const body = new THREE.Mesh(bodyGeom, bodyMat);
      butterfly.add(body);

      // Create wing helper function
      const createWing = (isLeft: boolean) => {
        const wingGeom = new THREE.BufferGeometry();
        const wingspan = 1.8;
        const wingHeight = 1.2;

        const vertices = new Float32Array([
          0, 0, 0, // 0: root
          wingspan * (isLeft ? -1 : 1), 0.4, 0.1, // 1: inner tip
          wingspan * 0.6 * (isLeft ? -1 : 1), wingHeight * 0.8, 0.05, // 2: center
          wingspan * 0.3 * (isLeft ? -1 : 1), wingHeight, 0, // 3: top
          wingspan * (isLeft ? -1 : 1), wingHeight * 0.5, 0.08, // 4: outer tip
        ]);

        const indices = new Uint16Array([0, 1, 2, 0, 2, 3, 0, 3, 4, 1, 2, 4]);

        wingGeom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
        wingGeom.setIndex(new THREE.BufferAttribute(indices, 1));
        wingGeom.computeVertexNormals();

        const wingMat = new THREE.MeshStandardMaterial({
          color: 0xff9f5a,
          emissive: 0xff7f3f,
          metalness: 0.8,
          roughness: 0.2,
          side: THREE.DoubleSide,
        });

        const wing = new THREE.Mesh(wingGeom, wingMat);
        wing.position.x = isLeft ? -0.2 : 0.2;
        wing.castShadow = true;
        wing.receiveShadow = true;
        return wing;
      };

      const leftWing = createWing(true);
      const rightWing = createWing(false);
      butterfly.add(leftWing);
      butterfly.add(rightWing);

      // Antennae
      const antennaGeom = new THREE.BufferGeometry();
      const antennaPts = [
        new THREE.Vector3(0, 0.7, 0),
        new THREE.Vector3(-0.3, 1.2, 0.1),
        new THREE.Vector3(-0.5, 1.5, 0.05),
      ];
      const antennaCurve = new THREE.CatmullRomCurve3(antennaPts);
      const antennaPts2 = antennaCurve.getPoints(8);
      antennaGeom.setFromPoints(antennaPts2);
      const antennaMat = new THREE.LineBasicMaterial({ color: 0xffcd94, linewidth: 2 });
      const antenna1 = new THREE.Line(antennaGeom, antennaMat);
      butterfly.add(antenna1);

      const antennaPts3 = [
        new THREE.Vector3(0, 0.7, 0),
        new THREE.Vector3(0.3, 1.2, 0.1),
        new THREE.Vector3(0.5, 1.5, 0.05),
      ];
      const antennaCurve2 = new THREE.CatmullRomCurve3(antennaPts3);
      const antennaPts4 = antennaCurve2.getPoints(8);
      antennaGeom.setFromPoints(antennaPts4);
      const antenna2 = new THREE.Line(antennaGeom, antennaMat);
      butterfly.add(antenna2);

      butterfly.scale.set(1.5, 1.5, 1.5);

      // Animation state
      let time = 0;
      let targetRotX = 0;
      let targetRotY = 0;

      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };

      window.addEventListener("resize", onResize);

      let frameId = 0;
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        time += 0.01;

        // Wing flapping
        const flapAmount = Math.sin(time * 6) * 0.6;
        leftWing.rotation.z = -flapAmount - 0.3;
        rightWing.rotation.z = flapAmount + 0.3;

        // Subtle body movement
        butterfly.position.y = Math.sin(time * 2) * 0.15;

        // Mouse influence
        targetRotY = mouseX * 0.5;
        targetRotX = mouseY * 0.5;

        butterfly.rotation.y += (targetRotY - butterfly.rotation.y) * 0.05;
        butterfly.rotation.x += (targetRotX - butterfly.rotation.x) * 0.05;

        // Glow pulse
        pointLight.intensity = 1.2 + Math.sin(time * 3) * 0.4;

        renderer.render(scene, camera);
      };

      animate();
      frameIdRef.current = frameId;

      return () => {
        cancelAnimationFrame(frameIdRef.current);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (mount && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      console.error("HeroButterfly3D error:", error);
      return () => {};
    }
  }, [mouseX, mouseY]);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-[5]"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
