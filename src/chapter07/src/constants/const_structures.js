import { Color } from 'three'

export const W = 160


const c = new Color(0xa76815)
console.log(c.r + ', ' + c.g + ', ' + c.b)

const items = [
    {i: 0, j: 0, k: 0, maybeTilesInds: [2], queue:{ind: 22, calk: true}, resultTileIndex:2, tileData: { keyModel: 't_I', rotationY: Math.PI / 2 }},
    {i: 0, j: 0, k: 1, maybeTilesInds: [2], queue:{ind: 22, calk: true}, resultTileIndex:2, tileData: { keyModel: 't_I', rotationY: Math.PI / 2 }},
    {i: 0, j: 0, k: 2, maybeTilesInds: [2], queue:{ind: 22, calk: true}, resultTileIndex:2, tileData: { keyModel: 't_I', rotationY: Math.PI / 2 }},
    {i: 0, j: 0, k: 3, maybeTilesInds: [2], queue:{ind: 22, calk: true}, resultTileIndex:2, tileData: { keyModel: 't_I', rotationY: Math.PI / 2 }},
    {i: 0, j: 0, k: 4, maybeTilesInds: [2], queue:{ind: 22, calk: true}, resultTileIndex:2, tileData: { keyModel: 't_I', rotationY: Math.PI / 2 }},
]
export const FINAL_MAP = {
    iterateAll: f => {
        for (let i = 0; i < items.length; ++i) {
            f(items[i])
        }
    }
}
export const FINAL_ENV_COLOR = new Color(1, 1, 0)
export const FINAL_STRUCTURE = {
    ENV_COLOR: FINAL_ENV_COLOR,
    FOG: { color: 0xffff00, near: 150, far: 1000, time: 2000 },
    COLOR_00: [1, 1, 0],
    mat: 'structureMaterial',
    X: -800,
    Y: -100,
    Z: 160,
    mapFill: [
        { tile: 'empty', place: [3, 4, 2] },
        { tile: 'empty', place: [3, 3, 2] },
        { tile: 'empty', place: [3, 2, 2] },
        { tile: 'empty', place: [3, 1, 2] },
        { tile: 'empty', place: [3, 0, 2] },
    ],
}



export const STRUCTURE_BIG_HOLE = (() => {
    const mapFill = []
    for (let i = 3; i < 6; ++i) {
        for (let j = 0; j < 5; ++j) {
            for (let k = 2; k < 7; ++k) {
               mapFill.push({ tile: 'empty', place: [i, j, k] })
            }
        }
    }

    return {
        ENV_COLOR: new Color(.9, .9, 0),
        FOG: { color: 0x00aaaa, near: 150, far: 700, time: 2000 },
        COLOR_00: [0.8, 0.1, .9],
        mat: 'structureMaterial',
        SIZE_X: 9,
        SIZE_Y: 10,
        SIZE_Z: 5,
        X: -W * 5,
        Y: -270,
        Z: -170,
        mapFill,
    }
})()


export const STRUCTURE_TOP_RIGHT = (() => {
    const mapFill = []
    for (let i = 3; i < 15; ++i) {
        for (let j = 0; j < 5; ++j) {
            for (let k = 0; k < 3; ++k) {
               mapFill.push({ tile: 'empty', place: [i, j, k] })
            }
        }
    }

    return {
        ENV_COLOR: new Color(.9, .9, .9),
        FOG: { color: 0x00aaaa, near: 150, far: 700, time: 2000 },
        COLOR_00: [0.1, 0.1, .9],
        mat: 'structureMaterial',
        SIZE_X: 7,
        SIZE_Y: 15,
        SIZE_Z: 5,
        X: -W,
        Y: -270,
        Z: -170,
        mapFill,
    }
})()




export const STRUCTURE_TOP_LEFT = (() => {
    const mapFill = []
    for (let i = 3; i < 15; ++i) {
        for (let j = 0; j < 5; ++j) {
            for (let k = 4; k < 7; ++k) {
               mapFill.push({ tile: 'empty', place: [i, j, k] })
            }
        }
    }

    return {
        ENV_COLOR: new Color(.3, 0, .3),
        FOG: { color: 0x559955, near: 150, far: 700, time: 2000 },
        COLOR_00: [.9, 0, .7],
        mat: 'structureMaterial',
        SIZE_X: 7,
        SIZE_Y: 15,
        SIZE_Z: 5,
        X: -W * 5,
        Y: -270,
        Z: -170,
        mapFill,
    }
})()












export const STRUCTURE_LONG_LEFT = (() => {
    const mapFill = []

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

