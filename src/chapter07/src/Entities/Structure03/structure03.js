import { createDataTiles } from './tilesMakerData'
import { createMap } from './map3SCreaterFromTiles'
import { createrMesh } from './threeMesh'

// http://cr31.co.uk/stagecast/wang/3corn.html
// MUST DO: central to top

export const createStructure3 = (
    root,
    {
        mapFill = [
            //{ tile: 'empty', place: [5, 7, 3] },
            { tile: 'empty', place: [5, 6, 3] },
            { tile: 'empty', place: [5, 5, 3] },
            { tile: 'empty', place: [5, 4, 3] },
            { tile: 'empty', place: [5, 3, 3] },
            { tile: 'empty', place: [5, 2, 3] },
            { tile: 'empty', place: [5, 1, 3] },
            { tile: 'empty', place: [5, 0, 3] },

            //{ tile: 'empty', place: [6, 7, 3] },
            { tile: 'empty', place: [6, 6, 3] },
            { tile: 'empty', place: [6, 5, 3] },
            { tile: 'empty', place: [6, 4, 3] },
            { tile: 'empty', place: [6, 3, 3] },
            { tile: 'empty', place: [6, 2, 3] },
            { tile: 'empty', place: [6, 1, 3] },
            { tile: 'empty', place: [6, 0, 3] },
        ],
    }
) => {
    const tiles = createDataTiles()
    const dataStructure = createMap(tiles, mapFill)
    const makerMesh = createrMesh(root)


    return {
        generateStructure: () => {
          return new Promise(res => {
              dataStructure.generateMap().then(map => {
                  console.log('map', map)
                  makerMesh.generateMeshes(map).then(result => {
                      res()
                  })
              })
          })
        },
        destroyStructure: () => {
            dataStructure.destroyMap()
            makerMesh.destroyStructure()
        },
    }
}
