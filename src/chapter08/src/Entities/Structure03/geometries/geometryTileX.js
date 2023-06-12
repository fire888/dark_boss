import { W, H } from '../../../constants/constants_elements'
import {
    translateArr,
} from '../../../helpers/geomHelpers'
import { createColumnData } from './geomElemColumn'
import { createPlatformData } from './geomElemPlatform'
import {createElemArcData} from "./geomElemArc";



export const createGeomX = () => {
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

        translateArr(platform.v, 0, H / 2, 0)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, 0, H / 2, 0)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({})

        translateArr(platform.v, 0, H / 2, W / 3)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, 0, H / 2, W / 3)
        col.push(...platform.col)
    }
    {
        const platform = createPlatformData({})

        translateArr(platform.v, W / 3, H / 2, 0)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, W / 3, H / 2, 0)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({})

        translateArr(platform.v, -W / 3, H / 2, 0)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, -W / 3, H / 2, 0)
        col.push(...platform.col)
    }
    {
        const platform = createPlatformData({})

        translateArr(platform.v, 0, H / 2, -W / 3)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, 0, H / 2, -W / 3)
        col.push(...platform.col)
    }

    {
        const arc = createElemArcData({})
        translateArr(arc.v, 0, -H / 2, 0)
        v.push(...arc.v)
        c.push(...arc.c)
        u.push(...arc.u)
    }

    return { v, c, u, col }
}
