import { W, H } from '../../../constants/constants_elements'
import {
    translateArr,
} from '../../../helpers/geomHelpers'
import { createColumnData } from './geomElemColumn'
import { createPlatformData } from './geomElemPlatform'



export const createGeomT = () => {
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
        const platform = createPlatformData({w: W / 3, d: W / 3})

        translateArr(platform.v, 0, H / 2, 0)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, 0, H / 2, 0)
        col.push(...platform.col)
    }
    /** bottom */
    {
        const platform = createPlatformData({w: W / 3, d: W / 3})

        translateArr(platform.v, 0, H / 2, W / 3)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, 0, H / 2, W / 3)
        col.push(...platform.col)
    }
    /** top */
    {
        const platform = createPlatformData({})

        translateArr(platform.v, 0, H / 2, -W / 3)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, 0, H / 2, -W / 3)
        col.push(...platform.col)
    }
    /** right */
    {
        const platform = createPlatformData({w: W / 3, d: W / 3})

        translateArr(platform.v, W / 3, H / 2, 0)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, W / 3, H / 2, 0)
        col.push(...platform.col)
    }


    return { v, c, u, col }
}
