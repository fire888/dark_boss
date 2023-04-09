import { ARR_TILES } from "./TILES_02";

const compareTiles = (bt, arrSrc) => {
    //for (let i = 0; i < arrSrc.length; ++i) {
    for (let i = 0; i < 1; ++i) {
        const bottomArr = arrSrc[i].b

        let isEqual = true

        for (let j = 0; j < bt.length; ++j) {
            for (let k = 0; k < bt[j].length; ++k) {
                if (
                    bottomArr[j][k] === 3 &&
                    bt[j][k] !== 3
                ) {
                    isEqual = false
                }
            }
        }

        if (isEqual) {
            return arrSrc[i]
        }
    }

    return 10
}






export const createFloor2 = (map) => {
    console.log('ARR_TILES', ARR_TILES)
    const MAP = []
    for (let i = 0; i < map.length; ++i) {
        const arr = []
        for (let j = 0; j < map[i].length; ++j) {
            const resultTile = compareTiles(map[i][j].tile, ARR_TILES)
            arr.push(resultTile)
        }
        MAP.push(arr)
    }

    console.log('--MAP', MAP)
    // debugger
    // for (let i = 0; i < MAP.length; ++i) {
    //     for (let j = 0; j < MAP[i].length; ++j) {
    //         if (
    //             MAP[i][j] !== 10 &&
    //             MAP[i + 1] &&
    //             MAP[i + 1][j] &&
    //             MAP[i + 1][j] === 10 &&
    //             MAP[i + 1][j + 1] &&
    //             MAP[i + 1][j + 1] !== 10
    //         ) {
    //             MAP[i + 1][j] = ARR_TILES[1]
    //             console.log('!!!', ARR_TILES[1])
    //         }
    //     }
    // }

    return MAP
}
