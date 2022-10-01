export const createSchemeStairs = () => {
    const r = 20
    const stepH = 30
    const count = 25
    const tickness = 7
    const hColumn = stepH * 4
    const rColumn = 3
    const offset = 50

    const lBridge = offset + offset - r - r



    const scheme = []
    for (let i = 0; i < count; ++i) {
        const h = stepH * i
        const hh = h - tickness

        let x = 0
        let z = 0

        const p = i % 4
        if (p < 1) {
            x = -offset
            z = -offset
        } else if (p < 2) {
            x = offset
            z = -offset
        } else if (p < 3) {
            x = offset
            z = offset
        } else if (p < 4) {
            x = -offset
            z = offset
        }

        scheme.push({
            offset,
            h,
            hh,
            r,
            x,
            z,
            bridgeMinusH: stepH,
            bridgeL: lBridge,
            hColumn,
            rColumn,
            i,
            isTop: count - i < 5,
        })
    }

    return scheme
}