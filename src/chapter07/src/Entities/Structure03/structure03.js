import { createDataTiles } from './tilesMakerData'
import { createMap } from './map3SCreaterFromTiles'
import { createrMesh } from './threeMesh'


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
