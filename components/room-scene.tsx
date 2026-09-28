"use client";

import { ContactShadows } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneModeId } from "@/content/site";

const POSES: Record<SceneModeId, { pos: [number, number, number]; look: [number, number, number] }> = {
  observe: { pos: [0.95, 1.12, 2.15], look: [-0.28, 0.84, -1.05] },
  interpret: { pos: [0.2, 1.48, 1.72], look: [-0.32, 0.92, -1.1] },
  communicate: { pos: [-0.05, 1.02, 1.55], look: [-0.35, 0.8, -1.15] },
};

const FOG: Record<SceneModeId, { near: number; far: number }> = {
  observe: { near: 6, far: 16 },
  interpret: { near: 8, far: 20 },
  communicate: { near: 12, far: 28 },
};

const LIGHTS: Record<SceneModeId, { amb: number; lamp: number; sun: number; screen: number }> = {
  observe: { amb: 0.16, lamp: 36, sun: 0.12, screen: 0 },
  interpret: { amb: 0.28, lamp: 16, sun: 0.55, screen: 0.12 },
  communicate: { amb: 0.55, lamp: 7, sun: 1.7, screen: 0.4 },
};

function paintWood() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#7d5a3c";
  ctx.fillRect(0, 0, 512, 512);
  for (let row = 0; row < 70; row += 1) {
    ctx.strokeStyle = `rgba(48, 28, 14, ${0.08 + (row % 4) * 0.03})`;
    ctx.lineWidth = 1 + (row % 3);
    ctx.beginPath();
    ctx.moveTo(0, row * 8);
    ctx.bezierCurveTo(140, row * 8 + 6, 320, row * 8 - 4, 512, row * 8 + 3);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function paintPlaster() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#e4dfd6";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 900; i += 1) {
    const x = (i * 47) % 256;
    const y = (i * 19) % 256;
    const shade = 210 + (i % 30);
    ctx.fillStyle = `rgba(${shade}, ${shade - 4}, ${shade - 10}, 0.18)`;
    ctx.fillRect(x, y, 2, 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function edgeSamples() {
  const out: number[] = [];
  const boxes: Array<[number, number, number, number, number, number]> = [
    [-0.55, 0.74, -1.28, 1.62, 0.05, 0.72],
    [-0.72, 1.08, -1.52, 0.62, 0.4, 0.04],
    [-0.12, 0.46, -0.62, 0.46, 0.06, 0.46],
    [-0.12, 0.78, -0.82, 0.46, 0.56, 0.05],
    [0.05, 0.86, -1.18, 0.1, 0.22, 0.1],
    [-0.95, 0.8, -1.22, 0.18, 0.05, 0.24],
    [-1.05, 0.8, -1.38, 0.16, 0.07, 0.22],
    [-0.85, 1.52, -1.82, 1.28, 0.78, 0.04],
    [0, 1.2, -1.9, 4.6, 2.4, 0.08],
    [2.18, 1.05, 0.35, 0.06, 2.05, 0.78],
  ];
  for (const [cx, cy, cz, sx, sy, sz] of boxes) {
    const hx = sx / 2;
    const hy = sy / 2;
    const hz = sz / 2;
    const corners: Array<[number, number, number]> = [
      [-hx, -hy, -hz],
      [hx, -hy, -hz],
      [hx, hy, -hz],
      [-hx, hy, -hz],
      [-hx, -hy, hz],
      [hx, -hy, hz],
      [hx, hy, hz],
      [-hx, hy, hz],
    ];
    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];
    for (const [a, b] of edges) {
      for (let step = 0; step <= 6; step += 1) {
        const t = step / 6;
        out.push(
          cx + corners[a][0] + (corners[b][0] - corners[a][0]) * t,
          cy + corners[a][1] + (corners[b][1] - corners[a][1]) * t,
          cz + corners[a][2] + (corners[b][2] - corners[a][2]) * t,
        );
      }
    }
  }
  return new Float32Array(out);
}

function CameraRig({ mode, reduced }: { mode: SceneModeId; reduced: boolean }) {
  const camera = useThree((state) => state.camera);
  const look = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  const desiredLook = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const pose = POSES[mode];
    desired.set(...pose.pos);
    desiredLook.set(...pose.look);
    const k = reduced ? 1 : 1 - Math.exp(-delta * 2.6);
    camera.position.lerp(desired, k);
    look.lerp(desiredLook, k);
    camera.lookAt(look);
  });

  return null;
}

function StageLights({ mode, reduced }: { mode: SceneModeId; reduced: boolean }) {
  const ambient = useRef<THREE.AmbientLight>(null);
  const lamp = useRef<THREE.SpotLight>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const screen = useRef<THREE.MeshStandardMaterial>(null);
  const fog = useThree((state) => state.scene.fog) as THREE.Fog;

  useEffect(() => {
    if (!lamp.current) return;
    lamp.current.target.position.set(0.05, 0.4, -1.18);
    lamp.current.parent?.add(lamp.current.target);
    lamp.current.target.updateMatrixWorld();
  }, []);

  useFrame((_, delta) => {
    const target = LIGHTS[mode];
    const fogTarget = FOG[mode];
    const k = reduced ? 1 : 1 - Math.exp(-delta * 2.2);
    if (ambient.current) ambient.current.intensity += (target.amb - ambient.current.intensity) * k;
    if (lamp.current) lamp.current.intensity += (target.lamp - lamp.current.intensity) * k;
    if (sun.current) sun.current.intensity += (target.sun - sun.current.intensity) * k;
    if (screen.current) screen.current.emissiveIntensity += (target.screen - screen.current.emissiveIntensity) * k;
    if (fog) {
      fog.near += (fogTarget.near - fog.near) * k;
      fog.far += (fogTarget.far - fog.far) * k;
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={0.035} />
      <spotLight
        ref={lamp}
        position={[0.05, 1.18, -1.18]}
        angle={0.72}
        penumbra={0.85}
        intensity={28}
        distance={4.2}
        decay={2}
        color="#ffc48a"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0004}
      />
      <directionalLight ref={sun} position={[-2.2, 2.6, 0.2]} intensity={0.04} color="#d7e6f2" />
      <mesh position={[-0.72, 1.08, -1.5]} castShadow>
        <boxGeometry args={[0.58, 0.36, 0.01]} />
        <meshStandardMaterial ref={screen} color="#14181c" emissive="#1f4e5f" emissiveIntensity={0} roughness={0.4} />
      </mesh>
    </>
  );
}

function Samples({ mode }: { mode: SceneModeId }) {
  const positions = useMemo(() => edgeSamples(), []);
  return (
    <points visible={mode === "interpret"}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#1f4e5f" size={0.02} sizeAttenuation />
    </points>
  );
}

function RoomMesh() {
  const maps = useMemo(() => {
    const wood = paintWood();
    const plaster = paintPlaster();
    const floor = wood?.clone() ?? null;
    if (floor) floor.repeat.set(3, 2);
    const desk = wood?.clone() ?? null;
    if (desk) desk.repeat.set(1.4, 1);
    return { plaster, floor, desk };
  }, []);
  const { plaster, floor, desk } = maps;

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.15]} receiveShadow>
        <planeGeometry args={[4.8, 3.7]} />
        <meshStandardMaterial map={floor ?? undefined} color={floor ? "#ffffff" : "#7d5a3c"} roughness={0.78} />
      </mesh>
      <mesh position={[0, 1.2, -1.9]} receiveShadow>
        <boxGeometry args={[4.6, 2.4, 0.08]} />
        <meshStandardMaterial map={plaster ?? undefined} color={plaster ? "#ffffff" : "#e4dfd6"} roughness={0.94} />
      </mesh>
      <mesh position={[-2.26, 1.2, -0.15]} receiveShadow>
        <boxGeometry args={[0.08, 2.4, 3.5]} />
        <meshStandardMaterial map={plaster ?? undefined} color={plaster ? "#ffffff" : "#e4dfd6"} roughness={0.94} />
      </mesh>
      <mesh position={[2.26, 1.85, -0.15]}>
        <boxGeometry args={[0.08, 1.1, 3.5]} />
        <meshStandardMaterial map={plaster ?? undefined} color={plaster ? "#ffffff" : "#e4dfd6"} roughness={0.94} />
      </mesh>
      <mesh position={[2.26, 0.28, -0.85]}>
        <boxGeometry args={[0.08, 0.56, 2.1]} />
        <meshStandardMaterial map={plaster ?? undefined} color={plaster ? "#ffffff" : "#e4dfd6"} roughness={0.94} />
      </mesh>
      <mesh position={[0, 2.36, -1.05]}>
        <boxGeometry args={[4.6, 0.08, 1.7]} />
        <meshStandardMaterial color="#d5d8dc" roughness={0.9} />
      </mesh>
      <mesh position={[-0.85, 1.52, -1.84]}>
        <boxGeometry args={[1.36, 0.86, 0.04]} />
        <meshStandardMaterial color="#8ea0ae" roughness={0.35} metalness={0.05} />
      </mesh>
      <mesh position={[-0.85, 1.52, -1.8]}>
        <boxGeometry args={[1.2, 0.7, 0.015]} />
        <meshStandardMaterial color="#d5e4ee" transparent opacity={0.45} roughness={0.05} />
      </mesh>
      <mesh position={[-0.85, 1.52, -1.78]}>
        <boxGeometry args={[0.02, 0.7, 0.02]} />
        <meshStandardMaterial color="#d8d4cc" />
      </mesh>
      <mesh position={[-0.85, 1.52, -1.78]}>
        <boxGeometry args={[1.2, 0.02, 0.02]} />
        <meshStandardMaterial color="#d8d4cc" />
      </mesh>
      <mesh position={[-0.55, 0.74, -1.28]} castShadow receiveShadow>
        <boxGeometry args={[1.62, 0.05, 0.72]} />
        <meshStandardMaterial map={desk ?? undefined} color={desk ? "#ffffff" : "#4e382c"} roughness={0.58} />
      </mesh>
      {[
        [-1.25, -1.55],
        [0.15, -1.55],
        [-1.25, -1.02],
        [0.15, -1.02],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.35, z]} castShadow>
          <boxGeometry args={[0.05, 0.7, 0.05]} />
          <meshStandardMaterial color="#3a2a22" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[-0.72, 0.86, -1.52]} castShadow>
        <boxGeometry args={[0.08, 0.22, 0.08]} />
        <meshStandardMaterial color="#2a2e32" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[-0.72, 1.08, -1.54]} castShadow>
        <boxGeometry args={[0.66, 0.44, 0.04]} />
        <meshStandardMaterial color="#1c1e22" roughness={0.45} />
      </mesh>
      <mesh position={[-0.12, 0.46, -0.62]} castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.06, 0.46]} />
        <meshStandardMaterial color="#243038" roughness={0.8} />
      </mesh>
      <mesh position={[-0.12, 0.78, -0.82]} castShadow>
        <boxGeometry args={[0.46, 0.56, 0.05]} />
        <meshStandardMaterial color="#243038" roughness={0.8} />
      </mesh>
      {[
        [-0.3, -0.8],
        [0.06, -0.8],
        [-0.3, -0.44],
        [0.06, -0.44],
      ].map(([x, z]) => (
        <mesh key={`leg-${x}-${z}`} position={[x, 0.22, z]}>
          <boxGeometry args={[0.04, 0.44, 0.04]} />
          <meshStandardMaterial color="#2c3136" metalness={0.35} roughness={0.45} />
        </mesh>
      ))}
      <mesh position={[0.05, 0.78, -1.18]}>
        <cylinderGeometry args={[0.06, 0.07, 0.04, 20]} />
        <meshStandardMaterial color="#8e9398" metalness={0.72} roughness={0.32} />
      </mesh>
      <mesh position={[0.05, 0.96, -1.18]}>
        <cylinderGeometry args={[0.015, 0.015, 0.32, 12]} />
        <meshStandardMaterial color="#8e9398" metalness={0.72} roughness={0.32} />
      </mesh>
      <mesh position={[0.05, 1.16, -1.18]} castShadow>
        <cylinderGeometry args={[0.09, 0.16, 0.12, 24]} />
        <meshStandardMaterial color="#f4f0e8" emissive="#ffb060" emissiveIntensity={0.35} roughness={0.55} />
      </mesh>
      <mesh position={[-1.05, 0.8, -1.38]} castShadow>
        <boxGeometry args={[0.16, 0.07, 0.22]} />
        <meshStandardMaterial color="#1f4e5f" roughness={0.7} />
      </mesh>
      <mesh position={[-0.88, 0.79, -1.22]} castShadow>
        <boxGeometry args={[0.18, 0.05, 0.24]} />
        <meshStandardMaterial color="#6d3a32" roughness={0.72} />
      </mesh>
      <group position={[2.12, 0, 0.72]} rotation={[0, -0.55, 0]}>
        <mesh position={[0, 1.02, 0]} castShadow>
          <boxGeometry args={[0.05, 2.02, 0.72]} />
          <meshStandardMaterial color="#6a5344" roughness={0.68} />
        </mesh>
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.15, 0.012, -0.7]} receiveShadow>
        <planeGeometry args={[1.35, 1.15]} />
        <meshStandardMaterial color="#1f4e5f" roughness={0.92} />
      </mesh>
      <ContactShadows position={[0, 0.001, -0.2]} opacity={0.38} scale={9} blur={2.4} far={3.5} color="#171a1f" />
    </group>
  );
}

export function RoomScene({ mode, reduced }: { mode: SceneModeId; reduced: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidate();
  }, [mode, reduced, invalidate]);

  return (
    <>
      <fog attach="fog" args={["#d5d9de", 6, 16]} />
      <CameraRig mode={mode} reduced={reduced} />
      <StageLights mode={mode} reduced={reduced} />
      <RoomMesh />
      <Samples mode={mode} />
    </>
  );
}
