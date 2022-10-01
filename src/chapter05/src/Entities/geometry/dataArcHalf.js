import {
    createFace,
    fillColorFace,
} from './helpers'


const {
    PI,
    cos,
} = Math

const hPI = PI / 2
const colorB = [0, 0, 0]






export const createDataArcHalf = ({
    hArc = 15,
    arcL = 15,
    color2,
}) => {
    const v = []
    const c = []
    const u = []

    /** arc */
    const arcC = 5
    const arcStep = arcL / arcC

    for (let i = 0; i < arcC; ++i) {
        const phase0 = cos(i / arcC * (hPI))
        const phase1 = cos((i + 1) / arcC * (hPI))
        const hhArc = 0
        v.push(
            i * arcStep, hhArc + (phase0 * hArc), 0,
            (i + 1) * arcStep, hhArc + (phase1 * hArc), 0,
            arcL,  hArc, 0,
        )

        v.push(
            i * arcStep, hhArc + (phase0 * hArc), -2,
            arcL, hArc, -2,
            (i + 1) * arcStep, hhArc + (phase1 * hArc), -2,
        )

        c.push(
            ...color2, ...color2, ...color2,
            ...color2, ...color2, ...color2,
        )
        u.push(
            0, 0, .3, 0, .3, .3,
            0, 0, .3, 0, .3, .3
        )


        v.push(...createFace(
            [i * arcStep, hhArc + (phase0 * hArc), 0],
            [i * arcStep, hhArc + (phase0 * hArc), -2],
            [(i + 1) * arcStep, hhArc + (phase1 * hArc), -2],
            [(i + 1) * arcStep, hhArc + (phase1 * hArc), 0],
        ))

        c.push(...fillColorFace(colorB))
        u.push(
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        )
    }

    return { v, c, u }
}