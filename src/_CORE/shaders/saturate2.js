export const Saturate2 = {
    uniforms: {
        "tDiffuse": { value: null },
    },


    vertexShader: `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix*modelViewMatrix*vec4( position, 1.0 );
}`,


    fragmentShader: `
uniform sampler2D tDiffuse;
varying vec2 vUv;
void main() {
  vec4 texel = texture2D( tDiffuse, vUv );
  gl_FragColor = (texel + texel * 1.5) * vec4(0.5);
}`,
}
