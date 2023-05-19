import { Color } from 'three'

export const STRUCTURE_TWO_HOUSES = (() => {

    const mapFill = []
    for (let i = 0; i < 7; ++i) {
        for (let j = 0; j < 5; ++j) {
            for (let k = 4; k < 5; ++k) {
               mapFill.push({ tile: 'empty', place: [i, j, k] })
            }
        }
    }

    return {
        ENV_COLOR: new Color(.6, 0, 0),
        FOG: { color: 0x550000, near: 150, far: 700, time: 2000 },
        COLOR_00: [.15, .15, .15],
        mat: 'structureMaterial',
        SIZE_X: 9,
        SIZE_Y: 8,
        SIZE_Z: 5,
        X: -640,
        Y: -270,
        Z: -170,
        mapFill,
    }
})()



export const STRUCTURE_L = (() => {

    const mapFill = []
    for (let i = 0; i < 7; ++i) {
        for (let j = 0; j < 5; ++j) {
            for (let k = 4; k < 5; ++k) {
               mapFill.push({ tile: 'empty', place: [i, j, k] })
            }
        }
    }

    return {
        ENV_COLOR: new Color(.6, 0, 0),
        FOG: { color: 0x550000, near: 150, far: 700, time: 2000 },
        COLOR_00: [.15, .15, .15],
        mat: 'structureMaterial',
        SIZE_X: 9,
        SIZE_Y: 8,
        SIZE_Z: 5,
        X: -320,
        Y: -270,
        Z: -170,
        mapFill,
    }
})()