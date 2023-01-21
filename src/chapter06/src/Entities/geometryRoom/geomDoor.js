import {
    createFace,
    createFaceWithSquare,
    rotateArrY,
    translateArr,
    scaleArr,
    inverseVertexOrder,
} from '../../helpers/geomHelpers'
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

//const gr1 = [0, .5, .7]
const gr1 = [0, 0, 0]
const gr6 = [
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
    ...gr1,
]


const uv6 = [
    0, 0, 
    1, 0, 
    1, 1,
    0, 0,
    1, 1,
    0, 1
]



let leftProfile = null
let rightProfile = null


export const createDoorData = (root, lineData, l, mode = 'simple') => {
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
    const b = []
    const u = []

    let count = -1

    for (let i = 3; i < pos.length; i += 3) {
        ++count

        if (mode !== 'bigDoor' && count > 13) {
            continue;
        }

        /** doorstep ***/
        if (i === 3 && mode === 'bigDoor') {
            v.push(
                ...createFace(
                [0, -3, 10],
                [l / 2, -3, 10],
                [l / 2, 1, 10],
                [0, 1, 10],
            ))
            c.push(...white6)
            u.push(...uv6)
            v.push(
                ...createFace(
                    [0, 1, 10],
                    [l / 2, 1, 10],
                    [l / 2, 1, 0],
                    [0, 1, 0],
                ))
            c.push(...white6)
            u.push(...uv6)
        }

        v.push(
            ...createFace(
                [leftProfile[i - 3], leftProfile[i + 1 - 3], 0],
                [leftProfile[i - 3], leftProfile[i + 1 - 3], leftProfile[i + 2 - 3]],
                [leftProfile[i], leftProfile[i + 1], leftProfile[i + 2]],
                [leftProfile[i], leftProfile[i + 1], 0],
            )
        )
        u.push(...uv6)
        c.push(...white6)


        v.push(
            ...createFace(
                [leftProfile[i - 3], leftProfile[i + 1 - 3], leftProfile[i + 2 - 3]],
                [rightProfile[i - 3], rightProfile[i + 1 - 3], rightProfile[i + 2 - 3]],
                [rightProfile[i], rightProfile[i + 1], rightProfile[i + 2]],
                [leftProfile[i], leftProfile[i + 1], leftProfile[i + 2]],
            )
        )
        u.push(...uv6)
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
            u.push(...uv6)
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
            u.push(...uv6)
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
            u.push(...uv6)
            c.push(...white6)
        }

        if (count === 0) {
            b.push(
                ...createFace(
                    [rightProfile[i - 3], 0, rightProfile[i - 1]],
                    [rightProfile[i - 3], 0, 0],
                    [rightProfile[i - 3], 50, 0],
                    [rightProfile[i - 3], 50, rightProfile[i - 1]],
                )
            )
        }
    }

    const copyV = [...v]
    inverseVertexOrder(copyV)
    scaleArr(copyV, -1, 1, 1)
    translateArr(copyV, l, 0, 0)
    v.push(...copyV)
    u.push(...u)


    const copyC = [...c]
    c.push(...copyC)



    const mirrorV = [...v]
    inverseVertexOrder(mirrorV)
    scaleArr(mirrorV, 1, 1, -1)
    v.push(...mirrorV)
    c.push(...c)
    u.push(...u)



    const copyB = [...b]
    inverseVertexOrder(copyB)
    scaleArr(copyB, -1, 1, 1)
    translateArr(copyB, l, 0, 0)
    b.push(...copyB)
    const mirrorB = [...b]
    inverseVertexOrder(mirrorB)
    scaleArr(mirrorB, 1, 1, -1)
    b.push(...mirrorB)



    return { v, c, b, u }
}