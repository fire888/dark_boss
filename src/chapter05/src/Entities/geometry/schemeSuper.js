const createSet = ({ xCenter, zCenter, hStart, hEnd, count }) => {
    const r = 20
    const hDiff = hEnd - hStart
    const stepH = hDiff / count


    const tickness = 7
    const rColumn = 3
    const offset = 50

    const lBridge = offset + offset - r - r

    const scheme = []

    for (let i = 0; i < count; ++i) {
        let hColumn = stepH * (4)
        if (i < 4) {
             hColumn = hStart + (i * stepH) + 15
        }

        const h = stepH * i + hStart
        const hh = h - tickness + hStart

        //const hColumn = stepH * 4


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
const STAIR_WIDTH = 140 

export const createSchemeSuper = () => {
    const arr = []

    let h = 0
    let xCenter = 0
    let zCenter = 0

    let currentDir = 'N'

    for (let i = 0; i < 5; ++i) {
        const nextDir = D[Math.floor(Math.random() * D.length)]
        const lenBridge = Math.random() * 400 + 30
        const nextXCenter = xCenter + (OFFSET[nextDir][0] * (STAIR_WIDTH + lenBridge))
        const nextZCenter = zCenter + (OFFSET[nextDir][1] * (STAIR_WIDTH + lenBridge))

        
        /** stair set */
        const count = C[nextDir] + 4 * Math.floor(Math.random() * 2)
        const hEnd = h + count * 30
        const data = { xCenter, zCenter, hStart: h, hEnd, count }
        const setStair = createSet(data)
        arr.push(...setStair)


        /** next platform */
        if (i !== 0) {
            arr.push({ xCenter, zCenter, h: h - 30, type: 'zone', nextDir, dir: currentDir })
        }
        

        /** bridge */
        if (i !== 5 - 1) {
            const centerBridgeX = (nextXCenter - xCenter) / 2 + xCenter
            const centerBridgeZ = (nextZCenter - zCenter) / 2 + zCenter
            arr.push({ centerBridgeX, centerBridgeZ, h: hEnd - 30, dir: nextDir, lenBridge, type: 'bridge' })
        }

        
        /** move center */
        xCenter = nextXCenter
        zCenter = nextZCenter
        h = hEnd
        currentDir = nextDir
    }

    return arr
}