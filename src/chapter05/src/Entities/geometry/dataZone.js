import {
    createUv,
    createFace,
    fillColorFace,
    translateArr,
    rotateArr,
} from "./helpers";

/**
  1 2 3
  4 5 6
  7 8 9
 */

const P_1 = [
    [-70, -30],
    [-30, -30],
    [-30, -70],
    [-70, -70],
]

const P_2 = [
    [-30, -30],
    [30, -30],
    [30, -70],
    [-30, -70],
]

const P_3 = [
    [30, -30],
    [70, -30],
    [70, -70],
    [30, -70],
]

const P_6 = [
    [30, 30],
    [70, 30],
    [70, -30],
    [30, -30],
]

const P_7 = [
    [-70, 70],
    [-30, 70],
    [-30, 30],
    [-70, 30]
]

const P_8 = [
    [-30, 70],
    [30, 70],
    [30, 30],
    [-30, 30]
]

const P_9 = [
    [30, 70],
    [70, 70],
    [70, 30],
    [30, 30]
]

const SH_BY_DIR = {
    'N': [ P_7 ],
    'W': [ P_7, P_8, P_9 ],
    'S': [ P_7, P_8, P_9, P_6, P_3 ],
    'E': [ P_7, P_8, P_9, P_6, P_3, P_2, P_1 ],
}

export const createDataZone = ({
    xCenter,
    zCenter,
    h,
    dir,
    color2 = [0, .7, 0],
    colorB = [0, 0, 0],
}) => {
    const hh = h - 3

    const v = []
    const c = []
    const u = []
    const collision = []


    const uvBr = createUv([0, .5], [.5, .5], [.5, 1], [0, 1],)
    const uvCl = createUv([0, 0], [0, 0], [0, 0], [0, 0],)

    if (SH_BY_DIR[dir]) {
        for (let i = 0; i < SH_BY_DIR[dir].length; ++i) {
            const coord = SH_BY_DIR[dir][i]
            v.push(
                /** top */
                ...createFace(
                    [coord[0][0], h, coord[0][1]],
                    [coord[1][0], h, coord[1][1]],
                    [coord[2][0], h, coord[2][1]],
                    [coord[3][0], h, coord[3][1]],
                ),
                /** bottom */
                ...createFace(
                    [coord[3][0], hh, coord[3][1]],
                    [coord[2][0], hh, coord[2][1]],
                    [coord[1][0], hh, coord[1][1]],
                    [coord[0][0], hh, coord[0][1]],
                ),
                /** side */
                ...createFace(
                    [coord[0][0], hh, coord[0][1]],
                    [coord[1][0], hh, coord[1][1]],
                    [coord[1][0], h, coord[1][1]],
                    [coord[0][0], h, coord[0][1]],
                ),
                ...createFace(
                    [coord[1][0], hh, coord[1][1]],
                    [coord[2][0], hh, coord[2][1]],
                    [coord[2][0], h, coord[2][1]],
                    [coord[1][0], h, coord[1][1]],
                ),
                ...createFace(
                    [coord[2][0], hh, coord[2][1]],
                    [coord[3][0], hh, coord[3][1]],
                    [coord[3][0], h, coord[3][1]],
                    [coord[2][0], h, coord[2][1]],
                ),
                ...createFace(
                    [coord[3][0], hh, coord[3][1]],
                    [coord[0][0], hh, coord[0][1]],
                    [coord[0][0], h, coord[0][1]],
                    [coord[3][0], h, coord[3][1]],
                ),


            )
            c.push(
                ...fillColorFace(color2),
                ...fillColorFace(color2),
                ...fillColorFace(colorB),
                ...fillColorFace(colorB),
                ...fillColorFace(colorB),
                ...fillColorFace(colorB),
            )
            u.push(
                ...uvBr,
                ...uvBr,
                ...uvCl,
                ...uvCl,
                ...uvCl,
                ...uvCl,
            )

            collision.push(
                ...createFace(
                    [coord[0][0], h, coord[0][1]],
                    [coord[1][0], h, coord[1][1]],
                    [coord[2][0], h, coord[2][1]],
                    [coord[3][0], h, coord[3][1]],
                ),
            )
        }
    }




    translateArr(v, xCenter, 0, zCenter)
    translateArr(collision, xCenter, 0, zCenter)



    return { v, c , u, collision }
}