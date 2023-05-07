import { W, H } from '../../../constants/constants_elements'
import {
    translateArr,
} from '../../../helpers/geomHelpers'
import { createColumnData } from './geomElemColumn'
import { createPlatformData } from './geomElemPlatform'

const hpW = W / 6

export const createGeomFromBot = () => {
    const v = []
    const c = []
    const u = []
    const col = []




    /** bottom */
    {
        const platform = createPlatformData({
            nX_pZ: [-hpW, 0, -hpW],
            pX_pZ: [hpW, 0, -hpW],
            pX_nZ: [hpW, H / 2, -80],
            nX_nZ: [-hpW, H / 2, -80],
        })

        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        col.push(...platform.col)
    }


    return { v, c, u, col }
}
