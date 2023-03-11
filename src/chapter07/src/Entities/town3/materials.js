import * as THREE from 'three'

const vSh = /* glsl */`
varying float l;
void main() {    

    vec4 lPos = vec4(1000., 50., 0., 1.);  

    vec4 eyeCoords = projectionMatrix * modelViewMatrix * vec4(position, 1.);
    vec3 s = normalize(vec3(lPos - eyeCoords));
    l = max(dot(s, normal), 0.);
    
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