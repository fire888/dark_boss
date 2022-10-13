import {
    createFace,
    createUv,
    fillColorFace,
} from './helpers'



export const createDataUnit = () => {

    const v = []
    const c = []
    const r = 5
    const r2 = 15

    for (let i = 0; i < 16; ++i) {
        const ph = i / 10 * (Math.PI * 2)
        const phN = i !== 10 - 1
            ? (i + 1) / 10 * (Math.PI * 2)
            : (0 / 10) * (Math.PI * 2)

        const sP = Math.sin(ph) * r
        const cP = Math.cos(ph) * r

        const sN = Math.sin(phN) * r
        const cN = Math.cos(phN) * r

        v.push(
            sP, 0, cP,
            sN, 0, cN,
            0, 20, 0
        )

        c.push(
            1, 0, 0, 1, 0, 0, 1, 0, 0,
            // 1, 0, 0, 1, 0, 0, 1, 0, 0,
            // 1, 0, 0, 1, 0, 0, 1, 0, 0,
        )


        if (i % 4 === 0) {
            v.push(
                ...createFace(
                    [Math.sin(ph) * r2, -2, Math.cos(ph) * r2],
                    [Math.sin(phN) * r2, -2, Math.cos(phN) * r2],
                    [cN, -2, cN],
                    [sP, -2, cP],
                )
            )
            c.push(...fillColorFace([0, 0, 1]))
        }

    }




    return { v, c }
}