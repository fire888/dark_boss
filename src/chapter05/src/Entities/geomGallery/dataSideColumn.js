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




const color1 = [.8, .3, .3]
const color2 = [1, 1, 1]


const createTrunk = ({
     h = 2,
     h2 = 30,
     r = 10,
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
            vert.push(
                ...createFaceWithSquare(
                    [-r, arrDividers[i].h0, r],
                    [r, arrDividers[i].h0, r],
                    [r, arrDividers[i].h01, r],
                    [-r, arrDividers[i].h01, r],
                )
            )
            col.push(...fillColorFaceWithSquare(color1, color2))
            uv.push(
                ...createUv(
                    [.5, .5],
                    [1, .5],
                    [1, 1],
                    [.5, 1],
                ),
                ...createUv(
                    [0, .5],
                    [.5, .5],
                    [.5, 1],
                    [0, 1],
                ),
                ...createUv(
                    [0, .5],
                    [.5, .5],
                    [.5, 1],
                    [0, 1],
                ),
                ...createUv(
                    [0, .5],
                    [.5, .5],
                    [.5, 1],
                    [0, 1],
                ),
                ...createUv(
                    [0, .5],
                    [.5, .5],
                    [.5, 1],
                    [0, 1],
                )
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
        vert.push(
            ...createFaceWithSquare(
                [-r, arrDividers[arrDividers.length - 1].h04, r],
                [r, arrDividers[arrDividers.length - 1].h04, r],
                [r, h2, r],
                [-r, h2, r],
            )
        )
        col.push(...fillColorFaceWithSquare(color2, color1))
        uv.push(
            ...createUv(
                [0, .5],
                [.5, .5],
                [.5, 1],
                [0, 1],
            ),
            ...createUv(
                [0, .5],
                [.5, .5],
                [.5, 1],
                [0, 1],
            ),
            ...createUv(
                [0, .5],
                [.5, .5],
                [.5, 1],
                [0, 1],
            ),
            ...createUv(
                [0, .5],
                [.5, .5],
                [.5, 1],
                [0, 1],
            ),
            ...createUv(
                [0, .5],
                [.5, .5],
                [.5, 1],
                [0, 1],
            )
        )
    }

    return { vert, col, uv }
}


export const createDataSideColumn = ({
    rBase = 5,
    hBase = 5,
    hBaseToTrunk = 1,

    hCapital = 2,
    rCapital = 6,
    hTrunkToCapital = 1,

    hTrunk = 300,
    rTrunk = 3,
}) => {
    /** BASE **************/
    const base = [...createFace(
        [-rBase, 0, rBase,],
        [rBase, 0, rBase],
        [rBase, hBase, rBase],
        [-rBase, hBase, rBase],
    )]
    const colorBase = [...fillColorFace(color1)]
    const uv1 = createUv(
        [.5, 0],
        [1, 0],
        [1, .5],
        [.5, .5],
    )


    const baseToTrunk = [...createFace(
        [-rBase, hBase, rBase],
        [rBase, hBase, rBase],
        [rTrunk, hBase + hBaseToTrunk, rTrunk],
        [-rTrunk, hBase + hBaseToTrunk, rTrunk],
    )]
    const colorBaseToTrunk = [...fillColorFace(color2)]
    const uvBT = createUv(
        [0, 0],
        [.5, 0],
        [.5, .5],
        [0, .5],
    )


    /** TRUNK ************************/
    let h = hBase + hBaseToTrunk
    const { vert, col, uv } = createTrunk({
        h: hBase + hBaseToTrunk,
        h2: hTrunk + hBase + hBaseToTrunk,
        r: rTrunk,
    })
    const uvT = uv


    /** CAPITAL **************/
    h = h + hTrunk
    const trunkToCapital = [...createFace(
        [-rTrunk, h, rTrunk],
        [rTrunk, h, rTrunk],
        [rCapital, h + hTrunkToCapital, rCapital],
        [-rCapital, h + hTrunkToCapital, rCapital],
    )]
    h = h + hTrunkToCapital
    const capital = [...createFace(
        [-rCapital, h, rCapital],
        [rCapital, h, rCapital],
        [rCapital, h + hCapital, rCapital],
        [-rCapital, h + hCapital, rCapital],
    )]
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
    ]
    const frontUV = [
        ...uv1,
        ...uvBT,
        ...uvT,
        ...uv1,
        ...uvC,
    ]


    return {
        frontVert,
        frontColors,
        frontUV,
    }
}