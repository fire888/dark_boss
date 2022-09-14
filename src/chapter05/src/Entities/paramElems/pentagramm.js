import * as THREE from 'three'

const S = 15
const T = 5
const C1 = [1, 1, 1]
const C2 = [0, 0, 1]







const createGeom = () => {
    const geometry = new THREE.BufferGeometry();

    const FRONT = [
        -S, 0, S,
        S, 0, S,
        -S, T, S,

        -S, T, S,
        S, 0, S,
        S - T, T, S,

        S, 0, S,
        S, S * 2, S,
        S - T, S * 2, S,

        S, 0, S,
        S - T, S * 2, S,
        S - T, T, S,

        /////////////////////
        -S, T, -S + T,
        S - T, T, -S + T,
        S - T, S * 2, -S + T,

        -S, T, -S + T,
        S - T, S * 2, -S + T,
        -S, S * 2, -S + T,
    ]
    const FRONT_COLORS = [
        ...C1,
        ...C1,
        ...C1,

        ...C1,
        ...C1,
        ...C1,

        ...C1,
        ...C1,
        ...C1,

        ...C1,
        ...C1,
        ...C1,

        ...C2,
        ...C2,
        ...C2,

        ...C2,
        ...C2,
        ...C2,
    ]


    const LEFT = [
        -S, 0, -S,
        -S, 0, S,
        -S, T, S,

        -S, 0, -S,
        -S, T, S,
        -S, T, -S + T,

        -S, 0, -S,
        -S, T, -S + T,
        -S, S * 2, -S + T,

        -S, 0, -S,
        -S, S * 2, -S + T,
        -S, S * 2, -S,

        ///////////////////////
        S - T, T, -S + T,
        S - T, T, S,
        S - T, S * 2, S,

        S - T, T, -S + T,
        S - T, S * 2, S,
        S - T, S * 2, -S + T,
    ]

    const TOP = [
        S - T,
    ]



    const vertices = new Float32Array( [
        ...FRONT,
        ...LEFT,
        ...TOP,
        // // /* ******************/
        // S - T, T, S,
        // S - T, S * 2, S,
        // S - T, S * 2, -S + T,
        //
        // S - T, T, S,
        // S - T, S * 2, -S + T,
        // S - T, T, -S + T,
        //
        // // ** ****************/
    ]);


    const colors = new Float32Array( [
        ...FRONT_COLORS,
        ...FRONT_COLORS,
        ...FRONT_COLORS,
    ])


    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
    geometry.computeVertexNormals()
    return geometry;
}



export const createBoxPentagram = () => {
    const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, vertexColors: true })
    //const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF  })
    const geometry = createGeom()





    const mesh = new THREE.Mesh(geometry, material)

    return mesh;
}