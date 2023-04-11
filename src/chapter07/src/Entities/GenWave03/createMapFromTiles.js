const SIZE_Y = 3
const SIZE_Z = 20
const SIZE_X = 20
//const _ = '.'


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



const makeArrayContainsElementsArr1Ar2 = (arr1, arr2) => {
    const result = new Set()
    for (let i = 0; i < arr1.length; ++i) {
        for (let j = 0; j < arr2.length; ++j) {
            if (arr1[i] === arr2[j]) {
                result.add(arr1[i])
            }
        }
    }
    return result
}

// const modifyByNeighborIds = (neighbor, indexes) => {
//     neighbor.maybeTilesInds = makeArrayContainsElementsArr1Ar2(neighbor.maybeTilesInds, indexes)
// }

const filterNearTiles = (map, i, j, k, tiles) => {
    const tileData = tiles[map[i][j][k].resultTileIndex]
    /** filter
          x
        x s x
          x
     */

    if (map[i - 1]) {
        map[i - 1][j][k].maybeTilesInds = makeArrayContainsElementsArr1Ar2(map[i - 1][j][k].maybeTilesInds, tileData.idsNY)
    }
    if (map[i + 1]) {
        map[i + 1][j][k].maybeTilesInds = makeArrayContainsElementsArr1Ar2(map[i + 1][j][k].maybeTilesInds, tileData.idsNY)
    }
    if (map[i][j - 1]) {
        map[i][j - 1][k].maybeTilesInds = makeArrayContainsElementsArr1Ar2(map[i][j - 1][k].maybeTilesInds, tileData.idsNZ)
    }
    if (map[i][j + 1]) {
        map[i][j + 1][k].maybeTilesInds = makeArrayContainsElementsArr1Ar2(map[i][j + 1][k].maybeTilesInds, tileData.idsPZ)
    }
    if (map[i][j][k - 1]) {
        map[i][j][k - 1].maybeTilesInds = makeArrayContainsElementsArr1Ar2(map[i][j][k - 1].maybeTilesInds, tileData.idsNX)
    }
    if (map[i][j][k + 1]) {
        map[i][j][k + 1].maybeTilesInds = makeArrayContainsElementsArr1Ar2(map[i][j][k + 1].maybeTilesInds, tileData.idsPX)
    }


    /** filter
         x   x
           s
         x   x
     */
    if (map[i][j + 1]) {
        if (map[i][j + 1][k - 1]) {
            const set = new Set()
            for (const idTitle of map[i][j + 1][k].maybeTilesInds) {
                const tileData = tiles[idTitle]
                const filteredSet = makeArrayContainsElementsArr1Ar2(map[i][j + 1][k - 1].maybeTilesInds, tileData.idsNX)
                for (const item of filteredSet) {
                    set.add(item)
                }
            }
            for (const idTitle of map[i][j][k - 1].maybeTilesInds) {
                const tileData = tiles[idTitle]
                const filteredSet = makeArrayContainsElementsArr1Ar2(map[i][j + 1][k - 1].maybeTilesInds, tileData.idsPZ)
                for (const item of filteredSet) {
                    set.add(item)
                }
            }
            map[i][j + 1][k - 1].maybeTilesInds = set
        }

        if (map[i][j + 1][k + 1]) {
            const set = new Set()
            for (const idTitle of map[i][j + 1][k].maybeTilesInds) {
                const tileData = tiles[idTitle]
                const filteredSet = makeArrayContainsElementsArr1Ar2(map[i][j + 1][k + 1].maybeTilesInds, tileData.idsPX)
                for (const item of filteredSet) {
                    set.add(item)
                }
            }
            for (const idTitle of map[i][j][k + 1].maybeTilesInds) {
                const tileData = tiles[idTitle]
                const filteredSet = makeArrayContainsElementsArr1Ar2(map[i][j + 1][k + 1].maybeTilesInds, tileData.idsPZ)
                for (const item of filteredSet) {
                    set.add(item)
                }
            }
            map[i][j + 1][k - 1].maybeTilesInds = set
        }
    }

    if (map[i][j - 1]) {
        if (map[i][j - 1][k - 1]) {
            console.log('&&&&')
            const set = new Set()
            for (const idTitle of map[i][j - 1][k].maybeTilesInds) {
                const tileData = tiles[idTitle]
                const filteredSet = makeArrayContainsElementsArr1Ar2(map[i][j - 1][k - 1].maybeTilesInds, tileData.idsNX)
                for (const item of filteredSet) {
                    set.add(item)
                }
            }
            for (const idTitle of map[i][j][k - 1].maybeTilesInds) {
                const tileData = tiles[idTitle]
                const filteredSet = makeArrayContainsElementsArr1Ar2(map[i][j - 1][k - 1].maybeTilesInds, tileData.idsNZ)
                for (const item of filteredSet) {
                    set.add(item)
                }
            }
            map[i][j - 1][k - 1].maybeTilesInds = set
        }

        if (map[i][j - 1][k + 1]) {
            const set = new Set()
            for (const idTitle of map[i][j - 1][k].maybeTilesInds) {
                const tileData = tiles[idTitle]
                const filteredSet = makeArrayContainsElementsArr1Ar2(map[i][j - 1][k + 1].maybeTilesInds, tileData.idsPX)
                for (const item of filteredSet) {
                    set.add(item)
                }
            }
            for (const idTitle of map[i][j][k + 1].maybeTilesInds) {
                const tileData = tiles[idTitle]
                const filteredSet = makeArrayContainsElementsArr1Ar2(map[i][j - 1][k + 1].maybeTilesInds, tileData.idsNZ)
                for (const item of filteredSet) {
                    set.add(item)
                }
            }
            map[i][j - 1][k + 1].maybeTilesInds = set
        }
    }
}








export const createMap = tiles => {
    const arrY = []
    for (let i = 0; i < SIZE_Y; ++i) {
        const arrZ = []
        for (let j = 0; j < SIZE_Z; ++j) {
            const arrX = []
            for (let k = 0; k < SIZE_X; ++k) {
                arrX.push({
                    resultTileIndex: null,
                    maybeTilesInds: tiles.map((item, index) => index),
                    i,
                    j,
                    k,
                })
            }
            arrZ.push(arrX)
        }
        arrY.push(arrZ)
    }

    const MAP = arrY


    MAP[0][2][2].resultTileIndex = 2
    MAP[0][2][2].maybeTilesInds = []
    filterNearTiles(MAP, 0, 2, 2, tiles)

    // console.log('--', MAP[0][2][2])
    // console.log('--1', MAP[0][3][2])
    // console.log('--2', MAP[0][3][1])
    // console.log('--3', MAP[0][1][2])
    // console.log('--4', MAP[0][1][3])
    // console.log('--5', MAP[0][1][1])
    // console.log(MAP)




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
                    MAP[i][j][k].test_resultTile = tiles[0]
                    continue
                }

                MAP[i][j][k].test_resultTile = iterateGetRandom(nX, nY, nZ, tiles, i, j, k)
            }
        }
    }

    return MAP
}
