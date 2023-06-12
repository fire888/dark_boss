import { m4 } from './m4'

const {
    //floor,
    random,
} = Math
//const ranN = (start, end) => start + floor(random() * (end - start))
export const ran = (start, end) => start + random() * (end - start)



export const createFace = (v1, v2, v3, v4) => [...v1, ...v2, ...v3, ...v1, ...v3, ...v4]
export const createUv = (v1, v2, v3, v4) => [...v1, ...v2, ...v3, ...v1, ...v3, ...v4]
export const fillColorFace = c => [...c, ...c, ...c, ...c, ...c, ...c]
export const fillColor6 = c => [...c, ...c, ...c, ...c, ...c, ...c]
export const getAngle = (x, y) => {
    let inRads = Math.atan2(y, x);
    return inRads - Math.PI / 2
}

export const angleFromCoords = (x, y) => {
    let rad = Math.atan(y / x)
    x < 0 && y > 0 && (rad = Math.PI - Math.abs(rad))
    x < 0 && y <= 0 && (rad = Math.PI + Math.abs(rad))
    return rad
}



export const createFaceWithSquare = (v1, v2, v3, v4, color1, color2, offset) => {
    const maxW = v2[0] - v1[0]
    const maxH = v3[1] - v1[1]

    let innerW = ran(maxW * 0.3, maxW * 0.7)
    let innerH = ran(maxH * 0.3, maxH * 0.7)

    if (offset) {
        innerW = maxW * offset
        innerH = maxH * offset
    }

    const x1 = v1[0] + (maxW - innerW) / 2
    const x2 = v2[0] - (maxW - innerW) / 2
    const y1 = v1[1] + (maxH - innerH) / 2
    const y2 = v3[1] - (maxH - innerH) / 2

    const v1_i = [x1, y1, v1[2]]
    const v2_i = [x2, y1, v1[2]]
    const v3_i = [x2, y2, v1[2]]
    const v4_i = [x1, y2, v1[2]]

    const vArr = []
    vArr.push(
        ...createFace(v1_i, v2_i, v3_i, v4_i),
        ...createFace(v1, v2, v2_i, v1_i),
        ...createFace(v2_i, v2, v3, v3_i),
        ...createFace(v4_i, v3_i, v3, v4),
        ...createFace(v1, v1_i, v4_i, v4),
    )

    const cArr = fillColorFaceWithSquare(color1, color2)

    const uArr = [
        ...createUv(
            [.5, .5],
            [1, .5],
            [1, 1],
            [.5, 1],
        ),

        ...createUv(
            [0, .5],
            [.5, .5],
            //[.5, 1],
            //[0, 1],
            [.4, .6],
            [.1, .6],
        ),
        ...createUv(
            [.4, .6],
            [.5, .5],
            [.5, 1],
            [.4, .9],
        ),
        ...createUv(
            [.1, .9],
            [.4, .9],
            [.5, 1],
            [0, 1],
        ),
        ...createUv(
            [0, .5],
            [.1, .6],
            [.1, .9],
            [0, 1],
        )
    ]


    return { 
        vArr,
        cArr,
        uArr,
    }
}



export const fillColorFaceWithSquare = (c1, c2) => [
    ...fillColorFace(c1),
    ...fillColorFace(c2),
    ...fillColorFace(c2),
    ...fillColorFace(c2),
    ...fillColorFace(c2),
]



export const transformArr = (arr, x = 0, y = 0, z = 0, r = 0) => {
    let matrix = m4.yRotation(r);
    matrix = m4.translate(matrix, x, y, z);

    for (let i = 0; i < arr.length; i += 3) {
        const vector = m4.transformPoint(matrix, [arr[i + 0], arr[i + 1], arr[i + 2], 1])
        arr[i + 0] = vector[0]
        arr[i + 1] = vector[1]
        arr[i + 2] = vector[2]
    }
}

export const rotateArr = (arr, angle) => {
    const matrix = m4.yRotation(angle);

    for (let i = 0; i < arr.length; i += 3) {
        const vector = m4.transformPoint(matrix, [arr[i + 0], arr[i + 1], arr[i + 2], 1])
        arr[i + 0] = vector[0]
        arr[i + 1] = vector[1]
        arr[i + 2] = vector[2]
    }
}

export const rotateArrY = (arr, angle) => {
    const matrix = m4.yRotation(angle);

    for (let i = 0; i < arr.length; i += 3) {
        const vector = m4.transformPoint(matrix, [arr[i + 0], arr[i + 1], arr[i + 2], 1])
        arr[i + 0] = vector[0]
        arr[i + 1] = vector[1]
        arr[i + 2] = vector[2]
    }
}

export const rotateArrZ = (arr, angle) => {
    const matrix = m4.zRotation(angle);

    for (let i = 0; i < arr.length; i += 3) {
        const vector = m4.transformPoint(matrix, [arr[i + 0], arr[i + 1], arr[i + 2], 1])
        arr[i + 0] = vector[0]
        arr[i + 1] = vector[1]
        arr[i + 2] = vector[2]
    }
}


export const translateArr = (arr, x = 0, y = 0, z = 0) => {
    const matrix = m4.translation(x, y, z);

    for (let i = 0; i < arr.length; i += 3) {
        const vector = m4.transformPoint(matrix, [arr[i + 0], arr[i + 1], arr[i + 2], 1])
        arr[i + 0] = vector[0]
        arr[i + 1] = vector[1]
        arr[i + 2] = vector[2]
    }
}

export const scaleArr = (arr, sX, sY, sZ) => {
    const matrix = m4.scaling(sX, sY, sZ)

    for (let i = 0; i < arr.length; i += 3) {
        const vector = m4.transformPoint(matrix, [arr[i + 0], arr[i + 1], arr[i + 2], 1])
        arr[i + 0] = vector[0]
        arr[i + 1] = vector[1]
        arr[i + 2] = vector[2]
    }
}

export const inverseVertexOrder = copyV => {
    for (let i = 0; i < copyV.length; i += 18) {
        const n0_0 = copyV[i]
        const n0_1 = copyV[i + 1]
        const n0_2 = copyV[i + 2]

        const n1_0 = copyV[i + 3]
        const n1_1 = copyV[i + 3 + 1]
        const n1_2 = copyV[i + 3 + 2]

        const n4_0 = copyV[i + 12]
        const n4_1 = copyV[i + 12 + 1]
        const n4_2 = copyV[i + 12 + 2]

        const n5_0 = copyV[i + 15]
        const n5_1 = copyV[i + 15 + 1]
        const n5_2 = copyV[i + 15 + 2]


        copyV[i] = n1_0
        copyV[i + 1] = n1_1
        copyV[i + 2] = n1_2

        copyV[i + 3] = n0_0
        copyV[i + 3 + 1] = n0_1
        copyV[i + 3 + 2] = n0_2

        copyV[i + 12] = n5_0
        copyV[i + 12 + 1] = n5_1
        copyV[i + 12 + 2] = n5_2

        copyV[i + 15] = n4_0
        copyV[i + 15 + 1] = n4_1
        copyV[i + 15 + 2] = n4_2
    }
}
