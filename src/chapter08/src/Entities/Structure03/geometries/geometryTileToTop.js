import { W, H } from '../../../constants/constants_elements'
import {
    translateArr,
} from '../../../helpers/geomHelpers'
import { createColumnData } from './geomElemColumn'
import { createPlatformData } from './geomElemPlatform'
import {createElemArcData} from "./geomElemArc";

const hpW = W / 6

export const createGeomToTop = () => {
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

    fill(-W / 3 / 2, -W / 3 / 2)
    fill(W / 3 / 2, -W / 3 / 2)
    fill(-W / 3 / 2, W / 3 / 2)
    fill(W / 3 / 2, W / 3 / 2)


    /** center */
    {
        const platform = createPlatformData({})

        translateArr(platform.v, 0, H, 0)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, 0, H, 0)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({
            nX_pZ: [-hpW, 0, 80],
            pX_pZ: [hpW, 0, 80],
            pX_nZ: [hpW, H * 0.5, hpW],
            nX_nZ: [-hpW, H * 0.5, hpW],
        })

        translateArr(platform.v, 0, H * 0.5, 0)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, 0, H * 0.5, 0)
        col.push(...platform.col)
    }

    // {
    //     const arc = createElemArcData({})
    //     v.push(...arc.v)
    //     c.push(...arc.c)
    //     u.push(...arc.u)
    // }


    return { v, c, u, col }
}
