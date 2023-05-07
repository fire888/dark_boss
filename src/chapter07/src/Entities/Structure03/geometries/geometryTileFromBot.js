import { W, H } from '../../../constants/constants_elements'
import {
    translateArr,
} from '../../../helpers/geomHelpers'
import { createColumnData } from './geomElemColumn'
import { createPlatformData } from './geomElemPlatform'



export const createGeomFromBot = () => {
    const v = []
    const c = []
    const u = []
    const col = []




    /** bottom */
    {
        const platform = createPlatformData({
            nX_pZ: [-30, 0, -30],
            pX_pZ: [30, 0, -30],
            pX_nZ: [30, H / 2, -90],
            nX_nZ: [-30, H / 2, -90],
        })

        //translateArr(platform.v, )
        v.push(...platform.v)
        c.push(...platform.c)
        u.push(...platform.u)
        //translateArr(platform.col, 0, H / 2, W / 3)
        col.push(...platform.col)
    }


    return { v, c, u, col }
}
