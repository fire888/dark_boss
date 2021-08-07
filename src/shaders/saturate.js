// import saturateVert from './saturate.vert'
// import saturateFrag from './saturate.frag'


export const Saturate = {
    uniforms: {
        "tDiffuse": { value: null },
    },

    //vertexShader: saturateVert,
    //fragmentShader: saturateFrag,



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
    gl_FragColor = (texel * texel * texel) * vec4(3.);

}`,
}
