
import {
    translateArr,
    rotateArrY,
    createFace,
    angleFromCoords,
    createFaceWithSquare,
    //createUv,
} from '../../helpers/geomHelpers'
import { createPanel } from './geomWallPanno'

const uv6 = [
    0, 0, 
    1, 0, 
    1, 1,
    0, 0,
    1, 1,
    0, 1
]


export const createWall = (data) => {

    const v = []
    const c = []
    const b = []
    const u = []

    const { p0, p1, arr, colorRoom } = data

    const lX = p1[0] - p0[0]
    const lZ = p0[1] - p1[1]
    const l = Math.sqrt(lX * lX + lZ * lZ)

    const izSegmentsDoors = arr.length > 0

    const segment = createSegment({
        l,
        //asset: root.assets['walls'].children[0],
        leftOffset: true,
        rightOffset: true,
        segment: izSegmentsDoors ? 'top' : 'full',
        colorRoom,
    })
    const angle = angleFromCoords(lX, lZ)
    rotateArrY(segment.v, angle)
    translateArr(segment.v, p0[0], -61, p0[1])
    v.push(...segment.v)
    c.push(...segment.c)
    u.push(...segment.u)

    rotateArrY(segment.b, angle)
    translateArr(segment.b, p0[0], -61, p0[1])
    b.push(...segment.b)


    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; ++i) {
            const {p0, p1} = arr[i]

            const lX = p1[0] - p0[0]
            const lZ = p0[1] - p1[1]
            const l = Math.sqrt(lX * lX + lZ * lZ)

            const segment = createSegment({
                l,
                //asset: root.assets['walls'].children[0],
                leftOffset: i === 0,
                rightOffset: i === arr.length - 1,
                segment: 'bottom',
                colorRoom,
            })
            const angle = angleFromCoords(lX, lZ)

            rotateArrY(segment.v, angle)
            translateArr(segment.v, p0[0], -61, p0[1])
            v.push(...segment.v)
            c.push(...segment.c)
            u.push(...segment.u)

            rotateArrY(segment.b, angle)
            translateArr(segment.b, p0[0], -61, p0[1])
            b.push(...segment.b)
        }
    }

    return { v, c, b, u }
}


//let pos = null
let pos = [0, -0.000699999975040555, 20.271699905395508, 0, 0.9347000122070312, 20.271699905395508, 0, 1.8353999853134155, 17.028799057006836, 0, 7.440899848937988, 17.028799057006836, 0, 7.844900131225586, 19.12459945678711, 0, 8.748000144958496, 19.12459945678711, 0, 9.527199745178223, 13.83530044555664, 0, 20.66309928894043, 13.83530044555664, 0, 21.29990005493164, 17.426300048828125, 0, 23.96380043029785, 17.426300048828125, 0, 24.70680046081543, 10.646400451660156, 0, 67.68000030517578, 10.646400451660156, 0, 67.68000030517578, 13.190500259399414, 0, 70.5458984375, 13.190500259399414, 0, 70.5458984375, 4.975500106811523, 0, 72.16529846191406, 4.975500106811523, 0, 72.16529846191406, 2.640399932861328, 0, 82.96610260009766, 2.6317999362945557, 0, /*86.24569702148438*/ 88, 14.853300094604492, 0, /*89.66629791259766*/ 110, 14.853300094604492, ]

// const white1 = [1, 1, 1]
// const white6 = [
//     ...white1,
//     ...white1,
//     ...white1,
//     ...white1,
//     ...white1,
//     ...white1,
// ]

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
// const gr1 = [1, 0, 0]
// const gr6 = [
//     ...gr1,
//     ...gr1,
//     ...gr1,
//     ...gr1,
//     ...gr1,
//     ...gr1,
// ]
const swap = (v1, v2) => {
    return [[...v2], [...v1]]
}

export const createSegment = ({
                                      l,
                                      //asset,
                                      leftOffset,
                                      rightOffset,
                                      segment,
                                      colorRoom,
                                  }) => {
    const colorRoom6 = [
        ...colorRoom, ...colorRoom, ...colorRoom,
        ...colorRoom, ...colorRoom, ...colorRoom,
    ]

    // let colorW1Use = [...white1]
    // let colorW6Use = [...white6]
    // let colorRoomUse = [...colorRoom]
    // let colorRoom6Use = [...colorRoom6]
    // if (Math.random() < .5) {
    //      [ colorW1Use, colorRoomUse ] = swap(colorRoomUse, colorW1Use)
    //      [ colorW6Use, colorRoom6Use ] = swap(colorRoom6, white6)
    // }

    //console.log('--', colorRoomUse)


    const c = []
    const v = []
    const b = []
    const u = []

    let p = -1

    if (segment === 'bottom' || segment === 'full') {
        const panel = createPanel({
            l,
            colorRoom,
            leftOffset: leftOffset ? 11 : 0,
            rightOffset: rightOffset ? 11 : 0,
        })
        c.push(...panel.c)
        v.push(...panel.v)
        u.push(...panel.u)
    }

    for (let i = 3; i < pos.length; i += 3) {
        ++p
        if (segment === 'top' && p < 11) {
            continue;
        }
        if (segment === 'bottom' && p > 10) {
            continue;
        }

        if (p === 0 && (segment === 'bottom' || segment === 'full') ) {
            b.push(
                ...createFace(
                    [-3.6, pos[i + 1 - 3], pos[i + 2 - 3]],
                    [l + 3.6, pos[i + 1 - 3], pos[i + 2 - 3]],
                    [l + 3.6, 30, pos[i + 2]],
                    [- 3.6, 30, pos[i + 2]],
                )
            )
        }

        v.push(
            ...createFace(
                [0, pos[i + 1 - 3], pos[i + 2 - 3]],
                [l, pos[i + 1 - 3], pos[i + 2 - 3]],
                [l, pos[i + 1], pos[i + 2]],
                [0, pos[i + 1], pos[i + 2]],
            )
        )
        u.push(...uv6)
        if (
            p === 2 ||
            p === 6 ||
            //p === 10 ||
            p === 16
        ) {
            c.push(...colorRoom6)
        } else {
            c.push(...white6)
        }
    }

    /** top items */
    if (segment === 'top' || segment === 'full') {
        const leftOffsetVal = leftOffset ? 25 : 7
        const rightOffsetVal = rightOffset ? 25 : 7
        const n = Math.floor((l - (leftOffsetVal + rightOffsetVal)) / 30)

        //const r = 1.5
        const r = 5
        const h2 = 87
        const h1 = 80
        const h0 = 72
        const z = 12.5
        let step = (l - (leftOffsetVal + rightOffsetVal)) / n
        if (n > 0) {
            for (let i = 0; i < n + 1; ++i) {
                let currentX = (leftOffsetVal) + (i * step)
                const dt = createFaceWithSquare(
                    [currentX - r, h1, z],
                    [currentX + r, h1, z],
                    [currentX + r, h2, z],
                    [currentX - r, h2, z],
                    colorRoom,
                    white1,
                    .5
                )
                v.push(...dt.vArr)
                c.push(...dt.cArr)
                u.push(...dt.uArr)
                v.push(
                    ...createFace(
                        [currentX - r, h0, 1.8],
                        [currentX + r, h0, 1.8],
                        [currentX + r, h1, z],
                        [currentX - r, h1, z],
                    )
                )
                u.push(...uv6)
                v.push(
                    ...createFace(
                        [currentX - r, h0, 1.8],
                        [currentX - r, h1, z],
                        [currentX - r, h2, z],
                        [currentX - r, h2, 1.8],
                    )
                )
                u.push(...uv6)
                v.push(
                    ...createFace(
                        [currentX + r, h1, z],
                        [currentX + r, h0, 1.8],
                        [currentX + r, h2, 1.8],
                        [currentX + r, h2, z],
                    )
                )
                u.push(...uv6)
                c.push(...white6)
                c.push(...white6)
                c.push(...white6)
            }
        }
    }


    /** bottom items */
    if (segment === 'full' || segment === 'bottom') {
        {
            //let offset = 30
            //let offset = 8
            const leftOffsetVal = leftOffset ? 30 : 8
            const rightOffsetVal = rightOffset ? 30 : 8
            const n = Math.floor((l - (leftOffsetVal + rightOffsetVal)) / 20)

            const r = 3
            const h2 = 21
            //const h1 = 83
            const h0 = 8.7
            let step = (l - (leftOffsetVal + rightOffsetVal)) / n
            if (n > 0) {
                for (let i = 0; i < n + 1; ++i) {
                    let currentX = leftOffsetVal + (i * step)
                    v.push(
                        ...createFace(
                            [currentX - r + 2, h0, 15],
                            [currentX + r - 2, h0, 15],
                            [currentX + r, h2, 16.5],
                            [currentX - r, h2, 16.5],
                        )
                    )
                    u.push(...uv6)
                    c.push(...white6)
                    v.push(
                        ...createFace(
                            [currentX - r + 2 - 1.5, h0, 10],
                            [currentX - r + 2, h0, 15],
                            [currentX - r, h2, 16.5],
                            [currentX - r - 1.5, h2, 10],
                        )
                    )
                    u.push(...uv6)
                    c.push(...white6)
                    v.push(
                        ...createFace(
                            [currentX + r - 2, h0, 15],
                            [currentX + r - 2 + 1.5, h0, 10],
                            [currentX + r + 1.5, h2, 10],
                            [currentX + r, h2, 16.5],
                        )
                    )
                    u.push(...uv6)
                    c.push(...white6)


                    v.push(
                        ...createFace(
                            [currentX - r, h0, 14.5],
                            [currentX + r, h0, 14.5],
                            [currentX + r + 3, h2, 16],
                            [currentX - r - 3, h2, 16],
                        )
                    )
                    u.push(...uv6)
                    c.push(...white6)


                    v.push(
                        ...createFace(
                            [currentX - r - 1, h0, 11],
                            [currentX - r, h0, 14.5],
                            [currentX - r - 3, h2, 16],
                            [currentX - r - 3 - 1, h2, 11],
                        )
                    )
                    u.push(...uv6)
                    c.push(...white6)


                    v.push(
                        ...createFace(
                            [currentX + r, h0, 14.5],
                            [currentX + r + 1, h0, 11],
                            [currentX + r + 3 + 1, h2, 11],
                            [currentX + r + 3, h2, 16],
                        )
                    )
                    u.push(...uv6)
                    c.push(...white6)
                }
            }
        }

        /** bottom items */
        {
            //let offset = 19
            //let offset = 2
            const leftOffsetVal = leftOffset ? 22 : 2
            const rightOffsetVal = rightOffset ? 22 : 2
            const n = Math.floor((l - (leftOffsetVal + rightOffsetVal)) / 10)

            const r = 1
            const h2 = 8.3
            const h0 = 0.6
            let step = (l - (leftOffsetVal + rightOffsetVal)) / n
            if (n > 0) {
                for (let i = 0; i < n + 1; ++i) {
                    let currentX = leftOffsetVal + (i * step)
                    v.push(
                        ...createFace(
                            [currentX - r, h0, 18.5],
                            [currentX + r, h0, 18.5],
                            [currentX + r, h2, 18],
                            [currentX - r, h2, 18],
                        )
                    )
                    u.push(...uv6)
                    c.push(...white6)
                    v.push(
                        ...createFace(
                            [currentX - r, h0, 11],
                            [currentX - r, h0, 18.5],
                            [currentX - r, h2, 18],
                            [currentX - r, h2, 11],
                        )
                    )
                    u.push(...uv6)
                    c.push(...white6)
                    v.push(
                        ...createFace(
                            [currentX + r, h0, 18.5],
                            [currentX + r, h0, 11],
                            [currentX + r, h2, 11],
                            [currentX + r, h2, 18],
                        )
                    )
                    u.push(...uv6)
                    c.push(...white6)
                }
            }

        }
    }

    return { v, c, b, u }
}