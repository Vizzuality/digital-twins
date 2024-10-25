import { useTexture, useVideoTexture } from "@react-three/drei";
import { Suspense } from "react";
import { ShaderMaterial, DoubleSide, NearestFilter } from "three";
import { useRef, useMemo } from "react";


function VideoMaterial({ url }: { url: string }) {
  const texture = useVideoTexture(url, {});
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

function ImageMaterial({ url }: { url: string }) {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />
}

const GlobeShaderMaterial = ({ url }: { url: string }) => {
  const texture = useTexture(url);
  const materialRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uOpacity: { value: 1 }, // Adjust for transparency (0 fully transparent, 1 fully opaque)
    }),
    [texture]
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
          vNormal = normalize(normalMatrix * normal); // Pass normal for lighting
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz; // Position in view space
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
          // Sample the texture color
          vec4 textureColor = texture2D(uTexture, vUv);

          // Simulate lighting
          // vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Directional light
          // float lightIntensity = dot(vNormal, lightDir) * 0.5 + 0.5; // Simple diffuse shading

          // Determine if the fragment is on the front or back face of the globe

          // Simulate depth-based transparency
          float depthFactor = length(vPosition) / 5.0; // Adjust based on sphere size
          float adjustedOpacity = mix(uOpacity, 1.0, depthFactor); // More opaque at the center

          // If fragment is on the back face, make it more transparent
          if (!gl_FrontFacing) {
            adjustedOpacity *= 0.2; // Increase transparency for back faces
          }

          // Apply the texture color, lighting, and opacity
          vec4 finalColor = vec4(textureColor.rgb, adjustedOpacity * textureColor.a);

          // Output the final color with transparency
          gl_FragColor = finalColor;
        }
      `}
      transparent
      side={DoubleSide} // Render both front and back faces
      depthWrite={false} // Disable depth writing for proper transparency
    />
  );
};

export const Globe = ({ videoMaterial }: {
  videoMaterial?: string;
}) => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 64, 64]} />
      <Suspense fallback={null}>
        {videoMaterial ?
          <VideoMaterial url={videoMaterial} /> :
          <GlobeShaderMaterial url="images/coastline.png" />}
      </Suspense>
    </mesh>
  );
};