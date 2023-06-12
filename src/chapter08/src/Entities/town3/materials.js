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
    vec3 c = vec3(l * 0.8, l * .25, l * .8);
    gl_FragColor = vec4(c, 1.);
}
`

const fSh02 = /* glsl */`
varying float l;
void main() {
    vec3 c = vec3(l * 0., l * .5, l * .25);
    gl_FragColor = vec4(c, 1.);
}
`


export const createMaterials = root => {
    const shaderMaterialGray = new THREE.ShaderMaterial( {
        vertexShader: vSh,
        fragmentShader: fSh,
    })

    shaderMaterialGray.flatShading = true
    shaderMaterialGray.needsUpdate = true

    const shaderMaterialBlack = new THREE.ShaderMaterial( {
        vertexShader: vSh,
        fragmentShader: fSh02,
    })

    shaderMaterialBlack.flatShading = true
    shaderMaterialBlack.needsUpdate = true

    const mats = {
        shaderMaterialGray,
        shaderMaterialBlack,
    }


    return mats
}