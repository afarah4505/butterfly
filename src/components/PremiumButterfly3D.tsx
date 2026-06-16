"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type PremiumButterfly3DProps = {
  mouseX: number;
  mouseY: number;
  isHovering?: boolean;
};

export default function PremiumButterfly3D({ mouseX, mouseY, isHovering = false }: PremiumButterfly3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    try {
      const mount = mountRef.current;
      if (!mount) return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x08161c, 0.018);
      const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 6;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.shadowMap.enabled = true;
      mount.appendChild(renderer.domElement);

      // Enhanced lighting for cinematic effect
      const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xffebcd, 1);
      dirLight.position.set(8, 10, 6);
      dirLight.castShadow = true;
      scene.add(dirLight);

      const pointLight1 = new THREE.PointLight(0xff9f5a, 1.5, 25);
      pointLight1.position.set(-4, 2, 5);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xff6b9d, 0.8, 20);
      pointLight2.position.set(4, 1, 3);
      scene.add(pointLight2);

      // Particle trail system
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const ages = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = 0;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
        velocities[i * 3] = (Math.random() - 0.5) * 0.1;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.62 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.4 + Math.random() * 0.2;
        ages[i] = Math.random();
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.08,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const shadow = new THREE.Mesh(
        new THREE.CircleGeometry(1.9, 48),
        new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.2,
          depthWrite: false,
        })
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.set(0, -2.05, -0.8);
      shadow.scale.set(1.8, 0.7, 1);
      scene.add(shadow);

      // Create butterfly group
      const butterfly = new THREE.Group();
      scene.add(butterfly);

      // Premium body with iridescent material
      const bodyGeom = new THREE.CapsuleGeometry(0.18, 1.3, 10, 20);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.6,
        roughness: 0.3,
        emissive: 0x332211,
        emissiveIntensity: 0.3,
      });
      const body = new THREE.Mesh(bodyGeom, bodyMat);
      butterfly.add(body);

      const createWingTexture = () => {
        const textureCanvas = document.createElement("canvas");
        textureCanvas.width = 512;
        textureCanvas.height = 512;
        const textureContext = textureCanvas.getContext("2d");
        if (!textureContext) {
          return null;
        }

        const gradient = textureContext.createRadialGradient(180, 140, 18, 260, 240, 330);
        gradient.addColorStop(0, "#fff2c8");
        gradient.addColorStop(0.22, "#f8c56e");
        gradient.addColorStop(0.52, "#dd7f37");
        gradient.addColorStop(0.82, "#8d3d1f");
        gradient.addColorStop(1, "#32150d");
        textureContext.fillStyle = gradient;
        textureContext.fillRect(0, 0, 512, 512);

        textureContext.strokeStyle = "rgba(255, 244, 206, 0.55)";
        textureContext.lineWidth = 6;
        textureContext.beginPath();
        textureContext.moveTo(70, 420);
        textureContext.quadraticCurveTo(200, 240, 260, 40);
        textureContext.stroke();

        textureContext.strokeStyle = "rgba(255, 222, 155, 0.36)";
        textureContext.lineWidth = 3;
        for (let i = 0; i < 8; i += 1) {
          const offset = 60 + i * 40;
          textureContext.beginPath();
          textureContext.moveTo(110, 420 - i * 10);
          textureContext.quadraticCurveTo(offset, 260 - i * 16, 320 + i * 10, 90 + i * 10);
          textureContext.stroke();
        }

        textureContext.fillStyle = "rgba(255, 249, 226, 0.14)";
        for (let i = 0; i < 28; i += 1) {
          const x = 50 + Math.random() * 380;
          const y = 70 + Math.random() * 360;
          const r = 6 + Math.random() * 20;
          textureContext.beginPath();
          textureContext.arc(x, y, r, 0, Math.PI * 2);
          textureContext.fill();
        }

        const texture = new THREE.CanvasTexture(textureCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        return texture;
      };

      const wingTexture = createWingTexture();

      // Wing creation with gradient texture
      const createWing = (isLeft: boolean) => {
        const wingGeom = new THREE.BufferGeometry();
        const wingspan = 2;
        const wingHeight = 1.4;

        const vertices = new Float32Array([
          0, 0, 0, wingspan * (isLeft ? -1 : 1), 0.5, 0.15,
          wingspan * 0.7 * (isLeft ? -1 : 1), wingHeight * 0.9, 0.1, wingspan * 0.35 * (isLeft ? -1 : 1), wingHeight, 0.02,
          wingspan * (isLeft ? -1 : 1), wingHeight * 0.6, 0.12,
        ]);

        const indices = new Uint16Array([0, 1, 2, 0, 2, 3, 0, 3, 4, 1, 2, 4]);

        wingGeom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
        wingGeom.setIndex(new THREE.BufferAttribute(indices, 1));
        wingGeom.computeVertexNormals();

        // Iridescent wing material
        const wingMat = new THREE.MeshStandardMaterial({
          color: 0xff8f3a,
          emissive: 0xff6b1a,
          emissiveIntensity: 0.5,
          metalness: 0.68,
          roughness: 0.22,
          map: wingTexture ?? undefined,
          side: THREE.DoubleSide,
        });

        const wing = new THREE.Mesh(wingGeom, wingMat);
        wing.castShadow = true;
        wing.receiveShadow = true;
        wing.userData.isWing = true;

        const wingGlowMat = new THREE.MeshBasicMaterial({
          color: 0xfff0bf,
          transparent: true,
          opacity: 0.12,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const wingGlow = new THREE.Mesh(wingGeom, wingGlowMat);
        wingGlow.scale.set(1.06, 1.06, 1.06);

        const wingGroup = new THREE.Group();
        wingGroup.position.x = isLeft ? -0.18 : 0.18;
        wingGroup.add(wingGlow);
        wingGroup.add(wing);
        wingGroup.userData.isWing = true;
        return wingGroup;
      };

      const leftWing = createWing(true);
      const rightWing = createWing(false);
      butterfly.add(leftWing);
      butterfly.add(rightWing);

      // Antennae with glow
      const createAntenna = (isLeft: boolean) => {
        const antennaGeom = new THREE.BufferGeometry();
        const pts = [
          new THREE.Vector3(0, 0.8, 0),
          new THREE.Vector3((isLeft ? -0.35 : 0.35), 1.3, 0.15),
          new THREE.Vector3((isLeft ? -0.55 : 0.55), 1.65, 0.08),
        ];
        const curve = new THREE.CatmullRomCurve3(pts);
        const points = curve.getPoints(12);
        antennaGeom.setFromPoints(points);
        const antennaMat = new THREE.LineBasicMaterial({
          color: 0xffd94a,
          linewidth: 3,
          fog: false,
        });
        return new THREE.Line(antennaGeom, antennaMat);
      };

      butterfly.add(createAntenna(true));
      butterfly.add(createAntenna(false));

      // Crown/halo effect
      const haloGeom = new THREE.TorusGeometry(0.6, 0.08, 16, 100);
      const haloMat = new THREE.MeshStandardMaterial({
        color: 0xffff99,
        emissive: 0xffff00,
        emissiveIntensity: 0.8,
        metalness: 1,
        roughness: 0,
        transparent: true,
        opacity: 0.3,
      });
      const halo = new THREE.Mesh(haloGeom, haloMat);
      halo.rotation.x = Math.PI / 3;
      halo.position.y = 0.3;
      butterfly.add(halo);

      butterfly.scale.set(1.6, 1.6, 1.6);

      // Cocoon reveal animation
      const cocoonGeom = new THREE.IcosahedronGeometry(0.7, 4);
      const cocoonMat = new THREE.MeshStandardMaterial({
        color: 0x8b7355,
        emissive: 0xffa500,
        emissiveIntensity: 0.4,
        metalness: 0.3,
        roughness: 0.8,
        transparent: true,
        opacity: 1,
      });
      const cocoon = new THREE.Mesh(cocoonGeom, cocoonMat);
      cocoon.scale.set(1.5, 1.8, 1.5);
      scene.add(cocoon);

      // Animation state
      let time = 0;
      let targetRotX = 0;
      let targetRotY = 0;
      let particleIndex = 0;

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
        time += 0.016;

        // Cocoon reveal animation (0-3 seconds)
        const revealTime = Math.min(time, 3);
        const revealPercent = revealTime / 3;

        // Cocoon fade out and scale down
        cocoon.material.opacity = Math.max(0, 1 - revealPercent * 1.3);
        cocoon.scale.set(
          1.5 * (1 + revealPercent * 0.3),
          1.8 * (1 + revealPercent * 0.3),
          1.5 * (1 + revealPercent * 0.3)
        );

        // Butterfly visibility
        butterfly.visible = revealPercent > 0.3;

        // Wing flapping - more dramatic and realistic
        const flapAmount = Math.sin(time * 7) * 0.75;
        leftWing.rotation.z = -flapAmount * 1.1 - 0.35;
        rightWing.rotation.z = flapAmount * 1.1 + 0.35;

        // Subtle body undulation
        butterfly.position.y = Math.sin(time * 1.8) * 0.2;
        butterfly.position.x = Math.cos(time * 1.3) * 0.08;

        // Mouse influence with smooth lerp
        targetRotY = mouseX * 0.6;
        targetRotX = mouseY * 0.6;

        butterfly.rotation.y += (targetRotY - butterfly.rotation.y) * 0.06;
        butterfly.rotation.x += (targetRotX - butterfly.rotation.x) * 0.06;

        // Enhanced glow pulse
        pointLight1.intensity = 1.5 + Math.sin(time * 2.5) * 0.6;
        pointLight2.intensity = 0.8 + Math.cos(time * 3) * 0.4;
        shadow.material.opacity = 0.12 + Math.max(0, 0.08 - Math.abs(flapAmount) * 0.02);
        shadow.scale.set(1.8 + Math.sin(time * 1.4) * 0.08, 0.7 + Math.abs(flapAmount) * 0.08, 1);

        // Halo rotation
        const haloChild = butterfly.children.find((c) => c instanceof THREE.Mesh && c.geometry instanceof THREE.TorusGeometry);
        if (haloChild) {
          haloChild.rotation.z = time * 1.2;
          haloChild.rotation.x = Math.PI / 3 + Math.sin(time * 0.8) * 0.3;
        }

        // Particle trail emission from wings
        const positionsAttr = particleGeometry.attributes.position.array as Float32Array;
        const velocitiesAttr = velocities as Float32Array;
        const agesAttr = ages as Float32Array;

        // Emit particles from wing positions
        const wingPos = new THREE.Vector3();
        const leftWingObj = butterfly.children.find((c) => c.userData.isWing && c.position.x < 0);
        if (leftWingObj) {
          leftWingObj.getWorldPosition(wingPos);
          for (let i = 0; i < 3; i++) {
            const idx = (particleIndex % particleCount) * 3;
            positionsAttr[idx] = wingPos.x + (Math.random() - 0.5) * 0.2;
            positionsAttr[idx + 1] = wingPos.y + (Math.random() - 0.5) * 0.2;
            positionsAttr[idx + 2] = wingPos.z + (Math.random() - 0.5) * 0.2;
            velocitiesAttr[idx] = (Math.random() - 0.5) * 0.15;
            velocitiesAttr[idx + 1] = (Math.random() - 0.5) * 0.15;
            velocitiesAttr[idx + 2] = (Math.random() - 0.5) * 0.15;
            agesAttr[particleIndex % particleCount] = 0;
            particleIndex++;
          }
        }

        // Update particles
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          positionsAttr[idx] += velocitiesAttr[idx];
          positionsAttr[idx + 1] += velocitiesAttr[idx + 1] - 0.002; // gravity
          positionsAttr[idx + 2] += velocitiesAttr[idx + 2];

          agesAttr[i] += 0.01;

          if (agesAttr[i] > 1) {
            positionsAttr[idx] = 0;
            positionsAttr[idx + 1] = 0;
            positionsAttr[idx + 2] = 0;
          }
        }

        particleGeometry.attributes.position.needsUpdate = true;
        particleGeometry.attributes.color.needsUpdate = true;

        // Swarm effect on hover
        if (isHovering) {
          butterfly.rotation.z += Math.sin(time * 5) * 0.1;
          pointLight1.intensity = Math.min(2.5, pointLight1.intensity + 0.02);
        }

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
      console.error("PremiumButterfly3D error:", error);
      return () => {};
    }
  }, [mouseX, mouseY, isHovering]);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-[5]"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
