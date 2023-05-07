import {H} from "../../../constants/constants_elements";
import {createFace, fillColorFace, rotateArrY} from "../../../helpers/geomHelpers";
import {tileUv} from "./uvAtlas";

export const createColumnData = ({
                              h = H,
                              w = 3,
                              bottomW = 5,
                              bottomH = 3,
                              topW = 5,
                              topH = 3,
                          }) => {
    const v = []
    const c = []
    const u = []
    const col = []


    /** left side ***/
    const sideV = []

    const h1 = bottomH + 2
    const h2 = h - topH - 2
    const h3 = h - topH

    const sideColV = [
        ...createFace(
            [-bottomW / 2, 0, bottomW / 2,],
            [bottomW / 2, 0, bottomW / 2,],
            [bottomW / 2, h, bottomW / 2,],
            [-bottomW / 2, h, bottomW / 2,],
        ),
    ]

    sideV.push(
        ...createFace(
            [-bottomW / 2, 0, bottomW / 2,],
            [bottomW / 2, 0, bottomW / 2,],
            [bottomW / 2, bottomH, bottomW / 2,],
            [-bottomW / 2, bottomH, bottomW / 2,],
        ),

        ...createFace(
            [-bottomW / 2, bottomH, bottomW / 2,],
            [bottomW / 2, bottomH, bottomW / 2,],
            [w / 2, h1,  w / 2,],
            [-w / 2, h1, w / 2,],
        ),
        ...createFace(
            [-w / 2, h1, w / 2,],
            [w / 2, h1, w / 2,],
            [w / 2, h2,  w / 2,],
            [- w / 2, h2, w / 2,],
        ),
        ...createFace(
            [-w / 2, h2, w / 2,],
            [w / 2, h2, w / 2,],
            [topW / 2, h3,  topW / 2,],
            [-topW / 2, h3, topW / 2,],
        ),
        ...createFace(
            [-topW / 2, h3,  topW / 2,],
            [topW / 2, h3, topW / 2,],
            [topW / 2, h,  topW / 2,],
            [-topW / 2, h, topW / 2,],
        ),
    )

    const colorPolygon = fillColorFace([1, 1, 1])
    const colorSide = [
        ...colorPolygon,
        ...colorPolygon,
        ...colorPolygon,
        ...colorPolygon,
        ...colorPolygon,
    ]

    const fillArr = (rot) => {
        const copyF = [...sideV]
        rotateArrY(copyF, rot)
        v.push(...copyF)

        const copyCol = [...sideColV]
        rotateArrY(copyCol, rot)
        col.push(...copyCol)

        c.push(...colorSide)
        const k = `${Math.floor(Math.random() * 3)}_${Math.floor(Math.random() * 3)}`
        const k1 = `${Math.floor(Math.random() * 3)}_${Math.floor(Math.random() * 3)}`
        const k2 = `${Math.floor(Math.random() * 3)}_${Math.floor(Math.random() * 3)}`
        u.push(
            ...tileUv[k],
            ...tileUv[k1],
            ...tileUv[k2],
            ...tileUv[k1],
            ...tileUv[k],
        )
    }

    fillArr(0)
    fillArr(-Math.PI / 2)
    fillArr(Math.PI / 2)
    fillArr(Math.PI)

    return { v, col, u, c }
}
