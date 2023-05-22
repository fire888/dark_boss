import { Color } from 'three'

export const W = 160


const c = new Color(0x93cfd9)
console.log(c.r + ', ' + c.g + ', ' + c.b)
// 678084
export const STRUCTURE_L = (() => {
    const mapFill = []
    // for (let i = 0; i < 7; ++i) {
    //     for (let j = 0; j < 15; ++j) {
    //         //for (let k = 3; k < 4; ++k) {
    //             mapFill.push({ tile: 'empty', place: [i, j, 3] })
    //         //}
    //     }
    // }

    return {
        ENV_COLOR: new Color(0.403921568627451, 0.5019607843137255, 0.5176470588235295),
        FOG: { color: 0x132229, near: 150, far: 700, time: 2000 },
        COLOR_00: [0.5764705882352941, 0.8117647058823529, 0.8509803921568627],
        mat: 'structureMaterial',
        SIZE_X: 5,
        SIZE_Y: 5,
        SIZE_Z: 15,
        X: -W * 5,
        Y: -270,
        Z: -170,
        mapFill,
    }
})()


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
        COLOR_00: [.35, .35, .35],
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

