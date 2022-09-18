import {
    createFace,
    createUv,
    createFaceWithSquare,
    fillColorFace,
    fillColorFaceWithSquare
} from './helpers'

import { ran } from './helpers'

const {
    floor,
    random,
    PI,
    sin,
    cos,
} = Math




const color1 = [.2, .1, .1]
const color2 = [1, 1, 1]


export const createDataSideArc = ({
    hStart = 5,
    fullH = 25,
    r = 5,
    wCol = 3,
    zBridge = 3,
    w = 40,
}) => {
    console.log('---', w)

    let h = hStart
    let h2 = hStart + fullH
    /** front **************/
    const columnF = [...createFace(
        [-wCol, h, r,],
        [wCol, h, r],
        [wCol, h2, r],
        [-wCol, h2, r],
    )]
    const colorFill2 = [...fillColorFace(color2)]
    const colorFill1 = [...fillColorFace(color1)]
    const uv1 = createUv(
        [0, .5],
        [.5, .5],
        [.5, 1],
        [0, 1],
    )

    /** left *****************/
    const columnL = [...createFace(
        [-wCol, h, -r,],
        [-wCol, h, r],
        [-wCol, h2, r],
        [-wCol, h2, -r],
    )]
    /** back Column *********/
    const columnB = [...createFace(
        [-wCol + 2, h, -r,],
        [-wCol, h, -r],
        [-wCol, h2, -r],
        [-wCol + 2, h2, -r],
    )]
    /** arc ******************/
    const arc = []
    const cA = []
    const uvA = []
    const x = -wCol + 2
    const step = (w - 10) / 10
    for (let i = 0; i < 10; ++i) {
        arc.push(...createFace(
            [x, h + (i * 2), -r - ((i + 1) * step)],
            [x, h + (i * 2), -r - ((i) * step)],
            [x, h2, -r - ((i) * step)],
            [x, h2, -r - ((i + 1) * step)],
        ))
        cA.push(...colorFill1)
        uvA.push(...uv1)
    }


    const vArc = [
        ...columnF,
        ...columnL,
        ...columnB,
        ...arc,
    ]
    const cArc = [
        ...colorFill2,
        ...colorFill2,
        ...colorFill2,
        ...cA,
    ]
    const uvArc = [
        ...uv1,
        ...uv1,
        ...uv1,
        ...uvA
    ]


    return {
        vArc,
        cArc,
        uvArc,
    }
}