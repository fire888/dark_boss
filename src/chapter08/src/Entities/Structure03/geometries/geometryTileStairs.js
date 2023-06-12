import { W, H } from '../../../constants/constants_elements'
import {
    translateArr,
} from '../../../helpers/geomHelpers'
import { createColumnData } from './geomElemColumn'
import { createPlatformData } from './geomElemPlatform'
import {createElemArcData} from "./geomElemArc";

const hpW = W / 6



export const createGeomStairs = () => {
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

    /** N */
    {
        const platform = createPlatformData({
            nX_pZ: [-hpW , 0, -hpW],
            pX_pZ: [hpW, 0, -hpW ],
            pX_nZ: [hpW, H / 4, -60],
            nX_nZ: [-hpW, H / 4, -60],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }
    {
        const platform = createPlatformData({
            nX_pZ: [-hpW , H / 4, -60],
            pX_pZ: [hpW, H / 4, -60],
            pX_nZ: [hpW, H / 4, -80],
            nX_nZ: [-hpW, H / 4, -80],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({
            nX_pZ: [-hpW * 2 , H / 2.5, -60],
            pX_pZ: [-hpW, H / 4, -60],
            pX_nZ: [-hpW, H / 4, -80],
            nX_nZ: [-hpW * 2, H / 2.5, -80],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({
            nX_pZ: [-80, H / 2.5, -60],
            pX_pZ: [-hpW * 2, H / 2.5, -60],
            pX_nZ: [-hpW * 2, H / 2.5, -80],
            nX_nZ: [-80, H / 2.5, -80],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({
            nX_pZ: [-80, H / 2, -hpW],
            pX_pZ: [-hpW * 2, H / 2, -hpW],
            pX_nZ: [-hpW * 2, H / 2.5, -60],
            nX_nZ: [-80, H / 2.5, -60],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }

    /** L */
    {
        const platform = createPlatformData({
            nX_pZ: [-80, H / 2, hpW],
            pX_pZ: [-hpW * 2, H / 2, hpW],
            pX_nZ: [-hpW * 2, H / 2, -hpW],
            nX_nZ: [-80, H / 2, -hpW],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({
            nX_pZ: [-80, H * .75, hpW * 2],
            pX_pZ: [-hpW * 2, H * .75, hpW * 2],
            pX_nZ: [-hpW * 2, H / 2, hpW],
            nX_nZ: [-80, H / 2, hpW],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({
            nX_pZ: [-80, H * .75, 80],
            pX_pZ: [-hpW * 2, H * .75, 80],
            pX_nZ: [-hpW * 2, H * .75, hpW * 2],
            nX_nZ: [-80, H * .75, hpW * 2],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({
            nX_pZ: [-hpW * 2, H * .75, 80],
            pX_pZ: [-hpW, H * .85, 80],
            pX_nZ: [-hpW, H * .85, hpW * 2],
            nX_nZ: [-hpW * 2, H * .75, hpW * 2],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({
            nX_pZ: [-hpW, H * .85, 80],
            pX_pZ: [hpW, H * .85, 80],
            pX_nZ: [hpW, H * .85, hpW * 2],
            nX_nZ: [-hpW, H * .85, hpW * 2],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({
            nX_pZ: [-hpW, H * .85, hpW * 2],
            pX_pZ: [hpW, H * .85, hpW * 2],
            pX_nZ: [hpW, H, hpW],
            nX_nZ: [-hpW, H, hpW],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
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
