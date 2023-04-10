
const prepareTileSidesData = tile => {
    let nX = ''
    let pX = ''
    let nY = ''
    let pY = ''
    let nZ = ''
    let pZ = ''

    for (let i = 0; i < tile.length; ++i) {
        for (let j = 0; j < tile.length; ++j) {
            for (let k = 0; k < tile.length; ++k) {
                if (i === 0) {
                    nY += '_' + tile[i][j][k]
                }
                if (i === tile.length - 1) {
                    pY += '_' + tile[i][j][k]
                }
                if (j === 0) {
                    nZ += '_' + tile[i][j][k]
                }
                if (j === tile[0].length - 1) {
                    pZ += '_' + tile[i][j][k]
                }
                if (k === 0) {
                    nX += '_' + tile[i][j][k]
                }
                if (k === tile[0][0].length - 1) {
                    pX += '_' + tile[i][j][k]
                }
            }
        }
    }
    return { tile, nX, pX,nY, pY, nZ, pZ }
}


const createRotatedYCopy = matrix => {
    const arr = matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())
    return arr
}

const makeRotated360  = tile => {
    const result = [tile]

    /** rotate */
    for (let i = 0; i < 3; ++i) {
        const prev = result[result.length - 1]
        const arr = []
        for (let i = 0; i < prev.length; ++i) {
            const rotated = createRotatedYCopy(prev[i])
            arr.push(rotated)
        }
        result.push(arr)
    }
    return result
}




export const createDataTiles = () => {
    const _ = '.'
    const S = 1


    const E = [
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
    ]


    const _L = [
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
        [
            [_, S, _],
            [_, S, S],
            [_, _, _],
        ],
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
    ]

    const _L_B = [
        [
            [_, _, _],
            [_, S, _],
            [_, _, _],
        ],
        [
            [_, S, _],
            [_, S, _],
            [_, _, _],
        ],
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
    ]

    const _L_T = [
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
        [
            [_, S, _],
            [_, S, _],
            [_, _, _],
        ],
        [
            [_, _, _],
            [_, S, _],
            [_, _, _],
        ],
    ]

    const dataL = makeRotated360(_L)
    const dataL_B = makeRotated360(_L_B)
    const dataL_T = makeRotated360(_L_T)

    const arrTiles = [
        E,
        ...dataL,
        ...dataL_B,
        ...dataL_T,
    ]

    const DATA_TILES = []
    for (let i = 0; i < arrTiles.length; ++i) {
        DATA_TILES.push(prepareTileSidesData(arrTiles[i]))
    }

    console.log(DATA_TILES)

    return DATA_TILES
}


