import { createMap3X } from './map3SHelper'
import { makeSetContainsElementsSet1Set2 } from './helpersSortArray'
//import { map3SArtifactsFilter } from './map3SArtefactsFilter'

const button = document.createElement('button')
button.innerText = 'NEXT'
document.body.appendChild(button)
button.style.position = 'absolute'
button.style.zIndex = '100'
button.style.top = '0'
let f = null


const choiceFinalTileFromExists = (dataAction, map) => {
    const [y, z, x] = dataAction.src
    const mapItem = map[y][z][x]

    if (Number.isInteger(mapItem.resultTileIndex)) {
        return;
    }
    let myArr = Array.from(mapItem.maybeTilesInds)
    if (!myArr.length) {
        //mapItem.resultTileIndex = null
        return
        //myArr = [0]
    }

    const r = Math.floor(Math.random() * myArr.length)
    mapItem.resultTileIndex = myArr[r]
    mapItem.maybeTilesInds = new Set()
    mapItem.maybeTilesInds.add(myArr[r])
}

const filterMaybeArrByCompare = (dataAction, map, tiles) => {
    const [y, z, x] = dataAction.src
    const [yWith, zWith, xWith] = dataAction.with
    const { withProp } = dataAction

    if (map[y] && map[y][z] && map[y][z][x]) {
        if (Number.isInteger(map[y][z][x].resultTileIndex)) {
            return;
        }

        if (
            map[yWith] && map[yWith][zWith] && map[yWith][zWith][xWith]
        ) {
            const set = new Set()
            for (const item of map[yWith][zWith][xWith].maybeTilesInds) {
                const resultSet = makeSetContainsElementsSet1Set2(tiles[item][withProp], map[y][z][x].maybeTilesInds)
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
        { action: 'filterMaybeArrByCompare', src: [y, z - 1, x],  with: [y, z, x], withProp: 'canConnectNZ' },
        { action: 'filterMaybeArrByCompare', src: [y, z + 1, x], with: [y, z, x], withProp: 'canConnectPZ' },

        /** X */
        { action: 'filterMaybeArrByCompare', src: [y, z, x - 1], with: [y, z, x], withProp: 'canConnectNX'  },
        { action: 'filterMaybeArrByCompare', src: [y, z, x + 1], with: [y, z, x], withProp: 'canConnectPX'  },

        /** Z - 1, X - 1 */
        { action: 'filterMaybeArrByCompare', src: [y, z - 1, x - 1], with: [y, z - 1, x], withProp: 'canConnectNX'  },
        { action: 'filterMaybeArrByCompare', src: [y, z - 1, x - 1], with: [y, z, x - 1], withProp: 'canConnectNZ'  },

        /** Z - 1, X + 1 */
        { action: 'filterMaybeArrByCompare', src: [y, z - 1, x + 1], with: [y, z - 1, x], withProp: 'canConnectPX'  },
        { action: 'filterMaybeArrByCompare', src: [y, z - 1, x + 1], with: [y, z, x + 1], withProp: 'canConnectNZ'  },

        /** Z + 1, X + 1 */
        { action: 'filterMaybeArrByCompare', src: [y, z + 1, x + 1], with: [y, z, x + 1], withProp: 'canConnectPZ'  },
        { action: 'filterMaybeArrByCompare', src: [y, z + 1, x + 1], with: [y, z + 1, x], withProp: 'canConnectPX'  },

        /** Z + 1, X - 1 */
        { action: 'filterMaybeArrByCompare', src: [y, z + 1, x - 1], with: [y, z + 1, x], withProp: 'canConnectNX'  },
        { action: 'filterMaybeArrByCompare', src: [y, z + 1, x - 1], with: [y, z, x - 1], withProp: 'canConnectPZ'  },

        /** -- Y */
        //{ action: 'filterMaybe', src: [y - 1, z, x], with: [y, z, x], mapWithKeyTileSideIds: 'idsNY' },

        /** ++Y */
        { action: 'filterMaybeArrByCompare', src: [y + 1, z, x], with: [y, z, x], withProp: 'canConnectPY' },

        { action: 'filterMaybeArrByCompare', src: [y + 1, z - 1, x], with: [y, z - 1, x], withProp: 'canConnectPY' },
        { action: 'filterMaybeArrByCompare', src: [y + 1, z + 1, x], with: [y, z + 1, x], withProp: 'canConnectPY' },
        { action: 'filterMaybeArrByCompare', src: [y + 1, z, x - 1], with: [y, z, x - 1], withProp: 'canConnectPY' },
        { action: 'filterMaybeArrByCompare', src: [y + 1, z, x - 1], with: [y, z, x - 1], withProp: 'canConnectPY' },
    ]

    if (z >= map.sizeZ - 3) {
        actions.push(
            { action: 'filterMaybeArrByCompare', src: [y, z + 1, x], with: [y, z + 2, x], withProp: 'canConnectNZ' }
        )
    }

    return actions
}



export const createMap = (tiles, makerMesh) => {
    /** create start map */
    const map = createMap3X(tiles)
    //map.forceFillMapSides()

    console.log('mapNotFilled', map)


    let max = 5000
    /** calculate maze data */
    const iterate = (y, z, x) => {
        makerMesh.setCurrentMeshToIndex(y, z, x)
        --max
        if (max < 0) {
            return;
        }
        const actions = createPipelineActionsWithMapItem(y, z, x, map)

        for (let indAction = 0; indAction < actions.length; ++indAction) {
            const action = actions[indAction]
            actionsWithMapItem[action.action](action, map.items, tiles)
        }

        if (map.items[y][z][x].hasOwnProperty('resultTileIndex') && Number.isInteger(map.items[y][z][x].resultTileIndex)) {
            map.items[y][z][x].tileData = tiles[map.items[y][z][x].resultTileIndex]
            makerMesh.addMesh(map.items[y][z][x])
        }



        const { nextY, nextZ, nextX } = map.checkNextMapItemIndexes(y, z, x)
        if (
            Number.isInteger(nextY) &&
            Number.isInteger(nextZ) &&
            Number.isInteger(nextX)
        ) {
            setTimeout(() => { iterate(nextY, nextZ, nextX) }, 50)
            // if (f) {
            //    button.removeEventListener('click', f)
            // }
            // f = () => {
            //     iterate(nextY, nextZ, nextX)
            // }
            // button.addEventListener('click', f)
        }
    }
    const { nextY, nextZ, nextX } = map.checkNextMapItemIndexes()
    setTimeout(() => { iterate( nextY, nextZ, nextX ) }, 2000)


    //map3SArtifactsFilter(map, tiles)

    return map
}
