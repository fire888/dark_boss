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
pos = [0, -2.6953001022338867, 22.33769989013672, 0, 3.8533999919891357, 21.921899795532227, 0, 5.635499954223633, 21.284500122070312, 0, 19.557199478149414, 20.037200927734375, 0, 20.696800231933594, 20.980899810791016, 0, 25.771099090576172, 21.85650062561035, 0, 27.770299911499023, 20.32659912109375, 0, 27.770299911499023, 19.798900604248047, 0, 61.1713981628418, 19.746400833129883, 0, 61.1713981628418, 20.36400032043457, 0, 63.55139923095703, 22.07699966430664, 0, 65.46749877929688, 21.3710994720459, 0, 65.95809936523438, 22.83650016784668, 0, 67.88800048828125, 22.83650016784668, 0, 67.8865966796875, 21.539499282836914, 0, 77.65049743652344, 21.539499282836914, 0, 77.66819763183594, 24.958099365234375, 0, 79.78269958496094, 24.83370018005371, 0, 81.02649688720703, 27.694400787353516, 0, 82.51909637451172, 27.943199157714844, 0, 82.51909637451172, 26.699399948120117, 0, 106.7477035522461, 26.699399948120117, 0, 106.7477035522461, 28.06760025024414, 0, 108.36470031738281, 28.06760025024414, ]


export const createDoorData = (root, lineData, l, mode = 'simple') => {
    if (leftProfile === null) {
        // let s = ''
        // const arr = lineData.geometry.attributes.position.array

        // for (let i = 0; i < arr.length; ++i) {
        //     s += arr[i] + ', '
        // }
        // console.log(s)

        //pos = lineData.geometry.attributes.position.array
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

        if (mode !== 'bigDoor' && count > 12) {
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
                    [rightProfile[i - 3], 0, -rightProfile[i - 1]],
                    [rightProfile[i - 3], 50, -rightProfile[i - 1]],
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
    //const mirrorB = [...b]
    //inverseVertexOrder(mirrorB)
    //scaleArr(mirrorB, 1, 1, -1)
    //b.push(...mirrorB)



    return { v, c, b, u }
}