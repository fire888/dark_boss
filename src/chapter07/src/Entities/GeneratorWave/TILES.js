const G = 1
const _ = 0
const m = 2

const GROUND = [
    [G, G, G, G],
    [G, G, G, G],
    [G, G, G, G],
    [G, G, G, G],
]

const WATER = [
    [_, _, _, _],
    [_, _, _, _],
    [_, _, _, _],
    [_, _, _, _],
]

const G_W_1 = [
    [_, m, G, G],
    [_, m, G, G],
    [_, m, G, G],
    [_, m, G, G],
]

const G_W_2 = [
    [_, m, G, G],
    [m, m, G, G],
    [G, G, G, G],
    [G, G, G, G],
]

const G_W_3 = [
    [_, m, G, G],
    [m, m, G, G],
    [G, G, m, m],
    [G, G, m, _],
]



const makeRotatedTiles = src => {
    const arr = [src]
    {
        const r = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (let j = 0; j < r.length; ++j) {
            for (let k = 0; k < r[j].length; ++k) {
                r[j][k] = src[3 - j][3 - k]
            }
        }
        arr.push(r)
    }
    {
        const r = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (let j = 0; j < r.length; ++j) {
            for (let k = 0; k < r[j].length; ++k) {
                r[k][j] = G_W_1[j][k]
            }
        }
        arr.push(r)
    }
    {
        const r = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (let j = 0; j < r.length; ++j) {
            for (let k = 0; k < r[j].length; ++k) {
                r[k][j] = G_W_1[j][3 - k]
            }
        }
        arr.push(r)
    }
    return arr
}


const ARR = []
ARR.push(...makeRotatedTiles(G_W_1))
ARR.push(...makeRotatedTiles(G_W_2))
ARR.push(...makeRotatedTiles(G_W_3))
ARR.push(GROUND, WATER)


const prepareTile = t => {
    const n = [...t[0]]
    const s = [...t[3]]
    const w = []
    const e = []
    for (let i = 0; i < t.length; ++i) {
        w.push(t[i][0])
        e.push(t[i][3])
    }
    return { tile: t, n, s, w, e }
}

const ARR_TILES = []
for (let i = 0; i < ARR.length; ++i) {
    ARR_TILES.push(prepareTile(ARR[i]))
}

export { ARR_TILES }
