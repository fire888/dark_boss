import { createDataTiles } from './tilesMakerData'
import { createMap } from './map3SCreaterFromTiles'
import { createrMesh } from './threeMesh'

// http://cr31.co.uk/stagecast/wang/3corn.html
// MUST DO: central to top

export const createStructure3 = root => {
    const tiles = createDataTiles()
    console.log('tiles', tiles)
    const dataStructure = createMap(tiles)
    console.log('dataStructure', dataStructure)

    const makerMesh = createrMesh(root)
    dataStructure.iterateAll(item => {
        if (!item.tileData) {
            return;
        }
        makerMesh.addMesh(item)
    })

}
