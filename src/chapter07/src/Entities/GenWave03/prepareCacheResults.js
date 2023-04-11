export const prepareCacheResults = (tiles) => {
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
