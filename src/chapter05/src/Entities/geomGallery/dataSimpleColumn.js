import {
    createFace,
    createUv,
    createFaceWithSquare,
    fillColorFace,
    fillColorFaceWithSquare
} from './helpers'


export const createSimpleColumn = ({ isColumn, h1, h2, color1, color2 }) => {
    if (!isColumn) {
        return {
            vertColumn: [],
            colorsColumn: [],
            uvColumn: [],
        }
    }

    const vertColumn = []
    const colorsColumn = []
    const uvColumn = []

    const r = 4
    const rC = 6
    const hC = h2 - 5

    /** front **************/
    vertColumn.push(
        ...createFace(
            [-r, h1, r,],
            [r, h1, r],
            [r, h2, r],
            [-r, h2, r],
        ),

        ...createFace(
            [r, h1, r],
            [r, h1, -r],
            [r, h2, -r],
            [r, h2, r],
        ),

        ...createFace(
            [r, h1, -r],
            [-r, h1, -r],
            [-r, h2, -r],
            [r, h2, -r],
        ),

        ...createFace(
            [-r, h1, -r],
            [-r, h1, r],
            [-r, h2, r],
            [-r, h2, -r],
        ),

        // capitel
        ...createFace(
            [-rC, hC, rC],
            [rC, hC, rC],
            [rC, h2, rC],
            [-rC, h2, rC],
        ),

        ...createFace(
            [rC, hC, rC],
            [rC, hC, -rC],
            [rC, h2, -rC],
            [rC, h2, rC],
        ),

        ...createFace(
            [rC, hC, -rC],
            [-rC, hC, -rC],
            [-rC, h2, -rC],
            [rC, h2, -rC],
        ),

        ...createFace(
            [-rC, hC, -rC],
            [-rC, hC, rC],
            [-rC, h2, rC],
            [-rC, h2, -rC],
        ),

        // bottom top

        ...createFace(
            [-rC, hC, rC],
            [-rC, hC, -rC],
            [rC, hC, -rC],
            [rC, hC, rC],
        ),

        ...createFace(
            [-rC, h2, -rC],
            [-rC, h2, rC],
            [rC, h2, rC],
            [rC, h2, -rC],
        ),
    )

    colorsColumn.push(
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color2),
        ...fillColorFace(color1),
        ...fillColorFace(color1),
        ...fillColorFace(color1),
        ...fillColorFace(color1),
        ...fillColorFace(color1),
        ...fillColorFace(color1),
    )


    const uv = createUv(
        [0, .5],
        [.5, .5],
        [.5, 1],
        [0, 1],
    )

    uvColumn.push(
        ...uv,
        ...uv,
        ...uv,
        ...uv,
        ...uv,
        ...uv,
        ...uv,
        ...uv,
        ...uv,
        ...uv,
    )


    return {
        vertColumn,
        colorsColumn,
        uvColumn,
    }
}
