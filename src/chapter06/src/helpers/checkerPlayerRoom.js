export const createCheckerRoom = (root, roomsData) => {

    const roomsObj = {}
    for (let i = 0; i < roomsData.length; ++i) {
        roomsObj[roomsData[i].id] = roomsData[i]
    }

    const arrFs = []

    let oldPlayerRoomId = null
    let currentPlayerRoomId = null

    root.emitter.subscribe('playerMove')(dir => {
        if (dir === 'forward') {
            const { x, z } = root.player.mesh.position
            for (let key in roomsObj) {
                if (
                    roomsObj[key].walls.e.p0[1] < z &&
                    roomsObj[key].walls.e.p1[1] > z &&
                    roomsObj[key].walls.n.p0[0] < x &&
                    roomsObj[key].walls.n.p1[0] > x
                ) {
                    currentPlayerRoomId = key
                    if (oldPlayerRoomId !== currentPlayerRoomId) {
                        oldPlayerRoomId = currentPlayerRoomId
                        for (let i = 0; i < arrFs.length; ++i) {
                            arrFs[i](roomsObj[key])
                        }
                    }
                    break;
                }
            }
        }
    })


    return {
        onChangeRoom: f => { arrFs.push(f) },
    }
}