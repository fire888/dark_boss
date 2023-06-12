import { createMap3X } from './map3SHelper'
//import { map3SArtifactsFilter } from './map3SArtefactsFilter'

// const button = document.createElement('button')
// button.innerText = 'NEXT'
// document.body.appendChild(button)
// button.style.position = 'absolute'
// button.style.zIndex = '100'
// button.style.top = '0'
// let f = null


const choiceFinalTileFromExists = (dataAction, map) => {
    const [y, z, x] = dataAction.src
    const mapItem = map[y][z][x]
    //console.log(y, z, x, mapItem)

    if (Number.isInteger(mapItem.resultTileIndex)) {
        return;
    }
    if (!mapItem.maybeTilesInds.length) {
        mapItem.resultTileIndex = -1 //Math.floor(Math.random() * 16)
        mapItem.maybeTilesInds = []
        return;
    }

    const indTile = mapItem.maybeTilesInds[Math.floor(Math.random() * mapItem.maybeTilesInds.length)]
    mapItem.resultTileIndex = indTile
    mapItem.maybeTilesInds = [indTile]
}

const filterMaybeArrByCompare = (dataAction, map, tiles) => {
    const [y, z, x] = dataAction.src
    const [yWith, zWith, xWith] = dataAction.with
    const { withProp } = dataAction

    if (!map[y] || !map[y][z] || !map[y][z][x]) {
        return;
    }
    if (Number.isInteger(map[y][z][x].resultTileIndex)) {
        return;
    }

    if (!map[yWith] || !map[yWith][zWith] || !map[yWith][zWith][xWith]) {
        return;
    }


    const arrNotChange = map[yWith][zWith][xWith].maybeTilesInds
    const arrCurrent = map[y][z][x].maybeTilesInds

    if (!arrNotChange || !arrNotChange.length || !arrCurrent || !arrCurrent.length) {
        return;
    }

    const newArr = []
    for (let i = 0; i < arrNotChange.length; ++i) {
        const arrCanBe = tiles[arrNotChange[i]][withProp]
        for (let j = 0; j < arrCanBe.length; ++j) {
            for (let k = 0; k < arrCurrent.length; ++k) {
                if (arrCanBe[j] === arrCurrent[k]) {
                    newArr.push(arrCurrent[k])
                }
            }
        }
    }

    const filteredArr = []
    for (let i = 0; i < newArr.length; ++i) {
        let isIn = false
        for (let j = 0; j < filteredArr.length; ++j) {
            if (filteredArr[j] === newArr[i]) {
                isIn = true
            }
        }
        if (!isIn) {
            filteredArr.push(newArr[i])
        }
    }

    map[y][z][x].maybeTilesInds = filteredArr
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

        /** ++Y */
        { action: 'filterMaybeArrByCompare', src: [y + 1, z, x], with: [y, z, x], withProp: 'canConnectPY' },

        { action: 'filterMaybeArrByCompare', src: [y + 1, z - 1, x], with: [y, z - 1, x], withProp: 'canConnectPY' },
        { action: 'filterMaybeArrByCompare', src: [y + 1, z + 1, x], with: [y, z + 1, x], withProp: 'canConnectPY' },
        { action: 'filterMaybeArrByCompare', src: [y + 1, z, x - 1], with: [y, z, x - 1], withProp: 'canConnectPY' },
        { action: 'filterMaybeArrByCompare', src: [y + 1, z, x - 1], with: [y, z, x - 1], withProp: 'canConnectPY' },
    ]

    return actions
}



export const createMap = (tiles) => {
    let map

    return {
        generateMap: (dataStructure) => {
            let maxCallStack = 10000

            return new Promise(res => {
                console.log('!!! tiles', tiles)
                /** create start map */

                map = createMap3X(tiles, dataStructure)
                console.log('!!! map', map)

                const { mapFill } = dataStructure
                for (let i = 0; i < mapFill.length; ++i) {
                    const { place } = mapFill[i]
                    map.items[place[0]][place[1]][place[2]].resultTileIndex = 0
                    map.items[place[0]][place[1]][place[2]].maybeTilesInds = [0]
                }


                /** pipeline actions with tile */
                const pipelineActions = (y, z, x, map) => {
                    return new Promise(res => {
                        const actions = createPipelineActionsWithMapItem(y, z, x, map)
                        const iterateAction = (indAction) => {
                            if (!actions[indAction]) {
                                return res();
                            }
                            const action = actions[indAction]
                            actionsWithMapItem[action.action](action, map.items, tiles)

                            // if (f) {
                            //     button.removeEventListener('click', f)
                            // }
                            // f = () => {
                            //     iterateAction(indAction + 1)
                            // }
                            // button.addEventListener('click', f)
                            //setTimeout(() => {iterateAction(indAction + 1)}, 0)
                            iterateAction(indAction + 1)
                        }
                        iterateAction(0)
                    })
                }


                const calculateMapItem = (y, z, x) => {
                    return new Promise((res, rej) => {
                        --maxCallStack
                        if (maxCallStack < 0) {
                            console.log('max stack:', maxCallStack )
                            return rej();
                        }

                        /** choice tile and filter neighbours */
                        pipelineActions(y, z, x, map).then(() => {
                            /** add mesh to scene */
                            if (map.items[y][z][x].hasOwnProperty('resultTileIndex') && Number.isInteger(map.items[y][z][x].resultTileIndex)) {
                                map.items[y][z][x].tileData = tiles[map.items[y][z][x].resultTileIndex]
                                //makerMesh.addMesh(map.items[y][z][x])
                            }
                            res()
                        })
                    })
                }

                const nextItem = () => {
                    const {nextY, nextZ, nextX} = map.checkNextMapItemIndexes()
                    if (
                        Number.isInteger(nextY) &&
                        Number.isInteger(nextZ) &&
                        Number.isInteger(nextX)
                    ) {
                        calculateMapItem(nextY, nextZ, nextX).then(nextItem)
                        //setTimeout(() => {  }, 0)
                    } else {
                        console.log('$$$$--')
                        res(map)
                    }
                }

                nextItem()
            })
        },
        destroyMap: () => {
            for (let i = 0; i < map.items.length; ++i) {
                for (let j = 0; j < map.items[i].length; ++j) {
                    for (let k = 0; k < map.items[i][j].length; ++k) {
                        for (let key in map.items[i][j][k]) {
                            delete map.items[i][j][k][key]
                        }
                        delete map.items[i][j][k]
                    }
                    delete map.items[i][j]
                }
                delete map.items[i]
            }
            map = null
        },
    }
}
