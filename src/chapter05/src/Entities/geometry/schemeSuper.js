const createSet = ({ xCenter, zCenter, hStart, hEnd, count }) => {
    const r = 20
    const hDiff = hEnd - hStart
    //const count = Math.floor(hDiff / 30)  
    const stepH = hDiff / count
    //const count = 5

    const tickness = 7
    const hColumn = stepH * 4
    const rColumn = 3
    const offset = 50

    const lBridge = offset + offset - r - r

    const scheme = []
    
    /** first */
    for (let i = 0; i < count; ++i) {
        const h = stepH * i + hStart
        const hh = h - tickness + hStart

        let x = xCenter
        let z = zCenter

        const p = i % 4
        if (p < 1) {
            x = xCenter - offset
            z = zCenter - offset
        } else if (p < 2) {
            x = xCenter + offset
            z = zCenter - offset
        } else if (p < 3) {
            x = xCenter + offset
            z = zCenter + offset
        } else if (p < 4) {
            x = xCenter - offset
            z = zCenter + offset
        }

        scheme.push({
            type: 'stairs',
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


const D = ['N', 'E', 'S', 'W']
const C = { 'N': 1, 'E': 2, 'S': 3, 'W': 4}
const OFFSET = {
    'N': [0, -1],
    'E': [1, 0],
    'S': [0, 1],
    'W': [-1, 0],
}

export const createSchemeSuper = () => {
    const arr = []

    let h = 0
    let nextDir = D[Math.floor(Math.random() * D.length)]
    let xCenter = 0
    let zCenter = 0

    for (let i = 0; i < 5; ++i) {
        let nextDir = D[Math.floor(Math.random() * D.length)]
        const count = C[nextDir] + 4 * Math.floor(Math.random() * 2)
        const hEnd = h + count * 30 
        const data = { xCenter, zCenter, hStart: h, hEnd, count }
        arr.push(...createSet(data))
        xCenter = xCenter + (OFFSET[nextDir][0] * 140)
        zCenter = zCenter + (OFFSET[nextDir][1] * 140)
        h = hEnd


        if (i !== 5 - 1) {
            arr.push({ xCenter, zCenter, h: h - 30, type: 'zone' })
        }
    }


    //console.log(arr)


    // arr.push(...createSet({ 
    //     xCenter: 0, zCenter: -140, hStart: 150, hEnd: 400, offset: 50,
    // }))
    // arr.push(...createSet({ 
    //     xCenter: -140, zCenter: -140, hStart: 400, hEnd: 650, offset: 50,
    // }))

    return arr
}