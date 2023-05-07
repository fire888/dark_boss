import { W, H } from '../../../constants/constants_elements'
import {
    translateArr,
} from '../../../helpers/geomHelpers'
import { createColumnData } from './geomElemColumn'
import { createPlatformData } from './geomElemPlatform'



export const createGeomTopPlatform = () => {
    const v = []
    const c = []
    const u = []
    const col = []

    /** center */
    {
        const platform = createPlatformData({w: W / 3, d: W / 3})

        translateArr(platform.v, 0, H, 0)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        translateArr(platform.col, 0, H, 0)
        col.push(...platform.col)
    }

    return { v, c, u, col }
}
