/* eslint-disable */
import * as THREE from "three";
import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload, Image as ImageImpl } from "@react-three/drei";
import { ScrollControls, Scroll, useScroll } from "./ScrollControls";

function Image(props) {
    const ref = useRef();
    const group = useRef();
    const data = useScroll();
    useFrame((state, delta) => {
        group.current.position.z = THREE.MathUtils.damp(
            group.current.position.z,
            Math.max(0, data.delta * 50),
            4,
            delta
        );
    });
    return (
        <group ref={group}>
            <ImageImpl ref={ref} {...props} />
        </group>
    );
}

function Page({ m = 0.4, urls, ...props }) {
    const { width } = useThree((state) => state.viewport);
    // const width = 12
    const w = width < 10 ? 1.5 / 3 : 1 / 3;
    return (
        <group {...props}>
            <Image
                position={[-width * w, 0, -1]}
                scale={[width * w - m * 2, 5, 1]}
                url={urls[0]}
            />
            <Image
                position={[0, 0, 0]}
                scale={[width * w - m * 2, 5, 1]}
                url={urls[1]}
            />
            <Image
                position={[width * w, 0, 1]}
                scale={[width * w - m * 2, 5, 1]}
                url={urls[2]}
            />
        </group>
    );
}

function Pages() {
    const { width } = useThree((state) => state.viewport);
    // const width = 18
    return (
        <>
            <Page
                position={[-width * 1, 0, 0]}
                urls={[
                    "/assets-images/launchpadteam1.png",
                    "/assets-images/launchpadteam2.png",
                    "/assets-images/launchpadteam3.png",
                ]}
            />
            <Page
                position={[width * 0, 0, 0]}
                urls={[
                    "/assets-images/launchpadteam1.png",
                    "/assets-images/ken-img1.png",
                    "/assets-images/ken-img1.png",
                ]}
            />
            <Page
                position={[width * 1, 0, 0]}
                urls={[
                    "/assets-images/launchpadteam1.png",
                    "/assets-images/ken-img1.png",
                    "/assets-images/ken-img1.png",
                ]}
            />
            <Page
                position={[width * 2, 0, 0]}
                urls={[
                    "/assets-images/launchpadteam1.png",
                    "/assets-images/ken-img1.png",
                    "/assets-images/ken-img1.png",
                ]}
            />
            <Page
                position={[width * 3, 0, 0]}
                urls={[
                    "/assets-images/launchpadteam1.png",
                    "/assets-images/ken-img1.png",
                    "/assets-images/ken-img1.png",
                ]}
            />
            <Page
                position={[width * 4, 0, 0]}
                urls={[
                    "/assets-images/launchpadteam1.png",
                    "/assets-images/ken-img1.png",
                    "/assets-images/ken-img1.png",
                ]}
            />
        </>
    );
}

export default function NftsBanner() {
    return (
        <Canvas
            gl={{ antialias: false }}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 10], fov: 50 }}
            style={{ height: "100vh" }}
        >
            <Suspense fallback={null}>
                <ScrollControls
                    infinite
                    horizontal
                    damping={4}
                    pages={4}
                    distance={1}
                >
                    <Scroll>
                        <Pages />
                    </Scroll>
                    {/* <Scroll html>
            <h1 style={{ position: 'absolute', top: '20vh', left: '-75vw' }}>home</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '25vw' }}>to</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '125vw' }}>be</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '225vw' }}>home</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '325vw' }}>to</h1>
            <h1 style={{ position: 'absolute', top: '20vh', left: '425vw' }}>be</h1>
          </Scroll> */}
                </ScrollControls>
                <Preload />
            </Suspense>
        </Canvas>
    );
}
