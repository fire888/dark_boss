import {createDataWindowTrash} from "./dataWindowTresh"
import {createDataArc} from "./dataArc"
import {
    translateArr,
    rotateArrY,
} from "../geometry/helpers"



export const createDataGeomPath = data => {
    const {
        x = 0,
        y = 0,
        z = 0,
        w = 20,
        wc = 5,
        h = 150,
        t = 20,
        innerH = 100,
        angle = 0,
    } = data

    const v = []
    const c = []

    return { v, c }
}