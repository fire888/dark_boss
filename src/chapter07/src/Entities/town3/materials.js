import * as THREE from 'three'

// const vSh = /* glsl */`
// #define lPos vec3(1., 1., -1.)
// #define lPos2 vec3(-1., -1., 1.)
// varying float l;
// void main() {
//     l = min(max(dot(lPos, normal), 0.) + max(dot(lPos2, normal), 0.), 0.75);
//     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
// }`

const vSh = /* glsl */`
#define lPos vec3(1., 1., -1.)
 varying float l;
 void main() {    
     l = min(max(dot(lPos, normal), 0.5), 0.75);
     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`

const fSh = /* glsl */`
varying float l;
void main() {
    gl_FragColor = vec4(l, l, l, 1.);
}
`


export const createMaterials = root => {
    const shaderMaterial = new THREE.ShaderMaterial( {
        vertexShader: vSh,
        fragmentShader: fSh,
    })

    const mats = {
        shaderMaterial,
    }

    return mats
}