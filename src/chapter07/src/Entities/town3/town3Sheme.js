// import {tryToDivideRoom, roomStart, getId} from './town2TryToDivide'
// const DOOR_SIZE = 30
// const DOOR_SIZE_FULL = 60

const MAX_N = 10

export const createTown3Scheme = () => {
    const walls = []

    let point = [0, 0]

    const iterate = n => {
        if (n > MAX_N) {
            return;
        }
        const newPoint = [
            point[0] + Math.random() * 50 + 50,
            Math.random() * 50,
        ]
        const leftWall = {
            p0: [...point],
            p1: [...newPoint],
            type: 'wall_00_easy',
            h0: 0,
            h1: 50,
        }
        walls.push(leftWall)


        walls.push({
            p0: [leftWall.p1[0], leftWall.p1[1] + 100],
            p1: [leftWall.p0[0], leftWall.p0[1] + 100],
            type: 'wall_00_easy',
            h0: 0,
            h1: 50,
        })



        point = newPoint
        iterate(n + 1)
    }
    iterate(0)



    return {
        walls,
    }
}