import { createDataTiles } from './create_DATA_TILES'
import { prepareCacheResults } from './prepareCacheResults'
//import { createMap } from './createMapFromTiles'
//import { createMap } from './createMapFromTiles02'
import { createMap } from './createMapFromTiles03'
import * as THREE from 'three'

export const createStructure2 = root => {
    const tiles = createDataTiles()
    const tilesWithCachesResults = prepareCacheResults(tiles)
    const dataStructure = createMap(tilesWithCachesResults)
    console.log(dataStructure)


    const g = new THREE.BoxGeometry(10, 10, 10)
    const m = new THREE.MeshPhongMaterial({ color: 0xff0000})

    const S = 30
    const sS = 10


    const createM = (t, y, z, x) => {
        for (let i = 0; i < t.length; ++i) {
            for (let j = 0; j < t[i].length; ++j) {
                for (let k = 0; k < t[i][j].length; ++k) {
                    if (t[i][j][k] === 1) {
                        const me = new THREE.Mesh(g, m)
                        me.position.set(
                            x * S + k * sS,
                            y * S + i * sS,
                            z * S + j * sS,
                        )
                        root.studio.addToScene(me)
                    }
                }
            }
        }
    }



    for (let i = 0; i < dataStructure.length; ++i) {
        for (let j = 0; j < dataStructure[i].length; ++j) {
            for (let k = 0; k < dataStructure[i][j].length; ++k) {
                dataStructure[i][j][k].tileData && createM(dataStructure[i][j][k].tileData.tile, i, j, k)
            }
        }
    }

}
