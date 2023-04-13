import { createMap3X } from './map3SHelper'
import { makeSetContainsElementsSet1Set2 } from './helpersSortArray'
import { map3SArtifactsFilter } from './map3SArtefactsFilter'


const choiceFinalTileFromExists = (dataAction, map) => {
    const [y, z, x] = dataAction.src
    if (map[y] && map[y][z] && map[y][z][x]) {
        const mapItem = map[y][z][x]


        if (Number.isInteger(mapItem.resultTileIndex)) {
            return;
        }
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
}

const filterMaybeArrByCompare = (dataAction, map, tiles) => {
    const [y, z, x] = dataAction.src
    const [yWith, zWith, xWith] = dataAction.with
    const {mapWithKeyTileSideIds} = dataAction

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



const actionsWithMapItem = {
    choiceFinalTileFromExists,
    filterMaybeArrByCompare,
}




const createPipelineActionsWithMapItem = (y, z, x, map) => {
    const actions = [
        { action: 'choiceFinalTileFromExists', src: [y, z, x], },

        /** Z */
        { action: 'filterMaybeArrByCompare', src: [y, z - 1, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsNZ' },
        { action: 'filterMaybeArrByCompare', src: [y, z + 1, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsPZ' },

        /** X */
        { action: 'filterMaybeArrByCompare', src: [y, z, x - 1], with: [y, z, x], mapWithKeyTileSideIds: 'idsNX'  },
        { action: 'filterMaybeArrByCompare', src: [y, z, x + 1], with: [y, z, x], mapWithKeyTileSideIds: 'idsPX'  },

        /** Z - 1, X - 1 */
        { action: 'filterMaybeArrByCompare', src: [y, z - 1, x - 1], with: [y, z - 1, x], mapWithKeyTileSideIds: 'idsNX'  },
        { action: 'filterMaybeArrByCompare', src: [y, z - 1, x - 1], with: [y, z, x - 1], mapWithKeyTileSideIds: 'idsNZ'  },

        /** Z - 1, X + 1 */
        { action: 'filterMaybeArrByCompare', src: [y, z - 1, x + 1], with: [y, z - 1, x], mapWithKeyTileSideIds: 'idsPX'  },
        { action: 'filterMaybeArrByCompare', src: [y, z - 1, x + 1], with: [y, z, x + 1], mapWithKeyTileSideIds: 'idsNZ'  },

        /** Z + 1, X + 1 */
        { action: 'filterMaybeArrByCompare', src: [y, z + 1, x + 1], with: [y, z, x + 1], mapWithKeyTileSideIds: 'idsPZ'  },
        { action: 'filterMaybeArrByCompare', src: [y, z + 1, x + 1], with: [y, z + 1, x], mapWithKeyTileSideIds: 'idsPX'  },

        /** Z + 1, X - 1 */
        { action: 'filterMaybeArrByCompare', src: [y, z + 1, x - 1], with: [y, z + 1, x], mapWithKeyTileSideIds: 'idsNX'  },
        { action: 'filterMaybeArrByCompare', src: [y, z + 1, x - 1], with: [y, z, x - 1], mapWithKeyTileSideIds: 'idsPZ'  },

        /** -- Y */
        //{ action: 'filterMaybe', src: [y - 1, z, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsNY' },

        /** ++Y */
        { action: 'filterMaybeArrByCompare', src: [y + 1, z, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsPY' },

        { action: 'filterMaybeArrByCompare', src: [y + 1, z - 1, x], with: [y, z - 1, x], mapWithKeyTileSideIds: 'idsPY' },
        { action: 'filterMaybeArrByCompare', src: [y + 1, z + 1, x], with: [y, z + 1, x], mapWithKeyTileSideIds: 'idsPY' },
        { action: 'filterMaybeArrByCompare', src: [y + 1, z, x - 1], with: [y, z, x - 1], mapWithKeyTileSideIds: 'idsPY' },
        { action: 'filterMaybeArrByCompare', src: [y + 1, z, x - 1], with: [y, z, x - 1], mapWithKeyTileSideIds: 'idsPY' },
    ]

    if (z >= map.sizeZ - 3) {
        actions.push(
            { action: 'filterMaybeArrByCompare', src: [y, z + 1, x], with: [y, z + 2, x], mapWithKeyTileSideIds: 'idsNZ' }
        )
    }

    return actions
}



export const createMap = tiles => {
    /** create start map */
    const map = createMap3X(tiles)
    map.forceFillMapSides()


    /** calculate maze data */
    const iterate = (y, z, x) => {
        const actions = createPipelineActionsWithMapItem(y, z, x, map)

        for (let indAction = 0; indAction < actions.length; ++indAction) {
            actionsWithMapItem[actions[indAction].action](actions[indAction], map.items, tiles)
        }

        const { nextY, nextZ, nextX } = map.checkNextMapItemIndexes(y, z, x)
        if (
            Number.isInteger(nextY) &&
            Number.isInteger(nextZ) &&
            Number.isInteger(nextX)
        ) {
            iterate(nextY, nextZ, nextX)
        }
    }
    iterate(0, 0, 0)



    /** fill results by data */
    map.iterateAll(item => {
        if (Number.isInteger(item.resultTileIndex)) {
            item.tileData = tiles[item.resultTileIndex]
        }
    })

    map3SArtifactsFilter(map, tiles)

    return map
}
