const prepareCacheSidesConnect = tiles => {
    for (let i = 0; i < tiles.length; ++i) {
        tiles[i].canConnectNX = []
        tiles[i].canConnectPX = []
        tiles[i].canConnectNY = []
        tiles[i].canConnectPY = []
        tiles[i].canConnectNZ = []
        tiles[i].canConnectPZ = []
    }

    for (let i = 0; i < tiles.length; ++i) {
        for (let j = 0; j < tiles.length; ++j) {
            if (tiles[i].sideNX === tiles[j].sidePX) {
                tiles[i].canConnectNX.push(tiles[j].id)
            }
            if (tiles[i].sidePX === tiles[j].sideNX) {
                tiles[i].canConnectPX.push(tiles[j].id)
            }
            if (tiles[i].sideNY === tiles[j].sidePY) {
                tiles[i].canConnectNY.push(tiles[j].id)
            }
            if (tiles[i].sidePY === tiles[j].sideNY) {
                tiles[i].canConnectPY.push(tiles[j].id)
            }
            if (tiles[i].sideNZ === tiles[j].sidePZ) {
                tiles[i].canConnectNZ.push(tiles[j].id)
            }
            if (tiles[i].sidePZ === tiles[j].sideNZ) {
                tiles[i].canConnectPZ.push(tiles[j].id)
            }
        }
    }

    return tiles
}


export const createDataTiles = () => {
    const arrTiles = []

    {
        /**
         . . .
         . . .
         . . .
         */
        const I = {
            sideNX: '_,_,_',
            sidePX: '_,_,_',
            sideNY: '_,_,_',
            sidePY: '_,_,_',
            sideNZ: '_,_,_',
            sidePZ: '_,_,_',
            keyModel: null,
            rotationY: 0,
        }
        arrTiles.push(I)
    }



    {
        /**
         . I .
         . I .
         . I .
         */
        const I = {
            sideNX: '_,_,_',
            sidePX: '_,_,_',
            sideNY: '_,_,_',
            sidePY: '_,_,_',
            sideNZ: '_,I,_',
            sidePZ: '_,I,_',
            keyModel: 'tile_I',
            rotationY: 0,
        }
        arrTiles.push(I)
    }

    {
        /**
         . . .
         I I I
         . . .
         */
        const I = {
            sideNX: '_,I,_',
            sidePX: '_,I,_',
            sideNY: '_,_,_',
            sidePY: '_,_,_',
            sideNZ: '_,_,_',
            sidePZ: '_,_,_',
            keyModel: 'tile_I',
            rotationY: Math.PI / 2,
        }
        arrTiles.push(I)
    }


    {
        /**
         . . .
         . I I
         . I .
         */
        const t = {
            sideNX: '_,_,_',
            sidePX: '_,I,_',
            sideNY: '_,_,_',
            sidePY: '_,_,_',
            sideNZ: '_,_,_',
            sidePZ: '_,I,_',
            keyModel: 'tile_L',
            rotationY: 0,
        }
        arrTiles.push(t)
    }

    {
        /**
         . . .
         I I .
         . I .
         */
        const t = {
            sideNX: '_,I,_',
            sidePX: '_,_,_',
            sideNY: '_,_,_',
            sidePY: '_,_,_',
            sideNZ: '_,_,_',
            sidePZ: '_,I,_',
            keyModel: 'tile_L',
            rotationY: -Math.PI / 2,
        }
        arrTiles.push(t)
    }

    {
        /**
         . I .
         I I .
         . . .
         */
        const t = {
            sideNX: '_,I,_',
            sidePX: '_,_,_',
            sideNY: '_,_,_',
            sidePY: '_,_,_',
            sideNZ: '_,I,_',
            sidePZ: '_,_,_',
            keyModel: 'tile_L',
            rotationY: -Math.PI,
        }
        arrTiles.push(t)
    }

    {
        /**
         . I .
         . I I
         . . .
         */
        const t = {
            sideNX: '_,_,_',
            sidePX: '_,_,I',
            sideNY: '_,_,_',
            sidePY: '_,_,_',
            sideNZ: '_,I,_',
            sidePZ: '_,_,_',
            keyModel: 'tile_L',
            rotationY: -Math.PI * 1.5,
        }
        arrTiles.push(t)
    }

    {
        /**
           I
         . . .
         .I . .
         . . .
           I
         */
        const I = {
            sideNX: '_,I,_',
            sidePX: '_,_,_',
            sideNY: '_,I,_',
            sidePY: '_,I,_',
            sideNZ: '_,_,_',
            sidePZ: '_,_,_',
            keyModel: 'tile_Y',
            rotationY: 0,
        }
        arrTiles.push(I)
    }


    {
        /**
           I
         . I .
         . . .
         . . .
           I
         */
        const I = {
            sideNX: '_,_,_',
            sidePX: '_,_,_',
            sideNY: '_,I,_',
            sidePY: '_,I,_',
            sideNZ: '_,I,_',
            sidePZ: '_,_,_',
            keyModel: 'tile_Y',
            rotationY: -Math.PI / 2,
        }
        arrTiles.push(I)
    }

    {
        /**
          I
         . . .
         . . I
         . . .
           I
         */
        const I = {
            sideNX: '_,_,_',
            sidePX: '_,_,_',
            sideNY: '_,I,_',
            sidePY: '_,I,_',
            sideNZ: '_,_,_',
            sidePZ: '_,I,_',
            keyModel: 'tile_Y',
            rotationY: -Math.PI * 1.5,
        }
        arrTiles.push(I)
    }





    const DATA_TILES = []
    for (let i = 0; i < arrTiles.length; ++i) {
        arrTiles[i].id = i
        DATA_TILES.push(arrTiles[i])
    }
    prepareCacheSidesConnect(DATA_TILES)
    return DATA_TILES
}


