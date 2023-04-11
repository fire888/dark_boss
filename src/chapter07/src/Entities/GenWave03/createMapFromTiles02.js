const SIZE_Z = 20
const SIZE_X = 20




let directions = ['pX', 'nZ', 'nX', 'pZ']
let currentDirInd = 0
const checkNextMapItemIndexes = (map, z, x) => {
    let nextZ = null
    let nextX = null

    if (directions[currentDirInd] === 'pX') {
        if (map[z] && map[z][x + 1]) {
            nextZ = z
            nextX = x + 1
        }
    }

    return { nextZ, nextX }
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
    const r = Math.floor(Math.random() * myArr.length)
    mapItem.resultTileIndex = myArr[r]
    mapItem.maybeTilesInds = new Set()
    mapItem.maybeTilesInds.add(myArr[r])
}




const doAction = (dataAction, map, tiles) => {
    if (dataAction.action === 'choiceFinal') {
        const [z, x] = dataAction.src
        if (map[z] && map[z][x]) {
            setRandomTileFromExists(map[z][x])
        }
    }

    if (dataAction.action === 'filterMaybe') {
        const [z, x] = dataAction.src
        const [zWith, xWith] = dataAction.with
        const { mapWithKeyTileSideIds } = dataAction

        if (
            map[z] && map[z][x] &&
            map[zWith] && map[zWith][xWith]
        ) {
            const set = new Set()
            for (const item of map[zWith][xWith].maybeTilesInds) {
                const resultSet = makeSetContainsElementsSet1Set2(tiles[item][mapWithKeyTileSideIds], map[z][x].maybeTilesInds)
                for (const r of resultSet) {
                    set.add(r)
                }
            }
            map[z][x].maybeTilesInds = set
        }
    }
}



const createFillMap = (tiles) => {
    const arrZ = []
    for (let j = 0; j < SIZE_Z; ++j) {
        const arrX = []
        for (let k = 0; k < SIZE_X; ++k) {
            const s = new Set()
            tiles.map((item, index) => { s.add(index) })
            arrX.push({
                resultTileIndex: null,
                maybeTilesInds: s,
                j,
                k,
            })
        }
        arrZ.push(arrX)
    }
    return arrZ
}



export const createMap = tiles => {
    const MAP = createFillMap(tiles)


    const iterate = (z, x) => {
        const actions = [
            { action: 'choiceFinal', src: [z, x], },

            //{ action: 'filterMaybe', src: [z - 1, x], with: [z, x], mapWithKeyTileSideIds: 'idsNZ' },
            //{ action: 'filterMaybe', src: [z + 1, x], with: [z, x], mapWithKeyTileSideIds: 'idsPZ' },
            //{ action: 'filterMaybe', src: [z, x - 1], with: [z, x], mapWithKeyTileSideIds: 'idsNX'  },
            { action: 'filterMaybe', src: [z, x + 1], with: [z, x], mapWithKeyTileSideIds: 'idsPX'  },

            //{ action: 'filterMaybe', src: [z - 1, x - 1], with: [z - 1, x], mapWithKeyTileSideIds: 'idsNX'  },
            //{ action: 'filterMaybe', src: [z - 1, x - 1], with: [z, x - 1], mapWithKeyTileSideIds: 'idsNZ'  },

            //{ action: 'filterMaybe', src: [z - 1, x + 1], with: [z - 1, x], mapWithKeyTileSideIds: 'idsPX'  },
            //{ action: 'filterMaybe', src: [z - 1, x + 1], with: [z, x + 1], mapWithKeyTileSideIds: 'idsNZ'  },

            //{ action: 'filterMaybe', src: [z + 1, x + 1], with: [z, x + 1], mapWithKeyTileSideIds: 'idsPZ'  },
            //{ action: 'filterMaybe', src: [z + 1, x + 1], with: [z + 1, x], mapWithKeyTileSideIds: 'idsPX'  },

            //{ action: 'filterMaybe', src: [z + 1, x - 1], with: [z + 1, x], mapWithKeyTileSideIds: 'idsNX'  },
            //{ action: 'filterMaybe', src: [z + 1, x - 1], with: [z, x - 1], mapWithKeyTileSideIds: 'idsPZ'  },
        ]

        for (let indAction = 0; indAction < actions.length; ++indAction) {
            doAction(actions[indAction], MAP, tiles)
        }


        const { nextZ, nextX } = checkNextMapItemIndexes(MAP, z, x)
        if (Number.isInteger(nextZ) && Number.isInteger(nextX)) {
            iterate(nextZ, nextX)
        }
    }

    iterate(0, 0)



    for (let j = 0; j < SIZE_Z; ++j) {
        for (let k = 0; k < SIZE_X; ++k) {
            if (Number.isInteger(MAP[j][k].resultTileIndex)) {
                MAP[j][k].tileData = tiles[MAP[j][k].resultTileIndex]
            }
        }
    }

    return [MAP]
}
