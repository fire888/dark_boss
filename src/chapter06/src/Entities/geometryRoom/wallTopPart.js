import { createFace } from '../geometry/helpers'
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

const gr1 = [0, 1, 0]
const gr6 = [
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
]

export const createTopPartWall = (l, lineData) => {
    if (!pos) {
        pos = lineData.geometry.attributes.position.array
        console.log(lineData)
    }



    const c = []
    const v = []

    let p = 0

    for (let i = 3; i < pos.length; i +=3) {
        v.push(
            ...createFace(
                [0, pos[i + 1 - 3], pos[i + 2 - 3]],
                [l, pos[i + 1 - 3], pos[i + 2 - 3]],
                [l, pos[i + 1], pos[i + 2]],
                [0, pos[i + 1], pos[i + 2]],
            )
        )



        if (
            p === 2 ||
            p === 6 ||
            p === 16
        ) {
            c.push(...gr6)
        } else {
            c.push(...white6)
        }

        ++p
    }

    console.log(c)

    return { v, c }
}