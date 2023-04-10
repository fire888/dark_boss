const SIZE = 15
const _ = '.'


const iterateGetRandom = (nX, nY, nZ, tiles, onComplete) => {
    let maxCount = tiles.length * 3

    const iterate = () => {
        const randomTile = tiles[Math.floor(Math.random() * tiles.length)]

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

        --maxCount
        if (isCompare || maxCount === 0) {
            return void onComplete(randomTile)
        }

        iterate()
    }

    iterate()
}





export const createMap = tiles => {


    const arrY = []
    for (let i = 0; i < SIZE; ++i) {
        const arrZ = []
        for (let j = 0; j < SIZE; ++j) {
            const arrX = []
            for (let k = 0; k < SIZE; ++k) {
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
                console.log('@@@@@')

                let nX = null
                let nY = null
                let nZ = null

                if (
                    MAP[i - 1] &&
                    MAP[i - 1][j] &&
                    MAP[i - 1][j][i] &&
                    MAP[i - 1][j][i].pY
                ) {
                    nY = MAP[i - 1][j][i].pY
                }

                if (
                    MAP[i] &&
                    MAP[i][j - 1] &&
                    MAP[i][j - 1][i] &&
                    MAP[i][j - 1][i].pZ
                ) {
                    nZ = MAP[i][j - 1][i].pZ
                }

                if (
                    MAP[i] &&
                    MAP[i][j] &&
                    MAP[i][j][i - 1] &&
                    MAP[i][j][i - 1].pX
                ) {
                    nX = MAP[i][j][i - 1].pX
                }

                iterateGetRandom(nX, nY, nZ, tiles, result => {
                    MAP[i][j][k] = result
                })
            }
        }
    }

    console.log('MAP', MAP)

    return MAP
}
