

let arrItems = []



export const addItemToNearChecker = item => arrItems.push(item)



export const removeItemByName = name => arrItems = arrItems.filter(item => item.name !== name)



export const createCheckerNearItem = (mesh, emitter) => () => {
    arrItems.forEach(item => {
        if (mesh.position.distanceTo(item.position) < 10 && !item.userData.nearPlayer) {
            item.userData.nearPlayer = true
            emitter.emit('nearMesh')({ toNear: true, mesh: item })
        }
        if (mesh.position.distanceTo(item.position) >= 10 && item.userData.nearPlayer) {
            item.userData.nearPlayer = false
            emitter.emit('nearMesh')({ toNear: false, mesh: item })
        }
    })
}

