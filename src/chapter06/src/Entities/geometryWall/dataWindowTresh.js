import { createSchemeLattice } from "../schemes/schemeLattice";
import {createDataLine} from "./dataLine";

import {
    createFace,
    createUv,
    fillColorFace,
    translateArr,
    getAngle,
    rotateArrZ,
    fillColor6,
} from '../geometry/helpers'


export const createDataWindowTrash = data => {
    const {
        w,
        h,
        t = 10,
        countTrash = 6
    } = data

    const v = []
    const c = []
    const scheme = createSchemeLattice({ w, h, countTrash })
    for (let i = 0; i < scheme.length; ++i) {
        for (let j = 0; j < scheme[i].length; ++j) {
            for (let k = 0; k < scheme[i][j].nears.length; ++k) {
                const n = scheme[i][j].nears[k]
                const dataLine = createDataLine({ t, countTrash }, scheme[i][j], scheme[n.i][n.j])
                v.push(...dataLine.v)
                c.push(...dataLine.c)
            }
        }
    }

    translateArr(v, -w / 2, 0, 0)

    return { v, c }
}