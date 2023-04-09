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
                r[k][j] = src[3 - j][k]
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
    console.log(arr)
    return arr
}




const G = 3
const m = 2
const _ = 1

const ARR = []

const GROUND = [
    [G, G, G, G],
    [G, m, m, G],
    [G, m, m, G],
    [G, G, G, G],
]
ARR.push(GROUND)



const WATER = [
    [_, _, _, _],
    [_, _, _, _],
    [_, _, _, _],
    [_, _, _, _],
]
ARR.push(WATER)


const G_W_1 = [
    [_, m, m, G],
    [_, m, m, G],
    [_, m, m, G],
    [_, m, m, G],
]
ARR.push(...makeRotatedTiles(G_W_1))



const G_W_2 = [
    [_, m, m, G],
    [m, m, m, G],
    [m, m, m, G],
    [G, G, G, G],
]
ARR.push(...makeRotatedTiles(G_W_2))




const G_W_3 = [
    [G, m, m, _],
    [m, m, m, _],
    [m, m, m, _],
    [_, _, _, _],
]
ARR.push(...makeRotatedTiles(G_W_3))





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


const SRC = [
    prepareTile(GROUND),
    prepareTile(WATER),
    prepareTile(G_W_1),
    prepareTile(G_W_2),
    prepareTile(G_W_3),
]


export { ARR_TILES, SRC }
