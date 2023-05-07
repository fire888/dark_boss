import { W, H } from '../../../constants/constants_elements'
import {
    translateArr,
} from '../../../helpers/geomHelpers'
import { createColumnData } from './geomElemColumn'
import { createPlatformData } from './geomElemPlatform'

const hpW = W / 6



export const createGeomXY = () => {
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
            pX_nZ: [hpW, H / 2, -80],
            nX_nZ: [-hpW, H / 2, -80],
        })
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }


    {
        const platform = createPlatformData({
            nX_pZ: [hpW, 0, hpW],
            pX_pZ: [80, H / 2, hpW],
            pX_nZ: [80, H / 2, -hpW],
            nX_nZ: [hpW, 0, -hpW],
        })

        //translateArr(platform.v, W / 3, H / 2, 0)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        //translateArr(platform.col, W / 3, H / 2, 0)
        col.push(...platform.col)
    }

    {
        const platform = createPlatformData({
            nX_pZ: [-80, H / 2, hpW],
            pX_pZ: [-hpW, 0, hpW],
            pX_nZ: [-hpW, 0, -hpW],
            nX_nZ: [-80, H / 2, -hpW],
        })

        //translateArr(platform.v, -W / 3, H / 2, 0)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        //translateArr(platform.col, -W / 3, H / 2, 0)
        col.push(...platform.col)
    }
    {
        const platform = createPlatformData({
            nX_pZ: [-hpW, H / 2, 80],
            pX_pZ: [hpW, H / 2, 80],
            pX_nZ: [hpW, H, hpW],
            nX_nZ: [-hpW, H, hpW],
        })

        //translateArr(platform.v, 0, H / 2, -W / 3)
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
       // translateArr(platform.col, 0, H / 2, -W / 3)
        col.push(...platform.col)
    }


    return { v, c, u, col }
}
