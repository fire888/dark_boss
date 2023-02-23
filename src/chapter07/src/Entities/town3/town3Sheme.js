// import {tryToDivideRoom, roomStart, getId} from './town2TryToDivide'
// const DOOR_SIZE = 30
// const DOOR_SIZE_FULL = 60

export const createTown3Scheme = () => {
    const walls = []

    let point = [0, 0]

    const iterate = n => {
        if (n > 10) {
            return;
        }
        const newPoint = [
            point[0] + Math.random() * 100 + 50,
            point[1] + Math.random() * 100 + 50,
        ]
        walls.push({
            p0: [...point],
            p1: [...newPoint],
            type: 'wall_00_easy',
            h0: 0,
            h1: 30,
        })
        point = newPoint
        iterate(n + 1)
    }
    iterate(0)



    return {
        walls,
    }
}