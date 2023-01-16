import {
    createFace,
    createFaceWithSquare,
} from '../geometry/helpers'
const H0 = 50
const H1 = 70


let pos = null
const white1 = [1, 1, 1]
const white6 = [
    ...white1,
    ...white1,
    ...white1,
    ...white1,
    ...white1,
    ...white1,
]

const gr1 = [0, .5, .7]
const gr6 = [
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
]


export const createDoorData = (root, lineData, l) => {
    if (pos === null) {
        pos = lineData.geometry.attributes.position.array
    }
    const v = []
    const c = []

    for (let i = 3; i < pos.length; i += 3) {
        v.push(
            ...createFace(
                [0, pos[i + 1 - 3], pos[i + 2 - 3]],
                [4, pos[i + 1 - 3], pos[i + 2 - 3]],
                [4, pos[i + 1], pos[i + 2]],
                [0, pos[i + 1], pos[i + 2]],
            )
        )
        c.push(...white6)

        v.push(
            ...createFace(
                [l - 4, pos[i + 1 - 3], pos[i + 2 - 3]],
                [l, pos[i + 1 - 3], pos[i + 2 - 3]],
                [l, pos[i + 1], pos[i + 2]],
                [l - 4, pos[i + 1], pos[i + 2]],
            )
        )
        c.push(...white6)
    }

    return { v, c }
}