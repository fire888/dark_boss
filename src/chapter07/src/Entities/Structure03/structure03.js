import { createDataTiles } from './tilesMakerData'
import { createMap } from './map3SCreaterFromTiles'
import { createrMesh } from './threeMesh'

// http://cr31.co.uk/stagecast/wang/3corn.html
// MUST DO: central to top

export const createStructure3 = root => {
    return new Promise(res => {
        const tiles = createDataTiles()
        console.log('tiles', tiles)
        const makerMesh = createrMesh(root)
        //
        const dataStructure = createMap(tiles, makerMesh).then(() => {
            res()
        })
    })

    // console.log('dataStructure', dataStructure)


    // dataStructure.iterateAll(item => {
    //     if (!item.tileData) {
    //         return;
    //     }
    //     makerMesh.addMesh(item)
    // })

}
