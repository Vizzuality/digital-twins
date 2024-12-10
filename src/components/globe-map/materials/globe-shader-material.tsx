import { useRef, useMemo } from "react";

import { useTexture } from "@react-three/drei";
import { ShaderMaterial, DoubleSide } from "three";

const GlobeShaderMaterial = ({ url }: { url: string }) => {
  const texture = useTexture(url);
  const materialRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uOpacity: { value: 1 },
    }),
    [texture],
  );

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={`
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform sampler2D uTexture;
        uniform float uOpacity;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vec4 textureColor = texture2D(uTexture, vUv);
          float depthFactor = length(vPosition) / 5.0;
          float adjustedOpacity = mix(uOpacity, 1.0, depthFactor);
          if (!gl_FrontFacing) {
            adjustedOpacity *= 0.2;
          }
          vec4 finalColor = vec4(textureColor.rgb, adjustedOpacity * textureColor.a);
          gl_FragColor = finalColor;
        }
      `}
      transparent
      side={DoubleSide}
      depthWrite={false}
    />
  );
};

export default GlobeShaderMaterial;
