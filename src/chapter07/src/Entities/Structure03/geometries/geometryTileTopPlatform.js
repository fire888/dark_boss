import { W, H } from '../../../constants/constants_elements'
import {
    translateArr,
} from '../../../helpers/geomHelpers'
import { createColumnData } from './geomElemColumn'
import { createPlatformData } from './geomElemPlatform'
import {createElemArcData} from "./geomElemArc";



export const createGeomTopPlatform = () => {
    const v = []
    const c = []
    const u = []
    const col = []

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
        const arc = createElemArcData({})
        v.push(...arc.v)
        c.push(...arc.c)
        u.push(...arc.u)
    }

    return { v, c, u, col }
}
