import * as THREE from 'three'


export const createGeometry = () => {

    /**
     * https://www.atractor.pt/mat/poliedros/s3js-_en.html?pre=pol_35&md=mo
     */

    const arr = []

    const hH = 10
    const hL = 5
    arr.push(
        //topSq
        -hL, hH, hL,
        hL, hH, hL,
        hL, hH, -hL,
        
        -hL, hH, hL,
        hL, hH, -hL,
        -hL, hH, -hL,

        //botSq
        -hL, -hH, -hL,
        hL, -hH, -hL,
        hL, -hH, hL,
        
        -hL, -hH, -hL,
        hL, -hH, hL,
        -hL, -hH, hL,
    )























    const geometry = new THREE.BufferGeometry();
    // const vertices = new Float32Array( [
    //         -10.0, -10.0,  10.0,
    //         10.0, -10.0,  10.0,
    //         10.0,  10.0,  10.0,

    //         10.0,  10.0,  10.0,
    //         -10.0,  10.0,  10.0,
    //         -10.0, -10.0,  10.0
    // ] );
    const vertices = new Float32Array(arr);

    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    return geometry
}