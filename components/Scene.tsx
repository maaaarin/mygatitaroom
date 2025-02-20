"use client"
import { useGLTF, OrbitControls, PerspectiveCamera, Environment, useHelper, useAnimations } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, Suspense, useState } from 'react'
import * as THREE from "three";
import { Loading } from './Loading';
import Image from 'next/image';
import clsx from 'clsx';
import { Board } from './Board';

type CameraPosition = {
    x: number;
    y: number;
    z: number;
};

type CameraRotation = {
    x: number;
    y: number;
    z: number;
};

type CamerasType = {
    [key: string]: {
        position: CameraPosition;
        rotation: CameraRotation;
    };
};

const cameras: CamerasType = {
    home: {
        position: { x: 0.75, y: 3.15, z: 3 },
        rotation: { x: -0.225, y: -1.0, z: -0.20 }
    },
    board: {
        position: { x: 3.475, y: 3.855, z: -2.5 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    bed: {
        position: { x: 3.35, y: 2.35, z: 2.25 },
        rotation: { x: -3, y: -1.12, z: -3 }
    },
    window: {
        position: { x: 4.8, y: 3.25, z: 0.4 },
        rotation: { x: 1.31, y: -1.52, z: 1.31 }
    },
};

function RoomModel() {
    const { scene, animations } = useGLTF("/models/gatitaroom.glb");
    const { actions } = useAnimations(animations, scene); // Get animation actions

    // Play the first animation
    useEffect(() => {
        if (actions && animations.length > 0) {
            actions[animations[0].name]?.play();
        }
    }, [actions, animations]);

    return <primitive object={scene} scale='0.25' />
}

function Cameras({ selectedCamera }: { selectedCamera: string }) {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
    const targetRotation = useRef(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0)));
    const lerpSpeed = 0.05;
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Camera selected
        if (selectedCamera) {
            targetPosition.current.set(cameras[selectedCamera].position.x, cameras[selectedCamera].position.y, cameras[selectedCamera].position.z);
            targetRotation.current.setFromEuler(new THREE.Euler(cameras[selectedCamera].rotation.x, cameras[selectedCamera].rotation.y, cameras[selectedCamera].rotation.z));
        }
    }, [selectedCamera]);

    useFrame(() => {
        if (cameraRef.current) {
            if (isFirstRender.current) {
                cameraRef.current.position.copy(targetPosition.current);
                cameraRef.current.quaternion.copy(targetRotation.current);
                isFirstRender.current = false;
            } else {
                cameraRef.current.position.lerp(targetPosition.current, lerpSpeed);
                cameraRef.current.quaternion.slerp(targetRotation.current, lerpSpeed);
            }
        }
    });

    return (
        <PerspectiveCamera
            makeDefault
            fov={75}
            near={0.1}
            far={1000}
            ref={cameraRef}
        />
    );
}

const Lights = () => {
    // const directionalRef = useRef<THREE.DirectionalLight>(null);
    const spotRef = useRef<THREE.SpotLight>(null);
    const spotRef2 = useRef<THREE.SpotLight>(null);
    useFrame(() => {
        if (spotRef.current && spotRef2.current) {
            spotRef.current.target.updateMatrixWorld();
            spotRef2.current.target.updateMatrixWorld();
        }
    });
    return (
        <>
            {/* {directionalRef.current && <primitive object={new THREE.DirectionalLightHelper(directionalRef.current, 5)} />} */}
            <ambientLight intensity={0.35} color={"#23518C"} />
            <spotLight
                ref={spotRef}
                position={[4.55, 2.5, 1.65]}
                decay={0.45}
                angle={0.85}
                penumbra={1.65}
                intensity={6}
                target-position={[4.55, 0, 1.65]}
                distance={3}
                color="#FFB1EA"
            />
            <spotLight
                ref={spotRef2}
                position={[4.15, 6.5, 0]}
                decay={0.45}
                angle={1.5}
                penumbra={1.65}
                intensity={1.25}
                distance={15}
                color="#92C0DA"
                target-position={[4.15, 0, 0]}
                castShadow
            />
        </>
    )
};

export const Scene = () => {

    const [selectedCamera, setSelectedCamera] = useState("home");
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const playAudio = () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.5;
                audioRef.current.play().catch((error) => {
                    console.error("Error al reproducir audio:", error);
                });
            }
        };
        document.addEventListener("click", playAudio, { once: true });
        return () => document.removeEventListener("click", playAudio);
    }, []);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((error) => console.error("Error al reproducir audio:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <audio ref={audioRef} src="/audio/track1.mp3" autoPlay loop />
            <Suspense fallback={<Loading />}>
                <div className='fixed inset-0 flex justify-center items-center z-[100]'>
                    {/* Music */}
                    <>
                        <div className="fixed bottom-20 right-10 mx-auto bg-white rounded-full p-2 w-fit flex gap-2 z-50">
                            <Image
                                src="/images/track1-icon.jpg"
                                alt="Music Icon"
                                width={50}
                                height={50}
                                className={`transition-transform border-3 border-secondary rounded-full ${isPlaying ? "animate-slow-spin" : ""}`}
                                onClick={toggleMusic}
                            />
                            <div className="flex flex-col z-50 leading-none mr-5">
                                <span className='text-primary text-xs' >Playing...</span>
                                <span className='text-primary font-bold'>Flowers...</span>
                                <span className='text-primary text-xs'>In Love with a Ghost, Nori</span>
                            </div>
                        </div>
                    </>
                    {/* Camera selection */}
                    <div className={clsx("size-full flex p-12", {
                        "hidden": selectedCamera !== "home"
                    })}>
                        <div className="w-2/5 h-3/5" id="board" onClick={(e) => {
                            setSelectedCamera(e.currentTarget.id)
                        }}></div>
                        <div className="w-1/5 h-3/5" id="window" onClick={(e) => {
                            setSelectedCamera(e.currentTarget.id)
                        }}></div>
                        <div className="h-3/5 flex flex-auto mt-auto" id="bed" onClick={(e) => {
                            setSelectedCamera(e.currentTarget.id)
                        }}></div>
                    </div>
                    {/* Home Button */}
                    <div className={clsx("absolute bottom-12 left-12 size-24", {
                        "hidden": selectedCamera === "home"
                    })} id="home" onClick={(e) => {
                        setSelectedCamera(e.currentTarget.id);
                    }}>
                        <div className='size-full bg-white rounded-full border-primary border-4' />
                        <Image className='absolute -bottom-2 -left-2 z-10' src="/images/home.png" alt="Home" width={100} height={100} />
                    </div>
                    {/* Board */}
                    {selectedCamera === "board" && <Board />}
                </div>
                <Canvas shadows style={{ width: "100vw", height: "100vh", pointerEvents: "auto" }}>
                    <Environment background files="night.jpg" backgroundIntensity={0.85} environmentIntensity={0.15} />
                    <Lights />
                    <RoomModel />
                    <Cameras selectedCamera={selectedCamera} />
                    {/* <OrbitControls onChange={(e) => {
                            if (!e) return;
                            const { x, y, z } = e.target.object.position;
                            const { x: rx, y: ry, z: rz } = e.target.object.rotation;
                            console.log(`Cámara en: ${x}, y=${y}, z=${z}`);
                            console.log(`Rt en: x=${rx}, y=${ry}, z=${rz}`);
                        }} /> */}
                </Canvas>
            </Suspense>
        </>
    )
}



