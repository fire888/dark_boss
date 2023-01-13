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



export const createTopPartWall = ({
    l,
    asset,
    leftOffset,
    rightOffset,
    segment,
}) => {
    if (!pos) {
        pos = asset.geometry.attributes.position.array
    }


    const c = []
    const v = []

    let p = -1

    for (let i = 3; i < pos.length; i += 3) {
        ++p
        if (segment === 'top' && p < 11) {
            continue;
        }
        if (segment === 'bottom' && p > 10) {
            continue;
        }
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
    }



    /** top items */
    if (segment === 'top' || segment === 'full') {
        {
            const leftOffsetVal = leftOffset ? 15 : 7
            const rightOffsetVal = rightOffset ? 15 : 7
            const n = Math.floor((l - (leftOffsetVal + rightOffsetVal)) / 10)

            const r = 1.5
            const h2 = 87
            const h1 = 83
            const h0 = 78
            let step = (l - (leftOffsetVal + rightOffsetVal)) / n
            if (n > 0) {
                for (let i = 0; i < n + 1; ++i) {
                    let currentX = (leftOffsetVal) + (i * step)
                    const dt = createFaceWithSquare(
                        [currentX - r, h1, 11],
                        [currentX + r, h1, 11],
                        [currentX + r, h2, 11],
                        [currentX - r, h2, 11],
                        gr1,
                        white1,
                        .5
                    )
                    v.push(...dt.vArr)
                    c.push(...dt.cArr)
                    v.push(
                        ...createFace(
                            [currentX - r, h0, 1.8],
                            [currentX + r, h0, 1.8],
                            [currentX + r, h1, 11],
                            [currentX - r, h1, 11],
                        )
                    )
                    v.push(
                        ...createFace(
                            [currentX - r, h0, 1.8],
                            [currentX - r, h1, 11],
                            [currentX - r, h2, 11],
                            [currentX - r, h2, 1.8],
                        )
                    )
                    v.push(
                        ...createFace(
                            [currentX + r, h1, 11],
                            [currentX + r, h0, 1.8],
                            [currentX + r, h2, 1.8],
                            [currentX + r, h2, 11],
                        )
                    )
                    c.push(...white6)
                    c.push(...white6)
                    c.push(...white6)
                }
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
            const h1 = 83
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
                    c.push(...white6)
                    v.push(
                        ...createFace(
                            [currentX - r + 2 - 1.5, h0, 10],
                            [currentX - r + 2, h0, 15],
                            [currentX - r, h2, 16.5],
                            [currentX - r - 1.5, h2, 10],
                        )
                    )
                    c.push(...white6)
                    v.push(
                        ...createFace(
                            [currentX + r - 2, h0, 15],
                            [currentX + r - 2 + 1.5, h0, 10],
                            [currentX + r + 1.5, h2, 10],
                            [currentX + r, h2, 16.5],
                        )
                    )
                    c.push(...white6)


                    v.push(
                        ...createFace(
                            [currentX - r, h0, 14.5],
                            [currentX + r, h0, 14.5],
                            [currentX + r + 3, h2, 16],
                            [currentX - r - 3, h2, 16],
                        )
                    )
                    c.push(...white6)


                    v.push(
                        ...createFace(
                            [currentX - r - 1, h0, 11],
                            [currentX - r, h0, 14.5],
                            [currentX - r - 3, h2, 16],
                            [currentX - r - 3 - 1, h2, 11],
                        )
                    )
                    c.push(...white6)


                    v.push(
                        ...createFace(
                            [currentX + r, h0, 14.5],
                            [currentX + r + 1, h0, 11],
                            [currentX + r + 3 + 1, h2, 11],
                            [currentX + r + 3, h2, 16],
                        )
                    )
                    c.push(...white6)

                }
            }

        }

        /** bottom items */
        {
            //let offset = 19
            //let offset = 2
            const leftOffsetVal = leftOffset ? 19 : 2
            const rightOffsetVal = rightOffset ? 19 : 2
            const n = Math.floor((l - (leftOffsetVal + rightOffsetVal)) / 5)

            const r = .5
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
                    c.push(...white6)
                    v.push(
                        ...createFace(
                            [currentX - r, h0, 11],
                            [currentX - r, h0, 18.5],
                            [currentX - r, h2, 18],
                            [currentX - r, h2, 11],
                        )
                    )
                    c.push(...white6)
                    v.push(
                        ...createFace(
                            [currentX + r, h0, 18.5],
                            [currentX + r, h0, 11],
                            [currentX + r, h2, 11],
                            [currentX + r, h2, 18],
                        )
                    )
                    c.push(...white6)
                }
            }

        }
    }




    return { v, c }
}