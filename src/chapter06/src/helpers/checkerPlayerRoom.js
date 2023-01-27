export const createCheckerRoom = (root, roomsData) => {

    const roomsObj = {}
    for (let i = 0; i < roomsData.length; ++i) {
        roomsObj[roomsData[i].id] = roomsData[i]
    }

    let currentPlayerRoomId = null

    root.emitter.subscribe('playerMove')(dir => {
        if (dir === 'forward') {
            const { x, z } = root.player.mesh.position
            console.log('---- fff', x, z)
        }
    })


    return {}
}