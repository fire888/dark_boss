import { createDataColumn } from './dataColumn'
import { createDataSideArc } from "./dataArc";
import { createTopElem } from "./dataTopElem";
import { createSimpleColumn } from './dataColumnSimple'



const color1 = [0, 0, 0]
const color2 = [0, .7, 0]

export const createSegmentGallery = ({
    h0 = 0,
    h1 = 30,
    h2 = 60,
    arc = false,
    isTopElem = false,
    isColumn = false
}) => {

    const v = []
    const c = []
    const u = []
    const collision = []
    const collisionCar = []

    /** arc */
    if (arc) {
        const arcData = createDataSideArc({ h1, h2, color1, color2, ...arc })
        v.push(...arcData.v)
        c.push(...arcData.c)
        u.push(...arcData.u)
    }


    /** column */
    const rCapital = 6
    const rBase = 5
    const columnData = createDataColumn({
        h0,
        h1,
        color1,
        color2,
        rCapital,
        rBase,
        capTop: true,
        capBottom: true
    })
    v.push(...columnData.v)
    c.push(...columnData.c)
    u.push(...columnData.u)
    collision.push(...columnData.collision)
    if (columnData.collisionCar) {
        collisionCar.push(...columnData.collisionCar)
    }


    /** top elem */
    const {
        vertTopElem,
        colorsTopElem,
        uvTopElem,
    } = createTopElem({ h2, color1, color2, isTopElem })
    v.push(...vertTopElem)
    c.push(...colorsTopElem)
    u.push(...uvTopElem)

    /** simple column */
    const {
        vertColumn,
        colorsColumn,
        uvColumn,
    } = createSimpleColumn({ isColumn, h1, h2, color1, color2 })
    v.push(...vertColumn)
    c.push(...colorsColumn)
    u.push(...uvColumn)


    return { v, c, u, collision, collisionCar }
}