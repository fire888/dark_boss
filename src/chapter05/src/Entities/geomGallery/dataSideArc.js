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







export const createDataSideArc = ({
    h1,
    h2,
    color1 = [.2, .1, .1],
    color2 = [1, 1, 1],
    hStart = 5,
    fullH = 25,
    r = 5,
    wCol = 3,
    zBridge = 3,
    w = 40,
}) => {
    const lBridge = w - (r * 2)

    let _h1 = h1
    let _h2 = h2
    /** front **************/
    const columnF = [...createFace(
        [-wCol, _h1, r,],
        [wCol, _h1, r],
        [wCol, _h2, r],
        [-wCol, _h2, r],
    )]
    const colorFill2 = [...fillColorFace(color2)]
    const colorFill1 = [...fillColorFace(color1)]
    const uv1 = createUv(
        [0, .5],
        [.5, .5],
        [.5, 1],
        [0, 1],
    )

    /** left / right *****************/
    const column = [
        ...createFace(
            [-wCol, _h1, -r,],
            [-wCol, _h1, r],
            [-wCol, _h2, r],
            [-wCol, _h2, -r],
        ),
        ...createFace(
            [wCol, _h1, r,],
            [wCol, _h1, -r],
            [wCol, _h2, -r],
            [wCol, _h2, r],
        )
    ]
    /** back Column *********/
    const columnB = [
        ...createFace(
            [wCol, _h1, -r,],
            [-wCol, _h1, -r],
            [-wCol, _h2, -r],
            [wCol, _h2, -r],
        ),
    ]
    /** arc ******************/
    const arc = []
    const cA = []
    const uvA = []
    const x = -wCol + 2
    const x2 = wCol - 2
    const resolution = 10
    const step = lBridge / resolution
    const diff = _h2 - _h1
    const offsetArcTop = diff * 0.15


    for (let i = 0; i < resolution; ++i) {
        const hI1 = (1 - Math.sin((i + 1) / resolution * Math.PI)) * (diff - offsetArcTop) + offsetArcTop
        const hI2 = (1 - Math.sin(i / resolution * Math.PI)) * (diff - offsetArcTop) + offsetArcTop
        let tZ = -r
        if (i + 1 > resolution / 2) {
            tZ = -r - lBridge
        }
        /** left arc */
        arc.push(
            x,   h2 - hI1,    -r - ((i + 1) * step),
            x,   h2 - hI2,    -r - (i * step),
            x,   h2,          tZ,
        )
        cA.push(
            ...color1,
            ...color1,
            ...color1,
        )
        uvA.push(
            0, 0,
            0, 0,
            0, 0,
        )
        /** right arc */
        arc.push(
            x2,   h2 - hI2,    -r - (i * step),
            x2,   h2 - hI1,    -r - ((i + 1) * step),
            x2,   h2,          tZ,
        )
        cA.push(
            ...color1,
            ...color1,
            ...color1,
        )
        uvA.push(
            0, 0,
            0, 0,
            0, 0,
        )
        /** bottom arc */
        arc.push(...createFace(
            [x2, h2 - hI2, -r - (i * step)],
            [x,  h2 - hI2, -r - (i * step)],
            [x,  h2 - hI1, -r - ((i + 1) * step)],
            [x2, h2 - hI1, -r - ((i + 1) * step)],
        ))
        cA.push(...colorFill1)
        uvA.push(...createUv([0, 0], [0, 0], [0, 0], [0, 0]))

    }

    arc.push(
        x,   h2 - offsetArcTop,     -r - step * resolution / 2,
        x,   h2,                    -r,
        x,   h2,                    -r - step * resolution,
    )
    cA.push(
        ...color1,
        ...color1,
        ...color1,
    )
    uvA.push(
        0, 0,
        0, 0,
        0, 0,
    )

    arc.push(
        x2,   h2 - offsetArcTop,    -r - step * resolution / 2,
        x2,   h2,                   -r - step * resolution,
        x2,   h2,                   -r,
    )
    cA.push(
        ...color1,
        ...color1,
        ...color1,
    )
    uvA.push(
        0, 0,
        0, 0,
        0, 0,
    )





    const vArc = [
        ...columnF,
        ...column,
        ...columnB,
        ...arc,
    ]
    const cArc = [
        ...colorFill2,
        ...colorFill2,
        ...colorFill2,
        ...colorFill2,
        //...colorFill2,
        ...cA,
    ]
    const uvArc = [
        ...uv1,
        ...uv1,
        ...uv1,
        ...uv1,
        //...uv1,
        ...uvA
    ]


    return {
        vArc,
        cArc,
        uvArc,
    }
}