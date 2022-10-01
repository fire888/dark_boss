import {
    createUv,
    createFace,
    fillColorFace,
} from "./helpers";


export const createDataStairSimple = ({
    r,
    h,
    hh,
    bridgeMinusH,
    bridgeL,
    color2,
    colorB
}) => {

    const v = []
    const c = []
    const u = []


    const uvBr = createUv([0, .5], [.5, .5], [.5, 1], [0, 1],)
    const uvCl = createUv([0, 0], [0, 0], [0, 0], [0, 0],)


    v.push(
        /** place */

        ...createFace(
            [-r, h, r],
            [r, h, r],
            [r, h, -r],
            [-r, h, -r],
        ),

        ...createFace(
            [-r, hh, r],
            [r, hh, r],
            [r, h, r],
            [-r, h, r],
        ),

        ...createFace(
            [-r, hh, -r],
            [-r, hh, r],
            [-r, h, r],
            [-r, h, -r],
        ),

        ...createFace(
            [r, hh, r],
            [r, hh, -r],
            [r, h, -r],
            [r, h, r],
        ),

        ...createFace(
            [r, hh, -r],
            [-r, hh, -r],
            [-r, h, -r],
            [r, h, -r],
        ),

        // bottom
        ...createFace(
            [r, hh, -r],
            [r, hh, r],
            [-r, hh, r],
            [-r, hh, -r],
        ),

        /** connect */

        ...createFace(
            [-r, h, -r],
            [r, h, -r],
            [r, h - bridgeMinusH, -r - bridgeL],
            [-r, h - bridgeMinusH, -r - bridgeL],
        ),

        ...createFace(
            [-r, hh - bridgeMinusH, -r - bridgeL],
            [-r, hh, -r],
            [-r, h, -r],
            [-r, h - bridgeMinusH, -r - bridgeL],
        ),


        ...createFace(
            [r, hh, -r],
            [r, hh - bridgeMinusH, -r - bridgeL],
            [r, h - bridgeMinusH, -r - bridgeL],
            [r, h, -r],
        ),

        ...createFace(
            [-r, hh - bridgeMinusH, -r - bridgeL],
            [r, hh - bridgeMinusH, -r - bridgeL],
            [r, hh, -r],
            [-r, hh, -r],
        ),
    )

    c.push(
        ...fillColorFace(color2),
        ...fillColorFace(colorB),
        ...fillColorFace(colorB),
        ...fillColorFace(colorB),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(colorB),
        ...fillColorFace(colorB),
        ...fillColorFace(color2),
    )

    u.push(
        ...uvBr,
        ...uvCl,
        ...uvCl,
        ...uvCl,
        ...uvCl,
        ...uvBr,
        ...uvBr,
        ...uvCl,
        ...uvCl,
        ...uvBr,
    )



    return { v, c , u }
}