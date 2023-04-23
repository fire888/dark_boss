export const prepareTileSidesData = tile => {
    let nX = ''
    let pX = ''
    let nY = ''
    let pY = ''
    let nZ = ''
    let pZ = ''

    const DIVIDER = '.'

    for (let i = 0; i < tile.length; ++i) {
        for (let j = 0; j < tile.length; ++j) {
            for (let k = 0; k < tile.length; ++k) {
                if (i === 0) {
                    nY += DIVIDER + tile[i][j][k]
                }
                if (i === tile.length - 1) {
                    pY += DIVIDER + tile[i][j][k]
                }
                if (j === 0) {
                    nZ += DIVIDER + tile[i][j][k]
                }
                if (j === tile[0].length - 1) {
                    pZ += DIVIDER + tile[i][j][k]
                }
                if (k === 0) {
                    nX += DIVIDER + tile[i][j][k]
                }
                if (k === tile[0][0].length - 1) {
                    pX += DIVIDER + tile[i][j][k]
                }
            }
        }
    }
    const typeHash = nX + pX + nY + pY + nZ + pZ
    console.log(typeHash)
    return { tile, nX, pX, nY, pY, nZ, pZ, typeHash }
}




export const prepareCacheSidesResults = (tiles) => {
    for (let i = 0; i < tiles.length; ++i) {
        tiles[i].idsNX = []
        tiles[i].idsPX = []
        tiles[i].idsNY = []
        tiles[i].idsPY = []
        tiles[i].idsNZ = []
        tiles[i].idsPZ = []
    }

    for (let i = 0; i < tiles.length; ++i) {
        for (let j = 0; j < tiles.length; ++j) {
            if (tiles[i].nX === tiles[j].pX) {
                tiles[i].idsNX.push(tiles[j].id)
            }
            if (tiles[i].pX === tiles[j].nX) {
                tiles[i].idsPX.push(tiles[j].id)
            }
            if (tiles[i].nY === tiles[j].pY) {
                tiles[i].idsNY.push(tiles[j].id)
            }
            if (tiles[i].pY === tiles[j].nY) {
                tiles[i].idsPY.push(tiles[j].id)
            }
            if (tiles[i].nZ === tiles[j].pZ) {
                tiles[i].idsNZ.push(tiles[j].id)
            }
            if (tiles[i].pZ === tiles[j].nZ) {
                tiles[i].idsPZ.push(tiles[j].id)
            }
        }
    }

    return tiles
}
