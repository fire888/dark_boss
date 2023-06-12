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
    const dataL = makeRotated360(_L)
    arrTiles.push(...dataL)


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
    const dataL_B = makeRotated360(_L_B)
    arrTiles.push(...dataL_B)


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
    const dataL_T = makeRotated360(_L_T)
    arrTiles.push(...dataL_T)


    const _T = [
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
            [_, S, _],
            [_, _, _],
        ],
    ]
    const G = makeRotated360(_T)
    arrTiles.push(...G)




    const DATA_TILES = []
    for (let i = 0; i < arrTiles.length; ++i) {
        DATA_TILES.push(prepareTileSidesData(arrTiles[i]))
    }
    for (let i = 0; i < DATA_TILES.length; ++i) {
        DATA_TILES[i].id = i
    }
    prepareCacheSidesResults(DATA_TILES)


    return DATA_TILES
}


