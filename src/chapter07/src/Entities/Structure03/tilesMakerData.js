import { makeRotated360 } from './helpersSortArray'
import {
    prepareTileSidesData,
    prepareCacheSidesResults,
} from './tilesHelper'


export const createDataTiles = () => {
    const _ = '_'
    const S = 1

    const arrTiles = []


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
    arrTiles.push(E)



    const _L = [
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
        [
            [_, _, _],
            [_, S, S],
            [_, S, _],
        ],
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
    ]
    const dataL = makeRotated360(_L)
    arrTiles.push(...dataL)


    const _I = [
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
        [
            [_, S, _],
            [_, S, _],
            [_, S, _],
        ],
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
    ]
    arrTiles.push(_I)

    const _I2 = [
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
        [
            [_, _, _],
            [S, S, S],
            [_, _, _],
        ],
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
    ]
    arrTiles.push(_I2)



    const _Y = [
        [
            [_, _, _],
            [_, S, _],
            [_, _, _],
        ],
        [
            [_, _, _],
            [S, _, _],
            [_, _, _],
        ],
        [
            [_, _, _],
            [_, S, _],
            [_, _, _],
        ],
    ]
    const G = makeRotated360(_Y)
    arrTiles.push(...G)

    const _T = [
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
        [
            [_, S, _],
            [S, S, _],
            [_, S, _],
        ],
        [
            [_, _, _],
            [_, _, _],
            [_, _, _],
        ],
    ]
    const arr_T = makeRotated360(_T)
    arrTiles.push(...arr_T)





    const DATA_TILES = []
    for (let i = 0; i < arrTiles.length; ++i) {
        DATA_TILES.push(prepareTileSidesData(arrTiles[i]))
    }
    for (let i = 0; i < DATA_TILES.length; ++i) {
        DATA_TILES[i].id = i
    }
    prepareCacheSidesResults(DATA_TILES)

    console.log('---', DATA_TILES)


    return DATA_TILES
}


