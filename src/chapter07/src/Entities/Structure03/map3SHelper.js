const SIZE_X = 10
const SIZE_Y = 5
const SIZE_Z = 10



let directions = ['pX', 'nZ', 'nX', 'pZ']
let currentDirInd = 0
const checkNextMapItemIndexes = (map, y, z, x) => {
    let nextY = null
    let nextZ = null
    let nextX = null

    if (directions[currentDirInd] === 'pX') {
        if (map[y] && map[y][z] && map[y][z][x + 1]) {
            nextY = y
            nextZ = z
            nextX = x + 1

            return { nextY, nextZ, nextX }
        }
        if (map[y] && map[y][z + 1] && !map[y][z][x + 1]) {
            nextY = y
            nextZ = z + 1
            nextX = 0

            return { nextY, nextZ, nextX }
        }
        if (map[y + 1] && !map[y][z + 1] && !map[y][z][x + 1]) {
            nextY = y + 1
            nextZ = 0
            nextX = 0

            return { nextY, nextZ, nextX }
        }
    }
    return { nextY, nextZ, nextX }

}


const forceFillMapSides = (map, indTile = 0) => {
    for (let i = 0; i < SIZE_Y; ++i) {
        for (let j = 0; j < SIZE_Z; ++j) {
            for (let k = 0; k < SIZE_X; ++k) {

                if (
                    j === 0 ||
                    j === (SIZE_Z - 1) ||
                    k === 0 ||
                    k === (SIZE_X - 1) ||
                    i === (SIZE_Y - 1)
                ) {
                    const s = new Set()
                    s.add(indTile)
                    map[i][j][k].resultTileIndex = indTile
                    map[i][j][k].maybeTilesInds = s
                }
            }
        }
    }
}


export const createMap3X = (tiles) => {
    const arrY = []
    for (let i = 0; i < SIZE_Y; ++i) {
        const arrZ = []
        for (let j = 0; j < SIZE_Z; ++j) {
            const arrX = []
            for (let k = 0; k < SIZE_X; ++k) {
                const s = new Set()
                tiles.map((item, index) => { s.add(index) })
                arrX.push({
                    resultTileIndex: null,
                    maybeTilesInds: s,
                    i,
                    j,
                    k,
                })
            }
            arrZ.push(arrX)
        }
        arrY.push(arrZ)
    }

    return {
        sizeZ: SIZE_Z,
        sizeY: SIZE_Y,
        sizeX: SIZE_X,
        items: arrY,
        checkNextMapItemIndexes: (y, z, x) => {
            return checkNextMapItemIndexes(arrY, y, z, x)
        },
        forceFillMapSides: (tile = 0) => {
            forceFillMapSides(arrY, tile)
        },
        iterateAll: (f) => {
            for (let i = 0; i < SIZE_Y; ++i) {
                for (let j = 0; j < SIZE_Z; ++j) {
                    for (let k = 0; k < SIZE_X; ++k) {
                        f(arrY[i][j][k])
                    }
                }
            }
        }
    }
}
