export const getRandomCoordsOfRoom = (room) => {
    const minX = room.walls.n.p0[0]
    const maxX = room.walls.n.p1[0]
    const minZ = room.walls.e.p0[1]
    const maxZ = room.walls.e.p1[1]
    const diffX = maxX - minX
    const diffZ = maxZ - minZ
    const x = minX + diffX * 0.2 + Math.random() * diffX * 0.6
    const z = minZ + diffZ * 0.2 + Math.random() * diffZ * 0.6

    return { x, z }
}