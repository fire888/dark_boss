const G = 2
const m = 1
const _ = 0


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
    [_, m, m, G],
    [_, m, m, G],
    [_, m, m, G],
    [_, m, m, G],
]

const G_W_2 = [
    [_, m, m, G],
    [m, m, m, G],
    [m, m, m, G],
    [G, G, G, G],
]


const G_W_3 = [
    [_, m, m, G],
    [m, m, m, m],
    [m, m, m, m],
    [G, m, m, _],
]

const G_W_4 = [
    [_, m, m, G],
    [m, m, m, G],
    [m, m, m, G],
    [G, m, m, G],
]

const G_W_5 = [
    [G, m, m, G],
    [m, m, m, G],
    [m, m, m, G],
    [_, m, m, G],
]


const G_W_6 = [
    [G, m, m, _],
    [m, m, m, _],
    [m, m, m, _],
    [_, m, m, _],
]

const G_W_7 = [
    [_, m, m, G],
    [m, m, m, G],
    [m, m, m, G],
    [_, m, m, G],
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
ARR.push(GROUND, GROUND, GROUND, GROUND)
ARR.push(WATER, WATER, WATER, WATER)
ARR.push(...makeRotatedTiles(G_W_1))
ARR.push(...makeRotatedTiles(G_W_2))
ARR.push(...makeRotatedTiles(G_W_3))
ARR.push(...makeRotatedTiles(G_W_4))
ARR.push(...makeRotatedTiles(G_W_5))
ARR.push(...makeRotatedTiles(G_W_6))
ARR.push(...makeRotatedTiles(G_W_7))
ARR.push(GROUND, WATER)


const prepareTile = t => {
    const w = [...t[0]]
    const e = [...t[3]]
    const n = []
    const s = []
    for (let i = 0; i < t.length; ++i) {
        n.push(t[i][0])
        s.push(t[i][3])
    }
    return { tile: t, n, s, w, e }
}

const ARR_TILES = []
for (let i = 0; i < ARR.length; ++i) {
    ARR_TILES.push(prepareTile(ARR[i]))
}

export { ARR_TILES }
