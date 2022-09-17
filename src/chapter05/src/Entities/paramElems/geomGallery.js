import { m4 } from '../../helpers/m4'
const {
    floor,
    random,
    PI,
    sin,
    cos,
} = Math
const ranN = (start, end) => start + floor(random() * (end - start))
const ran = (start, end) => start + random() * (end - start)

const transformArr = (arr, x = 0, y = 0, z = 0, r = 0) => {
    let matrix = m4.yRotation(r);
    matrix = m4.translate(matrix, x, y, z);

    for (let ii = 0; ii < arr.length; ii += 3) {
        const vector = m4.transformPoint(matrix, [arr[ii + 0], arr[ii + 1], arr[ii + 2], 1]);
        arr[ii + 0] = vector[0];
        arr[ii + 1] = vector[1];
        arr[ii + 2] = vector[2];
    }
}

const createFace = (v1, v2, v3, v4) => [...v1, ...v2, ...v3, ...v1, ...v3, ...v4]
const createFaceWithSquare = (v1, v2, v3, v4) => {
    const maxW = v2[0] - v1[0]
    const maxH = v3[2] - v1[2]

    const innerW = ran(maxW * 0.1, maxW * 0.9)
    const innerH = ran(maxH * 0.1, maxH * 0.9)

    const x1 = v1[0] + (maxW - innerW) / 2
    const x2 = v2[0] - (maxW - innerW) / 2
    const y1 = v1[1] + (maxH - innerH) / 2
    const y2 = v3[1] - (maxH - innerH) / 2

    const arr = []
    arr.push(
        ...createFace(v1, v2, [x2, y1, v2[0]], [x1, y1, v2[0]])
    )

    return arr
}


const createTrunk = ({
    h = 2,
    h2 = 30,
    r = 10,
    color1 = [0, 0, 1],
    color2 = [0, 1, 1],
}) => {
    const arrDividers = []
    let leftH = h2 - h
    let currentH = h
    while (leftH > 0) {
        const h01 = ran(0.5, 10)
        const h02 = ran(0.5, 4)
        const h03 = ran(0.5, 4)
        const h04 = ran(0.5, .2, 4)
        const fullH = h01 + h02 + h03 + h04
        leftH -= fullH
        if (leftH > 0) {
            arrDividers.push({
                h0: currentH,
                h01: currentH + h01,
                h02: currentH + h01 + h02,
                h03: currentH + h01 + h02 + h03,
                h04: currentH + h01 + h02 + h03 + h04,
                r: ran(1, 10),
            })
        }
        currentH = currentH + fullH
    }


    const vert = []
    const col = []



    if (arrDividers.length === 0) {
        vert.push(
            ...createFace(
                [-r, h, r],
                [r, h, r],
                [r, h2, r],
                [-r, h2, r],
            )
        )
        col.push(
            ...color1,
            ...color1,
            ...color1,
            ...color1,
            ...color1,
            ...color1,
        )
    } else {
        for (let i = 0; i < arrDividers.length; ++i) {
            /** column ***/
            vert.push(
                // ...createFaceWithSquare(
                //     [-r, arrDividers[i].h0, r],
                //     [r, arrDividers[i].h0, r],
                //     [r, arrDividers[i].h01, r],
                //     [-r, arrDividers[i].h01, r],
                // )
                ...createFace(
                    [-r, arrDividers[i].h0, r],
                    [r, arrDividers[i].h0, r],
                    [r, arrDividers[i].h01, r],
                    [-r, arrDividers[i].h01, r],
                )
            )
            col.push(
                ...color2,
                ...color2,
                ...color2,
                ...color2,
                ...color2,
                ...color2,
            )
            /** column -> divider */
            vert.push(
                ...createFace(
                    [-r, arrDividers[i].h01, r],
                    [r, arrDividers[i].h01, r],
                    [arrDividers[i].r, arrDividers[i].h02, arrDividers[i].r],
                    [-arrDividers[i].r, arrDividers[i].h02, arrDividers[i].r],
                )
            )
            col.push(
                ...color2,
                ...color2,
                ...color2,
                ...color2,
                ...color2,
                ...color2,
            )
            /** divider */
            vert.push(
                ...createFace(
                    [-arrDividers[i].r, arrDividers[i].h02, arrDividers[i].r],
                    [arrDividers[i].r, arrDividers[i].h02, arrDividers[i].r],
                    [arrDividers[i].r, arrDividers[i].h03, arrDividers[i].r],
                    [-arrDividers[i].r, arrDividers[i].h03, arrDividers[i].r],
                )
            )
            col.push(
                ...color1,
                ...color1,
                ...color1,
                ...color1,
                ...color1,
                ...color1,
            )
            /** divider -> column */
            vert.push(
                ...createFace(
                    [-arrDividers[i].r, arrDividers[i].h03, arrDividers[i].r],
                    [arrDividers[i].r, arrDividers[i].h03, arrDividers[i].r],
                    [r, arrDividers[i].h04, r],
                    [-r, arrDividers[i].h04, r],
                )
            )
            col.push(
                ...color2,
                ...color2,
                ...color2,
                ...color2,
                ...color2,
                ...color2,
            )
        }

        /** last segment */
        vert.push(
            ...createFace(
                [-r, arrDividers[arrDividers.length - 1].h04, r],
                [r, arrDividers[arrDividers.length - 1].h04, r],
                [r, h2, r],
                [-r, h2, r],
            )
        )
        col.push(
            ...color1,
            ...color1,
            ...color1,
            ...color1,
            ...color1,
            ...color1,
        )
    }

    console.log(vert.length, col.length)


    return { vert, col  }
}


const createColumn = ({
    // resolution = 4,
    rBase = 5,
    hBase = 5,
    hBaseToTrunk = 1,

    hCapital = 2,
    rCapital = 6,
    hTrunkToCapital = 1,

    hTrunk = 30,
    rTrunk = 3,
    dividersCountTrunk = 3,
    hDividersTrunk = 1,
    hTrunkToDividers = .5,

    color1 = [0, 0, 1],
    color2 = [0, 1, 1],
}) => {
    /** base **************/
    const base = [
        -rBase, 0, rBase,
        rBase, 0, rBase,
        rBase, hBase, rBase,

        -rBase, 0, rBase,
        rBase, hBase, rBase,
        -rBase, hBase, rBase,
    ]
    const colorBase = [
        ...color1, ...color1, ...color1,
        ...color1, ...color1, ...color1,
    ]

    const baseToTrunk = [
        -rBase, hBase, rBase,
        rBase, hBase, rBase,
        rTrunk, hBase + hBaseToTrunk, rTrunk,

        -rBase, hBase, rBase,
        rTrunk, hBase + hBaseToTrunk, rTrunk,
        -rTrunk, hBase + hBaseToTrunk, rTrunk,
    ]

    const colorBaseToTrunk = [
        ...color2, ...color2, ...color2,
        ...color2, ...color2, ...color2,
    ]


    /** TRUNK ************************/
    let h = hBase + hBaseToTrunk
    const { vert, col } = createTrunk({
        h: hBase + hBaseToTrunk,
        h2: hTrunk + hBase + hBaseToTrunk,
        r: rTrunk,
    })


    /** TRUNK TO CAPITAL **************/

    h = h + hTrunk
    const trunkToCapital = [
        -rTrunk, h, rTrunk,
        rTrunk, h, rTrunk,
        rCapital, h + hTrunkToCapital, rCapital,

        -rTrunk, h, rTrunk,
        rCapital, h + hTrunkToCapital, rCapital,
        -rCapital, h + hTrunkToCapital, rCapital,
    ]

    /** CAPITAL *********************/
    h = h + hTrunkToCapital
    const capital = [
        -rCapital, h, rCapital,
        rCapital, h, rCapital,
        rCapital, h + hCapital, rCapital,

        -rCapital, h, rCapital,
        rCapital, h + hCapital, rCapital,
        -rCapital, h + hCapital, rCapital,
    ]


    const frontVert = [
        ...base,
        ...baseToTrunk,
        ...vert,
        ...trunkToCapital,
        ...capital,
    ]
    const frontColors = [
        ...colorBase,
        ...colorBaseToTrunk,
        ...col,
        ...colorBaseToTrunk,
        ...colorBase,
    ]

    /** left ************************/
    const leftVert = [...frontVert]
    transformArr(leftVert, 0, 0, 0, Math.PI / 2)

    const rightVert = [...frontVert]
    transformArr(rightVert, 0, 0, 0, -Math.PI / 2)

    const backVert = [...frontVert]
    transformArr(backVert, 0, 0, 0, Math.PI)



    const vResult = [
        ...frontVert,
        ...leftVert,
        ...rightVert,
        ...backVert,
    ]
    const cResult = [
        ...frontColors,
        ...frontColors,
        ...frontColors,
        ...frontColors,
    ]

    return {
        vResult,
        cResult,
    }
}



export const createGeomGallery = ({}) => {
     const arrV = []
     const arrC = []

    // for (let i = 0; i < 20; ++i) {
    //     const { vResult, cResult } = createColumn({})
    //     transformArr(vResult, i * 20, 0, 0, 0)
    //     arrV.push(...vResult)
    //     arrC.push(...cResult)
    // }

    const rOffset = 50
    const count = 20
    for (let i = 0; i < count; ++i) {
        const ph = (i / count) * (PI * 2)
        const x = sin(ph) * rOffset
        const z = cos(ph) * rOffset
        const { vResult, cResult } = createColumn({})
        transformArr(vResult, x, 0, z, 0)
        arrV.push(...vResult)
        arrC.push(...cResult)
    }


    /** main ************/
    const vertices = new Float32Array(arrV)
    const colors =  new Float32Array(arrC)

    return {
        vertices,
        colors,
    }
}
