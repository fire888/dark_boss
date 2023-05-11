import { createUv } from '../../../helpers/geomHelpers'

const v033 = 1 / 3
const v066 = v033 * 2


export const tileUv = {
    'line_p0': createUv([0, 0.75], [0.25, 0.75], [0.25, 1], [0, 1]),
    'line_p1': createUv([0, 0.5], [0.25, 0.5], [0.25, 0.75], [0, 0.75]),

    'columnSide_0':  createUv([0, 0], [0.0625, 0], [0.0625, 0.25], [0, 0.25]),
    'columnSide_1':  createUv([0.0625, 0], [0.125, 0], [0.125, 0.25], [0.0625, 0.25]),
    'columnSide_2':  createUv([0.125, 0], [0.1875, 0], [0.1875, 0.25], [0.125, 0.25]),
    'columnSide_3':  createUv([0.1875, 0], [0.25, 0], [0.25, 0.25], [0.1875, 0.25]),

    'three': [0.125, 0.5,    0, 0.25,    0.25, 0.25],

    'lines': createUv([0.5, 0], [0.75, 0], [0.75, .25], [0.5, .25]),
    'points': createUv([0.25, 0], [0.5, 0], [0.5, .25], [0.25, .25]),
    'empty': createUv([0.25, 0.25], [0.5, 0.25], [0.5, .5], [0.25, .5]),
    'briks': createUv([0.75, 0], [1, 0], [1, .25], [0.75, .25]),

    'gor_pattern_00': createUv([0.25, 0.96875], [0.5, 0.96875], [0.5, 1], [0.25, 1]),
    'gor_pattern_01': createUv([0.25, 0.9375], [0.5, 0.9375], [0.5, 0.96875], [0.25, 0.96875]),

    'face_00': createUv([0.5, 0.75], [0.75, 0.75], [0.75, 1], [0.5, 1]),


    '0_0': createUv([0, 0], [v033, 0], [v033, v033], [0, v033]),
    '1_0': createUv([v033, 0], [v066, 0], [v066, v033], [v033, v033]),
    '2_0': createUv([v066, 0], [1, 0], [1, v033], [v066, v033]),

    '0_1': createUv([0, v033], [v033, v033], [v033, v066], [0, v066]),
    '1_1': createUv([v033, v033], [v066, v033], [v066, v066], [v033, v066]),
    '2_1': createUv([v066, v033], [1, v033], [1, v066], [v066, v066]),

    '0_2': createUv([0, v066], [v033, v066], [v033, 1], [0, 1]),
    '1_2': createUv([v033, v066], [v066, v066], [v066, 1], [v033, 1]),
    '2_2': createUv([v066, v066], [1, v066], [1, 1], [v066, 1]),
}

const l = ['columnSide_0', 'columnSide_1', 'columnSide_2', 'columnSide_3']
export const randomTile = () => {
    const k = l[Math.floor(Math.random() * l.length)]
    return tileUv[k]
}
