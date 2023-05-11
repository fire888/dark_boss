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
            } else {
                if (tiles[i].sideNY.includes('I') && tiles[j].sidePY === 'I') {
                    tiles[i].canConnectNY.push(tiles[j].id)
                }
                if (tiles[i].sideNY === 'I' && tiles[j].sidePY.includes('I')) {
                    tiles[i].canConnectNY.push(tiles[j].id)
                }
                if (
                    tiles[i].sideNY !== 'I' &&
                    tiles[j].sidePY !== 'I' &&
                    tiles[i].sideNY.includes('I') &&
                    tiles[j].sidePY.includes('I')
                ) {
                    const topElemItems = tiles[i].sideNY.split('.')
                    const bottomElemItems = tiles[j].sidePY.split('.')
                    let isCan = true
                    topElemItems.map(topKey => {
                        if (topKey === 'I' || topKey === 'closed') {
                            return;
                        }
                        bottomElemItems.map(bottomKey => {
                             if (topKey === bottomKey) {
                                 isCan = false
                             }
                        })
                    })
                    if (isCan) {
                         tiles[i].canConnectNY.push(tiles[j].id)
                    }
                }
            }

            if (tiles[i].sidePY === tiles[j].sideNY) {
                tiles[i].canConnectPY.push(tiles[j].id)
            } else {
                if (tiles[i].sidePY.includes('I') && tiles[j].sideNY === 'I') {
                    tiles[i].canConnectPY.push(tiles[j].id)
                }
                if (tiles[i].sidePY === 'I' && tiles[j].sideNY.includes('I')) {
                    tiles[i].canConnectPY.push(tiles[j].id)
                }

                if (
                    tiles[i].sidePY !== 'I' &&
                    tiles[j].sideNY !== 'I' &&
                    tiles[i].sidePY.includes('I') &&
                    tiles[j].sideNY.includes('I')
                ) {
                    const topElemItems = tiles[j].sideNY.split('.')
                    const bottomElemItems = tiles[i].sidePY.split('.')
                    let isCan = true
                    topElemItems.map(topKey => {
                        if (topKey === 'I' || topKey === 'closed') {
                            return;
                        }
                        bottomElemItems.map(bottomKey => {
                            if (topKey === bottomKey) {
                                isCan = false
                            }
                        })
                    })
                    if (isCan) {
                        tiles[i].canConnectPY.push(tiles[j].id)
                    }
                }
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
            sideNX: '_',
            sidePX: '_',
            sideNY: '_',
            sidePY: '_',
            sideNZ: '_',
            sidePZ: '_',
            keyModel: 'empty',
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
            sideNX: '_',
            sidePX: '_',
            sideNY: '_',
            sidePY: '_',
            sideNZ: 'I',
            sidePZ: 'I',
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
            sideNX: 'I',
            sidePX: 'I',
            sideNY: '_',
            sidePY: '_',
            sideNZ: '_',
            sidePZ: '_',
            keyModel: 't_I',
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
            sideNX: '_',
            sidePX: 'I',
            sideNY: '_',
            sidePY: '_',
            sideNZ: '_',
            sidePZ: '_',
            keyModel: 't_L',
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
            sideNX: 'I',
            sidePX: '_',
            sideNY: '_',
            sidePY: '_',
            sideNZ: '_',
            sidePZ: 'I',
            keyModel: 't_L',
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
            sideNX: 'I',
            sidePX: '_',
            sideNY: '_',
            sidePY: '_',
            sideNZ: 'I',
            sidePZ: '_',
            keyModel: 't_L',
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
            sideNX: '_',
            sidePX: 'I',
            sideNY: '_',
            sidePY: '_',
            sideNZ: 'I',
            sidePZ: '_',
            keyModel: 't_L',
            rotationY: -Math.PI * 1.5,
        }
        arrTiles.push(t)
    }

    /** stairs ************************/
    {
        /**
           I
         . . .
         . I .
         . . .
           I
         */
        const I = {
            sideNX: 'I',
            sidePX: '_',
            sideNY: 'I.closed.NZ',
            sidePY: 'I.PZ',
            sideNZ: '_',
            sidePZ: '_',
            keyModel: 't_stairs',
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
            sideNX: '_',
            sidePX: '_',
            sideNY: 'I.closed.PX',
            sidePY: 'I.NX',
            sideNZ: 'I',
            sidePZ: '_',
            keyModel: 't_stairs',
            rotationY: -Math.PI / 2,
        }
        arrTiles.push(I)
    }

    {
        /**
           I
         . . .
         I . .
         . . .
           I
         */
        const I = {
            sideNX: '_',
            sidePX: 'I',
            sideNY: 'I.closed.PZ',
            sidePY: 'I.NZ',
            sideNZ: '_',
            sidePZ: '_',
            keyModel: 't_stairs',
            rotationY: Math.PI,
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
            sideNX: '_',
            sidePX: '_',
            sideNY: 'I.closed.NX',
            sidePY: 'I.PX',
            sideNZ: '_',
            sidePZ: 'I',
            keyModel: 't_stairs',
            rotationY: -Math.PI * 1.5,
        }
        arrTiles.push(I)
    }

    {
        /**
         . I .
         . . .
         . . .
           I
         */
        const I = {
            sideNX: '_',
            sidePX: '_',
            sideNY: 'I.closed.NZ',
            sidePY: '_',
            sideNZ: 'I',
            sidePZ: '_',
            keyModel: 't_fromBottom',
            rotationY: 0,
        }
        arrTiles.push(I)
    }

    {
        /**
         . . .
         . . I
         . . .
            I
         */
        const I = {
            sideNX: '_',
            sidePX: 'I',
            sideNY: 'I.closed.PX',
            sidePY: '_',
            sideNZ: '_',
            sidePZ: '_',
            keyModel: 't_fromBottom',
            rotationY: -Math.PI / 2,
        }
        arrTiles.push(I)
    }



    //////////////////////////////////
    // {
    //     /**
    //      . . .
    //      . . I
    //      . . .
    //      I
    //      */
    //     const I = {
    //         sideNX: '_,_,_',
    //         sidePX: '_,_,_',
    //         sideNY: '_,I,_',
    //         sidePY: '_,_,_',
    //         sideNZ: '_,_,_',
    //         sidePZ: '_,I,_',
    //         keyModel: 't_fromBottom',
    //         rotationY: -Math.PI,
    //     }
    //     arrTiles.push(I)
    // }
    // {
    //     /**
    //      . . .
    //      . . I
    //      . . .
    //      I
    //      */
    //     const I = {
    //         sideNX: '_,I,_',
    //         sidePX: '_,_,_',
    //         sideNY: '_,I,_',
    //         sidePY: '_,_,_',
    //         sideNZ: '_,_,_',
    //         sidePZ: '_,_,_',
    //         keyModel: 't_fromBottom',
    //         rotationY: -Math.PI * 1.5,
    //     }
    //     arrTiles.push(I)
    // }
    /** ********************************************/
    
    /** ---------------------------------------------------------------- */
    {
        /**
           I
         . . .
         . . .
         . I .
         */
        const I = {
            sideNX: '_',
            sidePX: '_',
            sideNY: '_',
            sidePY: 'I.PZ',
            sideNZ: '_',
            sidePZ: 'I',
            keyModel: 't_toTopPlatform',
            rotationY: 0,
        }
        arrTiles.push(I)
    }

    {
        /**
         I
         . . .
         . . .
         . I .
         */
        const I = {
            sideNX: 'I',
            sidePX: '_',
            sideNY: '_',
            sidePY: 'I.NX',
            sideNZ: '_',
            sidePZ: '_',
            keyModel: 't_toTopPlatform',
            rotationY: -Math.PI / 2,
        }
        arrTiles.push(I)
    }

    {
        /**
         I
         . . .
         . . .
         . I .
         */
        const I = {
            sideNX: '_',
            sidePX: '_',
            sideNY: '_',
            sidePY: 'I.NZ',
            sideNZ: 'I',
            sidePZ: '_',
            keyModel: 't_toTopPlatform',
            rotationY: -Math.PI,
        }
        arrTiles.push(I)
    }

    /** ***************************************************/


    {
        /**
         . I .
         . I I
         . I .
         */
        const t = {
            sideNX: '_',
            sidePX: 'I',
            sideNY: '_',
            sidePY: '_',
            sideNZ: 'I',
            sidePZ: 'I',
            keyModel: 't_T',
            rotationY: 0,
        }
        arrTiles.push(t)
    }


    {
        /**
           I
         . . .
         . . .
         . . .
         */
        const t = {
            sideNX: '_',
            sidePX: '_',
            sideNY: '_',
            sidePY: 'I',
            sideNZ: '_',
            sidePZ: '_',
            keyModel: 't_tt',
            rotationY: 0,
        }
        arrTiles.push(t)
    }



    {
        /**
         . I .
         I I I
         . I .
         */
        const t = {
            sideNX: 'I',
            sidePX: 'I',
            sideNY: '_',
            sidePY: '_',
            sideNZ: 'I',
            sidePZ: 'I',
            keyModel: 't_X',
            rotationY: 0,
        }
        arrTiles.push(t)
    }

    ////////////////////////////////////////////////////////
    {
        /**
         * I
         . I .
         I I I
         . I .
         I
         */
        const t = {
            sideNX: 'I',
            sidePX: 'I',
            sideNY: 'I.closed.NZ.PZ.',
            sidePY: 'I.NX.PX',
            sideNZ: 'I',
            sidePZ: 'I',
            keyModel: 't_XY',
            rotationY: 0,
        }
        arrTiles.push(t)
    }

    {
        /**
         * I
         . I .
         I I I
         . I .
         I
         */
        const t = {
            sideNX: 'I',
            sidePX: 'I',
            sideNY: 'I.closed.NX.PX',
            sidePY: 'I.NZ.PZ',
            sideNZ: 'I',
            sidePZ: 'I',
            keyModel: 't_XY',
            rotationY: -Math.PI / 2,
        }
        arrTiles.push(t)
    }






    const DATA_TILES = []
    for (let i = 0; i < arrTiles.length; ++i) {
        arrTiles[i].id = i
        DATA_TILES.push(arrTiles[i])
    }
    prepareCacheSidesConnect(DATA_TILES)
    return DATA_TILES
}


