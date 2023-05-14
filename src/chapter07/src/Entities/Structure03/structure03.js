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


    return {
        generateStructure: (structure) => {
          return new Promise(res => {
              dataStructure.generateMap(structure).then(map => {
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
            return [0, 0, 0]
        },
    }
}
