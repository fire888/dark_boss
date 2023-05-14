import { createDataTiles } from './tilesMakerData'
import { createMap } from './map3SCreaterFromTiles'
import { createrMesh } from './threeMesh'

// http://cr31.co.uk/stagecast/wang/3corn.html
// MUST DO: central to top

export const createStructure3 = (
    root,
) => {
    const tiles = createDataTiles()
    const dataStructure = createMap(tiles)
    const makerMesh = createrMesh(root)
    let map = null


    return {
        generateStructure: (structure) => {
          return new Promise(res => {
              dataStructure.generateMap(structure).then(m => {
                  map = m
                  console.log('map', map)
                  makerMesh.generateMeshes(map, structure).then(result => {
                      res()
                  })
              })
          })
        },
        destroyStructure: () => {
            dataStructure.destroyMap()
            makerMesh.destroyStructure()
        },
        getCoordsForItem: (key) => {
            let x, y, z

            let count = 100
            const iterate = () => {

                const rY = Math.floor(Math.random() * (map.sizeY - 2) + 1)
                const rZ = Math.floor(Math.random() * map.sizeZ)
                const rX = Math.floor(Math.random() * map.sizeX)

                console.log(rY, rZ, rX)

                --count
                if (
                    count < 0 ||
                    map.items[rY][rZ][rX].tileData.keyModel === 't_L' ||
                    map.items[rY][rZ][rX].tileData.keyModel === 't_T' ||
                    map.items[rY][rZ][rX].tileData.keyModel === 't_I' ||
                    map.items[rY][rZ][rX].tileData.keyModel === 't_X'
                ) {
                    y = rY
                    x = rX
                    z = rZ
                } else {
                    iterate()
                }
            }
            iterate()
            return [x, y, z]
        },
    }
}
