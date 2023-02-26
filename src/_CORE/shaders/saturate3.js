export const Saturate3 = {
    uniforms: {
        "tDiffuse": { value: null },
        "effect": { value: 0 },
    },


    vertexShader: `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix*modelViewMatrix*vec4( position, 1.0 );
}`,


    fragmentShader: `
uniform sampler2D tDiffuse;
uniform float effect;
varying vec2 vUv;
void main() {
  vec4 texel = texture2D( tDiffuse, vUv );
  vec3 col = vec3(texel);
  col *= sin(col.r * 100. * effect);
  gl_FragColor = (texel * texel * texel) * vec4(3.) + vec4(col, 1.);
}`,
}
