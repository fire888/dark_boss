const SIZE_Y = 5
const SIZE_Z = 20
const SIZE_X = 20




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
            setRandomTileFromExists(map[y][z][x])
        }
    }

    if (dataAction.action === 'filterMaybe') {
        const [y, z, x] = dataAction.src
        const [yWith, zWith, xWith] = dataAction.with
        const { mapWithKeyTileSideIds } = dataAction

        if (
            map[y] && map[y][z] && map[y][z][x] &&
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



export const createMap = tiles => {
    const MAP = createMapAndPrepareStartData(tiles)


    const iterate = (y, z, x) => {
        const actions = [
            { action: 'choiceFinal', src: [y, z, x], },

            /** Z */
            { action: 'filterMaybe', src: [y, z - 1, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsNZ' },
            { action: 'filterMaybe', src: [y, z + 1, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsPZ' },
            /** X */
            { action: 'filterMaybe', src: [y, z, x - 1], with: [y, z, x], mapWithKeyTileSideIds: 'idsNX'  },
            { action: 'filterMaybe', src: [y, z, x + 1], with: [y, z, x], mapWithKeyTileSideIds: 'idsPX'  },

            { action: 'filterMaybe', src: [y, z - 1, x - 1], with: [y, z - 1, x], mapWithKeyTileSideIds: 'idsNX'  },
            { action: 'filterMaybe', src: [y, z - 1, x - 1], with: [y, z, x - 1], mapWithKeyTileSideIds: 'idsNZ'  },

            { action: 'filterMaybe', src: [y, z - 1, x + 1], with: [y, z - 1, x], mapWithKeyTileSideIds: 'idsPX'  },
            { action: 'filterMaybe', src: [y, z - 1, x + 1], with: [y, z, x + 1], mapWithKeyTileSideIds: 'idsNZ'  },

            { action: 'filterMaybe', src: [y, z + 1, x + 1], with: [y, z, x + 1], mapWithKeyTileSideIds: 'idsPZ'  },
            { action: 'filterMaybe', src: [y, z + 1, x + 1], with: [y, z + 1, x], mapWithKeyTileSideIds: 'idsPX'  },

            { action: 'filterMaybe', src: [y, z + 1, x - 1], with: [y, z + 1, x], mapWithKeyTileSideIds: 'idsNX'  },
            { action: 'filterMaybe', src: [y, z + 1, x - 1], with: [y, z, x - 1], mapWithKeyTileSideIds: 'idsPZ'  },
        ]

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
