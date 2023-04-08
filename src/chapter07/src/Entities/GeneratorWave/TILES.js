const G = 2
const m = 1
const _ = 0


const GROUND = [
    [G, G, G, G],
    [G, m, m, G],
    [G, m, m, G],
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


const G_W_8 = [
    [_, _, _, _],
    [m, m, m, _],
    [m, m, m, _],
    [_, m, m, _],
]

const G_W_9 = [
    [_, m, m, _],
    [m, m, m, m],
    [m, m, m, m],
    [_, _, _, _],
]

const G_W_10 = [
    [G, m, m, G],
    [m, m, m, m],
    [m, m, m, m],
    [G, m, m, _],
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
                r[k][j] = src[j][k]
            }
        }
        arr.push(r)
    }
    {
        const r = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (let j = 0; j < r.length; ++j) {
            for (let k = 0; k < r[j].length; ++k) {
                r[k][j] = src[j][3 - k]
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
//ARR.push(...makeRotatedTiles(G_W_1))
ARR.push(...makeRotatedTiles(G_W_2))
ARR.push(...makeRotatedTiles(G_W_3))
ARR.push(...makeRotatedTiles(G_W_4))
ARR.push(...makeRotatedTiles(G_W_5))
ARR.push(...makeRotatedTiles(G_W_6))
ARR.push(...makeRotatedTiles(G_W_7))
ARR.push(...makeRotatedTiles(G_W_8))
ARR.push(...makeRotatedTiles(G_W_9))
ARR.push(...makeRotatedTiles(G_W_10))


//ARR.push(GROUND, WATER)


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
