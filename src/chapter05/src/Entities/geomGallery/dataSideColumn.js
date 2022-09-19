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






const createTrunk = ({
     h = 2,
     h2 = 30,
     r = 10,
    color1 = [.2, .1, .1],
    color2 = [1, 1, 1],
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
        if (leftH > 5) {
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
    const uv = []



    if (arrDividers.length === 0) {
        vert.push(
            ...createFace(
                [-r, h, r],
                [r, h, r],
                [r, h2, r],
                [-r, h2, r],
            )
        )
        col.push(...fillColorFace(color1))
        uv.push(...createUv(
            [0, .5],
            [.5, .5],
            [.5, 1],
            [0, 1],
        ))
    } else {
        for (let i = 0; i < arrDividers.length; ++i) {
            /** column ***/
            const { vArr, cArr, uArr } = createFaceWithSquare(
                [-r, arrDividers[i].h0, r],
                [r, arrDividers[i].h0, r],
                [r, arrDividers[i].h01, r],
                [-r, arrDividers[i].h01, r],
                color1,
                color2,
            )
            vert.push(...vArr)
            col.push(...cArr)
            uv.push(...uArr)
            /** column -> divider */
            vert.push(
                ...createFace(
                    [-r, arrDividers[i].h01, r],
                    [r, arrDividers[i].h01, r],
                    [arrDividers[i].r, arrDividers[i].h02, arrDividers[i].r],
                    [-arrDividers[i].r, arrDividers[i].h02, arrDividers[i].r],
                )
            )
            col.push(...fillColorFace(color2))
            uv.push(...createUv(
                [0, .5],
                [.5, .5],
                [.5, 1],
                [0, 1],
            ))
            /** divider */
            vert.push(
                ...createFace(
                    [-arrDividers[i].r, arrDividers[i].h02, arrDividers[i].r],
                    [arrDividers[i].r, arrDividers[i].h02, arrDividers[i].r],
                    [arrDividers[i].r, arrDividers[i].h03, arrDividers[i].r],
                    [-arrDividers[i].r, arrDividers[i].h03, arrDividers[i].r],
                )
            )
            col.push(...fillColorFace(color1))
            uv.push(...createUv(
                [0, .5],
                [.5, .5],
                [.5, 1],
                [0, 1],
            ))
            /** divider -> column */
            vert.push(
                ...createFace(
                    [-arrDividers[i].r, arrDividers[i].h03, arrDividers[i].r],
                    [arrDividers[i].r, arrDividers[i].h03, arrDividers[i].r],
                    [r, arrDividers[i].h04, r],
                    [-r, arrDividers[i].h04, r],
                )
            )
            col.push(...fillColorFace(color2))
            uv.push(...createUv(
                [0, .5],
                [.5, .5],
                [.5, 1],
                [0, 1],
            ))
        }

        /** last segment */
        const { vArr, cArr, uArr } = createFaceWithSquare(
            [-r, arrDividers[arrDividers.length - 1].h04, r],
            [r, arrDividers[arrDividers.length - 1].h04, r],
            [r, h2, r],
            [-r, h2, r],
            color2,
            color1,
        )
        vert.push(...vArr)
        col.push(...cArr)
        uv.push(...uArr)
    }

    return { vert, col, uv }
}


export const createDataSideColumn = ({
    //hTrunk = 300,
    h0,
    h1,
     color1 = [.2, .1, .1],
     color2 = [1, 1, 1],
    rBase = 5,
    hBase = 5,
    hBaseToTrunk = 1,

    hCapital = 2,
    rCapital = 6,
    hTrunkToCapital = 1,


    rTrunk = 3,
}) => {
    let _h0 = h0
    let _h1 = h0 + hBase 
    /** BASE **************/
    const base = [...createFace(
        [-rBase, _h0, rBase,],
        [rBase, _h0, rBase],
        [rBase, _h1, rBase],
        [-rBase, _h1, rBase],
    )]
    const colorBase = [...fillColorFace(color1)]
    const uv1 = createUv(
        [.5, 0],
        [1, 0],
        [1, .5],
        [.5, .5],
    )


    _h0 = _h1
    _h1 = _h0 + hBaseToTrunk
    const baseToTrunk = [...createFace(
        [-rBase, _h0, rBase],
        [rBase, _h0, rBase],
        [rTrunk, _h1, rTrunk],
        [-rTrunk, _h1, rTrunk],
    )]
    const colorBaseToTrunk = [...fillColorFace(color2)]
    const uvBT = createUv(
        [0, .5],
        [.5, .5],
        [.4, .7],
        [.1, .7],
    )


    /** TRUNK ************************/
    
    
    let h = hBase + hBaseToTrunk

    _h0 = _h1
    _h1 = h1 - hCapital - hTrunkToCapital

    const { vert, col, uv } = createTrunk({
        color1, color2,
        h: _h0,
        h2: _h1,
        r: rTrunk,
    })
    const uvT = uv


    /** CAPITAL **************/
    _h0 = _h1
    _h1 = h1 - hCapital 
    const trunkToCapital = [...createFace(
        [-rTrunk, _h0, rTrunk],
        [rTrunk, _h0, rTrunk],
        [rCapital, _h1, rCapital],
        [-rCapital, _h1, rCapital],
    )]
    _h0 = _h1
    _h1 = h1
    const capital = [
        ...createFace(
            [-rCapital, _h0, rCapital],
            [rCapital, _h0, rCapital],
            [rCapital, _h1, rCapital],
            [-rCapital, _h1, rCapital],
        ),
    ]
    const uvC = createUv(
        [.5, .5],
        [1, .5],
        [1, 0],
        [.5, 0],
    )


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
        //...colorBase,
    ]
    const frontUV = [
        ...uv1,
        ...uvBT,
        ...uvT,
        ...uvBT,
        ...uvC,
        //...uvBT,
    ]


    return {
        frontVert,
        frontColors,
        frontUV,
    }
}