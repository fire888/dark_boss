import { W, H } from '../../../constants/constants_elements'
import {
    createFace,
    translateArr,
    fillColorFace,
    createUv,
    rotateArrY,
} from '../../../helpers/geomHelpers'

const createColumnData = ({
    h = H,
    w = 3,
                     }) => {
    const v = []
    const c = []
    const u = []
    const col = []


    /** left side ***/
    const sideV = []
    sideV.push(
        ...createFace(
            [0, 0, 0,],
            [w, 0, 0,],
            [w, h, 0,],
            [0, h, 0,],
        )
    )
    const sideColV = [...sideV]
    const colorPolygon = fillColorFace([1, 1, 1])
    const uPolygon = createUv([.333, .333], [.666, .333], [.666,0], [.3333, 0])

    const fillArr = (rot, x, z) => {
        const copyF = [...sideV]
        rotateArrY(copyF, rot)
        translateArr(copyF, x, 0, z)
        v.push(...copyF)
        const copyCol = [...sideColV]
        rotateArrY(copyCol, rot)
        translateArr(copyCol, x, 0, z)
        col.push(...copyCol)
        c.push(...colorPolygon)
        u.push(...uPolygon)
    }

    fillArr(0, -w / 2, w / 2)
    fillArr(-Math.PI / 2, -w / 2, -w / 2)
    fillArr(Math.PI / 2, w / 2, w / 2)
    fillArr(Math.PI, w / 2, -w / 2)

    return { v, col, u, c }
}

export const createGeomL = () => {
    const v = []
    const c = []
    const u = []
    const col = []

    const column = createColumnData({})

    const fill = (x, z) => {
        const copyV = [...column.v]
        translateArr(copyV, x, 0, z)
        v.push(...copyV)
        const copyCol = [...column.col]
        translateArr(copyCol, x, 0, z)
        col.push(...copyCol)
        c.push(...column.c)
        u.push(...column.u)
    }

    fill(W / 3, W / 3)
    fill(W / 3 * 2, W / 3)
    fill(W / 3, W / 3 * 2)
    fill(W / 3 * 2, W / 3 * 2)


    return { v, c, u, col }
}
