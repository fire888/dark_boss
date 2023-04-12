const SIZE_Y = 7
const SIZE_Z = 7
const SIZE_X = 7




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



const makeSetContainsElementsSet1Set2 = (s1, s2) => {
    const result = new Set()
    for (const itemS1 of s1) {
        for (const itemS2 of s2) {
            if (itemS1 === itemS2) {
                result.add(itemS1)
            }
        }
    }
    return result
}



const setRandomTileFromExists = (mapItem) => {
    const myArr = Array.from(mapItem.maybeTilesInds)
    if (!myArr.length) {
        mapItem.resultTileIndex = null
        return
    }

    const r = Math.floor(Math.random() * myArr.length)
    mapItem.resultTileIndex = myArr[r]
    mapItem.maybeTilesInds = new Set()
    mapItem.maybeTilesInds.add(myArr[r])
}




const doAction = (dataAction, map, tiles) => {
    if (dataAction.action === 'choiceFinal') {
        const [y, z, x] = dataAction.src
        if (map[y] && map[y][z] && map[y][z][x]) {
            if (Number.isInteger(map[y][z][x].resultTileIndex)) {
                return;
            }
            setRandomTileFromExists(map[y][z][x])
        }
    }

    if (dataAction.action === 'filterMaybe') {
        const [y, z, x] = dataAction.src
        const [yWith, zWith, xWith] = dataAction.with
        const { mapWithKeyTileSideIds } = dataAction

        if (map[y] && map[y][z] && map[y][z][x]) {
            if (Number.isInteger(map[y][z][x].resultTileIndex)) {
                return;
            }

            if (
                map[yWith] && map[yWith][zWith] && map[yWith][zWith][xWith]
            ) {
                const set = new Set()
                for (const item of map[yWith][zWith][xWith].maybeTilesInds) {
                    const resultSet = makeSetContainsElementsSet1Set2(tiles[item][mapWithKeyTileSideIds], map[y][z][x].maybeTilesInds)
                    for (const r of resultSet) {
                        set.add(r)
                    }
                }
                map[y][z][x].maybeTilesInds = set
            }
        }
    }
}



const createMapAndPrepareStartData = (tiles) => {
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
    return arrY
}


const forceFillSides = (map, indTile = 0) => {
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



export const createMap = tiles => {
    const MAP = createMapAndPrepareStartData(tiles)
    forceFillSides(MAP)


    const iterate = (y, z, x) => {
        const actions = [
            { action: 'choiceFinal', src: [y, z, x], },

            /** Z */
            { action: 'filterMaybe', src: [y, z - 1, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsNZ' },
            { action: 'filterMaybe', src: [y, z + 1, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsPZ' },

            /** X */
            { action: 'filterMaybe', src: [y, z, x - 1], with: [y, z, x], mapWithKeyTileSideIds: 'idsNX'  },
            { action: 'filterMaybe', src: [y, z, x + 1], with: [y, z, x], mapWithKeyTileSideIds: 'idsPX'  },

            /** Z - 1, X - 1 */
            { action: 'filterMaybe', src: [y, z - 1, x - 1], with: [y, z - 1, x], mapWithKeyTileSideIds: 'idsNX'  },
            { action: 'filterMaybe', src: [y, z - 1, x - 1], with: [y, z, x - 1], mapWithKeyTileSideIds: 'idsNZ'  },

            /** Z - 1, X + 1 */
            { action: 'filterMaybe', src: [y, z - 1, x + 1], with: [y, z - 1, x], mapWithKeyTileSideIds: 'idsPX'  },
            { action: 'filterMaybe', src: [y, z - 1, x + 1], with: [y, z, x + 1], mapWithKeyTileSideIds: 'idsNZ'  },

            /** Z + 1, X + 1 */
            { action: 'filterMaybe', src: [y, z + 1, x + 1], with: [y, z, x + 1], mapWithKeyTileSideIds: 'idsPZ'  },
            { action: 'filterMaybe', src: [y, z + 1, x + 1], with: [y, z + 1, x], mapWithKeyTileSideIds: 'idsPX'  },

            /** Z + 1, X - 1 */
            { action: 'filterMaybe', src: [y, z + 1, x - 1], with: [y, z + 1, x], mapWithKeyTileSideIds: 'idsNX'  },
            { action: 'filterMaybe', src: [y, z + 1, x - 1], with: [y, z, x - 1], mapWithKeyTileSideIds: 'idsPZ'  },

            /** -- Y */
            //{ action: 'filterMaybe', src: [y - 1, z, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsNY' },

            /** ++Y */
            { action: 'filterMaybe', src: [y + 1, z, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsPY' },

            { action: 'filterMaybe', src: [y + 1, z - 1, x], with: [y, z - 1, x], mapWithKeyTileSideIds: 'idsPY' },
            { action: 'filterMaybe', src: [y + 1, z + 1, x], with: [y, z + 1, x], mapWithKeyTileSideIds: 'idsPY' },
            { action: 'filterMaybe', src: [y + 1, z, x - 1], with: [y, z, x - 1], mapWithKeyTileSideIds: 'idsPY' },
            { action: 'filterMaybe', src: [y + 1, z, x - 1], with: [y, z, x - 1], mapWithKeyTileSideIds: 'idsPY' },
        ]

        if (z >= SIZE_Z - 3) {
            actions.push(
                { action: 'filterMaybe', src: [y, z + 1, x], with: [y, z + 2, x], mapWithKeyTileSideIds: 'idsNZ' }
            )
        }

        // if (y >= SIZE_Y - 3) {
        //     actions.push(
        //         { action: 'filterMaybe', src: [y, y + 1, x], with: [y, y + 2, x], mapWithKeyTileSideIds: 'idsNY' }
        //     )
        // }


        for (let indAction = 0; indAction < actions.length; ++indAction) {
            doAction(actions[indAction], MAP, tiles)
        }


        const { nextY, nextZ, nextX } = checkNextMapItemIndexes(MAP, y, z, x)
        if (Number.isInteger(nextY) && Number.isInteger(nextZ) && Number.isInteger(nextX)) {
            iterate(nextY, nextZ, nextX)
        }
    }

    iterate(0, 0, 0)



    for (let i = 0; i < SIZE_Y; ++i) {
        for (let j = 0; j < SIZE_Z; ++j) {
            for (let k = 0; k < SIZE_X; ++k) {
                if (Number.isInteger(MAP[i][j][k].resultTileIndex)) {
                    MAP[i][j][k].tileData = tiles[MAP[i][j][k].resultTileIndex]
                }
            }
        }
    }

    return MAP
}
