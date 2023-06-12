import { createDataTiles } from './tilesMakerData'
import { createMap } from './map3SCreaterFromTiles'
import { createrMesh } from './threeMesh'


export const createStructure2 = root => {
    const tiles = createDataTiles()
    const dataStructure = createMap(tiles)

    const makerMesh = createrMesh(root)
    dataStructure.iterateAll(item => {
        if (!item.tileData) {
            return;
        }
        const { i, j, k, tileData } = item
        makerMesh.addMesh(tileData.tile, i, j, k)
    })

}
