const prepareTile = t => {
}

const _ = 10
const S = 3
const b = 2




const T0 = {
    tile: [
        [S, S, S, S],
        [S, _, _, S],
        [S, _, _, S],
        [S, S, S, S],
    ],
    b: [
        [S, S, S, S],
        [S, _, _, S],
        [S, _, _, S],
        [S, S, S, S],
    ],
    n: [S, S, S, S],
    s: [S, S, S, S],
    w: [S, S, S, S],
    e: [S, S, S, S],
}

const T1 = {
    tile: [
        [_, S, _, _],
        [_, S, _, _],
        [_, S, S, S],
        [_, _, _, _],
    ],
    b: [
        [_, _, _, _],
        [_, _, _, _],
        [_, _, _, _],
        [_, _, _, _],
    ],
    n: [S, S, S, S],
    s: [S, S, S, S],
    w: [S, S, S, S],
    e: [S, S, S, S],
}



const ARR_TILES = [T0, T1]

export { ARR_TILES }
