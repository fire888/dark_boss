const SIZE_Y = 20
const SIZE_Z = 20
const SIZE_X = 20
const _ = '.'


const iterateGetRandom = (nX, nY, nZ, tiles) => {
    if (
        nX === '_._._._._._._._._.' &&
        nZ === '_._._._._._._._._.' &&
        nY === '_._._._._._._._._.'
    ) {
        return tiles[0]
    }


    const rInd = Math.floor(Math.random() * tiles.length)
    const inds = []
    for (let i = rInd; i < tiles.length; ++i) {
        inds.push(i)
    }
    for (let i = 0; i < rInd; ++i) {
        inds.push(i)
    }

    for (let i = 0; i < inds.length; ++i) {
        const randomTile = tiles[inds[i]]

        let isCompare = true
        if (nX && nX !== randomTile.nX) {
            isCompare = false
        }

        if (nY && nY !== randomTile.nY) {
            isCompare = false
        }

        if (nZ && nZ !== randomTile.nZ) {
            isCompare = false
        }

        if (isCompare) {
            return randomTile
        }
    }

    return tiles[0]
}





export const createMap = tiles => {


    const arrY = []
    for (let i = 0; i < SIZE_Y; ++i) {
        const arrZ = []
        for (let j = 0; j < SIZE_Z; ++j) {
            const arrX = []
            for (let k = 0; k < SIZE_X; ++k) {
                arrX.push(_)
            }
            arrZ.push(arrX)
        }
        arrY.push(arrZ)
    }

    const MAP = arrY

    for (let i = 0; i < MAP.length; ++i) {
        for (let j = 0; j < MAP[i].length; ++j) {
            for (let k = 0; k < MAP[i][j].length; ++k) {
                let nX = null
                let nY = null
                let nZ = null

                if (
                    MAP[i - 1] &&
                    MAP[i - 1][j] &&
                    MAP[i - 1][j][k] &&
                    MAP[i - 1][j][k].pY
                ) {
                    nY = MAP[i - 1][j][k].pY
                }

                if (
                    MAP[i] &&
                    MAP[i][j - 1] &&
                    MAP[i][j - 1][k] &&
                    MAP[i][j - 1][k].pZ
                ) {
                    nZ = MAP[i][j - 1][k].pZ
                }

                if (
                    MAP[i] &&
                    MAP[i][j] &&
                    MAP[i][j][k - 1] &&
                    MAP[i][j][k - 1].pX
                ) {
                    nX = MAP[i][j][k - 1].pX
                }

                if (i > 0 && (j === 0 || k === 0)) {
                    MAP[i][j][k] = tiles[0]
                    continue
                }

                MAP[i][j][k] = iterateGetRandom(nX, nY, nZ, tiles, i, j, k)
            }
        }
    }

    console.log('MAP', MAP)

    return MAP
}
