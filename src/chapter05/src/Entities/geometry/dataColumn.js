import { createDataSideColumn } from './dataColumnSide'
import {
    transformArr,
    createFace,
    createUv,
    fillColorFace,
} from './helpers'
import { lCol, lW } from '../../constants/constants_elements'




const color1 = [0, 0, 0]
const color2 = [0, .7, 0]




export const createDataColumn = ({
    h0 = 0,
    h1 = 30,
    rCapital = 6,
    rBase = 5,
    capTop = false,
    capBottom = false
}) => {

    const {
        frontVert,
        frontColors,
        frontUV,
    } = createDataSideColumn({ h0, h1, color1, color2, rCapital, rBase })


    const leftVert = [...frontVert]
    transformArr(leftVert, 0, 0, 0, Math.PI / 2)

    const rightVert = [...frontVert]
    transformArr(rightVert, 0, 0, 0, -Math.PI / 2)

    const backVert = [...frontVert]
    transformArr(backVert, 0, 0, 0, Math.PI)


    const v = [
        ...frontVert,
        ...leftVert,
        ...rightVert,
        ...backVert,
    ]
    const c = [
        ...frontColors,
        ...frontColors,
        ...frontColors,
        ...frontColors,
    ]

    const u = [
        ...frontUV,
        ...frontUV,
        ...frontUV,
        ...frontUV,
    ]


    const wL = .6
    const collision = [
        ...createFace(
            [-rBase - wL, h0, rBase + wL],
            [rBase + wL, h0, rBase + wL],
            [rBase + wL, h1, rBase + wL],
            [-rBase - wL, h1, rBase + wL],
        ),
        ...createFace(
            [rBase + wL, h0, rBase + wL],
            [rBase + wL, h0, -rBase - wL],
            [rBase + wL, h1, -rBase - wL],
            [rBase + wL, h1, rBase + wL],
        ),
        ...createFace(
            [rBase + wL, h0, -rBase - wL],
            [-rBase - wL, h0, -rBase - wL],
            [-rBase - wL, h1, -rBase - wL],
            [rBase + wL, h1, -rBase - wL],
        ),
        ...createFace(
            [-rBase - wL, h0, -rBase - wL],
            [-rBase - wL, h0, rBase + wL],
            [-rBase - wL, h1, rBase + wL],
            [-rBase - wL, h1, -rBase - wL],
        ),
    ]


    if (capBottom) {
        v.push(...createFace(
            [-rBase - lW, h0 - lW, rBase + lW],
            [rBase + lW, h0 - lW, rBase + lW],
            [rBase, h0 - lW, -rBase - lW],
            [-rBase, h0 - lW, -rBase - lW],
        ))
        c.push(...fillColorFace(lCol))
        u.push(...createUv(
            [0, 1],
            [0, 1],
            [0, 1],
            [0, 1],
        ))
    }

    if (capTop) {
        v.push(...createFace(
            [-rCapital, h1, rCapital],
            [rCapital, h1, rCapital],
            [rCapital, h1, -rCapital],
            [-rCapital, h1, -rCapital],
        ))
        c.push(...fillColorFace(color1))
        u.push(...createUv(
            [.5, 0],
            [1, 0],
            [1, .5],
            [.5, .5],
        ))
    }


    return { v, c, u, collision }
}