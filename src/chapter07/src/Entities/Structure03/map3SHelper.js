const SIZE_X = 10
const SIZE_Y = 10
const SIZE_Z = 10



const makeQueue = map => {
    const m = {}
    for (let i = 0; i < map.length; ++i) {
        for (let j = 0; j < map[i].length; ++j) {
            for (let k = 0; k < map[i][j].length; ++k) {
                m[i + '_' + j + '_' + k] = map[i][j][k]
            }
        }
    }

    let indInsert = 0
    let indComplete = 0
    const q = []
    const iterate = (i, j, k) => {
        if (!m[`${ i }_${ j }_${ k }`]) {
            return;
        }

        if (!m[`${ i }_${ j }_${ k }`].queue) {
            q.push([i, j, k])
            ++indComplete
            ++indInsert
            m[`${ i }_${ j }_${ k }`].queue = { ind: indInsert, calk: true }
        } else {
            ++indComplete
            m[`${ i }_${ j }_${ k }`].queue.calk = true
        }

        if (m[`${ i }_${ j }_${ k + 1 }`] && !m[`${ i }_${ j }_${ k + 1 }`].queue) {
            q.push([i, j, k + 1])
            ++indInsert
            m[`${ i }_${ j }_${ k + 1 }`].queue = { ind: indInsert }
        }

        if (m[`${ i }_${ j }_${ k - 1 }`] && !m[`${ i }_${ j }_${ k - 1 }`].queue) {
            q.push([i, j, k - 1])
            ++indInsert
            m[`${ i }_${ j }_${ k - 1 }`].queue = { ind: indInsert }
        }

        if (m[`${ i }_${ j + 1 }_${ k }`] && !m[`${ i }_${ j + 1 }_${ k }`].queue) {
            q.push([i, j + 1, k])
            ++indInsert
            m[`${ i }_${ j + 1 }_${ k }`].queue = { ind: indInsert }
        }

        if (m[`${ i }_${ j - 1 }_${ k }`] && !m[`${ i }_${ j - 1 }_${ k }`].queue) {
            q.push([i, j - 1, k])
            ++indInsert
            m[`${ i }_${ j - 1 }_${ k }`].queue = { ind: indInsert }
        }
        if (q[indComplete + 1]) {
            iterate(...q[indComplete + 1])
        } else {
            iterate(i + 1, 4, 4)
        }

    }
    iterate(0, 4, 4)
    return q
}




























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


    const queue = makeQueue(arrY)
    let ind = 0

    return {
        sizeZ: SIZE_Z,
        sizeY: SIZE_Y,
        sizeX: SIZE_X,
        items: arrY,
        checkNextMapItemIndexes: (y, z, x) => {
            if (queue[ind]) {
                const next = queue[ind]
                ++ind
                return { nextY: next[0], nextZ: next[1], nextX: next[2] }
            } else {
                return { nextY: null, nextZ: null, nextX: null }
            }
            //return checkNextMapItemIndexes(arrY, y, z, x)
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
