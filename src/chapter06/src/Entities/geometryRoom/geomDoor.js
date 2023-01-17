import {
    createFace,
    createFaceWithSquare,
    rotateArrY,
    translateArr,
    scaleArr,
    inverseVertexOrder,
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

let leftProfile = null
let rightProfile = null


export const createDoorData = (root, lineData, l) => {
    if (pos === null) {
        pos = lineData.geometry.attributes.position.array
        leftProfile = [...pos]
        rotateArrY(leftProfile, -Math.PI / 4)
        translateArr(leftProfile, 12, 0, 5)
        rightProfile = [...pos]
        rotateArrY(rightProfile, Math.PI / 4)
        translateArr(rightProfile, -12, 0, 5)
    }
    const v = []
    const c = []

    let count = -1

    for (let i = 3; i < pos.length; i += 3) {
        ++count

        v.push(
            ...createFace(
                [leftProfile[i - 3], leftProfile[i + 1 - 3], 0],
                [leftProfile[i - 3], leftProfile[i + 1 - 3], leftProfile[i + 2 - 3]],
                [leftProfile[i], leftProfile[i + 1], leftProfile[i + 2]],
                [leftProfile[i], leftProfile[i + 1], 0],
            )
        )
        c.push(...white6)


        v.push(
            ...createFace(
                [leftProfile[i - 3], leftProfile[i + 1 - 3], leftProfile[i + 2 - 3]],
                [rightProfile[i - 3], rightProfile[i + 1 - 3], rightProfile[i + 2 - 3]],
                [rightProfile[i], rightProfile[i + 1], rightProfile[i + 2]],
                [leftProfile[i], leftProfile[i + 1], leftProfile[i + 2]],
            )
        )
        c.push(...white6)



        if (count < 12) {
            v.push(
                ...createFace(
                    [rightProfile[i - 3], rightProfile[i + 1 - 3], rightProfile[i + 2 - 3]],
                    [rightProfile[i - 3], rightProfile[i + 1 - 3], 0],
                    [rightProfile[i], rightProfile[i + 1], 0],
                    [rightProfile[i], rightProfile[i + 1], rightProfile[i + 2]],
                )
            )
            c.push(...white6)
        } else {
            v.push(
                ...createFace(
                    [rightProfile[i - 3], rightProfile[i + 1 - 3], rightProfile[i + 2 - 3]],
                    [l / 2, rightProfile[i + 1 - 3], rightProfile[i + 2 - 3]],
                    [l / 2, rightProfile[i + 1], rightProfile[i + 2]],
                    [rightProfile[i], rightProfile[i + 1], rightProfile[i + 2]],
                )
            )
            c.push(...white6)
        }

        if (count === 11) {
            v.push(
                ...createFace(
                    [rightProfile[i], rightProfile[i + 1], 0],
                    [l / 2, rightProfile[i + 1], 0],
                    [l / 2, rightProfile[i + 1], rightProfile[i + 2]],
                    [rightProfile[i], rightProfile[i + 1], rightProfile[i + 2]],
                )
            )
            c.push(...white6)
        }
    }

    const copyV = [...v]
    inverseVertexOrder(copyV)
    scaleArr(copyV, -1, 1, 1)
    translateArr(copyV, l, 0, 0)
    v.push(...copyV)


    const copyC = [...c]
    c.push(...copyC)



    const mirrorV = [...v]
    inverseVertexOrder(mirrorV)
    scaleArr(mirrorV, 1, 1, -1)
    v.push(...mirrorV)
    c.push(...c)



    return { v, c }
}