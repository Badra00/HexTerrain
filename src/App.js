import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import {
  EffectComposer,
  SSAO,
  Bloom,
  BrightnessContrast,
  HueSaturation
} from "@react-three/postprocessing";
import "./styles.css";
import Helpers from "./utils/Helpers";
import Effects from "./Effects";
import Terrain from "./components/ScatterHexagonMesh";
import { PCFSoftShadowMap, sRGBEncoding } from "three";
import Lights from "./components/Lights";
import GUI from "./components/GUI";
import appState from "./state/appState";
import Trees from "./components/Trees";
import Grass from "./components/Grass";
import Clouds from "./components/Clouds";
import useHexagonScatter from "./hooks/useHexagonScatter";

export default function App() {
  const points = useHexagonScatter(25);
  const general = appState((s) => s.general);
  return (
    <>
      <GUI />
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [5, 6, 5], near: 1, far: 15 }}
      >
        <Suspense fallback={null}>
          <group rotation-x={-Math.PI / 2}>
            {general.Trees && <Trees points={points} />}
            {general.Grass && <Grass points={points} />}
            {general.Clouds && <Clouds />}
            <Terrain points={points} />
          </group>
          <Environment preset="sunset" />
          <OrbitControls autoRotate autoRotateSpeed={0.6} enablePan={false} />
          {/* <Helpers /> */}
          {/*<Effects />*/}
          {/* <Stats /> */}
          <EffectComposer multisampling={0}>
            <BrightnessContrast contrast={0.1} brightness={0} />
            <HueSaturation saturation={0.5} />
            <SSAO
              samples={11}
              radius={30}
              intensity={20}
              luminanceInfluence={0.6}
              color="black"
            />
            <SSAO
              samples={21}
              radius={7}
              intensity={20}
              luminanceInfluence={0.6}
              color="black"
            />
            <Bloom
              intensity={1.25}
              kernelSize={2}
              luminanceThreshold={0.8}
              luminanceSmoothing={0.0}
            />
          </EffectComposer>
        </Suspense>
        <Lights />
      </Canvas>
      <div className="copy">
        Made with 🧡 by{" "}
        <a target="_blank" href="https://github.com/FarazzShaikh">
          Faraz Shaikh
        </a>
      </div>
    </>
  );
}
